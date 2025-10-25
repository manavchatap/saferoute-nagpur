import axios from 'axios';

// Automatically detect environment
const getApiBaseUrl = () => {
  // Production: use your deployed backend
  if (window.location.hostname !== 'localhost') {
    return 'https://saferoute-nagpur-api.onrender.com'; // Replace with your backend URL
  }
  // Development: use localhost
  return 'http://localhost:8000';
};

const API_BASE_URL = getApiBaseUrl();

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

export const getBlackSpots = async () => {
  try {
    const response = await api.get('/blackspots');
    return response.data;
  } catch (error) {
    console.error('API Error - getBlackSpots:', error);
    // Return mock data as fallback
    return [
      {
        name: "Prakash High School to Kapsi Bridge (Pardi)",
        location: { lat: 21.0891, lng: 79.0641, address: "Pardi, Nagpur" },
        accident_count: 15,
        zone: "Pardi",
        description: "High-speed corridor with frequent two-wheeler accidents"
      },
      // ... add more mock data if needed
    ];
  }
};

export const getStatistics = async () => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    console.error('API Error - getStatistics:', error);
    // Return mock stats as fallback
    return {
      total_accidents: 328,
      total_blackspots: 23,
      zones: {},
      last_updated: '2025-10-25',
      user_reports_count: 0
    };
  }
};

export const predictRoute = async (origin: any, destination: any) => {
  try {
    const response = await api.post('/predict/route', { origin, destination });
    return response.data;
  } catch (error) {
    console.error('API Error - predictRoute:', error);
    throw error;
  }
};
