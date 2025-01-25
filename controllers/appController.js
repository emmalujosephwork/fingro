const path = require('path');
const User = require('../models/User');
const Ingredient = require('../models/ingredient');
const Recipe = require('../models/recipe');
const Expense = require('../models/Expense');
const Goal = require('../models/Goal');

// Home Page
exports.homePage = (req, res) => {
    res.sendFile('index.html', { root: './views' }, (err) => {
        if (err) {
            console.error(`Error serving index.html: ${err.message}`);
            res.status(500).send('Error loading the Home Page.');
        }
    });
};

// Grocery Planning Page
exports.groceryPlan = (req, res) => {
    res.sendFile('grocery-plan.html', { root: './views' }, (err) => {
        if (err) {
            console.error(`Error serving grocery-plan.html: ${err.message}`);
            res.status(500).send('Error loading the Grocery Planning Page.');
        }
    });
};

// Money Manager Page
exports.moneyManager = (req, res) => {
    res.sendFile('money-manager.html', { root: './views' }, (err) => {
        if (err) {
            console.error(`Error serving money-manager.html: ${err.message}`);
            res.status(500).send('Error loading the Money Manager Page.');
        }
    });
};

// Login Page
exports.loginPage = (req, res) => {
    res.sendFile('login.html', { root: './views' }, (err) => {
        if (err) {
            console.error(`Error serving login.html: ${err.message}`);
            res.status(500).send('Error loading the Login Page.');
        }
    });
};

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
        if (!name || !email || !password || !mobile) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists.' });
        }

        // Create a new user
        const newUser = new User({ name, email, password, mobile });
        await newUser.save();

        res.status(201).json({ message: 'User signed up successfully.' });
    } catch (err) {
        console.error(`Error during signup: ${err.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// About Page
exports.aboutPage = (req, res) => {
    res.sendFile('about.html', { root: './views' }, (err) => {
        if (err) {
            console.error(`Error serving about.html: ${err.message}`);
            res.status(500).send('Error loading the About Page.');
        }
    });
};

// Contact Us Page
exports.contactPage = (req, res) => {
    res.sendFile('contact.html', { root: './views' }, (err) => {
        if (err) {
            console.error(`Error serving contact.html: ${err.message}`);
            res.status(500).send('Error loading the Contact Page.');
        }
    });
};

// Recipe Page Route - Renders recipe page with ingredients
exports.recipePage = async(req, res) => {
    try {
        // Fetch all ingredients from the database to populate the dropdown
        const ingredients = await Ingredient.find();
        res.render('recipe', { ingredients }); // Render 'recipe.html' with ingredients data
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching ingredients');
    }
};

// Handle Recipe Form Submission (POST)
exports.handleRecipe = async(req, res) => {
    const { dishName, ingredientName, quantity } = req.body;

    if (!dishName || !ingredientName || !quantity) {
        return res.status(400).send('All fields are required');
    }

    // Create a map of ingredients and their quantities
    const ingredientsMap = {};
    for (let i = 0; i < ingredientName.length; i++) {
        ingredientsMap[ingredientName[i]] = quantity[i];
    }

    try {
        // Create a new recipe with dish name and ingredients
        const newRecipe = new Recipe({
            dishName,
            ingredients: ingredientsMap
        });

        // Save the recipe to the database
        await newRecipe.save();
        res.redirect('/recipe'); // Redirect back to the recipe page after saving
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving recipe to database');
    }
};

// Add Ingredient (POST request) - For adding new ingredient to the database
exports.addIngredient = async(req, res) => {
    const { ingredient } = req.body;

    if (!ingredient) {
        return res.status(400).send('Ingredient name is required');
    }

    try {
        const newIngredient = new Ingredient({
            name: ingredient
        });

        await newIngredient.save();
        res.redirect('/recipe'); // Redirect to the recipe page after adding ingredient
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving ingredient to database');
    }
};

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