import React, { useState } from 'react';

const DriverAttendanceForm = () => {
    const [driverCode, setDriverCode] = useState('');
    const [attendanceDate, setAttendanceDate] = useState('');
    const [attendanceStatus, setAttendanceStatus] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting attendance:', { driver_code: driverCode, attendance_date: attendanceDate, attendance_status: attendanceStatus });
        const response = await fetch('/api/driver-attendances', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ driver_code: driverCode, attendance_date: attendanceDate, attendance_status: attendanceStatus }),
        });

        if (response.ok) {
            console.log('Attendance added successfully');
            setDriverCode('');
            setAttendanceDate('');
            setAttendanceStatus(false);
            setError('');
        } else {
            const data = await response.json();
            setError(data.error);
            console.error('Failed to add attendance:', data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Driver Attendance</h2>
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
                Attendance Date:
                <input
                    type="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                    required
                />
            </label>
            <label>
                Attendance Status:
                <input
                    type="checkbox"
                    checked={attendanceStatus}
                    onChange={(e) => setAttendanceStatus(e.target.checked)}
                />
            </label>
            <button type="submit">Add Attendance</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default DriverAttendanceForm;
