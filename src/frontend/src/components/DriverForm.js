import React, { useState } from 'react';

const DriverForm = () => {
    const [driverCode, setDriverCode] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting driver:', { driver_code: driverCode, name }); // Log form submission
        const response = await fetch('/api/drivers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ driver_code: driverCode, name }),
        });

        if (response.ok) {
            console.log('Driver added successfully'); // Log success
            setDriverCode('');
            setName('');
            setError('');
        } else {
            const data = await response.json();
            setError(data.error); // Set error message
            console.error('Failed to add driver:', data.error); // Log failure
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Driver Code"
                value={driverCode}
                onChange={(e) => setDriverCode(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <button type="submit">Add Driver</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default DriverForm;
