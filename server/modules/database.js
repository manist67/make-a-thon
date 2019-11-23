var mysql = require('mysql2/promise');

var connectionPool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	connectionLimit: 100,
	connectTimeout: 600000
});

module.exports = connectionPool;