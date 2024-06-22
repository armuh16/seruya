const express = require('express');
const router = express.Router();
const shipmentCostController = require('../controllers/shipmentCostController');

router.use(shipmentCostController);

module.exports = router;