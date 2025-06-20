var express = require('express');
var router = express.Router();
var db = require('../db');

// get walkers as json - path /api/walkers/summary'
router.get('/summary', async (req, res) => {
  try {
    const [rows] = await db.query(`
    SELECT
        user.username AS walker_username,
        COUNT(wrate.rating_id) AS total_ratings,
        ROUND(AVG(wrate.rating), 1) AS average_rating,
        COUNT(CASE WHEN req.status = 'completed' THEN 1 END) AS completed_walks
      FROM Users user
      LEFT JOIN WalkRatings wrate ON user.user_id = wrate.walker_id
      LEFT JOIN WalkRequests req ON req.request_id = wrate.request_id
      WHERE user.role = 'walker'
      GROUP BY user.user_id
    `);
    res.json(rows);
  } catch (err) {
    console.error("Dang, database error when retrieving walkers:", err); // try to debug db connection issue
    res.status(500).json({ error: 'Failed to get walkers (really big sad face).' });
  }
});

module.exports = router;
