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
    // include: [db.user]
  })
  .then(function(trip) {
    if (!trip) throw Error();
    res.render('trips/show', { trip: trip });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// router.post('/:id/businesses', function(req, res) {
//   db.trip.findById(req.trip.id)
//     .then(function(trip) {
//       trip.createBusiness({
//         name: req.body.name,
//         category: req.body.category,
//       })
//     })
//     .then(function(trip) {
//       res.redirect('/trips');
//     })
//       .catch(function(error) {
//         res.status(400).render('main/404');
//       });
// });



module.exports = router;
