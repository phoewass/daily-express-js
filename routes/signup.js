var express = require('express');
var router = express.Router();
var userController = require('../controllers/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/', userController.create);
module.exports = router;
