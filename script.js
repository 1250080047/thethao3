// Global Variables
let cart = [];
let currentSlide = 0;
let isLoggedIn = false;
let currentUser = null;

// Sample Products Data
// SportWear Professional Product Database
const products = [
    {
        id: 1,
        name: "Áo thể thao Nike Dri-FIT",
        price: 890000,
        oldPrice: 1200000,
        category: "ao-the-thao",
        image: "https://via.placeholder.com/300x250/dc2626/white?text=Nike+Áo",
        description: "Áo thể thao cao cấp với công nghệ Dri-FIT thấm hút mồ hôi tốt",
        sizes: ["S", "M", "L", "XL"],
        badge: "Sale",
        featured: ["sale", "popular"]
    },
    {
        id: 2,
        name: "Quần short Adidas 3-Stripes",
        price: 650000,
        oldPrice: null,
        category: "quan-the-thao",
        image: "https://via.placeholder.com/300x250/000000/white?text=Adidas+Quần",
        description: "Quần short thể thao thoải mái với thiết kế 3 sọc iconic",
        sizes: ["S", "M", "L", "XL"],
        badge: "New",
        featured: ["new", "popular"]
    },
    {
        id: 3,
        name: "Giày chạy bộ Nike Air Zoom",
        price: 2500000,
        oldPrice: 2800000,
        category: "giay-the-thao",
        image: "https://via.placeholder.com/300x250/dc2626/white?text=Nike+Giày",
        description: "Giày chạy bộ với công nghệ Air Zoom cho bước chạy đàn hồi",
        sizes: ["39", "40", "41", "42", "43"],
        badge: "Hot",
        featured: ["sale", "new", "popular"]
    },
    {
        id: 4,
        name: "Balo thể thao Under Armour",
        price: 1200000,
        oldPrice: null,
        category: "phu-kien",
        image: "https://via.placeholder.com/300x250/374151/white?text=UA+Balo",
        description: "Balo thể thao đa năng với nhiều ngăn chứa tiện lợi",
        sizes: ["OneSize"],
        badge: null,
        featured: ["new"]
    },
    {
        id: 5,
        name: "Áo polo Puma Essential",
        price: 750000,
        oldPrice: 950000,
        category: "ao-the-thao",
        image: "https://via.placeholder.com/300x250/000000/white?text=Puma+Polo",
        description: "Áo polo thể thao phong cách casual cho mọi hoạt động",
        sizes: ["S", "M", "L", "XL"],
        badge: "Sale",
        featured: ["sale"]
    },
    {
        id: 6,
        name: "Quần legging Nike Pro",
        price: 980000,
        oldPrice: null,
        category: "quan-the-thao",
        image: "https://via.placeholder.com/300x250/dc2626/white?text=Nike+Legging",
        description: "Quần legging thể thao ôm sát với chất liệu co giãn 4 chiều",
        sizes: ["S", "M", "L", "XL"],
        badge: "New",
        featured: ["new", "popular"]
    },
    {
        id: 7,
        name: "Giày training Reebok CrossFit",
        price: 1800000,
        oldPrice: 2200000,
        category: "giay-the-thao",
        image: "https://via.placeholder.com/300x250/374151/white?text=Reebok+Training",
        description: "Giày training chuyên dụng cho các bài tập CrossFit",
        sizes: ["39", "40", "41", "42", "43"],
        badge: "Sale",
        featured: ["sale", "popular"]
    },
    {
        id: 8,
        name: "Mũ thể thao New Era",
        price: 450000,
        oldPrice: null,
        category: "phu-kien",
        image: "https://via.placeholder.com/300x250/000000/white?text=New+Era+Mũ",
        description: "Mũ lưỡi trai thể thao thời trang với logo thêu tinh tế",
        sizes: ["OneSize"],
        badge: null,
        featured: ["new"]
    },
     {
        id: 9,
                name: "Áo hoodie ",
                price: "1.650.000₫",
                image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=250&fit=crop",
                category: "ao-the-thao",
                type: "sale",
                originalPrice: "1.850.000₫",
                description: "Áo hoodie Nike với chất liệu cotton pha, mang lại cảm giác ấm áp và thoải mái."
            },
            {
                id: 10,
                name: "Quần legging ",
                price: "950.000₫",
                image: "https://images.unsplash.com/photo-1506629905607-5582e9e79ba6?w=300&h=250&fit=crop",
                category: "quan-the-thao",
                type: "new",
                description: "Quần legging Nike Pro với công nghệ co giãn 4 chiều và khả năng thấm hút mồ hôi."
            },
            {
                id: 11,
                name: "Giày chạy bộ ",
                price: "3.450.000₫",
                image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=250&fit=crop",
                category: "giay-the-thao",
                type: "popular",
                description: "Giày chạy bộ Adidas Ultraboost với công nghệ đệm Boost và upper Primeknit."
            },
            {
                id: 12,
                name: "Mũ thể thao New Era",
                price: "380.000₫",
                image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&h=250&fit=crop",
                category: "phu-kien",
                type: "new",
                description: "Mũ thể thao New Era với thiết kế classic và chất liệu bền bỉ."
            }
        
];

