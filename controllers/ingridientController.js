const Ingredient = require('../models/ingredient'); // Assuming you have the Ingredient model to get the ingredients

exports.displayIngridients = async(req, res) => {
    try {
        // Fetch all ingredients from the database
        const ingredients = await Ingredient.find();

        // Render the ingredients page and pass the ingredients along with the username (from session)
        res.render('ingredients', {
            ingredients: ingredients,
            username: req.session.username || null // Pass username from session
        });
    } catch (err) {
        console.error('Error fetching ingredients:', err);
        res.status(500).send('Error fetching ingredients');
    }
};

// Handle Update Ingredient
exports.updateIngredient = async(req, res) => {
    try {
        const { ingredientId, updatedName } = req.body; // Get ingredientId and updated name from request body

        // Find the ingredient by ID and update its name
        const updatedIngredient = await Ingredient.findByIdAndUpdate(
            ingredientId, { name: updatedName }, { new: true } // Return the updated ingredient
        );

        if (!updatedIngredient) {
            return res.status(404).json({ error: 'Ingredient not found' });
        }

        res.status(200).json({ message: 'Ingredient updated successfully', ingredient: updatedIngredient });
    } catch (err) {
        console.error('Error updating ingredient:', err);
        res.status(500).json({ error: 'Internal Server Error' });
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
        res.redirect('/viewingridients'); // Redirect to the recipe page after adding ingredient
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving ingredient to database');
    }
};