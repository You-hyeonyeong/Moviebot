var express = require('express');
var router = express.Router();
const db = require('../../modules/pool');

//홈화면
router.get('/', (req, res) => {
    res.render("movie/movieList.ejs");
});

module.exports = router;