// Load saved theme and user session on page load
window.onload = function () {
    loadTheme();
    checkAuth();
    displayCart();
};

/**
 * Handles user login using cookies
 */
function login() {
    let username = sanitizeInput(document.getElementById("username").value);
    if (username) {
        setCookie("authToken", "user123", 7);
        document.getElementById("auth-section").style.display = "none";
        document.getElementById("logout-btn").classList.remove("hidden");
    }
}

/**
 * Logs out user by clearing the authentication cookie
 */
function logout() {
    deleteCookie("authToken");
    location.reload();
}

/**
 * Toggles dark/light mode and saves preference in Local Storage
 */
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    let theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", theme);
}

/**
 * Load saved theme on page load
 */
function loadTheme() {
    let savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
}

/**
 * Adds an item to the cart using Session Storage
 */
function addToCart(product, quantity) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart.push({ product, quantity });
    sessionStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

/**
 * Displays the shopping cart items
 */
function displayCart() {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    let cartDisplay = document.getElementById("cart-items");
    cartDisplay.innerHTML = "";
    cart.forEach(item => {
        cartDisplay.innerHTML += `<p>${item.product} (x${item.quantity})</p>`;
    });
}
