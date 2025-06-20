var express = require('express');
var router = express.Router();
var db = require('../db');

// get walkers as json - path /api/walkers/summary'
router.get('/summary', async (requestAnimationFrame, res) => {
    try {
        const [rows] = await db.query('
            SELECT
        user.username AS walker_username,
        COUNT(r.rating_id) AS total_ratings,
            ');
            res.json(rows);
    } catch (err) {
        console.error("Dang, database error when retrieving walkers:", err); // try to debug db connection issue
        res.status(500).json({ error: 'Failed to get walkers (really big sad face).' });
    }
});

module.exports = router;
