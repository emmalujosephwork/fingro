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
exports.handleSignup = async(req, res) => {
    try {
        const { name, email, password, mobile } = req.body;

        // Validation: Ensure all fields are filled
        if (!name || !email || !password || !mobile) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Check if email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists.' });
        }

        // Hash the password before saving it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object
        const newUser = new User({
            name,
            email,
            password: hashedPassword, // Store the hashed password
            mobile
        });

        // Save the new user to the database
        await newUser.save();

        // Send a success message after the user is created
        res.status(201).json({ message: 'User signed up successfully.' });
    } catch (err) {
        console.error(`Error during signup: ${err.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

