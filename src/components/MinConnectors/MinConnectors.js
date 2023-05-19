import React, { useEffect } from 'react';
import './MinConnectors.css';
import { useNavigate } from 'react-router-dom';

const MinConnectors = () => {
    const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="center-container">
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
      <h1 className="puzzle-title">Identify Minimum Connectors (Prim's Algorithm)</h1>      
     
    </div>
  );
};

export default MinConnectors;
