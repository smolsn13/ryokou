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
    console.log('this is the db data:' + db.business);
    res.render('trips/show', { trip: trip});
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

router.get('/:id/businesses', function(req, res) {
  var category = req.query.category;
  category = category.replace(' ', '').toLowerCase();
  var options =
    {
      url: 'https://api.yelp.com/v3/businesses/search?location=' + req.query.location + '&categories='  + req.query.category,
      headers: {
        'Authorization': 'Bearer' + ' ' + process.env.YELP_KEY
      }
    };

  function callback(error, response, body) {
      if (!error && response.statusCode === 200) {
        // res.json(JSON.parse(body));
        var dataObj = JSON.parse(body);
        console.log(dataObj.businesses[0].categories);
        res.render('businesses/results', {businesses: dataObj, tripId: req.params.id});
      }
    }
  request(options, callback);
});

router.post('/:id/businesses', function(req, res) {
  console.log(req.params.id);
  db.trip.findById(req.params.id)
    .then(function(trip) {
      trip.createBusiness({
        name: req.body.name,
        category: req.body.category,
        url: req.body.url
      })
    })
    .then(function(trip) {
      console.log('business created');
      res.redirect('/trips/' + req.params.id);
    })
      .catch(function(error) {
        res.status(400).render('main/404');
      });
});

router.get('/:id/businesses/:idx/edit', function(req, res) {
  db.business.findById(req.params.idx).then(function(business) {
    res.render('businesses/edit', {business: business});
  });
});

router.put('/:id', function(req, res) {
  db.business.update({
    category: req.body.category
  }, {
    fields: ['category'],
    where: {id: req.params.idx}
  }).then(function(tag) {
    res.send("success!");
  });
});

router.delete('/:id/businesses/:idx', function(req, res) {
  console.log('In the DELETE route...');
  db.business.destroy({
    where: {id: req.params.idx}
  }).then(function() {
    res.redirect('/trips/' + req.params.id);
  });
});



module.exports = router;
