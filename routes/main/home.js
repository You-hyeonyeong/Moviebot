var express = require('express');
var router = express.Router();
const db = require('../../modules/pool');

//홈화면
router.get('/', (req, res) => {
    res.render("home/main.ejs");
});

module.exports = router;