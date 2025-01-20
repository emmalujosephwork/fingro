const path = require('path');

// Home Page
exports.homePage = (req, res) => {
    res.sendFile('index.html', { root: './views' });
};

// Grocery Planning Page
exports.groceryPlan = (req, res) => {
    res.sendFile('grocery-plan.html', { root: './views' });
};

// Money Manager Page
exports.moneyManager = (req, res) => {
    res.sendFile('money-manager.html', { root: './views' });
};

// Login Page (new route for login)
exports.loginPage = (req, res) => {
    res.sendFile('login.html', { root: './views' });
};

// Signup Page (optional, in case you need a signup route)
exports.signupPage = (req, res) => {
    res.sendFile('signup.html', { root: './views' });
};