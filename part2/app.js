const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session'); // for session managemnt

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

// session managemnt
app.use(session({
    secret: 'this_is_secret',
    resave: false,
    saveUninitialized: false, // so wasted session on those thta visit but dont loggin
    cookie: {
        secure: false, // true if using HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 // 1 hour
    }
}));
}));

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;