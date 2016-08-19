var passport = require('passport');
var User = require('../models/User');

exports.login = (req, res, next) => {
  req.check('username', 'Username cannot be blank').notEmpty();
  req.check('password', 'Password cannot be blank').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors[0].msg);
    return res.redirect('/login');
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      req.flash('error', info.msg);
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
};
