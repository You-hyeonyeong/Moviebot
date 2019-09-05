var express = require('express');
var router = express.Router();
const db = require('../../modules/pool');
const encrytion = require('../../modules/encryption')
const utils = require('../../modules/utils/utils');
const resMessage = require('../../modules/utils/responseMassage');
const statusCode = require('../../modules/utils/statusCode');

//회원가입 post
router.post('/', async (req, res) => {
    //res.render("login/signup");

    const id = req.body.userId;
    const pw = req.body.userPw;
    const name = req.body.userName;

    const selectQuery = 'SELECT userId FROM moviebot.user WHERE userId = ?';
    const insertQuery = 'INSERT INTO moviebot.user (userId, userPw, userName, salt) VALUES (?, ?, ?, ?)';

    if (!id || !pw || !name) {
        res.status(200).send("빈칸이 있습니다") //이거 alert으로 유효성 처리해야할텐데
    } else {
        const selectResult = await db.queryParam_Arr(selectQuery, [id]);
        if (!selectResult) {
            res.status(200).send(utils.successFalse(statusCode.DB_ERROR, resMessage.USER_DB_SELECT_ERROR));
        } else if (selectResult.length = 2) {
            console.log(selectResult.length);
            console.log(selectResult);
            res.status(200).send(utils.successTrue(statusCode.BAD_REQUEST, resMessage.ALREADY_USER, selectResult));
        } else {
            const encrytionResult = await encrytion.encrytion(pw);
            const insertResult = await db.queryParam_Parse(insertQuery, [id, encrytionResult.hashedPassword, name, encrytionResult.salt]);
            console.log(insertResult);

            if (!insertResult) {
                res.status(200).send(utils.successFalse(statusCode.DB_ERROR, resMessage.USER_DB_INSERT_ERROR))
            } else {
                res.render("login/signup");
            }
        }
    }
});

//회원가입 get
router.get('/', (req, res) => {

    const id = req.body.userId;
    const pw = req.body.userPw;
    const name = req.body.userName;

    console.log(id, pw, name);

    res.render("login/signup");

});
module.exports = router;