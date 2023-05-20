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
app.get('/api/chess/solutionCount', (req, res) => {

    const createTableQuery = 'CREATE TABLE IF NOT EXISTS chess_solutions (id INT AUTO_INCREMENT PRIMARY KEY, solution VARCHAR(255))';
    const query = `SELECT COUNT(id) as solutionCount FROM chess_solutions`;

    connection.query(createTableQuery, (error) => {
        if (error) {
            console.error('DB Error:', error);
            res.status(500).json({ success: false, message: 'Failed to create table.' });
        } else {
            connection.query(query, (error, results) => {
                if (error) {
                    console.error('DB Error:', error);
                    res.send(error);
                } else {
                    res.send({ count: results[0].solutionCount });
                }
            });
        }
    });
});

// API endpoint to check solutions are all figured out and clear the answers
app.get('/api/chess/allSolutionsFigured', (req, res) => {

    const createTableQuery = 'CREATE TABLE IF NOT EXISTS chess_solutions (id INT AUTO_INCREMENT PRIMARY KEY, solution VARCHAR(255))';
    const createTableQuery2 = 'CREATE TABLE IF NOT EXISTS chess_answers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), solution VARCHAR(255))';
    const query1 = `SELECT COUNT(id) as solutionCount FROM chess_solutions`;
    const query2 = `SELECT COUNT(id) as figuredCount FROM chess_answers`;
    const query3 = `TRUNCATE TABLE chess_answers`;

    let solCount;
    let figCount;

    connection.query(createTableQuery, (error) => {
        if (error) {
            console.error('DB Error:', error);
            res.status(500).json({ success: false, message: 'Failed to create table.' });
        } else {
            connection.query(createTableQuery2, (error) => {
                if (error) {
                    console.error('DB Error:', error);
                    res.status(500).json({ success: false, message: 'Failed to create table.' });
                } else {
                    connection.query(query1, (error, results) => {
                        if (error) {
                            console.error('DB Error:', error);
                            res.send(error);
                        } else {
                            //res.send({ count: results[0].solutionCount });
                            solCount = results[0].solutionCount

                            connection.query(query2, (error, results) => {
                                if (error) {
                                    console.error('DB Error:', error);
                                    res.send(error);
                                } else {
                                    //res.send({ count: results[0].solutionCount });
                                    figCount = results[0].figuredCount

                                    if (figCount === solCount) {
                                        connection.query(query3, (error) => {
                                            if (error) {
                                                console.error('DB Error:', error);
                                                res.send(error);
                                            } else {
                                                res.status(200).send({ message: "All Answers have been figured and cleared" });
                                            }
                                        })
                                    }
                                    //   else {
                                    //     res.status(200).send({ message: "Not figured out all" });
                                    // }

                                }
                            })
                        }
                    });
                }
            });
        }
    });
});

// API endpoint to insert solutions
app.post('/api/chess/insertSolutions', (req, res) => {

    const solutionStrings = req.body.solutions;

    const createTableQuery = 'CREATE TABLE IF NOT EXISTS chess_solutions (id INT AUTO_INCREMENT PRIMARY KEY, solution VARCHAR(255))';
    const query = 'INSERT INTO chess_solutions (solution) VALUES ?';
    const values = solutionStrings.map(solution => [solution]);

    connection.query(createTableQuery, (error) => {
        if (error) {
            console.error('DB Error:', error);
            res.status(500).json({ success: false, message: 'Failed to create table.' });
        } else {
            connection.query(query, [values], (error) => {
                if (error) {
                    console.error('DB Error:', error);
                    res.status(500).json({ success: false, message: 'Failed to insert solutions.' });
                } else {
                    res.status(200).json({ success: true, message: 'Solutions inserted successfully to DB.' });
                }
            });
        }
    });
});

