// src/api/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const checkTableExists = () => {
  return axios.get(`${API_BASE_URL}/solutions/table-exists`);
};

export const createTable = () => {
    return axios.get(`${API_BASE_URL}/solutions/create-table`);
};

export const insertSolutions = (solutions) => {
    return axios.post(`${API_BASE_URL}/solutions/insert`, { solutions });
};
 

