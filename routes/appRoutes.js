const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController'); // Correct path to the controller

// Home Route
router.get('/', appController.homePage);

// Recipe Page Route (Render recipe.ejs with ingredients)
router.get('/recipe', appController.recipePage); // Show recipe page with ingredients
router.post('/recipe', appController.handleRecipe); // Handle recipe form submission

// Other routes
router.get('/grocery-plan', appController.groceryPlan);
router.get('/money-manager', appController.moneyManager);
router.get('/login', appController.loginPage);
router.get('/signup', appController.signupPage); // Show the sign-up page
router.post('/signup', appController.handleSignup); // Handle form submission
router.get('/about', appController.aboutPage);
router.get('/contact', appController.contactPage);

module.exports = router;