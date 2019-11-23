var express = require('express');
var pool = require('../modules/database');

var sql = require('../sql');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post("/", async function(req, res, next) {
	const { username, password } = req.body;
	if(!username) {
		next({
			status: 400,
			message: "아이디가 없습니다."
		}); return;
	}
	if(!password) {
		next({
			status: 400,
			message: "패스워드가 없습니다."
		}); return;
	}

	const number = "012345";

	try {
		const connection = await pool.getConnection(async conn => conn);
		await connection.query(sql.insertUser, [username, password, number]);

		res.send({
			"message": "회원등록이 완료되었습니다."
		});
	} catch (e) {
		console.warn(e);
		next({
			status: 500,
			message: "데이터베이스 접속 오류"
		});
	}
});

module.exports = router;
