const Recipe = require('../models/recipe'); // Recipe model for storing recipes
const Ingredient = require('../models/ingredient'); // Ingredient model for fetching and saving ingredients

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