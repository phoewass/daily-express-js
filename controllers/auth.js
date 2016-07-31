const passport = require('passport');
const User = require('../models/User');

exports.login = (req, res, next) => {
  req.check('username', 'Email is not valid').isEmail();
  req.check('password', 'Password cannot be blank').notEmpty();
  req.sanitize('username').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();
console.log(errors);
  if (errors) {
    req.flash('error', errors[0].msg);
    return res.redirect('/login');
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      req.flash('errors', info);
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
};
