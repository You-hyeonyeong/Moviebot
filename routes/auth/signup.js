var express = require('express');
var router = express.Router();
const db = require('../../modules/pool');
const encrytion = require('../../modules/encryption')

//회원가입 post
router.post('/', async (req, res) => {
    //res.render("login/signup");

    const id = req.body.userId;
    const pw = req.body.userPw;
    const name = req.body.userName;

    const selectQuery = 'SELECT * FROM movibot.user.movibot WHERE userId = ?';
    const insertQuery = 'INSERT INTO movibot.user (userId, userPw, userName, salt) VALUES (?, ?, ?, ?)';

    if (!id || !pw || !name) {
        res.status(200).send("빈칸이 있습니다") //이거 alert으로 유효성 처리해야할텐데
    } else {
        const selectResult = await db.queryParam_Arr(selectQuery, [id]);
        if (!selectResult) {
            res.status(200).send(utils.successFalse(statusCode.DB_ERROR, resMessage.USER_DB_SELECT_ERROR));
        } else if (selectResult.length >= 1) {
            res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.ALREADY_USER));
        } else {
            const encrytionResult = await encrytion.encrytion(pw);

            const insertResult = await db.queryParam_Arr(insertQuery, [id, encrytionResult.hashedPassword, name, encrytionResult.salt]);
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