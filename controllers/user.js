exports.create = (req, res, next) => {
  const User = req.app.models.User;

  User.Create({username:req.username, plainTextPassword: req.password});
};
