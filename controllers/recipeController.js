const Recipe = require('../models/recipe'); // Recipe model for storing recipes
const Ingredient = require('../models/ingredient'); // Ingredient model for fetching and saving ingredients

// Recipe Page Route - Renders recipe page with ingredients
exports.recipePage = async(req, res) => {
    try {
        // Fetch all ingredients from the database to populate the dropdown
        const ingredients = await Ingredient.find();
        res.render('recipe', {
            username: req.session.username || null, // Pass username
            ingredients // Pass ingredients data
        });
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