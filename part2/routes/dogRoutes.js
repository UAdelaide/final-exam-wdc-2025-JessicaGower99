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

// get request to return all dogs and their details from the db and stores in the 'dogs' array
router.get('/dogs', async (req, res) => {
    try {
        const [dogs] = await db.query('SELECT dog_id, name, size, owner_id FROM Dogs');
        res.json(dogs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get dogs' });
    }
});

module.exports = router;
