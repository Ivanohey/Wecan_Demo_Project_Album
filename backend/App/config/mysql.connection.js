var mysql = require('mysql');
const { host } = require('./db.config');
const dbConfig = require('./db.config');

var mySqlConnection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

mySqlConnection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database at "+ dbConfig.host);
});

module.exports = mySqlConnection