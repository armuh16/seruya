const pool = require('../database/connection');
async function fetchDriverSalaries(month, year, offset, limit) {
    const query = `
    SELECT d.driver_code, d.name,
           COALESCE(SUM(sc.total_costs) FILTER (WHERE sc.cost_status = 'PENDING'), 0) AS total_pending,
           COALESCE(SUM(sc.total_costs) FILTER (WHERE sc.cost_status = 'CONFIRMED'), 0) AS total_confirmed,
           COALESCE(SUM(sc.total_costs) FILTER (WHERE sc.cost_status = 'PAID'), 0) AS total_paid,
           COALESCE(SUM(sa.salary), 0) AS total_attendance_salary,
           COALESCE(SUM(sc.total_costs) + SUM(sa.salary), 0) AS total_salary,
           COUNT(sc.shipment_no) AS count_shipment
    FROM drivers d
    LEFT JOIN shipment_costs sc ON d.driver_code = sc.driver_code
    LEFT JOIN (SELECT driver_code, SUM(attendance_status::int) * 100000 AS salary
               FROM driver_attendances
               WHERE EXTRACT(MONTH FROM attendance_date) = $1 AND EXTRACT(YEAR FROM attendance_date) = $2
               GROUP BY driver_code) sa ON d.driver_code = sa.driver_code
    LEFT JOIN shipments s ON sc.shipment_no = s.shipment_no
    WHERE EXTRACT(MONTH FROM s.shipment_date) = $1 AND EXTRACT(YEAR FROM s.shipment_date) = $2
    GROUP BY d.driver_code, d.name
    ORDER BY d.driver_code
    OFFSET $3 LIMIT $4;
  `;
    const values = [month, year, offset, limit];
    const res = await pool.query(query, values);
    return res.rows;
}

async function countDriverSalaries(month, year) {
    const query = `
    SELECT COUNT(DISTINCT d.driver_code) AS total_row
    FROM drivers d
    LEFT JOIN shipment_costs sc ON d.driver_code = sc.driver_code
    LEFT JOIN shipments s ON sc.shipment_no = s.shipment_no
    WHERE EXTRACT(MONTH FROM s.shipment_date) = $1 AND EXTRACT(YEAR FROM s.shipment_date) = $2;
  `;
    const values = [month, year];
    const res = await pool.query(query, values);
    return res.rows[0].total_row;
}

module.exports = {
    fetchDriverSalaries,
    countDriverSalaries,
};
