const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mypassword',
    database: 'textbook_marketplace'
});

module.exports = db;
