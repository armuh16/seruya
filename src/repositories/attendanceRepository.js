const pool = require('../database/connection');

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
        console.log('Database response:', res.rows);
        return res.rows[0];
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

module.exports = {
    createAttendance,
};
