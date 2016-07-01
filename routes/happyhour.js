var express = require('express');
var knex = require('../db/knex');
var router = express.Router();
var db = require('../db/api');
require('dotenv').config();

router.get('/:id', function(req, res, next) {
    knex('location').join('happy_hour', 'location_id', 'location.id')
        .select(
            'location.id as loc_id',
            'location.name',
            'happy_hour.id as hh_id',
            'location.address',
            'location.url',
            'location.image_url',
            'happy_hour.contributor_id',
            'neighborhood_name',
            'happy_hour.day',
            'happy_hour.start',
            'happy_hour.end'
        )
        .where({
            'location.id': req.params.id
        })

    .then(function(data) {
        // console.log(data, 'the joined data!');
        res.render('happyhour', {
            id: req.session.userID,
            info: data[0],
            days: data
        });
    });
})

router.get('/:id/delete', function(req, res) {
    knex('location')
        .where({
            id: req.params.id
        })
        .del()
        .then(function() {
            res.redirect('/');
        });
});

module.exports = router;
