var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

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
      SELECT d.name AS dog_name, d.size, u.username AS owner_username
      FROM Dogs d
      JOIN Users u ON d.owner_id = u.user_id
    `);
        res.json(rows);
    } catch (err) {
        console.error("DATABASE ERROR:", err); // 
        res.status(500).json({ error: 'Failed to retrieve dogs.' });
    }
});
///////////////


module.exports = app;
