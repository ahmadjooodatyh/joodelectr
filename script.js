// بيانات المنتجات
const products = [
    {
        id: 1,
        name: "هاتف Samsung Galaxy S23 Ultra",
        category: "mobiles",
        price: 899,
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "أحدث هاتف من سامسونج بشاشة ديناميكية AMOLED مقاس 6.8 بوصة، معالج Snapdragon 8 Gen 2، وكاميرا 200 ميجابكسل.",
        badge: "جديد"
    },
    {
        id: 2,
        name: "لابتوب Dell XPS 13",
        category: "laptops",
        price: 1299,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "لابتوب فائق الأداء بشاشة InfinityEdge مقاس 13.4 بوصة، معالج Intel Core i7، ذاكرة 16GB، ومساحة تخزين 512GB SSD.",
        badge: "الأكثر مبيعاً"
    },
    {
        id: 3,
        name: "سماعات Sony WH-1000XM5",
        category: "audio",
        price: 349,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "سماعات رأس لاسلكية مع إلغاء الضوضاء النشط، مدة بطارية تصل إلى 30 ساعة، وميكروفون مدمج للمكالمات.",
        badge: "عرض خاص"
    },
    {
        id: 4,
        name: "كاميرا Canon EOS R6",
        category: "cameras",
        price: 2499,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "كاميرا ميرورلس احترافية بدقة 20.1 ميجابكسل، تسجيل فيديو 4K، نظام تثبيت الصورة، واي فاي وبلوتوث.",
        badge: ""
    },
    {
        id: 5,
        name: "تلفزيون Samsung QLED 4K",
        category: "tv",
        price: 1599,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "تلفزيون ذكي مقاس 65 بوصة بدقة 4K UHD، تقنية QLED، معالج Quantum 4K، وتطبيقات ذكية مدمجة.",
        badge: "جديد"
    },
    {
        id: 6,
        name: "ساعة Apple Watch Series 8",
        category: "mobiles",
        price: 499,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "ساعة ذكية بميزات صحية متقدمة، مقاومة للماء، شاشة Always-On Retina، وتتبع النشاط البدني.",
        badge: "عرض خاص"
    },
    {
        id: 7,
        name: "ماك بوك برو M2",
        category: "laptops",
        price: 1999,
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "لابتوب Apple MacBook Pro بشاشة 14 بوصة، معالج M2 Pro، ذاكرة 16GB، ومساحة تخزين 1TB SSD.",
        badge: "جديد"
    },
    {
        id: 8,
        name: "جهاز PlayStation 5",
        category: "tv",
        price: 699,
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "جهاز ألعاب الجيل التالي من سوني، مع وحدة تحكم DualSense، وقرص SSD سريع، ودعم 4K.",
        badge: "نفذت الكمية"
    }
];

// بيانات العروض
const offers = [
    {
        title: "خصم 20% على جميع اللابتوبات",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "احصل على خصم 20% على جميع أنواع اللابتوبات حتى نهاية الشهر. يشمل العروض أجهزة Dell وHP وLenovo وApple."
    },
    {
        title: "شحن مجاني للطلبات فوق 200 دينار",
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "احصل على شحن مجاني لجميع الطلبات التي تزيد عن 200 دينار أردني لجميع أنحاء المملكة."
    },
    {
        title: "هاتف Samsung Galaxy هدية",
        image: "https://images.unsplash.com/photo-1605787020600-b9ebd5df1d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "احصل على هاتف Samsung Galaxy A14 مجاناً عند شراء أي تلفزيون 4K من متجرنا."
    }
];

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initLoginSwipe();
    renderProducts();
    renderOffers();
    initCategoryButtons();
});

// تهيئة وظيفة السحب للدخول
function initLoginSwipe() {
    const swipeHandle = document.getElementById('swipeHandle');
    const swipeContainer = document.getElementById('swipeContainer');
    const swipeTrack = document.getElementById('swipeTrack');
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let maxTranslate = swipeContainer.offsetWidth - swipeHandle.offsetWidth;
    
    swipeHandle.addEventListener('touchstart', startDrag);
    swipeHandle.addEventListener('touchmove', drag);
    swipeHandle.addEventListener('touchend', endDrag);
    swipeHandle.addEventListener('mousedown', startDrag);
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    
    function startDrag(e) {
        isDragging = true;
        startPosition = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        swipeHandle.style.transition = 'none';
        swipeContainer.style.cursor = 'grabbing';
    }
    
    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        const currentPosition = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const diff = startPosition - currentPosition;
        if (diff < 0) return;
        currentTranslate = Math.min(diff, maxTranslate);
        swipeHandle.style.transform = `translateX(-${currentTranslate}px)`;
        
        if (currentTranslate >= maxTranslate * 0.7) {
            swipeHandle.classList.add('swipe-success');
            swipeHandle.innerHTML = '<i class="fas fa-check"></i>';
            swipeTrack.textContent = "حرر للإكمال";
            swipeTrack.style.color = "var(--success)";
        } else {
            swipeHandle.classList.remove('swipe-success');
            swipeHandle.innerHTML = '<i class="fas fa-chevron-left"></i>';
            swipeTrack.textContent = "اسحب للدخول كضيف ←";
            swipeTrack.style.color = "var(--muted)";
        }
    }
    
    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        swipeHandle.style.transition = 'transform 0.3s ease';
        swipeContainer.style.cursor = 'default';
        
        if (currentTranslate >= maxTranslate * 0.7) {
            swipeHandle.style.transform = `translateX(-${maxTranslate}px)`;
            swipeHandle.classList.add('swipe-success');
            swipeTrack.textContent = "تم الدخول بنجاح!";
            swipeTrack.style.color = "var(--success)";
            setTimeout(() => {
                loginAsGuest();
            }, 800);
        } else {
            swipeHandle.style.transform = 'translateX(0)';
            swipeHandle.classList.remove('swipe-success');
            swipeHandle.innerHTML = '<i class="fas fa-chevron-left"></i>';
            swipeTrack.textContent = "اسحب للدخول كضيف ←";
            swipeTrack.style.color = "var(--muted)";
        }
    }
    
    document.addEventListener('touchmove', function(e) {
        if (isDragging) e.preventDefault();
    }, { passive: false });
}

