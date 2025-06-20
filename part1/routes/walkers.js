var express = require('express');
var router = express.Router();
var db = require('../db');

// get walkers as json - path /api/walkers/summary'
router.get('/summary', async (req, res) => {
  try {
    const [rows] = await db.query(`
    SELECT
        u.username AS walker_username,
        COUNT(wr.rating_id) AS total_ratings,
        ROUND(AVG(wr.rating), 1) AS average_rating,
        COUNT(CASE WHEN req.status = 'completed' THEN 1 END) AS completed_walks
      FROM Users u
      LEFT JOIN WalkRatings wr ON u.user_id = wr.walker_id
      LEFT JOIN WalkRequests req ON req.request_id = wr.request_id
      WHERE u.role = 'walker'
      GROUP BY u.user_id
    `);
    res.json(rows);
  } catch (err) {
    console.error("Dang, database error when retrieving walkers:", err); // try to debug db connection issue
    res.status(500).json({ error: 'Failed to get walkers (really big sad face).' });
  }
});

module.exports = router;