// Initialize Website
document.addEventListener('DOMContentLoaded', function () {
    initializeSlider();
    loadFeaturedProducts('all');
    updateCartCount();

    // Initialize login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Slider Functions
function initializeSlider() {
    setInterval(() => {
        changeSlide(1);
    }, 5000); // Auto slide every 5 seconds
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide].classList.remove('active');

    currentSlide += direction;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    slides[currentSlide].classList.add('active');
}

// Product Functions
function loadFeaturedProducts(filter) {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;

    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="showFeatured('${filter}')"]`).classList.add('active');

    let filteredProducts = products;

    if (filter !== 'all') {
        filteredProducts = products.filter(product =>
            product.featured.includes(filter)
        );
    }

    productGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    const badgeHtml = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
    const oldPriceHtml = product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : '';

    return `
        <div class="product-card">
            <div class="product-image">
                ${badgeHtml}
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display:none; font-size: 60px; color: #ccc;"><i class="fas fa-image"></i></div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${oldPriceHtml}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Thêm vào giỏ
                    </button>
                    <button class="quick-view" onclick="showProductDetail(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function showFeatured(filter) {
    loadFeaturedProducts(filter);
}

function filterByCategory(category) {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;

    const filteredProducts = products.filter(product =>
        product.category === category
    );

    // Update section title
    const sectionTitle = document.querySelector('.featured-products .section-title');
    const categoryNames = {
        'ao-the-thao': 'Áo thể thao',
        'quan-the-thao': 'Quần thể thao',
        'giay-the-thao': 'Giày thể thao',
        'phu-kien': 'Phụ kiện'
    };
    sectionTitle.textContent = categoryNames[category] || 'Sản phẩm';

    // Clear filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    productGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');

    // Scroll to products section
    document.querySelector('.featured-products').scrollIntoView({ behavior: 'smooth' });
}

