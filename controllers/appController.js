const path = require('path');
const User = require('../models/User');
const Ingredient = require('../models/ingredient');
const Recipe = require('../models/recipe');
const Expense = require('../models/Expense');
const Goal = require('../models/Goal');
const GroceryList = require('../models/grocerylist');
const bcrypt = require('bcryptjs'); // To hash passwords
const mongoose = require('mongoose');


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

        // Validation: Ensure all fields are filled
        if (!name || !email || !password || !mobile) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Check if email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists.' });
        }

        // Hash the password before saving it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object
        const newUser = new User({
            name,
            email,
            password: hashedPassword, // Store the hashed password
            mobile
        });

        // Save the new user to the database
        await newUser.save();

        // Send a success message after the user is created
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

// Grocery List Page Route
exports.groceryList = async(req, res) => {
    try {
        // Fetch all recipes to populate the dropdown
        const recipes = await Recipe.find();
        res.render('grocerylist', { recipes }); // Render 'grocerylist.html' with recipe data
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching recipes');
    }
};

// Grocery List Page Route
exports.groceryList = async(req, res) => {

    // Continue with the rest of the processing...

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
                        groupedIngredients[ingredientId].quantity += parseFloat(quantity); // assuming quantity is a number in string form
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

        // Render the grocery list page with the calculated grocery list
        res.render('grocerylist', { groceryList, recipes });

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
                // Loop through each ingredient in the recipe and push them into the allIngredients array
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
            ingredients: result
        });

        await newGroceryList.save();

        // Redirect to the grocery-purchase-list page after saving the list
        res.redirect('/grocery-purchase-list');
    } catch (err) {
        console.error('Error saving grocery purchase list:', err.message);
        res.status(500).json({ error: err.message });
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