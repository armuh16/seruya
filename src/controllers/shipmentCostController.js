const express = require('express');
const router = express.Router();
const shipmentCostService = require('../services/shipmentCostService');

router.post('/shipment-costs', async (req, res) => {
    const { driver_code, shipment_no, total_costs, cost_status } = req.body;
    console.log('POST /shipment-costs', { driver_code, shipment_no, total_costs, cost_status }); // Log the request data

    try {
        const newShipmentCost = await shipmentCostService.addShipmentCost({ driver_code, shipment_no, total_costs, cost_status });
        res.status(201).json(newShipmentCost);
    } catch (error) {
        console.error('Error adding shipment cost:', error.message); // Log the error
        if (error.message === 'Shipment cost with this driver and shipment already exists with the same data') {
            res.status(409).json({ error: error.message }); // Conflict status for duplicates
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;
