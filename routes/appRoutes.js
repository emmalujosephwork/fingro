const express = require('express');
const router = express.Router();
const groceryController = require('../controllers/groceryController');
const homeController = require('../controllers/homeController');
const signupController = require('../controllers/signupController');
const expenseController = require('../controllers/expenseController');
const loginController = require('../controllers/loginController');
const recipeController = require('../controllers/recipeController');
const ingridientController = require('../controllers/ingridientController');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware'); // Import authentication middleware
const Expense = require('../models/Expense');
const Goal = require('../models/Goal');
const GroceryList = require('../models/grocerylist');

// Home Route
router.get('/', homeController.homePage);

// Login Routes
router.get('/login', homeController.loginPage);
router.post('/login', loginController.handleLogin);
router.get('/logout', loginController.handleLogout);

// Signup Routes
router.get('/signup', signupController.signupPage);
router.post('/signup', signupController.handleSignup);

// Recipe Page Route
router.get('/recipe', recipeController.recipePage); // Show recipe page with ingredients
router.post('/recipe', recipeController.handleRecipe); // Handle recipe form submission

// Add Ingredient Route
router.post('/add-ingredient', ingridientController.addIngredient); // Handle adding new ingredient

// Protected Routes - Use the authentication middleware here
router.get('/grocery-plan', authenticationMiddleware, homeController.groceryPlan); // Protect this route
router.get('/money-manager', authenticationMiddleware, homeController.moneyManager); // Protect this route

// Grocery List Page Route (GET)
router.get('/grocerylist', groceryController.groceryList);

// Save Grocery List (POST)
router.post('/grocerylist', groceryController.saveGroceryList); // Save the weekly grocery list

// Other Routes
router.get('/about', homeController.aboutPage);
router.get('/contact', homeController.contactPage);
router.post('/update-grocery-list', groceryController.updateGroceryList);

// --- Tracker API Routes ---

// Add Expense
router.post('/api/expenses', async(req, res) => {
    try {
        const { description, amount, category } = req.body;
        if (!description || !amount || !category) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const expense = new Expense({ description, amount, category });
        await expense.save();
        console.log('Expense added:', expense);
        res.status(201).json({ message: 'Expense added successfully', expense });
    } catch (err) {
        console.error('Error adding expense:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Get All Expenses
router.get('/api/expenses', async(req, res) => {
    try {
        const expenses = await Expense.find();
        console.log('Expenses retrieved:', expenses);
        res.status(200).json(expenses);
    } catch (err) {
        console.error('Error fetching expenses:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Add Savings Goal
router.post('/api/goals', async(req, res) => {
    try {
        const { goalName, targetAmount, dueDate } = req.body;
        if (!goalName || !targetAmount) {
            return res.status(400).json({ error: 'Goal name and target amount are required.' });
        }

        const goal = new Goal({ goalName, targetAmount, dueDate });
        await goal.save();
        console.log('Goal added:', goal);
        res.status(201).json({ message: 'Goal added successfully', goal });
    } catch (err) {
        console.error('Error adding goal:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Get All Goals
router.get('/api/goals', async(req, res) => {
    try {
        const goals = await Goal.find();
        console.log('Goals retrieved:', goals);
        res.status(200).json(goals);
    } catch (err) {
        console.error('Error fetching goals:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Route to view the grocery purchase list
router.get('/grocery-purchase-list', async(req, res) => {
    try {
        const groceryList = await GroceryList.find().sort({ createdAt: -1 }).limit(1);
        if (groceryList.length > 0) {
            res.render('grocery-purchase-list', { groceryList: groceryList[0] });
        } else {
            res.status(404).send('No grocery list found');
        }
    } catch (err) {
        console.error('Error fetching grocery list:', err);
        res.status(500).send('Error fetching grocery list');
    }
});

router.get('/viewingridients', ingridientController.displayIngridients);
// Handle update ingredient
router.post('/update-ingredient', ingridientController.updateIngredient);

// Error Handling Routes
router.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

module.exports = router;