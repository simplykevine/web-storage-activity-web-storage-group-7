// Security Utilities
function generateCSRFToken() {
    const token = Math.random().toString(36).substr(2);
    document.getElementById('csrfToken').value = token;
    sessionStorage.setItem('csrfToken', token);
    return token;
}

function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme;
    updateThemeButton(savedTheme);
}

function updateThemeButton(theme) {
    const themeBtn = document.getElementById('themeToggle');
    themeBtn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}

function toggleTheme() {
    const currentTheme = document.body.className;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
}

// Authentication
function checkAuth() {
    const authToken = getCookie('authToken');
    if (authToken) {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('userInfo').classList.remove('hidden');
        document.getElementById('username').textContent = 
            decodeURIComponent(getCookie('username'));
    }
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/; Secure; SameSite=Strict`;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
        if (cookieName === name) return cookieValue;
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Shopping Cart
function initializeCart() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    updateCartDisplay(cart);
}

function addToCart(product, price) {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.push({ product: sanitizeInput(product), price: parseFloat(price) });
    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay(cart);
}

function updateCartDisplay(cart) {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.product}</span>
            <span>$${item.price.toFixed(2)}</span>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    generateCSRFToken();
    initializeTheme();
    checkAuth();
    initializeCart();

    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Login form
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('usernameInput').value;
        const password = document.getElementById('passwordInput').value;
        const csrfToken = document.getElementById('csrfToken').value;

        if (csrfToken !== sessionStorage.getItem('csrfToken')) {
            alert('Invalid CSRF token');
            return;
        }

        // Simulate authentication (in real app, this would be a server request)
        setCookie('authToken', 'user123', 7);
        setCookie('username', encodeURIComponent(sanitizeInput(username)), 7);
        checkAuth();
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        deleteCookie('authToken');
        deleteCookie('username');
        sessionStorage.removeItem('cart');
        location.reload();
    });

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.dataset.product;
            const price = button.dataset.price;
            addToCart(product, price);
        });
    });
});