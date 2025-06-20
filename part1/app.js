var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2/promise');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var db = require('./db'); //////////////////////////



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/////////////////
//get dogs as json
app.get('/api/dogs', async (req, res) => {
    try {
        const [rows] = await db.query(`
      SELECT dog.name AS dog_name, dog.size, user.username AS owner_username
      FROM Dogs dog
      JOIN Users user ON dog.owner_id = user.user_id
    `);
        res.json(rows);
    } catch (err) {
        console.error("DATABASE ERROR:", err); // try to debug db connection issue
        res.status(500).json({ error: 'Failed to retrieve dogs.' });
    }
});
///////////////


module.exports = app;
