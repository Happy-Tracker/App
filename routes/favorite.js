var express = require('express');
var router = express.Router();
var db = require('../db/api');
var localAuth = require('../auth/localAuth');


router.get('/', function(req, res) {
    res.render('favorite', {
        id: req.session.userID
    });
});

router.get('/getUserId', function(req, res) {
    res.json(req.session.userID)
});


router.post('/:name', function(req, res, next) {
    db.Favorite.addUserFavorite(req.body.location_id, req.session.userID).then(() => {
        return db.Favorite.getNeighborhoodByLocation(req.params.name)
            .then(currentHood => {
                res.redirect('/neighborhood/' + currentHood.neighborhood_name)
            })
    });
})

module.exports = router;
