const Expense = require('../models/Expense'); // Expense model for database operations
const Goal = require('../models/Goal'); // Goal model for database operations


// Fetch Expenses
exports.getExpenses = async(req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (err) {
        console.error(`Error fetching expenses: ${err.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Fetch Goals
exports.getGoals = async(req, res) => {
    try {
        const goals = await Goal.find();
        res.status(200).json(goals);
    } catch (err) {
        console.error(`Error fetching goals: ${err.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};