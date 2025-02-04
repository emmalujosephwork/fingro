const bcrypt = require('bcryptjs');  // For hashing passwords
const User = require('../models/User');  // User model for database operations


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
        let { name, email, password, mobile } = req.body;

        // Trim input values to avoid unnecessary spaces
        name = name.trim();
        email = email.trim();
        mobile = mobile.trim();

        // Validation: Ensure all fields are filled
        if (!name || !email || !password || !mobile) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists. Please log in." });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword, // Store the hashed password
            mobile
        });

        await newUser.save();

        // Send a success response
        res.status(201).json({ message: "User signed up successfully." });
    } catch (err) {
        console.error(`❌ Error during signup: ${err.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

