// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const app = express();

// MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kaliya234',
  database: 'algogamesdb',
});

// API endpoint to check table existence
app.get('/api/solutions/table-exists', (req, res) => {
  const query = `SELECT 1 FROM solutions LIMIT 1`;

  connection.query(query, (error) => {
    if (error) {
      console.error('Table does not exist:', error);
      res.send({ exists: false });
    } else {
      res.send({ exists: true });
    }
  });
});

// API endpoint to create table
app.get('/api/solutions/create-table', (req, res) => {
  const query = `CREATE TABLE IF NOT EXISTS solutions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    solution VARCHAR(64) NOT NULL
  )`;

  connection.query(query, (error) => {
    if (error) {
      console.error('Error creating table:', error);
      res.send({ success: false });
    } else {
      res.send({ success: true });
    }
  });
});

// API endpoint to insert solutions
app.post('/api/solutions/insert', (req, res) => {
  const solutions = req.body.solutions;
  const values = solutions.map((solution) => [solution]);

  const query = `INSERT INTO solutions (solution) VALUES ?`;

  connection.query(query, [values], (error) => {
    if (error) {
      console.error('Error inserting solutions:', error);
      res.send({ success: false });
    } else {
      res.send({ success: true });
    }
  });
});

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
