module.exports = {
	insertUser: "insert into USER ( username, password, number ) values ( ? , ? , ? )",
	selectUserByNumber: "select * from USER where number = ? limit 1",
	updateUserWithFingerprint: "update USER set fingerprint = ? where seq = ?"
}