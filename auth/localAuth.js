var db = require('../db/api');
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, (username, password, done) => {
    db.Contributor.findContributorByEmail(username).then((user, err) => {
        if (!user) {
            done("Error: User does not exist")
        } else if (user && bcrypt.compareSync(password, user.password)) {
            done(null, user)
        } else {
            done("Error: Password is incorrect")
        }
    });
}));


module.exports = {
    passport: passport,
    addContributor: body => {
        var hash = bcrypt.hashSync(body.password, 8);
        body.password = hash;
        return db.Contributor.addContributor(body).then(user => {
            return user;
        });
    },
    isLoggedIn: (req, res, next) => {
        if (req.session.userId) {
            res.redirect('/home', {
                id: req.session.userID
            });
        } else {
            next();
        }
    }
};
