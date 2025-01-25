const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    goalName: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    savedAmount: { type: Number, default: 0 },
    dueDate: { type: Date },
});

module.exports = mongoose.model('Goal', goalSchema);
