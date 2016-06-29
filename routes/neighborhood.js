var express = require('express');
var router = express.Router();
var db = require('../db/api');
var localAuth = require('../db/api');

router.get('/', function(req, res, next) {
    res.render('neighborhood', {
        id: req.session.userID
    });
});

module.exports = router;
