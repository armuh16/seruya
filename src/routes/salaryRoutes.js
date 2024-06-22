const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/salaryController');

router.use(salaryController);

module.exports = router;
