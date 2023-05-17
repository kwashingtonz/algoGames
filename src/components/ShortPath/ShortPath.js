import React, { useEffect } from 'react';
import './ShortPath.css';
import { useNavigate } from 'react-router-dom';

const ShortPath = () => {
    const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="center-container">
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
      <h1 className="puzzle-title">Identify Shortest Path</h1>
      
    </div>
  );
};

export default ShortPath;
