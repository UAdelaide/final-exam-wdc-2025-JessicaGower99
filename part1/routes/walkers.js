var express = require('express');
var router = express.Router();
var db = require('../db');

// get walkers as json - path /api/walkers/summary'
router.get('/summary', async (requestAnimationFrame, res) => {
    try {
        const [rows] = await db.query('
            ');
            res.json(rows);
    }
})


module.exports = router;
