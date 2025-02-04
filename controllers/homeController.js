const path = require('path');

exports.homePage = (req, res) => {
    res.render('index', { username: req.session.username || null });
};

exports.loginPage = (req, res) => {
    res.render('login', { username: req.session.username || null });
};


// Grocery Planning Page (Using EJS)
exports.groceryPlan = (req, res) => {
    res.render('grocery-plan', { username: req.session.username || null });
};


// Money Manager Page (Using EJS)
exports.moneyManager = (req, res) => {
    res.render('money-manager', { username: req.session.username || null });
};


// About Page (Using EJS)
exports.aboutPage = (req, res) => {
    res.render('about', { username: req.session.username || null });
};


// Contact Us Page (Using EJS)
exports.contactPage = (req, res) => {
    res.render('contact', { username: req.session.username || null });
};



exports.homePage = (req, res) => {
    if (req.session.userId) {
        res.render('index', { username: req.session.username });
    } else {
        res.render('index', { username: null });
    }
};