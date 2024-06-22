import React, { useState } from 'react';

const ShipmentForm = () => {
    const [shipmentNo, setShipmentNo] = useState('');
    const [shipmentDate, setShipmentDate] = useState('');
    const [shipmentStatus, setShipmentStatus] = useState('RUNNING');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting shipment:', { shipment_no: shipmentNo, shipment_date: shipmentDate, shipment_status: shipmentStatus });
        const response = await fetch('/api/shipments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ shipment_no: shipmentNo, shipment_date: shipmentDate, shipment_status: shipmentStatus }),
        });

        if (response.ok) {
            console.log('Shipment added successfully');
            setShipmentNo('');
            setShipmentDate('');
            setShipmentStatus('RUNNING');
            setError('');
        } else {
            const data = await response.json();
            setError(data.error);
            console.error('Failed to add shipment:', data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Shipment</h2>
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
                Shipment Date:
                <input
                    type="date"
                    value={shipmentDate}
                    onChange={(e) => setShipmentDate(e.target.value)}
                    required
                />
            </label>
            <label>
                Shipment Status:
                <select
                    value={shipmentStatus}
                    onChange={(e) => setShipmentStatus(e.target.value)}
                    required
                >
                    <option value="RUNNING">RUNNING</option>
                    <option value="DONE">DONE</option>
                    <option value="CANCELLED">CANCELLED</option>
                </select>
            </label>
            <button type="submit">Add Shipment</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default ShipmentForm;
