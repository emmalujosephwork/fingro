const path = require('path');


// Home Page
exports.homePage = (req, res) => {
    res.sendFile('index.html', { root: './views' }, (err) => {
        if (err) {
            console.error(`Error serving index.html: ${err.message}`);
            res.status(500).send('Error loading the Home Page.');
        }
    });
};

// Grocery Planning Page
exports.groceryPlan = (req, res) => {
    res.sendFile('grocery-plan.html', { root: './views' }, (err) => {
        if (err) {
            console.error(`Error serving grocery-plan.html: ${err.message}`);
            res.status(500).send('Error loading the Grocery Planning Page.');
        }
    });
};

// Money Manager Page
exports.moneyManager = (req, res) => {
    res.sendFile('money-manager.html', { root: './views' }, (err) => {
        if (err) {
            console.error(`Error serving money-manager.html: ${err.message}`);
            res.status(500).send('Error loading the Money Manager Page.');
        }
    });
};

// Login Page
exports.loginPage = (req, res) => {
    res.sendFile('login.html', { root: './views' }, (err) => {
        if (err) {
            console.error(`Error serving login.html: ${err.message}`);
            res.status(500).send('Error loading the Login Page.');
        }
    });
};


// About Page
exports.aboutPage = (req, res) => {
    res.sendFile('about.html', { root: './views' }, (err) => {
        if (err) {
            console.error(`Error serving about.html: ${err.message}`);
            res.status(500).send('Error loading the About Page.');
        }
    });
};

// Contact Us Page
exports.contactPage = (req, res) => {
    res.sendFile('contact.html', { root: './views' }, (err) => {
        if (err) {
            console.error(`Error serving contact.html: ${err.message}`);
            res.status(500).send('Error loading the Contact Page.');
        }
    });
};
