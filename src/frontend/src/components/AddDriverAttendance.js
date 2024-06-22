import React, { useState } from 'react';

const AddDriverAttendance = () => {
    const [driverCode, setDriverCode] = useState('');
    const [attendanceDate, setAttendanceDate] = useState('');
    const [attendanceStatus, setAttendanceStatus] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            driver_code: driverCode,
            attendance_date: attendanceDate,
            attendance_status: attendanceStatus
        };
        console.log('Submitting attendance:', payload);

        const response = await fetch('/api/driver-attendances', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            console.log('Attendance added successfully');
            setSuccess('Attendance added successfully');
            setDriverCode('');
            setAttendanceDate('');
            setAttendanceStatus(false);
            setError('');
        } else {
            const data = await response.json();
            setError(data.error);
            console.error('Failed to add attendance:', data.error);
            setSuccess('');
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
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
};

export default AddDriverAttendance;
