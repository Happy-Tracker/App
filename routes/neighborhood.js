var express = require('express');
var router = express.Router();
var db = require('../db/api');
var localAuth = require('../auth/localAuth');


router.get('/:name', function(req, res, next) {
    db.HappyHour.getInfoByHoodName(req.params.name)
        .then(list => {
            splitList = list.reduce((result, item, i) => {
                var index = Math.floor(i / 4)
                result[index] = result[index] || []
                result[index].push(item)
                return result
            }, [])
            res.render('neighborhood', {
                api: process.env.GOOGLE_API_KEY,
                id: req.session.userID,
                happyhours: splitList,
                neighborhood: req.params.name
            });
        })
});

router.get('/get/locations', function(req, res, next) {
    db.Location.getLocations().then(allLocations => {
        db.Location.getLocationsByNeighborhood(allLocations[0].neighborhood_name).then(specificLocations => {
            res.json(specificLocations);
        })
    });
});



module.exports = router;
