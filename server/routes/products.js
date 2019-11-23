var express = require("express");
var pool = require("../modules/database");
var sql = require('../sql');

var router = express.Router()


router.get("/:product", async function(req, res, next) {
	let accessToken = req.headers.authorization;

	if(!accessToken) {
		next({
			status: 403,
			message: "access_token이 없습니다."
		}); return;
	}

	accessToken = accessToken.split(" ");
	if(accessToken.length < 2 || accessToken[0] !== "Bearer") {
		next({
			status: 403,
			message: "Bearer type으로 전송되지 않았습니다."
		});	 return;
	}

	const { product } = req.params;

	accessToken = accessToken[1];

	let connection;
	try {
		connection = await pool.getConnection(async conn => conn);
	} catch(e) {
		next({
			status: 500,
			message: "데이터베이스 접속 오류"
		}); return;
	}

	let user;
	try {
		const [rows] = await connection.query(sql.selectUserByAccessToken, [accessToken]);

		if(rows.length != 1) {
			res.status(400).send({
				message: "접속 정보가 없습니다."
			}); return;
		}

		user = rows[0];
	} catch(e) {
		next({
			status: 500,
			message: "데이터베이스 접속 오류"
		}); return;
	}

	let productItem;
	try {
		const [rows] = await connection.query(sql.selectProductBySeq, [product]);
		if(rows.length!=1) {
			res.status(400).send({
				message: "상품 정보가 없습니다."
			}); return;
		}

		productItem = rows[0];
	} catch(e) {
		next({
			status: 500,
			message: "데이터베이스 접속 오류"
		}); return;
	}

	try {
		const [rows] = await connection.query(sql.selectProductBySeq, [product]);
		if(rows.length!=1) {
			res.status(400).send({
				message: "상품 정보가 없습니다."
			}); return;
		}

		productItem = rows[0];
	} catch(e) {
		next({
			status: 500,
			message: "데이터베이스 접속 오류"
		}); return;
	}

	if(user.cash < productItem.price) {
		res.status(400).send({
			message: "잔액 부족"
		}); return;
	}

	try {
		await connection.query(sql.updateUserCash, [user.cash - productItem.price, user.seq]);
	} catch(e) {
		console.log(e)
		next({
			status: 500,
			message: "데이터베이스 접속 오류"
		}); return;
	}

	res.send({
		message: "구매완료",
		product
	})
});

module.exports = router;