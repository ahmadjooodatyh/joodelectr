const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
// ✅ قاعدة البيانات: محلي = store.db , على Render = /data/store.db
const DB_PATH = process.env.RENDER ? "/data/store.db" : path.join(__dirname, "store.db");
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) console.error("❌ DB error:", err);
  else console.log("✅ Database ready at", DB_PATH);
});

// ✅ ميدل وير
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));
app.use(express.static(path.join(__dirname, "public")));

// ✅ إعداد رفع الملفات
const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, "public", "uploads")),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "_" + file.originalname.replace(/\s+/g, "_")),
});
const upload = multer({ storage });

// ✅ إنشاء الجداول إذا غير موجودة
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'customer',
    phone TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL DEFAULT 0,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS ads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    image TEXT,
    link TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total REAL,
    address TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    price REAL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS complaints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    message TEXT,
    status TEXT DEFAULT 'open',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    siteName TEXT,
    siteDesc TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // ✅ إنشاء حساب الأدمن إذا مش موجود
  db.get("SELECT * FROM users WHERE username = 'admin'", (err, row) => {
    if (!row) {
      const hash = bcrypt.hashSync("admin123", 10);
      db.run(
        "INSERT INTO users(username,password,role,phone) VALUES(?,?,?,?)",
        ["admin", hash, "admin", ""]
      );
      console.log("⚙️ Admin created: admin / admin123");
    }
  });
});

// ✅ تسجيل النشاط
function logActivity(userId, action) {
  if (!userId) return;
  db.run("INSERT INTO activities (user_id, action) VALUES (?, ?)", [
    userId,
    action,
  ]);
}

/* ----------------- 🔑 AUTH ----------------- */
app.post("/api/auth/register", (req, res) => {
  const { username, phone, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "username & password required" });
  const hashed = bcrypt.hashSync(password, 10);
  db.run(
    "INSERT INTO users(username,password,role,phone) VALUES(?,?,?,?)",
    [username, hashed, "customer", phone || ""],
    function (err) {
      if (err) return res.status(400).json({ error: "username exists" });
      logActivity(this.lastID, "تسجيل حساب جديد");
      res.json({ id: this.lastID });
    }
  );
});

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  db.get(
    "SELECT id,username,password,role FROM users WHERE username = ?",
    [username],
    (err, user) => {
      if (err) return res.status(500).json({ error: "db" });
      if (!user) return res.status(401).json({ error: "invalid" });
      const ok = bcrypt.compareSync(password, user.password);
      if (!ok) return res.status(401).json({ error: "invalid" });
      logActivity(user.id, "تسجيل الدخول");
      res.json({
        user: { id: user.id, username: user.username, role: user.role },
      });
    }
  );
});

/* ----------------- 👥 USERS ----------------- */
app.get("/api/users", (req, res) =>
  db.all(
    "SELECT id,username,phone,role,created_at FROM users ORDER BY created_at DESC",
    [],
    (e, rows) => res.json(rows)
  )
);

app.post("/api/users", (req, res) => {
  const { username, phone, password, role } = req.body;
  const hashed = bcrypt.hashSync(password || "123456", 10);
  db.run(
    "INSERT INTO users(username,password,role,phone) VALUES(?,?,?,?)",
    [username, hashed, role || "customer", phone || ""],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

app.delete("/api/users/:id", (req, res) => {
  db.run("DELETE FROM users WHERE id=?", [req.params.id], function () {
    res.json({ success: true });
  });
});

/* ----------------- 🛒 PRODUCTS ----------------- */
app.get("/api/products", (req, res) =>
  db.all(
    "SELECT * FROM products ORDER BY created_at DESC",
    [],
    (e, rows) => res.json(rows)
  )
);

app.post("/api/products", upload.single("image"), (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file
    ? "/uploads/" + req.file.filename
    : req.body.image || null;
  db.run(
    "INSERT INTO products(name,description,price,image) VALUES(?,?,?,?)",
    [name, description || "", price || 0, image],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (req.body.user_id)
        logActivity(req.body.user_id, `أضف منتج: ${name}`);
      res.json({ id: this.lastID });
    }
  );
});

app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT image FROM products WHERE id=?", [id], (e, row) => {
    if (row && row.image && row.image.startsWith("/uploads/"))
      fs.unlink(path.join(__dirname, "public", row.image), () => {});
    db.run("DELETE FROM products WHERE id=?", [id], () =>
      res.json({ success: true })
    );
  });
});

