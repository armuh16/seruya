const pool = require('../database/connection');

async function createDriver(driver) {
    const { driver_code, name } = driver;
    const query = `
    INSERT INTO drivers (driver_code, name)
    VALUES ($1, $2)
    ON CONFLICT (driver_code) DO NOTHING
    RETURNING *;
  `;
    const values = [driver_code, name];
    const res = await pool.query(query, values);
    return res.rows[0];
}

module.exports = {
    createDriver,
};
