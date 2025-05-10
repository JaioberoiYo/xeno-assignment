-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS customer_engagement;

USE customer_engagement;

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  total_spend DECIMAL(10, 2) DEFAULT 0,
  total_orders INT DEFAULT 0,
  last_order_date DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  audience_size INT DEFAULT 0,
  sent INT DEFAULT 0,
  failed INT DEFAULT 0,
  status ENUM('DRAFT', 'SENDING', 'PROCESSING', 'COMPLETED', 'FAILED') DEFAULT 'DRAFT'
);

-- Insert sample data for customers (using INSERT IGNORE to handle existing records)
INSERT IGNORE INTO customers (id, name, email, phone, total_spend, total_orders, last_order_date, created_at)
VALUES
  ('cust_123', 'John Doe', 'john@example.com', '+1234567890', 1250.50, 5, '2023-05-15 10:30:00', '2023-01-10 08:15:00'),
  ('cust_456', 'Jane Smith', 'jane@example.com', '+1987654321', 850.75, 3, '2023-04-20 14:45:00', '2023-02-15 09:30:00');

-- Insert sample data for campaigns (using INSERT IGNORE to handle existing records)
INSERT IGNORE INTO campaigns (id, name, created_at, audience_size, sent, failed, status)
VALUES
  ('camp_1', 'Summer Sale Promotion', '2023-05-15 10:30:00', 1250, 1125, 125, 'COMPLETED'),
  ('camp_2', 'New Product Launch', '2023-05-20 14:45:00', 2500, 2300, 200, 'COMPLETED'),
  ('camp_3', 'Customer Reactivation', '2023-05-25 09:15:00', 750, 700, 50, 'COMPLETED'),
  ('camp_4', 'Loyalty Program', '2023-06-01 11:00:00', 500, 450, 50, 'COMPLETED'),
  ('camp_5', 'Flash Sale Announcement', '2023-06-05 16:30:00', 1800, 1620, 180, 'COMPLETED'); 