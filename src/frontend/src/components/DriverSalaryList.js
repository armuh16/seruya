import React, { useState, useEffect } from 'react';

const DriverSalaryList = () => {
    const [salaries, setSalaries] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const pageSize = 10;

    useEffect(() => {
        const fetchSalaries = async () => {
            try {
                const response = await fetch(`/api/v1/salary/driver/list?month=3&year=2024&current=${currentPage}&page_size=${pageSize}`);
                const data = await response.json();
                setSalaries(data.data);
                setTotalRows(data.total_row);
            } catch (err) {
                setError('Failed to fetch salaries');
                console.error('Error fetching salaries:', err);
            }
        };

        fetchSalaries();
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage * pageSize < totalRows) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <h2>Driver Salaries</h2>
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
            <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={handleNextPage} disabled={currentPage * pageSize >= totalRows}>Next</button>
            </div>
        </div>
    );
};

export default DriverSalaryList;
