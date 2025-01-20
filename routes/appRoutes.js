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
router.get('/login', appController.loginPage); // Add this route for login page

// Signup Route (you can add this route if required for signup page)
router.get('/signup', appController.signupPage);
// About Page Route
router.get('/about', appController.aboutPage);

// Contact Us Page Route
router.get('/contact', appController.contactPage);

module.exports = router;
