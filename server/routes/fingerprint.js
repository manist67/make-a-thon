var express = require("express");
var multer = require("multer");
var rs = require("randomstring");

var moment = require("moment");

var router = express.Router();
var upload = multer();

var pool = require('../modules/database');
var sql = require('../sql');

router.get("/", function(req, res, next) {
	setTimeout(()=>{
		res.send({});
	}, 5000)
})

router.post("/", upload.single("file") ,async function(req, res, next) {
	let connection;
	try {
		connection = await pool.getConnection(async conn => conn);
	} catch(e) {
		next({
			status: 500,
			message: "데이터베이스 접속 오류"
		}); return;
	}
	
	// TODO : create hahs by fingerprint
	const hash = req.file.originalname;

	let user;
	try {
		const [rows] = await connection.query(sql.selectUserByFingerprinter, [ hash ]);
		
		if(rows.length !== 1) {
			next({
				status: 400,
				message: "유저 정보가 없습니다."
			});
			return;
		}
		user = rows[0];
	} catch (e) {
		console.warn(e)
		next({
			status: 500,
			message: "데이터베이스 접속 오류"
		}); return;
	}

	res.send({
		message: "성공적으로 작업을 완료했습니다.",
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
	const hash = req.file.originalname;

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