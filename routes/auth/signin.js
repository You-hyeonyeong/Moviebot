var express = require('express');
var router = express.Router();
const db = require('../../modules/pool');
const encrytion = require('../../modules/encryption')

//로그인
router.get('/', (req, res) => {
    res.render("login/signin");
});


router.post('/', async (req, res) => {
    const id = req.body.userId;
    const pw = req.body.userPw;

    const selectQuery = 'SELECT * FROM user WHERE userId = ?';

    if (!id || !pw) { //아이디가 없고 패스워드도 없음
        res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.ID_OR_PW_NULL_VALUE));
    } else {
        //회원 로그인
        const selectResult = await db.queryParam_Parse(selectQuery, [id]);
        if (!selectResult) { 
            res.status(200).send(utils.successFalse(statusCode.DB_ERROR, resMessage.ALREADY_USER)); 
        } else if (selectResult.length == 1) { //디비 조회 결과 한개면
            console.log(selectResult[0].salt)
            console.log(selectResult[0].user_pw)
            const hashedPw = await encrytion.onlyEncrytion(pw, selectResult[0].salt)
            if (selectResult[0].user_pw == hashedPw.hashedPassword) {
                // const tokenValue = jwt.sign(selectResult[0].user_idx);
                //  const decodedJwt = jwt.verify(tokenValue.token);
                //  console.log(decodedJwt); -> 토큰 확인할때 사용
                //로그인 성공
                res.render("login/signin");
                res.status(200).send(utils.successTrue(statusCode.CREATED, resMessage.LOGIN_SUCCESS, tokenValue));
            } else {
                res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
            }
        } else {
            res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.LOGIN_FAIL));
        }
    }
});


module.exports = router;