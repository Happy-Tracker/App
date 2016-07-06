var express = require('express');
var knex = require('../db/knex');
var router = express.Router();
var db = require('../db/api');
var localAuth = require('../auth/localAuth');
require('dotenv').config();

router.get('/:id', localAuth.isLoggedIn, function(req, res) {
    db.HappyHour.getHappyHourInfo(req.params.id)
    .then(function(data) {
      // console.log(data);
        res.render('happyhour', {
            loc_id:req.params.id,
            email:req.session.email,
            sessionId: req.session.userID,
            info: data[0],
            days: data
        });
    });
});

router.get('/:id/delete', function(req, res) {
    knex('happy_hour').where({location_id: req.params.id}).del()
    .then(function(){
        return knex('location').where({id: req.params.id}).del();
    }).then(function() {
        res.redirect('/');
    });
});

module.exports = router;
