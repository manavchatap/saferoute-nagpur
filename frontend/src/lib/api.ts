import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getBlackSpots = async () => {
  const response = await api.get('/blackspots');
  return response.data;
};

export const getStatistics = async () => {
  const response = await api.get('/stats');
  return response.data;
};

export const predictRouteSafety = async (origin: any, destination: any) => {
  const response = await api.post('/predict/route', {
    origin,
    destination,
  });
  return response.data;
};

export const getHeatmapData = async () => {
  const response = await api.get('/accidents/heatmap');
  return response.data;
};

// Geocoding function using OpenStreetMap Nominatim
export const geocodeAddress = async (address: string) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: `${address}, Nagpur, Maharashtra, India`,
        format: 'json',
        limit: 5,
        countrycodes: 'in'
      },
      headers: {
        'User-Agent': 'NagpurAccidentPredictor/1.0'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Geocoding error:', error);
    return [];
  }
};

// Reverse geocoding (lat/lng to address)
export const reverseGeocode = async (lat: number, lng: number) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        lat,
        lon: lng,
        format: 'json',
      },
      headers: {
        'User-Agent': 'NagpurAccidentPredictor/1.0'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
};
