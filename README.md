# Express.js Clean Architecture Project

This project is an Express.js application with a clean architecture design to manage driver salaries, attendance, and shipment data using a PostgreSQL database.

## Environment Variables

Create a `.env` file in the root directory with the following environment variables:

DATABASE_URL=your_database_url
PORT=3000

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/armuh16/seruya.git

2. **Install dependencies:**
   ```bash
   npm install
3. **Setup the database:**
   ```bash
   Ensure PostgreSQL is running and accessible via DATABASE_URL in your .env file.
4. **Run the migrations:**
    ```bash
   npm run migrate
5. **Start the server:**
    ```bash
   npm start

## API Endpoints

**Get Driver Salaries**
```bash
GET /api/v1/salary/driver/list?month=4&year=2024&current=1&page_size=10

Response :

{
    "data": [
        {
            "driver_code": "DRIVER002",
            "name": "Driver Name 2",
            "total_pending": "0",
            "total_confirmed": "0",
            "total_paid": "4700000.00",
            "total_attendance_salary": "0",
            "total_salary": "4700000.00",
            "count_shipment": "1"
        },
        {
            "driver_code": "DRIVER003",
            "name": "Driver Name 3",
            "total_pending": "0",
            "total_confirmed": "3300000.00",
            "total_paid": "0",
            "total_attendance_salary": "0",
            "total_salary": "0",
            "count_shipment": "1"
        },
        {
            "driver_code": "DRIVER006",
            "name": "Driver Name 6",
            "total_pending": "0",
            "total_confirmed": "12600000.00",
            "total_paid": "0",
            "total_attendance_salary": "0",
            "total_salary": "0",
            "count_shipment": "3"
        },
        {
            "driver_code": "DRIVER007",
            "name": "Driver Name 7",
            "total_pending": "0",
            "total_confirmed": "0",
            "total_paid": "5900000.00",
            "total_attendance_salary": "0",
            "total_salary": "5900000.00",
            "count_shipment": "1"
        },
        {
            "driver_code": "DRIVER009",
            "name": "Driver Name 9",
            "total_pending": "2000000.00",
            "total_confirmed": "0",
            "total_paid": "0",
            "total_attendance_salary": "0",
            "total_salary": "0",
            "count_shipment": "1"
        },
        {
            "driver_code": "DRIVER011",
            "name": "Driver Name 11",
            "total_pending": "7900000.00",
            "total_confirmed": "0",
            "total_paid": "0",
            "total_attendance_salary": "0",
            "total_salary": "7900000.00",
            "count_shipment": "1"
        },
        {
            "driver_code": "DRIVER012",
            "name": "Driver Name 12",
            "total_pending": "23200000.00",
            "total_confirmed": "0",
            "total_paid": "500000.00",
            "total_attendance_salary": "0",
            "total_salary": "0",
            "count_shipment": "5"
        },
        {
            "driver_code": "DRIVER016",
            "name": "Driver Name 16",
            "total_pending": "4200000.00",
            "total_confirmed": "0",
            "total_paid": "5500000.00",
            "total_attendance_salary": "0",
            "total_salary": "9700000.00",
            "count_shipment": "2"
        },
        {
            "driver_code": "DRIVER019",
            "name": "Driver Name 19",
            "total_pending": "2400000.00",
            "total_confirmed": "5900000.00",
            "total_paid": "0",
            "total_attendance_salary": "0",
            "total_salary": "8300000.00",
            "count_shipment": "2"
        },
        {
            "driver_code": "DRIVER020",
            "name": "Driver Name 20",
            "total_pending": "1600000.00",
            "total_confirmed": "0",
            "total_paid": "2000000.00",
            "total_attendance_salary": "0",
            "total_salary": "3600000.00",
            "count_shipment": "2"
        }
    ],
    "total_row": "19",
    "current": 1,
    "page_size": 10
}

curl -X GET "http://localhost:3000/api/v1/salary/driver/list?month=3&year=2024&current=1&page_size=10" -H "Content-Type: application/json"

