import React, { useEffect } from 'react';
import './EncodeDecode.css';
import { useNavigate } from 'react-router-dom';

const EncodeDecode = () => {
    const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="center-container">
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
      <h1 className="puzzle-title">Encode/Decode Using Huffman Coding Algorithm</h1>
      
    </div>
  );
};

export default EncodeDecode;
