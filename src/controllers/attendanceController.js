const express = require('express');
const router = express.Router();
const attendanceService = require('../services/attendanceService');

router.post('/driver-attendances', async (req, res) => {
    const { driver_code, attendance_date, attendance_status } = req.body;
    console.log('POST /driver-attendances', { driver_code, attendance_date, attendance_status }); // Log the request data
    try {
        const newAttendance = await attendanceService.addAttendance({ driver_code, attendance_date, attendance_status });
        res.status(201).json(newAttendance);
    } catch (error) {
        console.error('Error adding attendance:', error.message); // Log the error
        if (error.message === 'Attendance record already exists') {
            res.status(409).json({ error: error.message }); // Conflict status for duplicates
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;
