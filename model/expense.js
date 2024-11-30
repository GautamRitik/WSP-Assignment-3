const mongoose = require('mongoose');

// Define the schema for expenses
const expenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
});

// Export the Expense model
module.exports = mongoose.model('Expense', expenseSchema);
