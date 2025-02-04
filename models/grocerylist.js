const mongoose = require('mongoose');

const groceryListSchema = new mongoose.Schema({
    mondayBreakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    mondayLunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    mondayDinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    tuesdayBreakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    tuesdayLunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    tuesdayDinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    wednesdayBreakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    wednesdayLunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    wednesdayDinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    thursdayBreakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    thursdayLunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    thursdayDinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    fridayBreakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    fridayLunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    fridayDinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    saturdayBreakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    saturdayLunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    saturdayDinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    sundayBreakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    sundayLunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    sundayDinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    ingredients: [{
        ingredientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
        ingredientName: { type: String },
        totalQuantity: { type: Number }
    }],
    numberOfPeople: { type: Number, default: 1 } // Add this field
});

const GroceryList = mongoose.model('GroceryList', groceryListSchema);

module.exports = GroceryList;