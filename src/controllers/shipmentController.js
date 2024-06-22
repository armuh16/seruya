const express = require('express');
const router = express.Router();
const shipmentService = require('../services/shipmentService');

router.post('/shipments', async (req, res) => {
    const { shipment_no, shipment_date, shipment_status } = req.body;
    console.log('POST /shipments', { shipment_no, shipment_date, shipment_status }); // Log the request data

    try {
        const newShipment = await shipmentService.addShipment({ shipment_no, shipment_date, shipment_status });
        res.status(201).json(newShipment);
    } catch (error) {
        console.error('Error adding shipment:', error.message); // Log the error
        if (error.message === 'Shipment with this number already exists') {
            res.status(409).json({ error: error.message }); // Conflict status for duplicates
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;
