exports.create = (req, res, next) => {
  const User = req.app.models.User;

  User.create({username:req.username, plainTextPassword: req.password});
};
