import React, { useState, useEffect } from 'react';
import './EightQueensPuzzle.css';
import { useNavigate } from 'react-router-dom';
import { solutionCount, insertSolutions } from '../../api/api';


const EightQueensPuzzle = () => {
  const navigate = useNavigate();
  const [queensCount, setQueensCount] = useState(8);
  const [queensPositions, setQueensPositions] = useState([]);


  useEffect(() => {
    // Check the count of `chess_solutions` table in the database
    const addingSolutions = async () => {

      let count;
      try {
        const response = await solutionCount();
        count = response.data.count;
      } catch (error) {
        alert(error);
      }

      if (count === 0) {
        // Generate and insert possible solutions using backtracking algorithm
        const solutions = [];
        solveQueensProblem(0, [], solutions);

        const solutionsAsMatrices = solutions.map(positions => {
          const matrix = Array.from({ length: 8 }, () => Array(8).fill(0));
          for (let col = 0; col < 8; col++) {
            const row = positions[col];
            matrix[row][col] = 1;
          }
          return matrix;
        });

        const solutionsAsString = solutionsAsMatrices.map(matrix =>
          JSON.stringify(matrix)
        );

        try {
          const response = await insertSolutions(solutionsAsString);
          if (response.status === 200) {
            alert(response.data.message);
          } else {
            alert(response.data.message);
          }


        } catch (error) {
          alert(error);
        }

      }
    }

    addingSolutions();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };


  const solveQueensProblem = (col, positions, solutions) => {
    if (col === 8) {
      solutions.push([...positions]);
      return;
    }

    for (let row = 0; row < 8; row++) {
      if (isSafe(row, col, positions)) {
        positions[col] = row;
        solveQueensProblem(col + 1, positions, solutions);
      }
    }
  };


  const isSafe = (row, col, positions) => {
    for (let i = 0; i < col; i++) {
      const prevRow = positions[i];
      if (
        prevRow === row ||
        prevRow + (col - i) === row ||
        prevRow - (col - i) === row
      ) {
        return false;
      }
    }
    return true;
  };


  const handleSquareClick = (row, col) => {
    const squareId = `${row}-${col}`;
    if (queensPositions.includes(squareId)) {
      const updatedPositions = queensPositions.filter((position) => position !== squareId);
      setQueensPositions(updatedPositions);
      setQueensCount(queensCount + 1);
    } else {
      if (queensCount > 0) {
        setQueensPositions([...queensPositions, squareId]);
        setQueensCount(queensCount - 1);
      }
    }
  };


  const handleSubmit = () => {
    const matrix = [];
    for (let row = 0; row < 8; row++) {
      const rowData = [];
      for (let col = 0; col < 8; col++) {
        const squareId = `${row}-${col}`;
        if (queensPositions.includes(squareId)) {
          rowData.push(1);
        } else {
          rowData.push(0);
        }
      }
      matrix.push(rowData);
    }

    const matrixString = JSON.stringify(matrix);
  };


  const renderChessboard = () => {
    const squares = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const squareId = `${row}-${col}`;
        const color = (row + col) % 2 === 0 ? 'light' : 'dark';
        const isQueenPlaced = queensPositions.includes(squareId);
        squares.push(
          <div
            key={squareId}
            id={squareId}
            className={`square ${color} ${isQueenPlaced ? 'queen' : ''}`}
            onClick={() => handleSquareClick(row, col)}
          >
            {isQueenPlaced && <span className="queen-icon">♛</span>}
          </div>
        );
      }
    }
    return squares;
  };


  const isSubmitDisabled = queensCount !== 0;


  return (
    <div className="center-container">
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
      <h1 className="puzzle-title">8 Queens' Puzzle</h1>
      <h3 className="puzzle-subtitle">Place 8 Queens on the board without any interference.</h3>
      <div className="queens-left">Queens Left: {queensCount}</div>
      <div className="eight-queens-puzzle">{renderChessboard()}</div>
      <button className="submit-button" onClick={handleSubmit} disabled={isSubmitDisabled}>
        Submit
      </button>

    </div>
  );
};

export default EightQueensPuzzle;
