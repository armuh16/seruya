const { Pool } = require('pg');
const pool = require('../database/connection');

// Driver model definition
const createDriver = async (driver) => {
    const { driver_code, name } = driver;
    const query = `
    INSERT INTO drivers (driver_code, name)
    VALUES ($1, $2)
    RETURNING *;
  `;
    const values = [driver_code, name];
    const res = await pool.query(query, values);
    return res.rows[0];
};

const getAllDrivers = async () => {
    const query = 'SELECT * FROM drivers';
    const res = await pool.query(query);
    return res.rows;
};

module.exports = {
    createDriver,
    getAllDrivers,
};
