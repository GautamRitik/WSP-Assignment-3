const express = require('express');
const passport = require('passport');
const User = require('../model/user');
const router = express.Router();

// Render the home page
router.get('/', (req, res) => {
  res.render('home', { title: 'Expense Tracker', user: req.user });
});

// Render login page
router.get('/login', (req, res) => {
    const error = req.query.error ? 'Invalid username or password.' : null;
    res.render('login', { title: 'Login', error });
  });  

// Handle login
router.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login?error=true', // Use query parameter for errors
    })
  );

// Render register page
router.get('/register', (req, res) => {
    const error = req.query.error ? 'Account already exists. Please ' : null;
    res.render('register', { title: 'Register', error });
  });
  
// Handle registration
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.redirect('/register?error=true');
    }

    // Create new user
    await User.register(new User({ username }), password);
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.redirect('/register?error=true');
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      console.error(err);
      return res.redirect('/');
    }
    res.redirect('/');
  });
});

module.exports = router;
