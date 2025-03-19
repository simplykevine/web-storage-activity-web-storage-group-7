const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let csrfTokens = {};

/**
 * Generate a CSRF token
 */
app.get("/csrf-token", (req, res) => {
    let token = Math.random().toString(36).substr(2);
    csrfTokens[token] = true;
    res.json({ csrfToken: token });
});

/**
 * Validate CSRF token on form submission
 */
app.post("/submit", (req, res) => {
    let { csrfToken } = req.body;
    if (!csrfTokens[csrfToken]) {
        return res.status(403).json({ error: "Invalid CSRF Token" });
    }
    delete csrfTokens[csrfToken];
    res.json({ success: "Request validated successfully!" });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
