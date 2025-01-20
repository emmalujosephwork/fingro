const User = require('../models/user'); // Import the User model

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

// Login Page
exports.loginPage = (req, res) => {
    res.sendFile('login.html', { root: './views' });
};

// Signup Page
exports.signupPage = (req, res) => {
    res.sendFile('signup.html', { root: './views' });
};

// Handle Sign Up form submission (POST request)
exports.handleSignup = async(req, res) => {
    const { name, email, password, mobile } = req.body;

    // Check if all required fields are filled
    if (!name || !email || !password || !mobile) {
        return res.status(400).send('All fields are required');
    }

    try {
        // Create new user
        const newUser = new User({
            name,
            email,
            password, // Password will be hashed automatically before saving
            mobile
        });

        // Save the user to the database
        await newUser.save();

        // Redirect to login page after successful sign up
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving user to database');
    }
};

// About Page
exports.aboutPage = (req, res) => {
    res.sendFile('about.html', { root: './views' });
};

// Contact Us Page
exports.contactPage = (req, res) => {
    res.sendFile('contact.html', { root: './views' });
};