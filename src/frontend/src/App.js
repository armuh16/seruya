import React, { useState } from 'react';
import NavigationMenu from './components/NavigationMenu';
import FetchDriverSalaries from './components/FetchDriverSalaries';
import AddDriverAttendance from './components/AddDriverAttendance';
import AddShipmentCost from './components/AddShipmentCost';
import AddDriver from './components/AddDriver';

const App = () => {
    const [selectedAction, setSelectedAction] = useState(null);

    const renderComponent = () => {
        switch (selectedAction) {
            case 'fetchDriverSalaries':
                return <FetchDriverSalaries />;
            case 'addDriverAttendance':
                return <AddDriverAttendance />;
            case 'addShipmentCost':
                return <AddShipmentCost />;
            case 'addDriver':
                return <AddDriver />;
            default:
                return <p>Please select an action from the menu.</p>;
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Driver Management</h1>
            </header>
            <NavigationMenu setSelectedAction={setSelectedAction} />
            <div className="content">
                {renderComponent()}
            </div>
        </div>
    );
};

export default App;
