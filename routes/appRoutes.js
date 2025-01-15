const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController'); // Correct path to the controller


// Home Route
router.get('/', appController.homePage);

// Grocery Planning Route
router.get('/grocery-plan', appController.groceryPlan);

// Money Manager Route
router.get('/money-manager', appController.moneyManager);

module.exports = router;