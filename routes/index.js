var express = require('express');
var router = express.Router();
var fs = require('fs');

router.use('/movie', require('./movie/index'));
router.use('/auth', require('./auth/index'));
router.use('/main', require('./main/index'));
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
})
router.get('/img', function(req, res, next) {
  fs.readFile('logo_bg.png'), function(err,data){
    res.end(data);
  }  
});



module.exports = router;
