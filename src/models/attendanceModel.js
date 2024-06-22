const pool = require('../database/connection');

// Function to create an attendance record
async function createAttendance(attendance) {
    const { driver_code, attendance_date, attendance_status } = attendance;
    const query = `
    INSERT INTO driver_attendances (driver_code, attendance_date, attendance_status)
    VALUES ($1, $2, $3)
    ON CONFLICT (driver_code, attendance_date) DO NOTHING
    RETURNING *;
  `;
    const values = [driver_code, attendance_date, attendance_status];
    try {
        const res = await pool.query(query, values);
        return res.rows[0];
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

// Function to check if an attendance record exists
async function attendanceExists(driver_code, attendance_date) {
    const query = `
    SELECT 1 FROM driver_attendances WHERE driver_code = $1 AND attendance_date = $2;
  `;
    const values = [driver_code, attendance_date];
    try {
        const res = await pool.query(query, values);
        return res.rowCount > 0;
    } catch (error) {
        console.error('Database error while checking attendance existence:', error);
        throw error;
    }
}

module.exports = {
    createAttendance,
    attendanceExists,
};