/* ----------------- 📢 ADS ----------------- */
app.get("/api/ads", (req, res) =>
  db.all("SELECT * FROM ads ORDER BY created_at DESC", [], (e, rows) =>
    res.json(rows)
  )
);

app.post("/api/ads", upload.single("image"), (req, res) => {
  const { title, link, user_id } = req.body;
  const image = req.file ? "/uploads/" + req.file.filename : null;
  db.run(
    "INSERT INTO ads(title,image,link) VALUES(?,?,?)",
    [title, image, link || ""],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (user_id) logActivity(user_id, `أضف إعلان: ${title}`);
      res.json({ id: this.lastID });
    }
  );
});

app.delete("/api/ads/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT image FROM ads WHERE id=?", [id], (e, row) => {
    if (row && row.image && row.image.startsWith("/uploads/"))
      fs.unlink(path.join(__dirname, "public", row.image), () => {});
    db.run("DELETE FROM ads WHERE id=?", [id], () =>
      res.json({ success: true })
    );
  });
});

/* ----------------- 📦 ORDERS ----------------- */
app.post("/api/orders", (req, res) => {
  const { user_id, items, address } = req.body;
  if (!user_id || !Array.isArray(items) || items.length === 0)
    return res.status(400).json({ error: "invalid" });

  const total = items.reduce(
    (s, it) => s + (it.price || 0) * (it.quantity || 1),
    0
  );

  db.run(
    "INSERT INTO orders(user_id,total,address) VALUES(?,?,?)",
    [user_id, total, address || ""],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      const orderId = this.lastID;
      const stmt = db.prepare(
        "INSERT INTO order_items(order_id,product_id,quantity,price) VALUES(?,?,?,?)"
      );
      items.forEach((it) =>
        stmt.run(orderId, it.product_id, it.quantity || 1, it.price || 0)
      );
      stmt.finalize(() => {
        logActivity(user_id, `أمر جديد #${orderId} - ${total}`);
        res.json({ id: orderId });
      });
    }
  );
});

app.get("/api/orders", (req, res) => {
  db.all(
    "SELECT o.*, u.username FROM orders o LEFT JOIN users u ON u.id=o.user_id ORDER BY o.created_at DESC",
    [],
    (e, orders) => {
      if (e) return res.status(500).json({ error: e.message });
      const promises = orders.map(
        (o) =>
          new Promise((resolve) => {
            db.all(
              "SELECT oi.*, p.name FROM order_items oi LEFT JOIN products p ON p.id=oi.product_id WHERE oi.order_id=?",
              [o.id],
              (er, items) => {
                o.items = items;
                resolve(o);
              }
            );
          })
      );
      Promise.all(promises).then((full) => res.json(full));
    }
  );
});

app.put("/api/orders/:id", (req, res) => {
  const id = req.params.id,
    { status, user_id } = req.body;
  db.run(
    "UPDATE orders SET status=? WHERE id=?",
    [status || "pending", id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (user_id)
        logActivity(user_id, `تحديث حالة الطلب #${id} إلى ${status}`);
      res.json({ success: true });
    }
  );
});

/* ----------------- 📢 COMPLAINTS ----------------- */
app.post("/api/complaints", (req, res) => {
  const { user_id, message } = req.body;
  db.run(
    "INSERT INTO complaints(user_id,message) VALUES(?,?)",
    [user_id, message || ""],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      logActivity(user_id, "إرسال شكوى");
      res.json({ id: this.lastID });
    }
  );
});

