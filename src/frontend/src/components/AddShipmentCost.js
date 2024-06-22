import React, { useState } from 'react';

const AddShipmentCost = () => {
    const [driverCode, setDriverCode] = useState('');
    const [shipmentNo, setShipmentNo] = useState('');
    const [totalCosts, setTotalCosts] = useState('');
    const [costStatus, setCostStatus] = useState('PENDING');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            driver_code: driverCode,
            shipment_no: shipmentNo,
            total_costs: parseFloat(totalCosts),
            cost_status: costStatus
        };
        console.log('Submitting shipment cost:', payload);

        const response = await fetch('/api/shipment-costs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            console.log('Shipment cost added successfully');
            setSuccess('Shipment cost added successfully');
            setDriverCode('');
            setShipmentNo('');
            setTotalCosts('');
            setCostStatus('PENDING');
            setError('');
        } else {
            const data = await response.json();
            setError(data.error);
            console.error('Failed to add shipment cost:', data.error);
            setSuccess('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Shipment Cost</h2>
            <label>
                Driver Code:
                <input
                    type="text"
                    value={driverCode}
                    onChange={(e) => setDriverCode(e.target.value)}
                    required
                />
            </label>
            <label>
                Shipment No:
                <input
                    type="text"
                    value={shipmentNo}
                    onChange={(e) => setShipmentNo(e.target.value)}
                    required
                />
            </label>
            <label>
                Total Costs:
                <input
                    type="number"
                    step="0.01"
                    value={totalCosts}
                    onChange={(e) => setTotalCosts(e.target.value)}
                    required
                />
            </label>
            <label>
                Cost Status:
                <select
                    value={costStatus}
                    onChange={(e) => setCostStatus(e.target.value)}
                    required
                >
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="PAID">PAID</option>
                </select>
            </label>
            <button type="submit">Add Shipment Cost</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
};

export default AddShipmentCost;
