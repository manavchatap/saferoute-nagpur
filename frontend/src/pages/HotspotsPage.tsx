import { useState } from 'react';
import Map from '../components/Map';

interface BlackSpot {
  name: string;
  location: { lat: number; lng: number };
  accident_count: number;
  zone: string;
  description: string;
}

const BLACKSPOTS_DATA: BlackSpot[] = [
  { name: "Prakash High School to Kapsi Bridge (Pardi)", location: { lat: 21.0891, lng: 79.0641 }, accident_count: 15, zone: "Pardi", description: "High-speed corridor with frequent two-wheeler accidents" },
  { name: "Automotive Square Junction (Indora)", location: { lat: 21.1458, lng: 79.0882 }, accident_count: 14, zone: "Indora", description: "Heavy traffic junction with poor visibility" },
  { name: "Sitabuldi Main Road (Sitabuldi)", location: { lat: 21.1466, lng: 79.0882 }, accident_count: 13, zone: "Sitabuldi", description: "Congested commercial area" },
  { name: "Ajni Railway Station Road (Ajni)", location: { lat: 21.1433, lng: 79.1194 }, accident_count: 12, zone: "Ajni", description: "Railway crossing delays" },
  { name: "Seminary Hills Flyover (Dharampeth)", location: { lat: 21.1373, lng: 79.0608 }, accident_count: 11, zone: "Dharampeth", description: "High-speed flyover" },
  { name: "Variety Square (Dhantoli)", location: { lat: 21.1518, lng: 79.0826 }, accident_count: 10, zone: "Dhantoli", description: "Heavy traffic area" },
  { name: "Khamla Square", location: { lat: 21.1201, lng: 79.1025 }, accident_count: 9, zone: "Khamla", description: "Multi-way junction" },
  { name: "Sadar Market", location: { lat: 21.1505, lng: 79.0842 }, accident_count: 8, zone: "Sadar", description: "Congested market" }
];

export default function HotspotsPage() {
  const [selectedSpot, setSelectedSpot] = useState<BlackSpot | null>(null);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Accident Hotspots</h1>
        <p className="page-subtitle">Identified high-risk zones in Nagpur</p>
      </div>
      
      <div className="map-grid">
        <div className="map-section">
          <h2 className="section-title">Hotspot Map</h2>
          <div className="map-container">
            <Map blackspots={BLACKSPOTS_DATA} selectedSpot={selectedSpot} />
          </div>
          <div className="map-legend">
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#dc2626' }}></div>
              <span>High Risk (10+ accidents)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div>
              <span>Medium Risk (5-9 accidents)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
              <span>Low Risk</span>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Black Spots List</h2>
          <div className="blackspot-list">
            {BLACKSPOTS_DATA.map((spot, index) => (
              <div key={index} className="blackspot-item" onClick={() => setSelectedSpot(spot)}>
                <div className="blackspot-header">
                  <h4 className="blackspot-name">{spot.name}</h4>
                  <span className={`badge ${spot.accident_count >= 10 ? 'badge-high' : 'badge-medium'}`}>
                    {spot.accident_count >= 10 ? 'High Risk' : 'Medium Risk'}
                  </span>
                </div>
                <p className="blackspot-description">{spot.description}</p>
                <div className="blackspot-footer">
                  <span className="zone-label">Zone: {spot.zone}</span>
                  <span className="accident-count">{spot.accident_count} accidents</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