app.get("/api/complaints", (req, res) =>
  db.all(
    "SELECT c.*, u.username FROM complaints c LEFT JOIN users u ON u.id=c.user_id ORDER BY c.created_at DESC",
    [],
    (e, rows) => res.json(rows)
  )
);

app.put("/api/complaints/:id", (req, res) => {
  const id = req.params.id,
    { status, user_id } = req.body;
  db.run(
    "UPDATE complaints SET status=? WHERE id=?",
    [status || "open", id],
    () => {
      if (user_id) logActivity(user_id, `تحديث شكوى #${id} إلى ${status}`);
      res.json({ success: true });
    }
  );
});

/* ----------------- ⚙️ SETTINGS ----------------- */
app.get("/api/settings", (req, res) =>
  db.get("SELECT * FROM settings LIMIT 1", [], (e, row) => res.json(row || {}))
);

app.post("/api/settings", (req, res) => {
  const { siteName, siteDesc } = req.body;
  db.run("DELETE FROM settings", [], () => {
    db.run(
      "INSERT INTO settings(siteName,siteDesc) VALUES(?,?)",
      [siteName || "", siteDesc || ""],
      function () {
        res.json({ success: true });
      }
    );
  });
});

<<<<<<< HEAD
/* ----------------- 🧾 INVOICE ----------------- */
app.get("/invoice/:orderId", (req, res) => {
  const orderId = req.params.orderId;
  db.get(
    "SELECT o.*, u.username, u.phone FROM orders o LEFT JOIN users u ON u.id=o.user_id WHERE o.id=?",
    [orderId],
    (e, order) => {
      if (!order) return res.status(404).send("Not found");
      db.all(
        "SELECT oi.*, p.name FROM order_items oi LEFT JOIN products p ON p.id=oi.product_id WHERE oi.order_id=?",
        [orderId],
        (er, items) => {
          const rows = items
            .map(
              (it) =>
                `<tr><td>${it.name || it.product_id}</td><td>${
                  it.quantity
                }</td><td>${it.price}</td><td>${(
                  it.quantity * it.price
                ).toFixed(2)}</td></tr>`
            )
            .join("");
          const html = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>فاتورة #${order.id}</title></head><body><h2>فاتورة الطلب #${
            order.id
          }</h2><p>العميل: ${order.username || order.user_id} - ${
            order.phone || ""
          }</p><table border="1" cellpadding="6"><thead><tr><th>المنتج</th><th>الكمية</th><th>السعر</th><th>المجموع</th></tr></thead><tbody>${rows}</tbody></table><h3>الإجمالي: ${
            order.total
          }</h3><p>العنوان: ${
            order.address || ""
          }</p><button onclick="window.print()">🖨️ طباعة</button></body></html>`;
          res.send(html);
        }
      );
    }
  );
});

/* ----------------- 🌐 SPA fallback ----------------- */
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
=======
// ======================
// الصفحات الثابتة
// ======================

// الرئيسية
app.get("/", (req,res)=> {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// الأدمن
app.get("/admin", (req,res)=> {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// الموظفين
app.get("/employee", (req,res)=> {
  res.sendFile(path.join(__dirname, "public", "employee.html"));
});

// العملاء
app.get("/customer", (req,res)=> {
  res.sendFile(path.join(__dirname, "public", "customer.html"));
});

// تسجيل الدخول
app.get("/login", (req,res)=> {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// إنشاء حساب
app.get("/register", (req,res)=> {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

// أي رابط مش معروف يرجع للـ index.html
app.get("*", (req,res)=> {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ======================
// تشغيل السيرفر
// ======================
app.listen(PORT, ()=> console.log("Server running on port", PORT));
>>>>>>> abf01532a76e93f91c31ee5dfde737c808a1a4a4
