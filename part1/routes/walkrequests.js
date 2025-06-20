var express = require('express');
var router = express.Router();
var db = require('../db');

// get open walk requests - path /api/walkrequests/open
router.get('/open', async (req, res) => {

    try {   const [rows] = await db.query(`
      SELECT wr.id, wr.date, wr.time, d.name AS dog_name
      FROM WalkRequests wr
      JOIN Dogs d ON wr.dog_id = d.dog_id
      WHERE wr.status = 'open'
    `);} catch (err) { }
});


module.exports = router;