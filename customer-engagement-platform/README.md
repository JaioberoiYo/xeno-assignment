# Customer Engagement Platform

A platform for managing customer data and creating targeted campaigns.

## MySQL Database Setup

This project uses MySQL for storing campaign and customer data. Follow these steps to set up the database:

### Prerequisites

1. Install MySQL Server on your machine
2. Create a MySQL user or use the root account (not recommended for production)

### Configuration

1. Create a `.env.local` file in the root directory with the following content:

```
MYSQL_HOST=localhost
MYSQL_USER=your_mysql_username
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=customer_engagement
```

Replace the values with your MySQL credentials.

### Database Initialization

Run the database setup script:

```bash
npm run setup-db
```

This script will:
1. Create the `customer_engagement` database if it doesn't exist
2. Create the necessary tables (customers, campaigns)
3. Insert sample data

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Customer management
- Campaign creation and tracking
- API documentation 