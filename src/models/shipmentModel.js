const pool = require('../database/connection');

// Function to create a shipment record
async function createShipment(shipment) {
    const { shipment_no, shipment_date, shipment_status } = shipment;
    const query = `
    INSERT INTO shipments (shipment_no, shipment_date, shipment_status)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
    const values = [shipment_no, shipment_date, shipment_status];
    try {
        const res = await pool.query(query, values);
        return res.rows[0];
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

// Function to check if a shipment exists
async function shipmentExists(shipment_no) {
    const query = `
    SELECT * FROM shipments WHERE shipment_no = $1;
  `;
    const values = [shipment_no];
    try {
        const res = await pool.query(query, values);
        return res.rows[0];
    } catch (error) {
        console.error('Database error while checking shipment existence:', error);
        throw error;
    }
}

// Function to update the status of an existing shipment
async function updateShipmentStatus(shipment_no, shipment_status) {
    const query = `
    UPDATE shipments
    SET shipment_status = $2
    WHERE shipment_no = $1
    RETURNING *;
  `;
    const values = [shipment_no, shipment_status];
    try {
        const res = await pool.query(query, values);
        return res.rows[0];
    } catch (error) {
        console.error('Database error while updating shipment status:', error);
        throw error;
    }
}

// Function to update the status of previous running shipments
async function updatePreviousRunningShipments() {
    const query = `
    UPDATE shipments
    SET shipment_status = 'DONE'
    WHERE shipment_status = 'RUNNING';
  `;
    try {
        await pool.query(query);
    } catch (error) {
        console.error('Database error while updating previous running shipments:', error);
        throw error;
    }
}

module.exports = {
    createShipment,
    shipmentExists,
    updateShipmentStatus,
    updatePreviousRunningShipments,
};
