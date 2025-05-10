const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'test123',
  database: 'crm_db'
});

module.exports = db;
