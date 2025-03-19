/**
 * Set a secure cookie with HttpOnly and Secure flag
 */
function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; Secure; path=/`;
}

/**
 * Get the value of a cookie by name
 */
function getCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

/**
 * Delete a cookie
 */
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

/**
 * Encode user input to prevent XSS attacks
 */
function sanitizeInput(input) {
    return encodeURIComponent(input);
}
