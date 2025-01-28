const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    dishName: String,
    ingredients: { type: Map, of: String }, // Using Map to store ingredients as key-value pairs
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;