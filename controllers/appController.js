// controllers/appController.js

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