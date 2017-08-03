const mysql = require("mysql");
const config = require("../config/config.json");
const mode = config.mode;
const db = config[mode].db;

const pool = mysql.createPool({
  connectionLimit: db.pool,
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.pwd,
  database: db.name,
  multipleStatements: true
});

function getConnection(cb) {
  pool.getConnection(function(err, connection) {
    if (err) {
      return cb(err);
    }
    cb(null, connection);
  });
};

function commit(connection, callback) {
  connection.commit(function(err) {
    if (err) {
      return connection.rollback(function() {
        connection.release();
        callback(err);
      });
    } else {
      connection.release();
      callback(null);
    }
  });
}

function rollback(connection) {
  connection.rollback(function() {
    connection.release();
  });
}

module.exports = {
  getConnection,
  rollback,
  commit
};
