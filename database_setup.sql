-- Create database
CREATE DATABASE IF NOT EXISTS theracis;

-- Use the database
USE theracis;

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    appointment_date DATE NOT NULL,
    department VARCHAR(255) NOT NULL,
    doctor VARCHAR(255) NOT NULL,
    comments TEXT
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Insert sample data into appointments table
INSERT INTO appointments (first_name, email, phone, gender, appointment_date, department, doctor, comments)
VALUES 
('John Doe', 'john.doe@example.com', '1234567890', 'Male', '2023-10-01', 'Cardiology', 'Dr. Smith', 'Follow-up visit'),
('Jane Smith', 'jane.smith@example.com', '0987654321', 'Female', '2023-10-02', 'Dermatology', 'Dr. Brown', 'Initial consultation');

-- Insert sample data into users table
INSERT INTO users (name, email, password)
VALUES 
('Admin User', 'admin@example.com', 'admin123'),
('Test User', 'test@example.com', 'test123');