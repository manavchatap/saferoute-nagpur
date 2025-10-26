import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Map from './components/Map';
import RouteSafety from './components/RouteSafety';
import ReportAccident from './components/ReportAccident';
import RecentReports from './components/RecentReports';
import EmergencyServices from './components/EmergencyServices';
import Analytics from './components/Analytics';
import ZoneAnalysis from './components/ZoneAnalysis';

interface BlackSpot {
  name: string;
  location: { lat: number; lng: number };
  accident_count: number;
  zone: string;
  description: string;
}

const BLACKSPOTS_DATA: BlackSpot[] = [
  { name: "Prakash High School to Kapsi Bridge (Pardi)", location: { lat: 21.0891, lng: 79.0641 }, accident_count: 15, zone: "Pardi", description: "High-speed corridor with frequent two-wheeler accidents during peak hours" },
  { name: "Automotive Square Junction (Indora)", location: { lat: 21.1458, lng: 79.0882 }, accident_count: 14, zone: "Indora", description: "Heavy traffic junction with poor visibility and multiple vehicle collisions" },
  { name: "Sitabuldi Main Road (Sitabuldi)", location: { lat: 21.1466, lng: 79.0882 }, accident_count: 13, zone: "Sitabuldi", description: "Congested commercial area with pedestrian-vehicle conflicts" },
  { name: "Ajni Railway Station Road (Ajni)", location: { lat: 21.1433, lng: 79.1194 }, accident_count: 12, zone: "Ajni", description: "Railway crossing area with frequent delays causing risky overtaking" },
  { name: "Seminary Hills Flyover (Dharampeth)", location: { lat: 21.1373, lng: 79.0608 }, accident_count: 11, zone: "Dharampeth", description: "High-speed flyover with sharp curves and poor lighting at night" },
  { name: "Variety Square to LAD College (Dhantoli)", location: { lat: 21.1518, lng: 79.0826 }, accident_count: 10, zone: "Dhantoli", description: "Narrow roads with heavy student traffic and parking issues" },
  { name: "Khamla Square Junction", location: { lat: 21.1201, lng: 79.1025 }, accident_count: 9, zone: "Khamla", description: "Multi-way junction with inadequate traffic signals" },
  { name: "Sadar Market Area", location: { lat: 21.1505, lng: 79.0842 }, accident_count: 8, zone: "Sadar", description: "Congested market with pedestrian overflow and two-wheeler dominance" }
];

const STATS_DATA = {
  total_accidents: 328,
  total_blackspots: 23,
  zones: { "Pardi": 48, "Indora": 44, "Sitabuldi": 40, "Ajni": 46, "Dharampeth": 38, "Dhantoli": 32, "Sadar": 28, "Khamla": 24 },
  last_updated: '2025-10-27',
  user_reports_count: 0
};

function App() {
  const [selectedSpot, setSelectedSpot] = useState<BlackSpot | null>(null);

  return (
    <div className="app-container">
      <Header />
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">SafeRoute Nagpur</h1>
          <p className="hero-subtitle">AI-Powered Traffic Safety Platform with Real-Time Analytics & Emergency Services</p>
          <div className="hero-stats">
            <div className="hero-stat"><div className="hero-stat-value">{STATS_DATA.total_accidents}</div><div className="hero-stat-label">Accidents Analyzed</div></div>
            <div className="hero-stat"><div className="hero-stat-value">{STATS_DATA.total_blackspots}</div><div className="hero-stat-label">Black Spots</div></div>
            <div className="hero-stat"><div className="hero-stat-value">{STATS_DATA.user_reports_count}</div><div className="hero-stat-label">Community Reports</div></div>
            <div className="hero-stat"><div className="hero-stat-value">72%</div><div className="hero-stat-label">Safety Score</div></div>
          </div>
        </div>
      </div>
      <main className="main-content">
        <div id="analytics"><Analytics /><ZoneAnalysis /></div>
        <div id="route-safety"><RouteSafety /></div>
        <div id="emergency"><EmergencyServices /></div>
        <div id="report"><ReportAccident /><RecentReports /></div>
        <div className="map-grid">
          <div className="map-section">
            <h2 className="section-title">Accident Hotspot Map</h2>
            <div className="map-container"><Map blackspots={BLACKSPOTS_DATA} selectedSpot={selectedSpot} /></div>
            <div className="map-legend">
              <div className="legend-item"><div className="legend-color" style={{ backgroundColor: '#dc2626' }}></div><span>High Risk (10+ accidents)</span></div>
              <div className="legend-item"><div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div><span>Medium Risk (5-9 accidents)</span></div>
              <div className="legend-item"><div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div><span>Low Risk (less than 5 accidents)</span></div>
            </div>
          </div>
          <div className="section">
            <h2 className="section-title">Top Accident Black Spots</h2>
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
      </main>
      <footer className="professional-footer">
        <div className="footer-content">
          <div className="footer-section"><h3>About SafeRoute</h3><p>AI-powered platform making Nagpur roads safer through data-driven insights and community engagement.</p></div>
          <div className="footer-section"><h3>Quick Links</h3><a href="#analytics">Analytics</a><a href="#route-safety">Route Safety</a><a href="#report">Report Accident</a><a href="#emergency">Emergency Services</a></div>
          <div className="footer-section"><h3>Emergency Contacts</h3><a href="tel:108">Ambulance: 108</a><a href="tel:100">Police: 100</a><a href="tel:101">Fire: 101</a></div>
        </div>
        <div className="footer-bottom"><p>© 2025 SafeRoute Nagpur. Built for safer roads. | Last Updated: {STATS_DATA.last_updated}</p></div>
      </footer>
    </div>
  )
}

export default App