// API endpoint to answer a solution
app.post('/api/chess/checkAnswerSolution', (req, res) => {

    const solutionString = req.body.solution;

    const createTableQuery = 'CREATE TABLE IF NOT EXISTS chess_solutions (id INT AUTO_INCREMENT PRIMARY KEY, solution VARCHAR(255))';
    const createTableQuery2 = 'CREATE TABLE IF NOT EXISTS chess_answers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), solution VARCHAR(255))';
    const query = `SELECT COUNT(id) as availableCount  FROM chess_solutions WHERE solution = ?`;
    const query2 = `SELECT COUNT(id) as availableCount  FROM chess_answers WHERE solution = ?`;


    connection.query(createTableQuery, (error) => {
        if (error) {
            console.error('DB Error:', error);
            res.status(500).json({ success: false, message: 'Failed to create table.' });
        } else {
            connection.query(createTableQuery2, (error) => {
                if (error) {
                    console.error('DB Error:', error);
                    res.status(500).json({ success: false, message: 'Failed to create table.' });
                } else {
                    connection.query(query, solutionString, (error, results) => {
                        if (error) {
                            console.error('DB Error:', error);
                            res.status(500).json({ success: false, message: 'DB Error' });
                        } else {
                            if (results[0].availableCount > 0) {

                                connection.query(query2, solutionString, (error, results) => {
                                    if (error) {
                                        console.error('DB Error:', error);
                                        res.status(500).json({ success: false, message: 'DB Error' });
                                    } else {
                                        if (results[0].availableCount > 0) {
                                            res.status(200).json({ correct: true, available: true, message: 'Solution is correct. But the solution is figured it out already. Try other solutions please.' });
                                        } else {
                                            res.status(200).json({ correct: true, available: false, message: 'Solution is correct. Please Enter your name and Try other solutions as well!' });
                                        }
                                    }
                                });



                            } else {
                                res.status(200).json({ correct: false, available: false, message: 'Solution is incorrect. Please Try again' });
                            }
                        }
                    });
                }
            });
        }
    });

});

// API endpoint to insert answer
app.post('/api/chess/insertAnswer', (req, res) => {

    const userName = req.body.userName;
    const solutionString = req.body.solution;

    const createTableQuery = 'CREATE TABLE IF NOT EXISTS chess_answers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), solution VARCHAR(255))';
    const query = 'INSERT INTO chess_answers (name,solution) VALUES ?';
    const values = [[userName, solutionString]]

    connection.query(createTableQuery, (error) => {
        if (error) {
            console.error('DB Error:', error);
            res.status(500).json({ success: false, message: 'Failed to create table.' });
        } else {
            connection.query(query, [values], (error) => {
                if (error) {
                    console.error('DB Error:', error);
                    res.status(500).json({ success: false, message: 'Failed to insert answer.' });
                } else {
                    res.status(200).json({ success: true, message: 'Answer inserted successfully to DB.' });
                }
            });
        }
    });

});

// API endpoint to insert answer for the dijsktra game
app.post('/api/dijkstra/insertAnswer', (req, res) => {

    const userName = req.body.userName;
    const answer = req.body.answer;
    const distances = req.body.distances;

    const createTableQuery = 'CREATE TABLE IF NOT EXISTS dijkstra_answers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), answer VARCHAR(1000), distances VARCHAR(1500))';
    const query = 'INSERT INTO dijkstra_answers (name,answer,distances) VALUES ?';
    const values = [[userName, answer, distances]]

    connection.query(createTableQuery, (error) => {
        if (error) {
            console.error('DB Error:', error);
            res.status(500).json({ success: false, message: 'Failed to create table.' });
        } else {
            connection.query(query, [values], (error) => {
                if (error) {
                    console.error('DB Error:', error);
                    res.status(500).json({ success: false, message: 'Failed to insert answer.' });
                } else {
                    res.status(200).json({ success: true, message: 'Answer inserted successfully to DB.' });
                }
            });
        }
    });

});

// API endpoint to insert answer for the prim game
app.post('/api/prim/insertAnswer', (req, res) => {

    const userName = req.body.userName;
    const answer = req.body.answer;
    const distances = req.body.distances;

    const createTableQuery = 'CREATE TABLE IF NOT EXISTS prim_answers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), answer VARCHAR(1000), distances VARCHAR(1500))';
    const query = 'INSERT INTO prim_answers (name,answer,distances) VALUES ?';
    const values = [[userName, answer, distances]]

    connection.query(createTableQuery, (error) => {
        if (error) {
            console.error('DB Error:', error);
            res.status(500).json({ success: false, message: 'Failed to create table.' });
        } else {
            connection.query(query, [values], (error) => {
                if (error) {
                    console.error('DB Error:', error);
                    res.status(500).json({ success: false, message: 'Failed to insert answer.' });
                } else {
                    res.status(200).json({ success: true, message: 'Answer inserted successfully to DB.' });
                }
            });
        }
    });

});

// Start the server
app.listen(5000, () => {
    console.log('Server started on port 5000');
});
