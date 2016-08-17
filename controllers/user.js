exports.signup = function(req, res) {
    var User = req.app.models.User;
    console.log(req.body);
    User.create({
        username: req.body.username,
        password: req.body.password
    }, function (err) {
        if (err) {
            req.flash('error', 'Could not create user.');
            return res.redirect('/signup');
        }
       req.flash('success', { msg: 'Success! You are logged in.' });
       res.redirect(req.session.returnTo || '/');

    });
};
