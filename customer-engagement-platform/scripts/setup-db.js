const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  console.log('Setting up database...');
  
  // Read database credentials from .env.local if it exists
  let host = 'localhost';
  let user = 'root';
  let password = 'test123';
  let database = 'customer_engagement';
  
  try {
    if (fs.existsSync('.env.local')) {
      const envContent = fs.readFileSync('.env.local', 'utf8');
      const envLines = envContent.split('\n');
      
      for (const line of envLines) {
        const [key, value] = line.split('=');
        if (key === 'MYSQL_HOST') host = value;
        if (key === 'MYSQL_USER') user = value;
        if (key === 'MYSQL_PASSWORD') password = value;
        if (key === 'MYSQL_DATABASE') database = value;
      }
    }
  } catch (error) {
    console.error('Error reading .env.local file:', error);
  }
  
  // Create connection to MySQL server (without database)
  let connection;
  try {
    connection = await mysql.createConnection({
      host,
      user,
      password,
    });
    
    console.log('Connected to MySQL server');
    
    // Read the schema.sql file
    const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    // Split the SQL statements
    const statements = schemaSql
      .split(';')
      .filter(statement => statement.trim() !== '');
    
    // Execute each statement
    for (const statement of statements) {
      await connection.query(statement + ';');
    }
    
    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

setupDatabase(); 