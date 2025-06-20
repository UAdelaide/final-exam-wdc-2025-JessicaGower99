var express = require('express');
var router = express.Router();
var db = require('../db');

// get open walk requests - path /api/walkrequests/open
router.get('/open', async (req, res) => {

    try {
        const [rows] = await db.query(`
       SELECT
        walkreq.request_id,
        dog.name AS dog_name,
        walkreq.requested_time,
        walkreq.duration_minutes,
        walkreq.location,
        user.username AS owner_username
      FROM WalkRequests walkreq
      JOIN Dogs dog ON walkreq.dog_id = dog.dog_id
      JOIN Users user ON dog.owner_id = user.user_id
      WHERE walkreq.status = 'open'
    `);
        res.json(rows);
    } catch (err) {
        console.error("ERRRR error fetching walk requests:", err); // try to debug db connection issue
        res.status(500).json({ error: 'Failed to get walk requests (big sad face).' });
    }
});

module.exports = router;
