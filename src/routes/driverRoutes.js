const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

router.use(driverController);

module.exports = router;