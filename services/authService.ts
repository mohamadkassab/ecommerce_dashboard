// src/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust URL to your C# API

export const loginUser = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};

export const logoutUser = async () => {
  await axios.post(`${API_URL}/logout`);
};
