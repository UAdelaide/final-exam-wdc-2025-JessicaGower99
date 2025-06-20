const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET all users (for admin/testing)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, username, email, role FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST a new user (simple signup)
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const [result] = await db.query(`
      INSERT INTO Users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `, [username, email, password, role]);

    res.status(201).json({ message: 'User registered', user_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  res.json(req.session.user);
});

// POST login
router.post('/login', async (req, res) => {
  const { username, password } = req.body; // chnaged from  email to username

  try {
    // want username and password from request body
    const [rows] = await db.query(`
      SELECT user_id, username, role FROM Users
      WHERE username = ? AND password_hash = ?
    `, [username, password]);

    // if nothing matches, then invalid
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // create a session for the user so the server can remember
    req.session.user = {
      id: rows[0].user_id,
      username: rows[0].username,
      role: rows[0].role
    };

    // assign role for redirection
    res.json({ message: 'Login successful', role: rows[0].role });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// logout of session and destroy the session cookie
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // get rid of session cookie
    res.json({ message: 'Logged out successfully' });
  });
});


//////////////////////////////////////////
router.get('/owners/dogs', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  const ownerId = req.session.user.id;

  try {
    const [dogs] = await db.query('SELECT dog_id, name FROM Dogs WHERE owner_id = ?', [ownerId]);
    res.json(dogs);
  } catch (error) {
    console.error('Failed to load dogs:', error);
    res.status(500).json({ error: 'Failed to load dogs' });
  }
});
///////////////////////////////////

module.exports = router;
