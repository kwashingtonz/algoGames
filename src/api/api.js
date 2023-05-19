// src/api/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const solutionCount = () => {
    return axios.get(`${API_BASE_URL}/chess/solutionCount`);
};

export const allSolutionsFigured = () => {
    return axios.get(`${API_BASE_URL}/chess/allSolutionsFigured`);
};

export const insertSolutions = (solutionsAsString) => {
    return axios.post(`${API_BASE_URL}/chess/insertSolutions`, { solutions: solutionsAsString });
};

export const checkAnswerSolution = (solutionAsString) => {
    return axios.post(`${API_BASE_URL}/chess/checkAnswerSolution`, { solution: solutionAsString });
};

export const insertAnswer = (userName,solutionAsString) => {
    return axios.post(`${API_BASE_URL}/chess/insertAnswer`, { userName: userName, solution: solutionAsString });
};

export const insertDijkstraAnswer = (userName,answer,distances) => {
    return axios.post(`${API_BASE_URL}/dijkstra/insertAnswer`, { userName: userName, answer: answer, distances:distances });
};


