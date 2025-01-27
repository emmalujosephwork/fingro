const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController'); // Controller for routes
const Expense = require('../models/Expense'); // Expense Model
const Goal = require('../models/Goal'); // Goal Model

// Home Route
router.get('/', appController.homePage);

// Recipe Page Route (Render recipe.ejs with ingredients)
router.get('/recipe', appController.recipePage); // Show recipe page with ingredients
router.post('/recipe', appController.handleRecipe); // Handle recipe form submission

// Add Ingredient Route
router.post('/add-ingredient', appController.addIngredient); // Handle adding new ingredient

// Other routes
router.get('/grocery-plan', appController.groceryPlan);
// Grocery List Page Route (GET)
router.get('/grocerylist', appController.groceryList);

// Save Grocery List (POST)
router.post('/grocerylist', appController.saveGroceryList); // Save the weekly grocery list

router.get('/money-manager', appController.moneyManager);
router.get('/login', appController.loginPage);
router.get('/signup', appController.signupPage); // Show the sign-up page
router.post('/signup', appController.handleSignup); // Handle form submission
router.get('/about', appController.aboutPage);
router.get('/contact', appController.contactPage);

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

// Get a Specific Goal or Expense by ID
router.get('/api/goals/:id', async(req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) {
            return res.status(404).json({ error: 'Goal not found.' });
        }
        res.status(200).json(goal);
    } catch (err) {
        console.error('Error fetching goal:', err.message);
        res.status(500).json({ error: err.message });
    }
});

router.get('/api/expenses/:id', async(req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found.' });
        }
        res.status(200).json(expense);
    } catch (err) {
        console.error('Error fetching expense:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Delete Expense
router.delete('/api/expenses/:id', async(req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        if (!deletedExpense) {
            return res.status(404).json({ error: 'Expense not found.' });
        }
        console.log('Expense deleted:', deletedExpense);
        res.status(200).json({ message: 'Expense deleted successfully', deletedExpense });
    } catch (err) {
        console.error('Error deleting expense:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Delete Goal
router.delete('/api/goals/:id', async(req, res) => {
    try {
        const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
        if (!deletedGoal) {
            return res.status(404).json({ error: 'Goal not found.' });
        }
        console.log('Goal deleted:', deletedGoal);
        res.status(200).json({ message: 'Goal deleted successfully', deletedGoal });
    } catch (err) {
        console.error('Error deleting goal:', err.message);
        res.status(500).json({ error: err.message });
    }
});


// --- Error Handling Routes ---

// 404 Route for unmatched paths
router.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

module.exports = router;