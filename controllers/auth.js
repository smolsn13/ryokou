var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();


router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: { email: req.body.email},
    defaults: {  // default values when email is not found
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {  //use spread promise because it is returning two values (similar to 'then' but for multiple values)
    if (created) {
      //user was created
      console.log('User created');
      passport.authenticate('local', {  // authenticate user first, then redirect to '/'
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req, res);  // passport.authenticate returns a function, immediately called with req, res parameters
    } else {
      // email already exists in db
      console.log('Email already exists');
      req.flash('error', 'Email already exists');  //use full request function since not inside the passport.authenticate function
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    console.log('An error occurred: ', error.message);
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  successFlash: 'You have logged in!',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password'
}));

router.get('/logout', function(req, res) {
  req.logout();
  console.log('logged out');
  req.flash('success', 'You have logged out!');  //this is how to use flash without passport
  res.redirect('/');
});

module.exports = router;
