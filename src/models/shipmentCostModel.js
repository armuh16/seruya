const pool = require('../database/connection');

// Function to create a shipment cost record
async function createShipmentCost(shipmentCost) {
    const { driver_code, shipment_no, total_costs, cost_status } = shipmentCost;
    const query = `
    INSERT INTO shipment_costs (driver_code, shipment_no, total_costs, cost_status)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (driver_code, shipment_no) DO NOTHING
    RETURNING *;
  `;
    const values = [driver_code, shipment_no, total_costs, cost_status];
    try {
        const res = await pool.query(query, values);
        return res.rows[0];
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

// Function to check if a shipment cost exists
async function shipmentCostExists(driver_code, shipment_no) {
    const query = `
    SELECT * FROM shipment_costs WHERE driver_code = $1 AND shipment_no = $2;
  `;
    const values = [driver_code, shipment_no];
    try {
        const res = await pool.query(query, values);
        return res.rows[0];
    } catch (error) {
        console.error('Database error while checking shipment cost existence:', error);
        throw error;
    }
}

// Function to update a shipment cost record
async function updateShipmentCost(driver_code, shipment_no, total_costs, cost_status) {
    const query = `
    UPDATE shipment_costs
    SET total_costs = $3, cost_status = $4
    WHERE driver_code = $1 AND shipment_no = $2
    RETURNING *;
  `;
    const values = [driver_code, shipment_no, total_costs, cost_status];
    try {
        const res = await pool.query(query, values);
        return res.rows[0];
    } catch (error) {
        console.error('Database error while updating shipment cost:', error);
        throw error;
    }
}

module.exports = {
    createShipmentCost,
    shipmentCostExists,
    updateShipmentCost,
};
