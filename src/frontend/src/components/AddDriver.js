import React, { useState } from 'react';

const AddDriver = () => {
    const [driverCode, setDriverCode] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            driver_code: driverCode,
            name: name
        };
        console.log('Submitting driver:', payload);

        const response = await fetch('/api/drivers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            console.log('Driver added successfully');
            setSuccess('Driver added successfully');
            setDriverCode('');
            setName('');
            setError('');
        } else {
            const data = await response.json();
            setError(data.error);
            console.error('Failed to add driver:', data.error);
            setSuccess('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Driver</h2>
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
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Add Driver</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
};

export default AddDriver;
