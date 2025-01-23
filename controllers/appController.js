const User = require('../models/user'); // Import the User model
const Ingredient = require('../models/ingredient'); // Import the Ingredient model
const Recipe = require('../models/recipe'); // Import the Recipe model

// Home Page
exports.homePage = (req, res) => {
    res.sendFile('index.html', { root: './views' });
};

// Grocery Planning Page
exports.groceryPlan = (req, res) => {
    res.sendFile('grocery-plan.html', { root: './views' });
};

// Money Manager Page
exports.moneyManager = (req, res) => {
    res.sendFile('money-manager.html', { root: './views' });
};

// Login Page
exports.loginPage = (req, res) => {
    res.sendFile('login.html', { root: './views' });
};

// Signup Page
exports.signupPage = (req, res) => {
    res.sendFile('signup.html', { root: './views' });
};

// Handle Sign Up form submission (POST request)
exports.handleSignup = async(req, res) => {
    const { name, email, password, mobile } = req.body;

    if (!name || !email || !password || !mobile) {
        return res.status(400).send('All fields are required');
    }

    try {
        const newUser = new User({
            name,
            email,
            password,
            mobile
        });

        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving user to database');
    }
};

// About Page
exports.aboutPage = (req, res) => {
    res.sendFile('about.html', { root: './views' });
};

// Contact Us Page
exports.contactPage = (req, res) => {
    res.sendFile('contact.html', { root: './views' });
};

// Recipe Page Route
exports.recipePage = async(req, res) => {
    try {
        // Fetch all ingredients from the database to populate the dropdown
        const ingredients = await Ingredient.find();
        res.render('recipe', { ingredients }); // Render 'recipe.ejs' with ingredients data
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching ingredients');
    }
};

// Handle the Recipe form submission (POST request)
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
        res.redirect('/recipe'); // Redirect back to the recipe page
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving recipe to database');
    }
};