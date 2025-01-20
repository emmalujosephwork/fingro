const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController'); // Correct path to the controller

// Home Route
router.get('/', appController.homePage);

// Grocery Planning Route
router.get('/grocery-plan', appController.groceryPlan);

// Money Manager Route
router.get('/money-manager', appController.moneyManager);

// Login Route
router.get('/login', appController.loginPage);

// Signup Route
router.get('/signup', appController.signupPage); // Show the sign-up page
router.post('/signup', appController.handleSignup); // Handle form submission

// About Page Route
router.get('/about', appController.aboutPage);

// Contact Us Page Route
router.get('/contact', appController.contactPage);

module.exports = router;