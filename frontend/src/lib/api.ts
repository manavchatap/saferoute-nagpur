import axios from 'axios';

// Replace with your actual backend URL
const API_BASE_URL = 'https://saferoute-nagpur-api.onrender.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getBlackSpots = async () => {
  try {
    const response = await api.get('/blackspots');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch blackspots:', error);
    throw error;
  }
};

export const getStatistics = async () => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch statistics:', error);
    throw error;
  }
};

export const predictRoute = async (origin: any, destination: any) => {
  try {
    const response = await api.post('/predict/route', { origin, destination });
    return response.data;
  } catch (error) {
    console.error('Failed to predict route:', error);
    throw error;
  }
};
