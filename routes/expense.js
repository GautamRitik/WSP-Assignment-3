const express = require('express');
const router = express.Router();
const Expense = require('../model/expense');

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// Public route to view expenses
router.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.render('index', { title: 'All Expenses', expenses, user: req.user });
  } catch (err) {
    console.error('Error fetching expenses:', err);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error fetching expenses',
      error: err,
    });
  }
});

// Protected routes
router.get('/add', isAuthenticated, (req, res) => {
  res.render('add_expense', { title: 'Add Expense' });
});

router.post('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Expense.findByIdAndDelete(id);
    res.redirect('/expenses');
  } catch (err) {
    console.error('Error deleting expense:', err);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error deleting expense',
      error: err,
    });
  }
});


module.exports = router;
