import React, { useState, useEffect } from 'react';
import './TicTacToe.css';
import { useNavigate } from 'react-router-dom';

const TicTacToe = () => {
  const navigate = useNavigate();
  const [showBoard, setShowBoard] = useState(false);
  const [showTip, setTip] = useState(false);
  const [showOTip, setOTip] = useState(false);
  const [showPlayerMark, setPlayerMark] = useState("");
  const [board, setBoard] = useState(Array(3).fill(Array(3).fill(null)));
  const [currentTurn, setCurrentTurn] = useState("player");

  useEffect(() => {
    if (currentTurn === "computer" && !isGameOver(board)) {
      makeComputerMove();
    }
  }, [currentTurn, board]);

  const handleButtonPress = (mark) => {
    setShowBoard(true);
    setPlayerMark(mark);
    setTip(mark === "X");
    setOTip(mark === "O");
  
    if (mark === "O") {
      setCurrentTurn("computer");
      makeComputerMove();
    } else {
      setCurrentTurn("player");
    }
  };

  const handleCellClick = (rowIndex, colIndex) => {
    setTip(false);
    setOTip(false);
    if (board[rowIndex][colIndex] === null && currentTurn === "player" && !isGameOver(board)) {
      const newBoard = board.map((row, rIndex) =>
        rIndex === rowIndex ? row.map((cell, cIndex) => (cIndex === colIndex ? "X" : cell)) : row
      );
      setBoard(newBoard);
      const result = getGameResult(newBoard);
      if (result) {

        const delay = 100;

        const timer = setTimeout(() => {
          handleRestart();
          alert(result);
        }, delay);
        
        return () => clearTimeout(timer);
        
      } else {
        setCurrentTurn("computer");
      }
    }
  };

  const makeComputerMove = () => {
    if (!isGameOver(board)) {

      if (isEmptyBoard(board)) {
        const emptyCells = [];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[i][j] === null) {
              emptyCells.push({ rowIndex: i, colIndex: j });
            }
          }
        }
  
        if (emptyCells.length > 0) {
          const randomIndex = Math.floor(Math.random() * emptyCells.length);
          const { rowIndex, colIndex } = emptyCells[randomIndex];
  
          const newBoard = board.map((row, rIndex) =>
            rIndex === rowIndex ? row.map((cell, cIndex) => (cIndex === colIndex ? "O" : cell)) : row
          );
          setBoard(newBoard);
          setCurrentTurn("player");
        }
    } else {

      const bestMove = findBestMove(board);
      if (bestMove) {
        const newBoard = board.map((row, rIndex) =>
          rIndex === bestMove.rowIndex ? row.map((cell, cIndex) => (cIndex === bestMove.colIndex ? "O" : cell)) : row
        );
        setBoard(newBoard);
        const result = getGameResult(newBoard);
        if (result) {
            setCurrentTurn("player");
            const delay = 100;

            const timer = setTimeout(() => {
              handleRestart();
              alert(result);
            }, delay);
            
            return () => clearTimeout(timer);
        } else {
          setCurrentTurn("player");
        }
      }
    }
    }
  };

  const isEmptyBoard = (currentBoard) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (currentBoard[i][j] !== null) {
          return false;
        }
      }
    }
    return true;
  };

  const findBestMove = (currentBoard) => {
    let bestMove = null;
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (currentBoard[i][j] === null) {
          const newBoard = currentBoard.map((row) => [...row]);
          newBoard[i][j] = "O";
          const score = minimax(newBoard, 0, false);
          if (score > bestScore) {
            bestScore = score;
            bestMove = { rowIndex: i, colIndex: j };
          }
        }
      }
    }
    return bestMove;
  };

  const minimax = (currentBoard, depth, isMaximizing) => {
    if (isGameOver(currentBoard)) {
      return evaluateBoard(currentBoard, depth);
    }
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (currentBoard[i][j] === null) {
            const newBoard = currentBoard.map((row) => [...row]);
            newBoard[i][j] = "O";
            const score = minimax(newBoard, depth + 1, false);
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (currentBoard[i][j] === null) {
            const newBoard = currentBoard.map((row) => [...row]);
            newBoard[i][j] = "X";
            const score = minimax(newBoard, depth + 1, true);
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  };

  const evaluateBoard = (currentBoard, depth) => {
    const winningCombinations = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        currentBoard[a[0]][a[1]] &&
        currentBoard[a[0]][a[1]] === currentBoard[b[0]][b[1]] &&
        currentBoard[a[0]][a[1]] === currentBoard[c[0]][c[1]]
      ) {
        if (currentBoard[a[0]][a[1]] === "O") {
          return 10 - depth;
        } else if (currentBoard[a[0]][a[1]] === "X") {
          return depth - 10;
        }
      }
    }

    return 0;
  };

  const getGameResult = (currentBoard) => {
    const winningCombinations = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    // Check for winning combinations
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        currentBoard[a[0]][a[1]] &&
        currentBoard[a[0]][a[1]] === currentBoard[b[0]][b[1]] &&
        currentBoard[a[0]][a[1]] === currentBoard[c[0]][c[1]]
      ) {
        return currentBoard[a[0]][a[1]] === "O" ? "Computer Wins" : "Player Wins";
      }
    }
  
    // If no winning combinations and the board is full, it's a draw
    if (isGameOver(currentBoard)) {
      return "Draw";
    }
  
    // If the game is not over, return null
    return null;
  };
  

  const isGameOver = (currentBoard) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (currentBoard[i][j] === null) {
          return false;
        }
      }
    }
    return true;
  };

 const handleRestart = () => {
  setShowBoard(false);
  setBoard(Array(3).fill(Array(3).fill(null)));
  setCurrentTurn("player");
};

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="center-container">
      <div>
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
        <h1 className="puzzle-title">Tic Tac Toe</h1>
        {!showBoard && (
          <div className="button-container">
            <h3 className="tip">Select Mark</h3>
            &nbsp;
            <button className="player-button" onClick={() => handleButtonPress("X")}>
              X
            </button>{" "}
            &nbsp;
            <button className="player-button" onClick={() => handleButtonPress("O")}>
              O
            </button>
          </div>
        )}
        {showBoard && (
          <div className="board">
            <button className="restart-button" onClick={handleRestart}>
              Restart
            </button>
            {showTip && <h3 className="tip">You play first!</h3>  }
            {showOTip && showPlayerMark==="O" ? <h3 className="tip">Computer Played First. Your Turn!</h3> : <></>  }
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className={`cell ${rowIndex % 2 === colIndex % 2 ? 'dark' : 'light'}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
