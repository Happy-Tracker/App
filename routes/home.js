var express = require('express');
var router = express.Router();
var db = require('../db/api');
var localAuth = require('../auth/localAuth');
// On home: authenticate,
router.get('/', localAuth.isLoggedIn, function(req, res) {
    db.Neighborhood.getNeighborhoods()
        .then(neighborhoods => {
            var splitHoods = neighborhoods.reduce((result, item, i) => {
                var index = Math.floor(i / 4);
                result[index] = result[index] || [];
                result[index].push(item);
                return result;
            }, []);
            res.render('home', {
                email: req.session.email,
                sessionId: req.session.userID,
                neighborhood: splitHoods
            });
        });
});

// login
router.post('/login', function(req, res) {
    localAuth.passport.authenticate('local', (err, user) => {
        if (err) {
            res.render('home', {
                error: err
            });
        } else if (user) {
            req.session.userID = user.id;
            req.session.email = user.email;
            res.redirect('/home');
        }
    })(req, res);
});

router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/home');
});
router.post('/signup', localAuth.isLoggedIn, function(req, res) {
    db.Contributor.findContributorByEmail(req.body.email).then(user => {
        if (user) {
            res.render('home', {
                error: 'User already exists'
            });
        } else {
            localAuth.addContributor(req.body).then(user => {
                req.session.userID = user.id;
                res.redirect('/home');
            });
        }
    });
});

router.post('/addhh', function(req, res) {
    db.Location.addLocation(req.body, req.session.userID)
    .then(function(datas) {
        var days = req.body.day
        console.log(days);
        days.forEach(function(day){
            db.HappyHour.addHappyHour(req.body, datas[0].id, datas[0].contributor_id, day)
        })
        // db.HappyHour.addHappyHour(req.body, datas[0].id, datas[0].contributor_id, day)
        res.redirect('/home');
    });
});


module.exports = router;
