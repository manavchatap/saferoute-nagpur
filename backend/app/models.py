from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class Location(BaseModel):
    lat: float
    lng: float
    address: Optional[str] = None

class BlackSpot(BaseModel):
    name: str
    location: Location
    accident_count: int
    zone: str
    description: Optional[str] = None

class AccidentRecord(BaseModel):
    location: Location
    date: str
    time: str
    severity: str
    cause: str
    weather: str
    road_type: str
    zone: str
    vehicle_type: Optional[str] = None

class RouteRequest(BaseModel):
    origin: Location
    destination: Location

class RouteSafety(BaseModel):
    route_id: str
    safety_score: float
    risk_level: str
    predicted_accidents: int
    high_risk_segments: List[dict]
    weather_impact: str
    recommendations: List[str]

class Statistics(BaseModel):
    total_accidents: int
    total_blackspots: int
    zones: dict
    last_updated: str
