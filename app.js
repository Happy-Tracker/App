var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var localAuth = require('./auth/localAuth');


require('dotenv').config();

var contributor = require('./routes/contributor');
var favorite = require('./routes/favorite');
var happyhour = require('./routes/happyhour');
var home = require('./routes/home');
var neighborhood = require('./routes/neighborhood');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use(session({
    keys: [process.env.SESSION_KEY1, process.env.SESSION_KEY1]
}));
app.use(localAuth.passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', home);
app.use('/home', home);
app.use('/neighborhood', neighborhood);
app.use('/contributor', contributor);
app.use('/favorite', favorite);
app.use('/happyhour', happyhour);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
