const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'chat',
    password: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

module.exports = pool;