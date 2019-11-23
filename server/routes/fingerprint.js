var express = require("express");
var multer = require("multer");

var router = express.Router();
var upload = multer();

var pool = require('../modules/database');
var sql = require('../sql');

router.post("/", upload.single("file") ,function(req, res) {
	res.send({
		message: ""
	})
});


router.put("/", upload.single("file"), async function(req, res, next) {
	let connection;

	try {
		connection = await pool.getConnection(async conn => conn);
	} catch(e) {
		next({
			status: 500,
			message: "데이터베이스 접속 오류"
		})
	}

	const { number } = req.body;
	let user;

	try {
		
		const [rows] = await connection.query(sql.selectUserByNumber, [ number ]);

		if(rows.length !== 1) {
			next({
				status: 400,
				message: "올바른 숫자가 아닙니다."
			});
			return;
		}

		user = rows[0];
	} catch(e) {
		console.warn(e);
		next({
			status: 500,
			message: "데이터베이스 접속 오류"
		});
		return;
	}


	// TODO : create hahs by fingerprint
	const hash = req.file.buffer.toString();

	try {
		await connection.query(sql.updateUserWithFingerprint, [hash, user.seq])
	} catch(e) {
		console.warn(e);
		next({
			status: 500,
			message: "데이터베이스 접속 오류"
		});
		return;
	}

	res.send({
		message: "성공적으로 등록되었습니다."
	});
})

module.exports = router;