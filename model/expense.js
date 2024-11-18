var mongoose = require('mongoose');

// Define the schema for an Expense
var expenseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Create and export the Expense model
module.exports = mongoose.model('Expense', expenseSchema);
