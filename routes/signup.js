var express        = require('express'),
    userController = require('../controllers/user'),

    router         = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('signup');
});

router.post('/', userController.signup);
module.exports = router;
