var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dogsRouter = require('./routes/dogs');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dogs', dogsRouter); /////////////////////


// //debug connection
// (async () => {
//     try {
//         const connection = await mysql.createConnection({
//             host: 'localhost',
//             user: 'root',
//             password: '' // your password here
//         });

//         await connection.query('CREATE DATABASE IF NOT EXISTS DogWalkService');
//         await connection.end();

//         db = await mysql.createConnection({
//             host: 'localhost',
//             user: 'root',
//             password: '',
//             database: 'DogWalkService'
//         });

//         await db.execute(`
//       CREATE TABLE IF NOT EXISTS Users (
//         user_id INT AUTO_INCREMENT PRIMARY KEY,
//         username VARCHAR(255),
//         email VARCHAR(255),
//         password_hash VARCHAR(255),
//         role VARCHAR(50),
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `);

//         await db.execute(`
//       CREATE TABLE IF NOT EXISTS Dogs (
//         dog_id INT AUTO_INCREMENT PRIMARY KEY,
//         owner_id INT,
//         name VARCHAR(255),
//         size VARCHAR(50),
//         FOREIGN KEY (owner_id) REFERENCES Users(user_id)
//       )
//     `);

//         // Insert sample users/dogs if needed...
//     } catch (err) {
//         console.error('DB Setup error:', err);
//     }
// })();


module.exports = app;
