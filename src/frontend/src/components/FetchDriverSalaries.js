import React, { useState, useEffect } from 'react';

const FetchDriverSalaries = () => {
    const [data, setData] = useState([]);
    const [month, setMonth] = useState('3');
    const [year, setYear] = useState('2024');
    const [current, setCurrent] = useState('1');
    const [pageSize, setPageSize] = useState('10');

    const fetchSalaries = async () => {
        const response = await fetch(`/api/v1/salary/driver/list?month=${month}&year=${year}&current=${current}&page_size=${pageSize}`);
        const result = await response.json();
        setData(result.data);
    };

    useEffect(() => {
        fetchSalaries();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchSalaries();
    };

    return (
        <div>
            <h2>Fetch Driver Salaries</h2>
            <form onSubmit={handleSubmit} className="text-center">
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
                    Current:
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
                {data.map((driver, index) => (
                    <tr key={index}>
                        <td>{driver.driver_code}</td>
                        <td>{driver.name}</td>
                        <td>{driver.total_pending}</td>
                        <td>{driver.total_confirmed}</td>
                        <td>{driver.total_paid}</td>
                        <td>{driver.total_attendance_salary}</td>
                        <td>{driver.total_salary}</td>
                        <td>{driver.count_shipment}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default FetchDriverSalaries;
