const express = require('express');
const router = express.Router();
const driverService = require('../services/driverService');

router.post('/drivers', async (req, res) => {
    const { driver_code, name } = req.body;
    console.log('POST /drivers', { driver_code, name }); // Log the request data
    try {
        const newDriver = await driverService.addDriver({ driver_code, name });
        res.status(201).json(newDriver);
    } catch (error) {
        console.error('Error adding driver:', error.message); // Log the error
        if (error.message === 'Driver with this code already exists') {
            res.status(409).json({ error: error.message }); // Conflict status for duplicates
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;
