exports.signup = function(req, res) {
    req.check('email', 'Email is not valid').isEmail();

    var errors = req.validationErrors();
    if (errors) {
        req.flash('error', errors[0].msg);
        return res.redirect('/signup');
    }

    var User = req.app.models.User;
    User.add({
        email: req.body.email,
        username: req.body.username,
        plainTextPassword: req.body.password
    }, function (err) {
        if (err) {
            console.log(err);
            req.flash('error', 'Could not create user.');
            return res.redirect('/signup');
        }
       req.flash('success', { msg: 'Success! Account created.' });
       res.redirect(req.session.returnTo || '/');

    });
};
