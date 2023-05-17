import React from 'react';
import { Button } from 'react-bootstrap';
import './algoGames.css';
import { useNavigate } from 'react-router-dom';

const AlgoGames = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
      navigate(path);
    }
  
  return (
    <div className="container">
      <h1 className="text-center">AlgoGames</h1>
      <div className="button-wrapper">
        <Button variant="primary" className="bubbly-button mb-3" onClick={()=>handleClick('/eightqueens')}>Eight queens’ puzzle</Button>
        <Button variant="primary" className="bubbly-button mb-3" onClick={()=>handleClick('/endecode')}>Encode /Decode using Huffman Coding Algorithm</Button>
        <Button variant="primary" className="bubbly-button mb-3" onClick={()=>handleClick('/tictactoe')}>Tic-Tac-Toe</Button>
        <Button variant="primary" className="bubbly-button mb-3" onClick={()=>handleClick('/shortpath')}>Identify Shortest Path</Button>
        <Button variant="primary" className="bubbly-button" onClick={()=>handleClick('/minconnectors')}> Identify minimum connectors</Button>
      </div>
    </div>
  );
};

export default AlgoGames;
