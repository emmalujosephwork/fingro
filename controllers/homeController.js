const path = require('path');

exports.homePage = (req, res) => {
    res.render('index', { username: req.session.username || null });
};

exports.loginPage = (req, res) => {
    res.render('login', { username: req.session.username || null, error: null });
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

// // Login Page
// exports.loginPage = (req, res) => {
//     res.sendFile('login', { root: './views' }, (err) => {
//         if (err) {
//             console.error(`Error serving login.html: ${err.message}`);
//             res.status(500).send('Error loading the Login Page.');
//         }
//     });
// };


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


exports.homePage = (req, res) => {
    if (req.session.userId) {
        res.render('index', { username: req.session.username });
    } else {
        res.render('index', { username: null });
    }
};
