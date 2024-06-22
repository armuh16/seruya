import React from 'react';
import DriverForm from './components/DriverForm';
import DriverList from './components/DriverList';
import DriverSalaryForm from './components/DriverSalaryForm';
import DriverAttendanceForm from './components/DriverAttendanceForm';
import ShipmentForm from './components/ShipmentForm';
import ShipmentCostForm from './components/ShipmentCostForm';

const App = () => (
    <div className="container">
        <header>
            <h1>Driver Management</h1>
        </header>
        <DriverForm />
        <DriverList />
        <DriverSalaryForm />
        <DriverAttendanceForm />
        <ShipmentForm />
        <ShipmentCostForm />
    </div>
);

export default App;
