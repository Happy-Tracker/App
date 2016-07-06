var express = require('express');
var router = express.Router();
var db = require('../db/api');
var localAuth = require('../auth/localAuth');

router.get('/:name', localAuth.isLoggedIn, function(req, res) {
    db.HappyHour.getInfoByHoodName(req.params.name)
        .then(list => {
            splitList = list.reduce((result, item, i) => {
                var index = Math.floor(i / 4);
                result[index] = result[index] || [];
                result[index].push(item);
                return result;
            }, []);
            res.render('neighborhood', {
                email: req.session.email,
                api: process.env.GOOGLE_API_KEY,
                sessionId: req.session.userID,
                happyhours: splitList,
                neighborhood: req.params.name
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
    db.Location.addLocation(req.body, req.session.userID).then(function(datas) {
        console.log(datas[0]);
        db.HappyHour.addHappyHour(req.body, datas[0].id, datas[0].contributor_id)
        .then(function() {
            res.redirect('/home');
        });
    });
});

module.exports = router;