// Search Function
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
        loadFeaturedProducts('all');
        return;
    }

    const searchResults = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.includes(query)
    );

    const productGrid = document.getElementById('productGrid');
    if (searchResults.length === 0) {
        productGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
                <h3>Không tìm thấy sản phẩm</h3>
                <p>Thử tìm kiếm với từ khóa khác</p>
            </div>
        `;
    } else {
        productGrid.innerHTML = searchResults.map(product => createProductCard(product)).join('');
    }

    // Update section title
    const sectionTitle = document.querySelector('.featured-products .section-title');
    sectionTitle.textContent = `Kết quả tìm kiếm: "${query}"`;

    // Scroll to results
    document.querySelector('.featured-products').scrollIntoView({ behavior: 'smooth' });
}

// Add Enter key support for search
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
});

// Cart Functions
function addToCart(productId, selectedSize = null) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Check if size selection is required
    if (product.sizes.length > 1 && !selectedSize) {
        showProductDetail(productId);
        return;
    }

    const size = selectedSize || product.sizes[0];

    // Check if item already exists in cart
    const existingItem = cart.find(item =>
        item.product.id === productId && item.size === size
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            product: product,
            size: size,
            quantity: 1
        });
    }

    updateCartCount();
    updateCartItems();
    showMessage('Đã thêm sản phẩm vào giỏ hàng!', 'success');
}

function removeFromCart(productId, size) {
    cart = cart.filter(item =>
        !(item.product.id === productId && item.size === size)
    );
    updateCartCount();
    updateCartItems();
}

function updateCartQuantity(productId, size, change) {
    const item = cart.find(item =>
        item.product.id === productId && item.size === size
    );

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId, size);
        } else {
            updateCartCount();
            updateCartItems();
        }
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function updateCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartItems || !cartTotal) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 40px 0; color: #666;">
                <i class="fas fa-shopping-cart" style="font-size: 48px; margin-bottom: 20px;"></i>
                <p>Giỏ hàng trống</p>
            </div>
        `;
        cartTotal.textContent = '0đ';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.product.image}" alt="${item.product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display:none;"><i class="fas fa-image"></i></div>
            </div>
            <div class="cart-item-info">
                <h4>${item.product.name}</h4>
                <p>Size: ${item.size}</p>
                <div class="cart-item-price">${formatPrice(item.product.price)}</div>
                <div class="cart-item-actions">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.product.id}, '${item.size}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.product.id}, '${item.size}', 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.product.id}, '${item.size}')">Xóa</button>
                </div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(total);
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('active');
        updateCartItems();
    }
}

function checkout() {
    if (cart.length === 0) {
        showMessage('Giỏ hàng trống!', 'error');
        return;
    }

    if (!isLoggedIn) {
        showLoginModal();
        showMessage('Vui lòng đăng nhập để thanh toán!', 'error');
        return;
    }

    // Simulate checkout process
    showMessage('Đang xử lý thanh toán...', 'success');

    setTimeout(() => {
        cart = [];
        updateCartCount();
        updateCartItems();
        toggleCart();
        showMessage('Đặt hàng thành công! Cảm ơn bạn đã mua hàng.', 'success');
    }, 2000);
}

// Modal Functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function showLoginModal() {
    showModal('loginModal');
}

function showRegisterModal() {
    closeModal('loginModal');
    // Create register modal if needed
    showMessage('Chức năng đăng ký sẽ được cập nhật sớm!', 'info');
}

