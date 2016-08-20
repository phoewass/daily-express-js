var _ = require('lodash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({
    passReqToCallback: true
}, (req, username, password, done) => {
    var User = req.app.models.User;
    User.findOne({
        username: username
    }, (err, user) => {
        if (!user) {
            return done(null, false, {
                msg: 'Invalid username or password.'
            });
        }
        user.verifyPassword(password, (isMatch) => {
            if (isMatch) {
                return done(null, user);
            }
            return done(null, false, {
                msg: 'Invalid username or password.'
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
    var provider = req.path.split('/').slice(-1)[0];

    if (_.find(req.user.tokens, {
            kind: provider
        })) {
        next();
    } else {
        res.redirect(`/auth/${provider}`);
    }
};
