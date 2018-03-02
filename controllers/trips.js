var express = require('express');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var request = require('request');
var router = express.Router();

router.get('/', isLoggedIn, function(req, res) {
  db.trip.findAll({
    where: {
      userId: req.user.id
    },
    include: [db.user]
  })
    .then(function(trips) {
      console.log(trips);
      res.render('trips/index', { trips: trips });
    })
      .catch(function(error) {
        res.status(400).render('main/404');
      });
});

router.post('/', function(req, res) {
  db.user.findById(req.user.id)
    .then(function(user) {
      user.createTrip({
        city: req.body.city
      })
    })
    .then(function(trip) {
      res.redirect('/trips');
    })
      .catch(function(error) {
        res.status(400).render('main/404');
      });
});

router.get('/new', isLoggedIn, function(req, res) {
  db.trip.findAll({
    where: {
      userId: req.body.userId
    },
    include: [db.user]
  })
  .then(function(trips) {
    res.render('trips/new', { trips: trips });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

router.get('/:id', isLoggedIn, function(req, res) {
  db.trip.findOne({
    where: { id: req.params.id },
    include: [db.business]
  })
  .then(function(trip) {
    if (!trip) throw Error();
    res.render('trips/show', { trip: trip });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

router.get('/:id/businesses', function(req, res) {
  var options =
    {
      url: 'https://api.yelp.com/v3/businesses/search?location=' + req.query.location + '&categories='  + req.query.category,
      headers: {
        'Authorization': 'Bearer' + ' ' + process.env.YELP_KEY
      }
    };

  function callback(error, response, body) {
      if (!error && response.statusCode === 200) {
        var dataObj = JSON.parse(body);
        console.dir(dataObj);
        res.render('businesses/show', {});
      }
    }
  request(options, callback);
});

router.post('/:id/businesses', function(req, res) {
  db.trip.findById(req.params.id)
    .then(function(trip) {
      trip.createBusiness({
        name: req.body.name,
        category: req.body.category,
        url: req.body.url
      })
    })
    .then(function(trip) {
      res.redirect('/trips');
    })
      .catch(function(error) {
        res.status(400).render('main/404');
      });
});



module.exports = router;
