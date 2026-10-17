// Imports --------------------------------------------
import mysql from 'mysql2/promise';

// Database configuration -----------------------------
const dbConfig = {
  database: 'sociable',
  port: 3306,
  host: 'localhost',
  user: 'root',
  password: '',
  namedPlaceholders: true,
};

// Database connection --------------------------------
let database = null;
try {
  database = await mysql.createConnection(dbConfig);
} catch (error) {
  console.log(`Error creating database connection: ${error.message}`);
  process.exit();
}

export default database;
