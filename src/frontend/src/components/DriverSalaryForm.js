import React, { useState } from 'react';

const DriverSalaryForm = () => {
    const [month, setMonth] = useState(3);
    const [year, setYear] = useState(2024);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [salaries, setSalaries] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/v1/salary/driver/list?month=${month}&year=${year}&current=${current}&page_size=${pageSize}`);
            const data = await response.json();
            setSalaries(data.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch salaries');
            console.error('Error fetching salaries:', err);
        }
    };

    return (
        <div>
            <h2>Fetch Driver Salaries</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Month:
                    <input
                        type="number"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Year:
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Current Page:
                    <input
                        type="number"
                        value={current}
                        onChange={(e) => setCurrent(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Page Size:
                    <input
                        type="number"
                        value={pageSize}
                        onChange={(e) => setPageSize(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Fetch Salaries</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                <tr>
                    <th>Driver Code</th>
                    <th>Name</th>
                    <th>Total Pending</th>
                    <th>Total Confirmed</th>
                    <th>Total Paid</th>
                    <th>Total Attendance Salary</th>
                    <th>Total Salary</th>
                    <th>Count Shipment</th>
                </tr>
                </thead>
                <tbody>
                {salaries.map((salary, index) => (
                    <tr key={index}>
                        <td>{salary.driver_code}</td>
                        <td>{salary.name}</td>
                        <td>{salary.total_pending}</td>
                        <td>{salary.total_confirmed}</td>
                        <td>{salary.total_paid}</td>
                        <td>{salary.total_attendance_salary}</td>
                        <td>{salary.total_salary}</td>
                        <td>{salary.count_shipment}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DriverSalaryForm;
