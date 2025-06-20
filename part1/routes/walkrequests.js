var express = require('express');
var router = express.Router();
var db = require('../db');

// get open walk requests - path /api/walkrequests/open
router.get('/open', async (req, res) => {

    try {
        const [rows] = await db.query(`
      SELECT walkreq.id, walkreq.date, walkreq.time, dog.name AS dog_name
      FROM WalkRequests walkreq
      JOIN Dogs dog ON walkreq.dog_id = dog.dog_id
      WHERE walkreq.status = 'open'
    `);
    } catch (err) { }
});


module.exports = router;