module.exports = {
	insertUser: "insert into USER ( username, password, number ) values ( ? , ? , ? )",
	selectUserByNumber: "select * from USER where number = ? limit 1",
	selectUserByFingerprinter: "select * from USER where fingerprint = ? limit 1",
	updateUserWithFingerprint: "update USER set fingerprint = ? where seq = ?",
	insertAccessToken: "insert into ACCESS_TOKEN(user, access_token, expire) values (?, ?, ?)"
}