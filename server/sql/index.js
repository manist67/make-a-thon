module.exports = {
	insertUser: "insert into USER ( username, password, number ) values ( ? , ? , ? )",
	selectUserByNumber: "select * from USER where number = ? limit 1",
	selectUserByFingerprinter: "select * from USER where fingerprint = ? limit 1",
	updateUserWithFingerprint: "update USER set fingerprint = ? where seq = ?",
	insertAccessToken: "insert into ACCESS_TOKEN(user, access_token, expire) values (?, ?, ?)",
	insertHistory: "insert into HISTORY(user, product) values (?, ?)",
	selectUserByAccessToken: `select USER.seq as seq, USER.username, USER.cash from ACCESS_TOKEN left
							  join USER on USER.seq = ACCESS_TOKEN.user
							  where ACCESS_TOKEN.access_token = ?`,
	selectProductBySeq: "select * from PRODUCT where seq = ?",
	updateUserCash: "update USER set cash = ? where seq = ?"
}