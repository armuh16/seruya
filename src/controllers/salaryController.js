const express = require('express');
const router = express.Router();
const salaryService = require('../services/salaryService');

router.get('/v1/salary/driver/list', async (req, res) => {
    const { month, year, current = 1, page_size = 10 } = req.query;
    console.log('GET /v1/salary/driver/list', { month, year, current, page_size }); // Log the request data
    try {
        const result = await salaryService.getDriverSalaries(month, year, current, page_size);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
