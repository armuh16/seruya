import React, { useState, useEffect } from 'react';

const DriverList = () => {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        const fetchDrivers = async () => {
            const response = await fetch('/api/drivers');
            const data = await response.json();
            setDrivers(data);
        };

        fetchDrivers();
    }, []);

    return (
        <ul>
            {drivers.map((driver) => (
                <li key={driver.driver_code}>{driver.name}</li>
            ))}
        </ul>
    );
};

export default DriverList;
