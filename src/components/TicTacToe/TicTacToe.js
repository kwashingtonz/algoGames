import React from 'react';
import './TicTacToe.css';
import { useNavigate } from 'react-router-dom';

const TicTacToe = () => {
  const navigate = useNavigate();
  const boardSize = 3; // Size of the Tic Tac Toe board
  const initialBoard = Array(boardSize).fill(Array(boardSize).fill(null)); // Initial empty board state

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="center-container">
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
      <h1 className="puzzle-title">Tic Tac Toe</h1>
      <div className="board">
        {initialBoard.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${rowIndex % 2 === colIndex % 2 ? 'dark' : 'light'}`}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
