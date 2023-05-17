import React, { useState } from 'react';
import './EightQueensPuzzle.css';
import { useNavigate } from 'react-router-dom';

const EightQueensPuzzle = () => {
  const navigate = useNavigate();
  const [queensCount, setQueensCount] = useState(8);
  const [queensPositions, setQueensPositions] = useState([]);
  const [solutionMatrix, setSolutionMatrix] = useState([]);

  const handleBack = () => {
    navigate(-1);
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
    setSolutionMatrix(matrix);

    const matrixString = JSON.stringify(matrix);
    console.log(matrixString);
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
