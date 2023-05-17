// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kaliya234',
  database: 'algogamesdb',
});

// API endpoint to check solutions available
app.get('/api/solutions/solutionCount', (req, res) => {
  const query = `SELECT COUNT(id) as solutionCount FROM chess_solutions`;

  connection.query(query, (error,results) => {
    if (error) {
      console.error('DB Error:', error);
      res.send(error);
    } else {
      res.send({ count: results[0].solutionCount });
    }
  });
});

// API endpoint to insert solutions
app.post('/api/solutions/insertSolutions', (req, res) => {

    const solutionStrings = req.body.solutions;
    
     const query = 'INSERT INTO chess_solutions (solution) VALUES ?';
     const values = solutionStrings.map(solution => [solution]);
  
    connection.query(query, [values], (error) => {
    if (error) {
        console.error('DB Error:', error);
        res.status(500).json({ success: false, message: 'Failed to insert solutions.' });
      } else {
        res.status(200).json({ success: true, message: 'Solutions inserted successfully to DB.' });
      }
    });
  
});

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
