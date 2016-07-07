var express = require('express');
var router = express.Router();
var db = require('../db/api');
var localAuth = require('../auth/localAuth');
//async is for the add form and adding multiple happy hours at a time
var async = require('async');

router.get('/:name', localAuth.isLoggedIn, function(req, res){
    db.Contributor.getContributorById(req.session.userID).then(currentUser =>{
        db.HappyHour.getInfoByHoodName(req.params.name)
            .then(list => {
          splitList = list.reduce((result, item, i) => {
              var index = Math.floor(i / 4);
              result[index] = result[index] || [];
              result[index].push(item);
              return result;
          }, []);
                res.render('neighborhood', {
                    email: currentUser.email,
                    api: process.env.GOOGLE_API_KEY,
                    sessionId: req.session.userID,
                    happyhours: splitList,
                    thisNeighborhood: req.params.name
                });
            });

    });
});

router.get('/:name', function(req, res) {
    db.Neighborhood.getNeighborhoods()
        .then(neighborhoods => {
          console.log(neighborhoods);
            res.render('neighborhood', {
                neighborhood: neighborhoods
            });
        });
});

router.get('/get/locations', function(req, res) {
    db.Location.getLocations().then(allLocations => {
        db.Location.getLocationsByNeighborhood(allLocations[0].neighborhood_name).then(specificLocations => {
            res.json(specificLocations);
        });
    });
});

router.post('/addhh', function(req, res) {
    db.Location.addLocation(req.body, req.session.userID)
    .then(function(datas) {
        var days = req.body.day;
      // 1st para in async.each() is the array of items
        async.each(days, function(day, callback){
          // Call an asynchronous function, often a save() to DB
            db.HappyHour.addHappyHour(req.body, datas[0].id, datas[0].contributor_id, day, allDone);
        },
        // 3rd param is the function to call when everything's done
        function(err){
          // All tasks are done now
            if (err) return next(err);
        });
        res.redirect('/home');
    });
});

module.exports = router;
