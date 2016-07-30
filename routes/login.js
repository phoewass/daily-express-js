var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', authController.login);
module.exports = router;
