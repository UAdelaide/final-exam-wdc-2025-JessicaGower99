const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/owners/dogs', async (req, res) => {
    const ownerId = req.session.user?.id; // get the loggin user/ownerid

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



////////////

// GET /api/dogs - Returns all dogs
// dogRoutes.js
router.get('/', async (req, res) => {
  console.log('GET /api/dogs hit');
  try {
    const [dogs] = await db.query('SELECT dog_id, name, size, owner_id FROM Dogs');
    res.json(dogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get dogs' });
  }
});
////////////////////////////
module.exports = router;