// عرض المنتجات
function renderProducts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${product.price} د.أ</div>
                <div class="product-actions">
                    <button class="btn primary" onclick="addToCart(${product.id})"><i class="fas fa-shopping-cart"></i> إضافة إلى السلة</button>
                    <button class="btn ghost"><i class="far fa-heart"></i></button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// عرض العروض
function renderOffers() {
    const container = document.querySelector('.offers-container');
    container.innerHTML = '';
    offers.forEach(offer => {
        const offerCard = document.createElement('div');
        offerCard.className = 'offer-card';
        offerCard.innerHTML = `
            <div class="offer-image">
                <img src="${offer.image}" alt="${offer.title}">
            </div>
            <div class="offer-content">
                <h3 class="offer-title">${offer.title}</h3>
                <p class="offer-description">${offer.description}</p>
                <button class="btn primary">استخدم العرض</button>
            </div>
        `;
        container.appendChild(offerCard);
    });
}

// تهيئة أزرار الفئات
function initCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// تصفية المنتجات حسب الفئة
function filterProducts(category) {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    if (filteredProducts.length === 0) {
        container.innerHTML = '<div class="no-products">لا توجد منتجات في هذه الفئة</div>';
        return;
    }
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${product.price} د.أ</div>
                <div class="product-actions">
                    <button class="btn primary" onclick="addToCart(${product.id})"><i class="fas fa-shopping-cart"></i> إضافة إلى السلة</button>
                    <button class="btn ghost"><i class="far fa-heart"></i></button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// الحصول على اسم الفئة
function getCategoryName(category) {
    const categories = {
        'mobiles': 'هواتف ذكية',
        'laptops': 'لابتوبات',
        'tv': 'تلفزيونات',
        'audio': 'سماعات',
        'cameras': 'كاميرات'
    };
    return categories[category] || category;
}

// إضافة منتج إلى السلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const cartCount = document.querySelector('.cart-count');
    let count = parseInt(cartCount.textContent);
    cartCount.textContent = count + 1;
    showNotification(`تم إضافة ${product.name} إلى سلة التسوق`);
}

// عرض إشعار
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--success)';
    notification.style.color = 'white';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = 'var(--radius)';
    notification.style.boxShadow = 'var(--shadow)';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// وظائف الدخول
function loginAsEmployee() {
    showNotification('جاري تحويلك إلى صفحة دخول الموظفين...');
    setTimeout(() => {
        hideLoginPortal();
        document.getElementById('adminBtn').style.display = 'inline-flex';
        showAdminPanel();
    }, 1000);
}

function loginAsMember() {
    showNotification('جاري تحويلك إلى صفحة دخول الأعضاء...');
    setTimeout(() => {
        hideLoginPortal();
        showUserPanel();
    }, 1000);
}

function loginAsGuest() {
    showNotification('جاري الدخول كضيف...');
    setTimeout(() => {
        hideLoginPortal();
    }, 1200);
}

function hideLoginPortal() {
    document.getElementById('login-portal').style.display = 'none';
    document.querySelector('.main-content').style.display = 'block';
}

// وظائف التمرير
function scrollToProducts() {
    document.querySelector('.section-title').scrollIntoView({ behavior: 'smooth' });
}

function scrollToOffers() {
    document.querySelector('.offers-section').scrollIntoView({ behavior: 'smooth' });
}

// وظائف لوحة التحكم
function showAdminPanel() {
    document.getElementById('adminPanel').style.display = 'block';
}

function hideAdminPanel() {
    document.getElementById('adminPanel').style.display = 'none';
}

function showUserPanel() {
    showNotification('جاري فتح لوحة تحكم المستخدم...');
}

// تبديل المظهر
function toggleTheme() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    showNotification(isDark ? 'تم تفعيل الوضع النهاري' : 'تم تفعيل الوضع الليلي');
}