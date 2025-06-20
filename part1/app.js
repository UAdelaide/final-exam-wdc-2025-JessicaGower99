var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dogsRouter = require('./routes/dogs');


var app = express();
var db = require('./db'); //////////////////////////

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dogs', ')


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


// /////////////////
// //get dogs as json
// app.get('/api/dogs', async (req, res) => {
//     try {
//         const [rows] = await db.query(`
//       SELECT dog.name AS dog_name, dog.size, user.username AS owner_username
//       FROM Dogs dog
//       JOIN Users user ON dog.owner_id = user.user_id
//     `);
//         res.json(rows);
//     } catch (err) {
//         console.error("DATABASE CONNECTION ERROR:", err); // try to debug db connection issue
//         res.status(500).json({ error: 'Failed to retrieve dogs.' });
//     }
// });
// ///////////////


module.exports = app;