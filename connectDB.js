const mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "scott",
	password: "tiger",
	database: "S20caebo"
});

module.exports = {
    con: con,
    mysql: mysql
};