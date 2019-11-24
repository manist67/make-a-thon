var express = require('express');
var router = express.Router();

var pool = require('../modules/database');
var sql = require('../sql');

/* GET home page. */
router.get('/', async function(req, res, next) {
	const connection = await pool.getConnection(async conn => conn);

	const [rows] = await connection.query(sql.selectUser);
	
	if(rows[0].item !== 0) {
		await connection.query(sql.updateItemToZero);

		res.send({
			code: 0,
			id: rows[0].item
		});
	} else {
		res.status(200).send({
			code: -1
		});
	}

	connection.close();
});

router.post('/', async function(req, res, next) {
	const connection = await pool.getConnection(async conn => conn);
	const { idx } = req.body;
	await connection.query(sql.updateItemToItem, [ idx ]);

	res.send({})

	connection.close();
});

module.exports = router;
