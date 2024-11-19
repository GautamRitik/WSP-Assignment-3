var express = require('express');
var router = express.Router();
var Expense = require('../model/expense');

/* GET splash page (default route). */
router.get('/', function (req, res, next) {
  res.render('home', { title: 'Welcome to Expense Tracker' });
});

/* GET all expenses and display on the expenses page. */
router.get('/expenses', async function (req, res, next) {
  try {
    const expenses = await Expense.find();
    res.render('index', { title: 'All Expenses', expenses: expenses });
  } catch (err) {
    next(err);
  }
});

/* GET form to add a new expense. */
router.get('/add', function (req, res, next) {
  res.render('add_expense', { title: 'Add Expense' });
});

/* POST new expense. */
router.post('/add', async function (req, res, next) {
  try {
    const newExpense = new Expense({
      name: req.body.name,
      date: req.body.date,
      price: req.body.price,
    });
    await newExpense.save();
    res.redirect('/expenses');
  } catch (err) {
    next(err);
  }
});

/* GET form to edit an expense. */
router.get('/edit/:id', async function (req, res, next) {
  try {
    const expense = await Expense.findById(req.params.id);
    res.render('edit_expense', { title: 'Edit Expense', expense: expense });
  } catch (err) {
    next(err);
  }
});

/* POST update expense. */
router.post('/edit/:id', async function (req, res, next) {
  try {
    await Expense.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      date: req.body.date,
      price: req.body.price,
    });
    res.redirect('/expenses');
  } catch (err) {
    next(err);
  }
});

/* POST delete expense. */
router.post('/delete/:id', async function (req, res, next) {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.redirect('/expenses');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
