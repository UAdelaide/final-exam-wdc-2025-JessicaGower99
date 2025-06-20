var express = require('express');
var router = express.Router();
var db = require('../db');


// get dogs as json
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
      SELECT dog.name AS dog_name, dog.size, user.username AS owner_username
      FROM Dogs dog
      JOIN Users user ON dog.owner_id = user.user_id
    `);
        res.json(rows);
    } catch (err) {
        console.error("Database link error:", err); // try to debug db connection issue
        res.status(500).json({ error: 'Failed to get dogs (sad face).' });
    }
});

module.exports = router;
