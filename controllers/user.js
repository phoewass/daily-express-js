exports.signup = function(req, res) {
    req.check('email', 'Email is not valid').isEmail();

    var errors = req.validationErrors();
    if (errors) {
        req.flash('error', errors[0].msg);
        return res.redirect('/signup');
    }

    var User = req.app.models.User;
    User.create({
        active: false,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }, function (err) {
        if (err) {
            console.log(err);
            req.flash('error', 'Could not create user.');
            return res.redirect('/signup');
        }
       req.flash('success', { msg: 'Success! You are logged in.' });
       res.redirect(req.session.returnTo || '/');

    });
};
