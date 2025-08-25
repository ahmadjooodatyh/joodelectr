async function loginAdmin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("api_token", data.token);
      if (data.user.role === "admin") {
        window.location.href = "admin.html";
      } else if (data.user.role === "employee") {
        window.location.href = "employee.html";
      } else {
        window.location.href = "index.html";
      }
    } else {
      alert("❌ فشل تسجيل الدخول: " + (data.error || "بيانات غير صحيحة"));
    }
  } catch (err) {
    console.error("خطأ:", err);
    alert("⚠️ تعذر الاتصال بالسيرفر");
  }
}