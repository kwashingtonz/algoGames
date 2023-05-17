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

    connection.query(query, (error, results) => {
        if (error) {
            console.error('DB Error:', error);
            res.send(error);
        } else {
            res.send({ count: results[0].solutionCount });
        }
    });
});

// API endpoint to check solutions are all figured out and clear the answers
app.get('/api/solutions/allSolutionsFigured', (req, res) => {
    const query1 = `SELECT COUNT(id) as solutionCount FROM chess_solutions`;
    const query2 = `SELECT COUNT(id) as figuredCount FROM chess_answers`;
    const query3 = `TRUNCATE TABLE chess_answers`;

    let solCount;
    let figCount;

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

// API endpoint to answer a solution
app.post('/api/solutions/checkAnswerSolution', (req, res) => {

    const solutionString = req.body.solution;

    const query = `SELECT COUNT(id) as availableCount  FROM chess_solutions WHERE solution = ?`;
    const query2 = `SELECT COUNT(id) as availableCount  FROM chess_answers WHERE solution = ?`;

    connection.query(query, solutionString, (error,results) => {
        if (error) {
            console.error('DB Error:', error);
            res.status(500).json({ success: false, message: 'DB Error' });
        } else {
            if(results[0].availableCount>0){

                connection.query(query2, solutionString, (error,results) => {
                    if (error) {
                        console.error('DB Error:', error);
                        res.status(500).json({ success: false, message: 'DB Error' });
                    } else {
                        if(results[0].availableCount>0){
                            res.status(200).json({ correct:true ,available: true, message: 'Solution is correct. But the solution is figured it out already. Try other solutions please.' });
                        }else{
                            res.status(200).json({ correct:true, available: false, message: 'Solution is correct. Please Enter your name and Try other solutions as well!' });
                        }
                    }
                });


                
            }else{
                res.status(200).json({ correct:false, available: false, message: 'Solution is incorrect. Please Try again' });
            }
        }
    });

});

// API endpoint to insert answer
app.post('/api/solutions/insertAnswer', (req, res) => {

    const userName = req.body.userName;
    const solutionString = req.body.solution;

    const query = 'INSERT INTO chess_answers (name,solution) VALUES ?';
    const values = [[userName,solutionString]]

    connection.query(query, [values], (error) => {
        if (error) {
            console.error('DB Error:', error);
            res.status(500).json({ success: false, message: 'Failed to insert answer.' });
        } else {
            res.status(200).json({ success: true, message: 'Answer inserted successfully to DB.' });
        }
    });

});

// Start the server
app.listen(5000, () => {
    console.log('Server started on port 5000');
});
