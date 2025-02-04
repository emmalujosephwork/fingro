const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');
const GroceryList = require('../models/grocerylist');
const mongoose = require('mongoose');



// Grocery List Page Route
exports.groceryList = async(req, res) => {
    try {
        // Fetch all recipes to populate the dropdown
        const recipes = await Recipe.find();
        res.render('grocerylist', {
            username: req.session.username || null, // Pass username
            recipes // Pass recipes data
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching recipes');
    }
};

// Grocery List Page Route
// Grocery List Page Route
exports.groceryList = async(req, res) => {
    try {
        // Fetch all recipes from the database to populate the dropdown
        const recipes = await Recipe.find();

        // Logic to handle the calculation of the grocery list
        const selectedIngredients = [
            req.body.mondayBreakfast,
            req.body.mondayLunch,
            req.body.mondayDinner,
            req.body.tuesdayBreakfast,
            req.body.tuesdayLunch,
            req.body.tuesdayDinner,
            req.body.wednesdayBreakfast,
            req.body.wednesdayLunch,
            req.body.wednesdayDinner,
            req.body.thursdayBreakfast,
            req.body.thursdayLunch,
            req.body.thursdayDinner,
            req.body.fridayBreakfast,
            req.body.fridayLunch,
            req.body.fridayDinner,
            req.body.saturdayBreakfast,
            req.body.saturdayLunch,
            req.body.saturdayDinner,
            req.body.sundayBreakfast,
            req.body.sundayLunch,
            req.body.sundayDinner
        ];

        // Remove empty selections
        const ingredients = selectedIngredients.filter(ingredient => ingredient);

        const groupedIngredients = {};

        // Loop through each selected recipe, fetch its ingredients, and group by ingredient ID
        for (const ingredientId of ingredients) {
            const recipe = await Recipe.findById(ingredientId);
            if (recipe) {
                // Loop through each ingredient in the recipe and group them by ingredient ID
                for (const [ingredientId, quantity] of Object.entries(recipe.ingredients)) {
                    if (groupedIngredients[ingredientId]) {
                        // Add quantity if ingredient is already grouped
                        groupedIngredients[ingredientId].quantity += parseFloat(quantity);
                    } else {
                        // Initialize if ingredient is not grouped yet
                        groupedIngredients[ingredientId] = {
                            id: ingredientId,
                            name: ingredientId, // Will be replaced after finding ingredient
                            quantity: parseFloat(quantity)
                        };
                    }
                }
            }
        }

        const groceryList = [];

        // Fetch ingredient details (like name) from the database and populate the grocery list
        for (const ingredientId in groupedIngredients) {
            const ingredient = await Ingredient.findById(ingredientId);
            if (ingredient) {
                groceryList.push({
                    name: ingredient.name,
                    totalQuantity: groupedIngredients[ingredientId].quantity
                });
            }
        }

        // Render the grocery list page with the calculated grocery list and username
        res.render('grocerylist', {
            username: req.session.username || null, // Pass username
            groceryList,
            recipes
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Error generating grocery list');
    }
};


// Save Grocery Purchase List (POST)
exports.saveGroceryList = async(req, res) => {
    try {
        // Collect selected recipe IDs from the form
        const selectedRecipeIds = [
            req.body.mondayBreakfast, req.body.mondayLunch, req.body.mondayDinner,
            req.body.tuesdayBreakfast, req.body.tuesdayLunch, req.body.tuesdayDinner,
            req.body.wednesdayBreakfast, req.body.wednesdayLunch, req.body.wednesdayDinner,
            req.body.thursdayBreakfast, req.body.thursdayLunch, req.body.thursdayDinner,
            req.body.fridayBreakfast, req.body.fridayLunch, req.body.fridayDinner,
            req.body.saturdayBreakfast, req.body.saturdayLunch, req.body.saturdayDinner,
            req.body.sundayBreakfast, req.body.sundayLunch, req.body.sundayDinner
        ];

        // Filter out invalid or empty recipe IDs
        const validRecipeIds = selectedRecipeIds.filter(id => id && mongoose.Types.ObjectId.isValid(id));

        // Initialize an array to store all ingredients and their quantities
        const allIngredients = [];

        // Loop through the selected recipe IDs and gather the ingredients
        for (const recipeId of validRecipeIds) {
            const recipe = await Recipe.findById(recipeId);
            if (recipe) {
                for (const [ingredientId, quantity] of recipe.ingredients) {
                    allIngredients.push({ ingredientId, quantity: parseInt(quantity) });
                }
            }
        }

        // Group and sum the quantities for each ingredient
        const summedIngredients = allIngredients.reduce((acc, { ingredientId, quantity }) => {
            if (acc[ingredientId]) {
                acc[ingredientId].quantity += quantity;
            } else {
                acc[ingredientId] = { ingredientId, quantity };
            }
            return acc;
        }, {});

        // Extract ingredient IDs to fetch their names later
        const ingredientIds = Object.keys(summedIngredients);

        // Fetch the ingredient details from the database
        const ingredients = await Ingredient.find({ '_id': { $in: ingredientIds } });

        // Create a mapping of ingredient ID to ingredient name
        const ingredientNames = ingredients.reduce((acc, ingredient) => {
            acc[ingredient._id.toString()] = ingredient.name;
            return acc;
        }, {});

        // Prepare the final list of ingredients with their names and total quantities
        const result = Object.values(summedIngredients).map(ingredient => ({
            ingredientId: ingredient.ingredientId,
            ingredientName: ingredientNames[ingredient.ingredientId] || 'Unknown Ingredient',
            totalQuantity: ingredient.quantity
        }));

        // Set default numberOfPeople to 1 if not provided
        const numberOfPeople = req.body.numberOfPeople ? parseInt(req.body.numberOfPeople) : 1;

        // Create a new grocery list to save in the database
        const newGroceryList = new GroceryList({
            mondayBreakfast: req.body.mondayBreakfast,
            mondayLunch: req.body.mondayLunch,
            mondayDinner: req.body.mondayDinner,
            tuesdayBreakfast: req.body.tuesdayBreakfast,
            tuesdayLunch: req.body.tuesdayLunch,
            tuesdayDinner: req.body.tuesdayDinner,
            wednesdayBreakfast: req.body.wednesdayBreakfast,
            wednesdayLunch: req.body.wednesdayLunch,
            wednesdayDinner: req.body.wednesdayDinner,
            thursdayBreakfast: req.body.thursdayBreakfast,
            thursdayLunch: req.body.thursdayLunch,
            thursdayDinner: req.body.thursdayDinner,
            fridayBreakfast: req.body.fridayBreakfast,
            fridayLunch: req.body.fridayLunch,
            fridayDinner: req.body.fridayDinner,
            saturdayBreakfast: req.body.saturdayBreakfast,
            saturdayLunch: req.body.saturdayLunch,
            saturdayDinner: req.body.saturdayDinner,
            sundayBreakfast: req.body.sundayBreakfast,
            sundayLunch: req.body.sundayLunch,
            sundayDinner: req.body.sundayDinner,
            ingredients: result,
            numberOfPeople: numberOfPeople, // Save the number of people
            userId: req.session.userId // Save the userId from session
        });

        await newGroceryList.save();

        // Fetch the newly saved grocery list from the database
        const savedGroceryList = await GroceryList.findById(newGroceryList._id).populate('ingredients.ingredientId');

        // Pass the grocery list and username to the view
        res.render('grocery-purchase-list', {
            username: req.session.username || null, // Pass username
            groceryList: savedGroceryList
        });
    } catch (err) {
        console.error('Error saving grocery purchase list:', err.message);
        res.status(500).json({ error: err.message });
    }
};



exports.updateGroceryList = async(req, res) => {
    try {
        const peopleCount = parseInt(req.body.peopleCount); // Get the number of people from the form
        const groceryListId = req.body.groceryListId; // Get the grocery list ID

        // Ensure valid people count
        if (isNaN(peopleCount) || peopleCount < 1) {
            return res.status(400).json({ error: 'Invalid number of people.' });
        }

        // Find the grocery list by ID
        const groceryList = await GroceryList.findById(groceryListId);

        if (!groceryList) {
            return res.status(404).json({ error: 'Grocery list not found.' });
        }

        // Get the existing number of people in the database
        const existingPeopleCount = groceryList.numberOfPeople;

        // Handle the three scenarios based on the number of people:
        if (peopleCount < existingPeopleCount) {
            groceryList.ingredients.forEach(ingredient => {
                ingredient.totalQuantity = (ingredient.totalQuantity / existingPeopleCount) * peopleCount;
            });
        } else if (peopleCount > existingPeopleCount) {
            groceryList.ingredients.forEach(ingredient => {
                ingredient.totalQuantity = (ingredient.totalQuantity / existingPeopleCount) * peopleCount;
            });
        }

        // Update the number of people in the grocery list
        groceryList.numberOfPeople = peopleCount;

        // Save the updated grocery list
        await groceryList.save();

        // Fetch the updated grocery list to pass to the EJS view
        const updatedGroceryList = await GroceryList.findById(groceryListId).populate('ingredients.ingredientId');

        // Redirect to the grocery purchase list page with the updated values
        res.render('grocery-purchase-list', {
            username: req.session.username || null, // Pass username
            groceryList: updatedGroceryList
        });
    } catch (err) {
        console.error('Error updating grocery purchase list:', err.message);
        res.status(500).json({ error: err.message });
    }
};