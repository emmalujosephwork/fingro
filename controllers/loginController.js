const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Ensure the path is correct



exports.handleLogin = async (req, res) => {
    try {
        console.log("🔹 Login request received"); 
        console.log("🔹 Request body:", req.body); 

        let { email, password } = req.body;

        // Trim input values
        email = email.trim();

        if (!email || !password) {
            console.log("❌ Missing email or password");
            return res.status(400).json({ error: "Email and password are required." });
        }

        console.log(`🔍 Searching for user with email: ${email}`);
        const user = await User.findOne({ email });

        if (!user) {
            console.log("❌ Invalid credentials (User not found)");
            return res.status(401).json({ error: "Invalid email or password." }); // Generic message for security
        }

        console.log("✅ User found, checking password...");

        // Compare input password with stored hash (NO extra hashing)
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            console.log("❌ Invalid credentials (Password mismatch)");
            return res.status(401).json({ error: "Invalid email or password." });
        }

        console.log("✅ Password matches! Setting session...");
        
        // Store user session
        req.session.userId = user._id;
        req.session.username = user.name;

        console.log("✅ Session set:", { userId: req.session.userId, username: req.session.username });

        // Send JSON success response
        console.log("🚀 Login successful, sending response...");
        res.json({ success: true, message: "Login successful", username: user.name });
    } catch (err) {
        console.error("❌ Error in login process:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// Handle Logout
exports.handleLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err.message);
            return res.status(500).json({ error: 'Server error' });
        }
        res.redirect('/login');
    });
};
