const path = require('path');
const User = require('../models/User');
const Expense = require('../models/Expense');
const Goal = require('../models/Goal');

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

// Signup Page (GET)
exports.signupPage = (req, res) => {
    res.sendFile('signup.html', { root: './views' }, (err) => {
        if (err) {
            console.error(`Error serving signup.html: ${err.message}`);
            res.status(500).send('Error loading the Signup Page.');
        }
    });
};

// Handle Signup Form Submission (POST)
exports.handleSignup = async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body;
        if (!name || !email || !password || !mobile) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists.' });
        }

        // Create a new user
        const newUser = new User({ name, email, password, mobile });
        await newUser.save();

        res.status(201).json({ message: 'User signed up successfully.' });
    } catch (err) {
        console.error(`Error during signup: ${err.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
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

// Fetch Expenses
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (err) {
        console.error(`Error fetching expenses: ${err.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Fetch Goals
exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.find();
        res.status(200).json(goals);
    } catch (err) {
        console.error(`Error fetching goals: ${err.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
