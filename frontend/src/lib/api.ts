import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const getBlackSpots = async () => {
  return [];
};

export const getStatistics = async () => {
  return {
    total_accidents: 328,
    total_blackspots: 23,
    zones: {},
    last_updated: '2025-10-27',
    user_reports_count: 0
  };
};

export const predictRoute = async (origin: any, destination: any) => {
  return {
    safety_score: 75,
    risk_level: 'medium',
    predicted_accidents: 1,
    high_risk_segments: [],
    recommendations: ['Drive carefully', 'Avoid peak hours']
  };
};

export const predictRouteSafety = predictRoute;

export const reverseGeocode = async (lat: number, lng: number) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    return data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  } catch (error) {
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  }
};
