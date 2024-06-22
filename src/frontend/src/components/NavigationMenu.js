import React from 'react';

const NavigationMenu = ({ setSelectedAction }) => {
    return (
        <nav className="navigation-menu">
            <button onClick={() => setSelectedAction('fetchDriverSalaries')}>Fetch Driver Salaries</button>
            <button onClick={() => setSelectedAction('addDriverAttendance')}>Add Driver Attendance</button>
            <button onClick={() => setSelectedAction('addShipmentCost')}>Add Shipment Cost</button>
            <button onClick={() => setSelectedAction('addDriver')}>Add Driver</button>
            {/* Add more buttons for other actions as needed */}
        </nav>
    );
};

export default NavigationMenu;
