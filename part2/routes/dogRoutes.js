const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/owners/dogs', async (req, res) => {
 const ownerId = req.session.user?.id;

  if (!ownerId) {
    return res.status(401).json({ error: 'Not logged in' });
  }
    try {
        const [dogs] = await db.query('SELECT dog_id, name FROM Dogs WHERE owner_id = ?', [ownerId]);
        res.json(dogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to load dogs' });
    }
});

module.exports = router;
