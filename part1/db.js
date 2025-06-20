const mysql = require(‘mysql2/promise’);
const db = mysql.createPool({
	Host: ‘localhost’,
	User: ‘root’,
password: ‘mypassword’,
database: ‘textbook_marketplace’});
Module.exports =db;
