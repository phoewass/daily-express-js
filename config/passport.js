const _ = require('lodash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({
    passReqToCallback: true
}, (req,email, password, done) => {
    var User = req.app.models.User;
    User.findOne({
        email: email.toLowerCase()
    }, (err, user) => {
        if (!user) {
            return done(null, false, {
                msg: 'Unable to find user.'
            });
        }
        user.verifyPassword(password, (isMatch) => {
            if (isMatch) {
                return done(null, user);
            }
            return done(null, false, {
                msg: 'Invalid email or password.'
            });
        });
    });
}));

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
    const provider = req.path.split('/').slice(-1)[0];

    if (_.find(req.user.tokens, {
            kind: provider
        })) {
        next();
    } else {
        res.redirect(`/auth/${provider}`);
    }
};
