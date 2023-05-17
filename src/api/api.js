// src/api/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const solutionCount = () => {
  return axios.get(`${API_BASE_URL}/solutions/solutionCount`);
};

export const insertSolutions = (solutionsAsString) => {
    return axios.post(`${API_BASE_URL}/solutions/insertSolutions`, { solutions:solutionsAsString });
};
 

