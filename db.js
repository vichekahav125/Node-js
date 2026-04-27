import mysql from 'mysql2';

// create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',      // your MySQL password
  database: 'testdb'
});

// connect
db.connect((err) => {
  if (err) {
    console.log('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

export default db;