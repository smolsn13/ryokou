var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
  db.trip.findAll()
    .then(function(trips) {
      console.log(trips);
      res.render('trips/index', { trips: trips });
    })
      .catch(function(error) {
        res.status(400).render('main/404');
      });
});



module.exports = router;
