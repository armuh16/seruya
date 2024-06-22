-- Create drivers table
CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    driver_code VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL
);

-- Create driver_attendances table
CREATE TABLE driver_attendances (
    id SERIAL PRIMARY KEY,
    driver_code VARCHAR(255) REFERENCES drivers(driver_code),
    attendance_date DATE NOT NULL,
    attendance_status BOOLEAN NOT NULL,
    CONSTRAINT unique_attendance UNIQUE (driver_code, attendance_date)
);

-- Create shipments table
CREATE TABLE shipments (
    shipment_no VARCHAR(255) PRIMARY KEY,
    shipment_date DATE NOT NULL,
    shipment_status VARCHAR(255) NOT NULL CHECK (shipment_status IN ('RUNNING', 'DONE', 'CANCELLED'))
);

-- Create shipment_costs table
CREATE TABLE shipment_costs (
    id SERIAL PRIMARY KEY,
    driver_code VARCHAR(255) REFERENCES drivers(driver_code),
    shipment_no VARCHAR(255) REFERENCES shipments(shipment_no),
    total_costs DECIMAL(10, 2) NOT NULL,
    cost_status VARCHAR(255) NOT NULL CHECK (cost_status IN ('PENDING', 'CONFIRMED', 'PAID')),
    CONSTRAINT unique_shipment_costs UNIQUE (driver_code, shipment_no)
);

-- Create variable_configs table
CREATE TABLE variable_configs (
    key VARCHAR(255) PRIMARY KEY,
    value INTEGER
);
