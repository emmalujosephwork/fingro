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
    const userId = req.session.userId; // Get the userId from the session

    if (!dishName || !ingredientName || !quantity) {
        return res.status(400).send('All fields are required');
    }

    // Create a map of ingredients and their quantities
    const ingredientsMap = {};
    for (let i = 0; i < ingredientName.length; i++) {
        ingredientsMap[ingredientName[i]] = quantity[i];
    }

    try {
        // Create a new recipe with dish name, ingredients, and the userId
        const newRecipe = new Recipe({
            dishName,
            ingredients: ingredientsMap,
            userId: userId // Save the userId
        });

        // Save the recipe to the database
        await newRecipe.save();
        res.redirect('/recipe'); // Redirect back to the recipe page after saving
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving recipe to database');
    }
};


exports.displayUserRecipes = async(req, res) => {
    try {
        const userId = req.session.userId; // Get the user ID from session

        // Find all recipes for the logged-in user
        const userRecipes = await Recipe.find({ userId: userId }).populate('userId', 'name');

        // Render the displayrecipe page and pass the recipes
        res.render('displayrecipe', {
            username: req.session.username || null, // Pass username to the view
            recipes: userRecipes
        });
    } catch (err) {
        console.error('Error fetching recipes:', err.message);
        res.status(500).send('Internal Server Error');
    }
};

exports.editRecipePage = async(req, res) => {
    const recipeId = req.params.id;

    try {
        // Fetch the recipe, populating the ingredientIds with actual ingredient names
        const recipe = await Recipe.findById(recipeId)
            .populate({
                path: 'ingredients.ingredientId', // Populating ingredientId field
                select: 'name' // Fetching only the name of the ingredient
            });

        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }

        // Extract ingredient names and quantities
        const ingredients = [];
        recipe.ingredients.forEach((value, key) => {
            ingredients.push({
                ingredientId: key,
                ingredientName: value.ingredientId, // Populate ingredient name
                quantity: value.quantity
            });
        });

        // Render the edit page with populated ingredients
        res.render('edit-recipe', {
            recipe: {
                _id: recipe._id,
                dishName: recipe.dishName,
                ingredients: ingredients, // Pass ingredients with names
            },
            username: req.session.username || null
        });

    } catch (err) {
        console.error('Error fetching recipe for editing:', err);
        res.status(500).send('Error fetching recipe');
    }
};


exports.updateRecipe = async(req, res) => {
    const recipeId = req.params.id;
    const { ingredientName, quantity } = req.body;

    if (!ingredientName || !quantity) {
        return res.status(400).send('All fields are required');
    }

    // Create a map of ingredients and their quantities
    const updatedIngredients = {};
    for (let i = 0; i < ingredientName.length; i++) {
        updatedIngredients[ingredientName[i]] = quantity[i];
    }

    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, { ingredients: updatedIngredients }, { new: true });

        if (!updatedRecipe) {
            return res.status(404).send('Recipe not found');
        }

        res.redirect(`/displayrecipe/${recipeId}`); // Redirect to the updated recipe page
    } catch (err) {
        console.error('Error updating recipe:', err);
        res.status(500).send('Error updating recipe');
    }
};