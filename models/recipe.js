const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    dishName: String,
    ingredients: { type: Map, of: String }, // Using Map to store ingredients as key-value pairs
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Add userId field
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;