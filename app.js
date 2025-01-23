const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Connect to MongoDB Atlas using your credentials
mongoose.connect('mongodb+srv://fingroproject:emmalu123@fingrocloud.fgo8h.mongodb.net/fingrodb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(bodyParser.json()); // Middleware to parse JSON data (optional, but helpful if using JSON payloads)
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Optional: Customize views folder path if needed

// Route setup
const appRoutes = require('./routes/appRoutes');
app.use('/', appRoutes); // Use appRoutes for all incoming requests

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});