// Product Detail Modal
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modalTitle = document.getElementById('productModalTitle');
    const modalBody = document.getElementById('productModalBody');

    modalTitle.textContent = product.name;

    const oldPriceHtml = product.oldPrice ?
        `<span style="text-decoration: line-through; color: #999; margin-left: 10px;">${formatPrice(product.oldPrice)}</span>` : '';

    modalBody.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display:none; font-size: 60px; color: #ccc;"><i class="fas fa-image"></i></div>
            </div>
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <div class="product-detail-price">
                    ${formatPrice(product.price)}
                    ${oldPriceHtml}
                </div>
                <div class="product-detail-description">
                    ${product.description}
                </div>
                ${product.sizes.length > 1 ? `
                    <div class="size-options">
                        <h4>Chọn kích cỡ:</h4>
                        <div class="size-grid">
                            ${product.sizes.map(size => `
                                <button class="size-option" onclick="selectSize(this, '${size}')">${size}</button>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                <button class="add-to-cart" onclick="addToCartFromModal(${product.id})" style="width: 100%; margin-top: 20px;">
                    <i class="fas fa-shopping-cart"></i> Thêm vào giỏ hàng
                </button>
            </div>
        </div>
    `;

    showModal('productModal');
}

function selectSize(button, size) {
    // Remove previous selection
    document.querySelectorAll('.size-option').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Add selection to clicked button
    button.classList.add('selected');
    button.dataset.selectedSize = size;
}

function addToCartFromModal(productId) {
    const selectedSizeButton = document.querySelector('.size-option.selected');
    const product = products.find(p => p.id === productId);

    let selectedSize = null;
    if (product.sizes.length > 1) {
        if (!selectedSizeButton) {
            showMessage('Vui lòng chọn kích cỡ!', 'error');
            return;
        }
        selectedSize = selectedSizeButton.dataset.selectedSize;
    }

    addToCart(productId, selectedSize);
    closeModal('productModal');
}

// Authentication
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simulate login process
    if (email && password) {
        // Simple validation for demo
        if (email.includes('@') && password.length >= 6) {
            isLoggedIn = true;
            currentUser = {
                email: email,
                name: email.split('@')[0]
            };

            // Update UI
            const authBtn = document.querySelector('.auth-btn');
            authBtn.innerHTML = `<i class="fas fa-user"></i> ${currentUser.name}`;
            authBtn.onclick = logout;

            closeModal('loginModal');
            showMessage('Đăng nhập thành công!', 'success');
        } else {
            showMessage('Email hoặc mật khẩu không hợp lệ!', 'error');
        }
    }
}

function logout() {
    isLoggedIn = false;
    currentUser = null;

    // Update UI
    const authBtn = document.querySelector('.auth-btn');
    authBtn.innerHTML = '<i class="fas fa-user"></i> Đăng nhập';
    authBtn.onclick = showLoginModal;

    showMessage('Đã đăng xuất!', 'success');
}

// Utility Functions
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    // Insert at top of page
    document.body.insertBefore(messageDiv, document.body.firstChild);

    // Auto remove after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Close modals when clicking outside
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Close cart when clicking outside
document.addEventListener('click', function (e) {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartBtn = document.querySelector('.cart-btn');

    if (cartSidebar && cartSidebar.classList.contains('active')) {
        if (!cartSidebar.contains(e.target) && !cartBtn.contains(e.target)) {
            cartSidebar.classList.remove('active');
        }
    }
});

// Mobile Menu Toggle (for responsive design)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-active');
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Newsletter subscription
function subscribeNewsletter() {
    const emailInput = document.querySelector('.newsletter-form input');
    const email = emailInput.value.trim();

    if (!email) {
        showMessage('Vui lòng nhập email!', 'error');
        return;
    }

    if (!email.includes('@')) {
        showMessage('Email không hợp lệ!', 'error');
        return;
    }

    // Simulate subscription
    emailInput.value = '';
    showMessage('Đăng ký thành công! Cảm ơn bạn đã đăng ký nhận tin.', 'success');
}

// Add newsletter form submission
document.addEventListener('DOMContentLoaded', function () {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const button = newsletterForm.querySelector('button');
        button.addEventListener('click', subscribeNewsletter);

        const input = newsletterForm.querySelector('input');
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                subscribeNewsletter();
            }
        });
    }
});
// SportWear Product Database - Optimized for SEO
// Cấu trúc sản phẩm tối ưu cho website thương mại điện tử

const productCategories = {
    'ao-the-thao': {
        name: 'Áo thể thao',
        slug: 'ao-the-thao',
        description: 'Bộ sưu tập áo thể thao chính hãng cho nam và nữ',
        seoTitle: 'Áo Thể Thao Chính Hãng - Nike, Adidas, Puma | SportWear',
        metaDescription: 'Mua áo thể thao chính hãng giá tốt. Áo training, áo polo, tank top từ Nike, Adidas, Puma. Freeship toàn quốc. Bảo hành chính hãng.',
        keywords: ['áo thể thao', 'áo training', 'áo polo sport', 'áo tank top', 'sportswear']
    },
    'quan-the-thao': {
        name: 'Quần thể thao',
        slug: 'quan-the-thao',
        description: 'Quần thể thao nam nữ đa dạng kiểu dáng và chất liệu',
        seoTitle: 'Quần Thể Thao Nam Nữ Chính Hãng - Giá Tốt | SportWear',
        metaDescription: 'Shop quần thể thao chính hãng: quần short, quần dài, legging. Chất liệu cao cấp, thoáng mát. Giao hàng nhanh toàn quốc.',
        keywords: ['quần thể thao', 'quần short', 'quần legging', 'quần jogger', 'quần training']
    },
    'giay-the-thao': {
        name: 'Giày thể thao',
        slug: 'giay-the-thao',
        description: 'Giày thể thao chính hãng cho mọi hoạt động vận động',
        seoTitle: 'Giày Thể Thao Chính Hãng - Nike, Adidas, Puma | SportWear',
        metaDescription: 'Giày thể thao nam nữ chính hãng giá rẻ. Giày chạy bộ, giày training, giày lifestyle. Bảo hành 1 năm. Freeship từ 500k.',
        keywords: ['giày thể thao', 'giày chạy bộ', 'giày training', 'giày lifestyle', 'sneakers']
    },
    'phu-kien': {
        name: 'Phụ kiện thể thao',
        slug: 'phu-kien-the-thao',
        description: 'Phụ kiện thể thao thiết yếu cho người yêu vận động',
        seoTitle: 'Phụ Kiện Thể Thao - Balo, Mũ, Găng Tay | SportWear',
        metaDescription: 'Phụ kiện thể thao chính hãng: balo, mũ, găng tay, khăn, túi đựng giày. Chất lượng cao, giá ưu đãi. Giao hàng toàn quốc.',
        keywords: ['phụ kiện thể thao', 'balo thể thao', 'mũ thể thao', 'găng tay', 'khăn thể thao']
    }
};

// Sản phẩm mẫu với thông tin SEO tối ưu
const sportsProducts = [
    {
        id: 'sp001',
        name: 'Áo Thể Thao Nike Dri-FIT Training',
        slug: 'ao-the-thao-nike-dri-fit-training',
        category: 'ao-the-thao',
        brand: 'Nike',
        price: 890000,
        originalPrice: 1200000,
        discount: 26,
        inStock: true,
        stockQuantity: 50,
        images: {
            main: 'products/ao-the-thao/nike-dri-fit-training-main.jpg',
            gallery: [
                'products/ao-the-thao/nike-dri-fit-training-1.jpg',
                'products/ao-the-thao/nike-dri-fit-training-2.jpg',
                'products/ao-the-thao/nike-dri-fit-training-3.jpg'
            ]
        },
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Đen', 'Trắng', 'Xám', 'Navy'],
        description: 'Áo thể thao Nike Dri-FIT Training với công nghệ thấm hút mồ hôi vượt trội, thiết kế thoáng mát và co giãn 4 chiều cho mọi hoạt động thể thao.',
        fullDescription: `
            <h3>Đặc điểm nổi bật:</h3>
            <ul>
                <li>Công nghệ Dri-FIT thấm hút và bay hơi mồ hôi nhanh</li>
                <li>Chất liệu polyester cao cấp, co giãn 4 chiều</li>
                <li>Thiết kế ergonomic ôm sát cơ thể</li>
                <li>Đường may phẳng giảm ma sát</li>
                <li>Logo Nike thêu chính hãng</li>
            </ul>
            <h3>Hướng dẫn sử dụng:</h3>
            <p>Phù hợp cho tập gym, chạy bộ, yoga, các môn thể thao trong nhà và ngoài trời.</p>
            <h3>Bảo quản:</h3>
            <p>Giặt máy ở nhiệt độ thường, không dùng chất tẩy, phơi nơi thoáng mát.</p>
        `,
        specifications: {
            material: '100% Polyester',
            technology: 'Nike Dri-FIT',
            fit: 'Slim Fit',
            origin: 'Vietnam',
            warranty: '6 tháng'
        },
        seo: {
            title: 'Áo Thể Thao Nike Dri-FIT Training Chính Hãng - Thấm Hút Mồ Hôi',
            metaDescription: 'Áo thể thao Nike Dri-FIT Training chính hãng, công nghệ thấm hút mồ hôi vượt trội. Giá ưu đãi 890.000đ. Freeship toàn quốc.',
            keywords: ['áo nike dri-fit', 'áo training nike', 'áo thể thao nam', 'nike chính hãng'],
            altText: 'Áo thể thao Nike Dri-FIT Training màu đen cho nam'
        },
        badges: ['Sale', 'Bestseller'],
        rating: 4.8,
        reviewCount: 156,
        featured: ['sale', 'popular']
    },
    {
        id: 'sp002',
        name: 'Quần Short Adidas 3-Stripes Essential',
        slug: 'quan-short-adidas-3-stripes-essential',
        category: 'quan-the-thao',
        brand: 'Adidas',
        price: 650000,
        originalPrice: null,
        discount: 0,
        inStock: true,
        stockQuantity: 75,
        images: {
            main: 'products/quan-the-thao/adidas-3-stripes-short-main.jpg',
            gallery: [
                'products/quan-the-thao/adidas-3-stripes-short-1.jpg',
                'products/quan-the-thao/adidas-3-stripes-short-2.jpg'
            ]
        },
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Đen', 'Navy', 'Xám'],
        description: 'Quần short thể thao Adidas 3-Stripes với thiết kế iconic, chất liệu thoáng mát và thoải mái cho mọi hoạt động.',
        fullDescription: `
            <h3>Đặc điểm nổi bật:</h3>
            <ul>
                <li>Thiết kế 3 sọc Adidas iconic</li>
                <li>Chất liệu cotton pha co giãn thoải mái</li>
                <li>Dây rút điều chỉnh eo tiện lợi</li>
                <li>Túi bên và túi sau zip bảo mật</li>
                <li>Chiều dài 7 inch phù hợp đa dạng vóc dáng</li>
            </ul>
        `,
        specifications: {
            material: '70% Cotton, 30% Polyester',
            length: '7 inch',
            fit: 'Regular Fit',
            origin: 'Vietnam',
            warranty: '6 tháng'
        },
        seo: {
            title: 'Quần Short Adidas 3-Stripes Essential Nam - Thoải Mái Vận Động',
            metaDescription: 'Quần short Adidas 3-Stripes chính hãng, thiết kế iconic, chất liệu thoáng mát. Giá tốt 650.000đ. Giao hàng nhanh.',
            keywords: ['quần short adidas', 'adidas 3-stripes', 'quần thể thao nam', 'adidas chính hãng'],
            altText: 'Quần short Adidas 3-Stripes Essential màu đen'
        },
        badges: ['New'],
        rating: 4.6,
        reviewCount: 89,
        featured: ['new', 'popular']
    },
    {
        id: 'sp003',
        name: 'Giày Chạy Bộ Nike Air Zoom Pegasus',
        slug: 'giay-chay-bo-nike-air-zoom-pegasus',
        category: 'giay-the-thao',
        brand: 'Nike',
        price: 2500000,
        originalPrice: 2800000,
        discount: 11,
        inStock: true,
        stockQuantity: 30,
        images: {
            main: 'products/giay-the-thao/nike-air-zoom-pegasus-main.jpg',
            gallery: [
                'products/giay-the-thao/nike-air-zoom-pegasus-1.jpg',
                'products/giay-the-thao/nike-air-zoom-pegasus-2.jpg',
                'products/giay-the-thao/nike-air-zoom-pegasus-3.jpg',
                'products/giay-the-thao/nike-air-zoom-pegasus-4.jpg'
            ]
        },
        sizes: ['38', '39', '40', '41', '42', '43', '44'],
        colors: ['Đen/Trắng', 'Navy/Cam', 'Xám/Xanh'],
        description: 'Giày chạy bộ Nike Air Zoom Pegasus với công nghệ Air Zoom đệm khí, mang lại cảm giác đàn hồi và thoải mái tối đa.',
        fullDescription: `
            <h3>Công nghệ tiên tiến:</h3>
            <ul>
                <li>Đơn vị Air Zoom ở mu bàn chân tăng tính đàn hồi</li>
                <li>Đế giữa React foam êm ái và bền bỉ</li>
                <li>Upper Engineered mesh thoáng khí</li>
                <li>Đế ngoài cao su với rãnh flex tăng độ bám</li>
                <li>Heel clip ổn định gót chân</li>
            </ul>
            <h3>Phù hợp:</h3>
            <p>Chạy đường trường, chạy treadmill, tập gym, đi bộ hàng ngày.</p>
        `,
        specifications: {
            technology: 'Nike Air Zoom, React Foam',
            upper: 'Engineered Mesh',
            outsole: 'Rubber with flex grooves',
            drop: '10mm',
            weight: '285g (size 42)',
            origin: 'Vietnam',
            warranty: '1 năm'
        },
        seo: {
            title: 'Giày Chạy Bộ Nike Air Zoom Pegasus - Công Nghệ Air Zoom Đàn Hồi',
            metaDescription: 'Giày chạy bộ Nike Air Zoom Pegasus chính hãng với công nghệ Air Zoom. Giá ưu đãi 2.500.000đ. Bảo hành 1 năm.',
            keywords: ['giày nike pegasus', 'giày chạy bộ nike', 'nike air zoom', 'giày running'],
            altText: 'Giày chạy bộ Nike Air Zoom Pegasus màu đen trắng'
        },
        badges: ['Hot', 'Premium'],
        rating: 4.9,
        reviewCount: 234,
        featured: ['sale', 'popular', 'premium']
    },
    {
        id: 'sp004',
        name: 'Balo Thể Thao Under Armour Hustle 5.0',
        slug: 'balo-the-thao-under-armour-hustle-5-0',
        category: 'phu-kien',
        brand: 'Under Armour',
        price: 1200000,
        originalPrice: null,
        discount: 0,
        inStock: true,
        stockQuantity: 40,
        images: {
            main: 'products/phu-kien/under-armour-hustle-balo-main.jpg',
            gallery: [
                'products/phu-kien/under-armour-hustle-balo-1.jpg',
                'products/phu-kien/under-armour-hustle-balo-2.jpg'
            ]
        },
        sizes: ['One Size'],
        colors: ['Đen', 'Navy', 'Xám'],
        description: 'Balo thể thao Under Armour Hustle 5.0 với dung tích 30L, thiết kế đa năng cho gym và du lịch.',
        fullDescription: `
            <h3>Tính năng nổi bật:</h3>
            <ul>
                <li>Dung tích 30L phù hợp đa mục đích</li>
                <li>Ngăn laptop riêng biệt đến 15.6 inch</li>
                <li>Ngăn giày/đồ ướt với lớp lót chống thấm</li>
                <li>Túi nước bên hông tiện lợi</li>
                <li>Quai đeo vai và lưng có đệm êm ái</li>
                <li>Chất liệu Storm chống nước nhẹ</li>
            </ul>
        `,
        specifications: {
            capacity: '30L',
            dimensions: '50cm x 32cm x 20cm',
            weight: '680g',
            material: 'Polyester với công nghệ Storm',
            compartments: '3 ngăn chính + 5 túi phụ',
            warranty: '1 năm'
        },
        seo: {
            title: 'Balo Thể Thao Under Armour Hustle 5.0 - Đa Năng 30L',
            metaDescription: 'Balo Under Armour Hustle 5.0 chính hãng, dung tích 30L, ngăn laptop, chống nước. Giá tốt 1.200.000đ.',
            keywords: ['balo under armour', 'balo thể thao', 'balo gym', 'under armour hustle'],
            altText: 'Balo thể thao Under Armour Hustle 5.0 màu đen'
        },
        badges: ['Functional'],
        rating: 4.7,
        reviewCount: 67,
        featured: ['new', 'functional']
    }
];

// Hàm tối ưu hóa tên file ảnh cho SEO
function optimizeImageFileName(productName, category, index = 0) {
    const cleanName = productName
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Xóa ký tự đặc biệt
        .replace(/\s+/g, '-')     // Thay space bằng dấu gạch
        .replace(/-+/g, '-')      // Xóa dấu gạch trùng lặp
        .trim();

    const suffix = index === 0 ? 'main' : index;
    return `${category}/${cleanName}-${suffix}.jpg`;
}

// Hàm tạo alt text tối ưu SEO
function generateAltText(product, imageIndex = 0) {
    const viewTypes = ['chính diện', 'góc nghiêng', 'chi tiết', 'mặt sau', 'phối màu'];
    const viewType = imageIndex < viewTypes.length ? viewTypes[imageIndex] : 'chi tiết';

    return `${product.name} ${product.colors[0]} - Ảnh ${viewType} chính hãng SportWear`;
}

// Hàm resize ảnh và tối ưu dung lượng (mô phỏng)
function optimizeImageSpecs() {
    return {
        thumbnail: { width: 300, height: 300, quality: 80, maxSize: '50KB' },
        medium: { width: 600, height: 600, quality: 85, maxSize: '150KB' },
        large: { width: 1200, height: 1200, quality: 90, maxSize: '300KB' },
        zoom: { width: 2000, height: 2000, quality: 95, maxSize: '500KB' }
    };
}

// Export cho sử dụng trong website
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        productCategories,
        sportsProducts,
        optimizeImageFileName,
        generateAltText,
        optimizeImageSpecs
    };
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; margin-top: 50px;">Giỏ hàng trống</p>';
        document.getElementById('cartTotal').textContent = '0₫';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price} x ${item.quantity}</div>
            </div>
            <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: #dc2626; cursor: pointer;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');

    // Calculate total (simplified - just count items)
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartTotal').textContent = `${totalItems} sản phẩm`;
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    updateCartCount();
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) {
        alert('Giỏ hàng trống!');
        return;
    }
    alert('Chức năng thanh toán đang được phát triển!');
}

// Modal functions
function showLoginModal() {
    document.getElementById('loginModal').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Search function
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (!searchTerm) return;

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );

    showSection('products');
    setTimeout(() => {
        const grid = document.getElementById('allProductsGrid');
        grid.innerHTML = filteredProducts.map(createProductCard).join('');
    }, 100);
}

// Newsletter subscription
function subscribeNewsletter() {
    const email = document.querySelector('.newsletter-form input').value;
    if (email) {
        alert('Cảm ơn bạn đã đăng ký nhận tin!');
        document.querySelector('.newsletter-form input').value = '';
    }
}

// Contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
    this.reset();
});

// Login form
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Đăng nhập thành công!');
    closeModal('loginModal');
});

// Blog detail function
function showBlogDetail(blogId) {
    alert('Chức năng xem chi tiết blog đang được phát triển!');
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    showFeatured('all');
    
    // Add click listeners for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    // Handle search on Enter key
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });

    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
});

// Cấu trúc thư mục lưu trữ ảnh được đề xuất:
/*
assets/
├── products/
│   ├── ao-the-thao/
│   │   ├── nike-dri-fit-training-main.jpg
│   │   ├── nike-dri-fit-training-1.jpg
│   │   └── ...
│   ├── quan-the-thao/
│   ├── giay-the-thao/
│   └── phu-kien/
├── categories/
│   ├── ao-the-thao-banner.jpg
│   └── ...
└── brand-logos/
    ├── nike-logo.png
    └── ...
*/