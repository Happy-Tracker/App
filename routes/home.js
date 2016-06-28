var express = require('express');
var router = express.Router();
var db = require('../db/api');

router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

module.exports = router;
