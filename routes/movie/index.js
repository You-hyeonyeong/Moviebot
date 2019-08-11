var express = require('express');
var router = express.Router();

router.use('/', require('./movieList'));

module.exports = router;
