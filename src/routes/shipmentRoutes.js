const express = require('express');
const router = express.Router();
const shipmentController = require('../controllers/shipmentController');

router.use(shipmentController);

module.exports = router;
