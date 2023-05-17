import React, { useEffect } from 'react';
import './TicTacToe.css';
import { useNavigate } from 'react-router-dom';

const TicTacToe = () => {
    const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };


  return (
    <div className="center-container">
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
      <h1 className="puzzle-title">Tic Tac Toe</h1>

    </div>
  );
};

export default TicTacToe;
