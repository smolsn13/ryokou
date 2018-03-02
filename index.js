require('dotenv').config();
var flash = require('connect-flash');
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var bodyParser = require('body-parser');
var db = require('./models');
var session = require('express-session');
var passport = require('./config/ppConfig');
var isLoggedIn = require('./middleware/isLoggedIn');

var app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(flash()); // run flash app after session app

app.use(passport.initialize());  // make sure to configure passport and secret before initializing passport
app.use(passport.session());

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});
// 
// app.get('/search', function(req, res) {
//
// var options =
//   {
//     url: 'https://api.yelp.com/v3/businesses/search?location=Seattle&categories=food',
//     headers: {
//       'Authorization': 'Bearer' + ' ' + process.env.YELP_KEY
//     }
//   };
//
// function callback(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var dataObj = JSON.parse(body);
//       console.dir(dataObj);
//       res.send(dataObj);
//     }
//   }
// request(options, callback);
// });

app.use('/auth', require('./controllers/auth'));
app.use('/trips', require('./controllers/trips'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
