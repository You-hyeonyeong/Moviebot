var express = require('express');
var router = express.Router();

router.use('/movie', require('./movie/index'));
router.use('/auth', require('./auth/index'));
router.use('/main', require('./main/index'));
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
