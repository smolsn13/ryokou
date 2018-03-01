var express = require('express');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
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
  db.trip.create({
    city: req.body.city
  })
    .then(function(trip) {
      res.redirect('/trips');
    })
      .catch(function(error) {
        res.status(400).render('main/404');
      });
});

router.get('/new', function(req, res) {
  res.render('trips/new');
});



module.exports = router;
