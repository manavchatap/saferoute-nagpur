export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface BlackSpot {
  _id?: string;
  name: string;
  location: Location;
  accident_count: number;
  zone: string;
  description?: string;
}

export interface AccidentRecord {
  location: Location;
  date: string;
  time: string;
  severity: string;
  cause: string;
  weather: string;
  road_type: string;
  zone: string;
  vehicle_type?: string;
}

export interface RouteSafety {
  route_id: string;
  safety_score: number;
  risk_level: string;
  predicted_accidents: number;
  high_risk_segments: Array<{
    location: string;
    risk_score: number;
    reason: string;
  }>;
  weather_impact: string;
  recommendations: string[];
}

export interface HeatmapPoint {
  lat: number;
  lng: number;
  intensity: number;
}

export interface Statistics {
  total_accidents: number;
  total_blackspots: number;
  zones: {
    [key: string]: number;
  };
  last_updated: string;
}
