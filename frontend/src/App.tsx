import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Map from './components/Map';
import RouteSafety from './components/RouteSafety';
import ReportAccident from './components/ReportAccident';
import RecentReports from './components/RecentReports';
import EmergencyServices from './components/EmergencyServices';
import Analytics from './components/Analytics';
import ZoneAnalysis from './components/ZoneAnalysis';
import { getBlackSpots, getStatistics } from './lib/api';

interface BlackSpot {
  name: string;
  location: { lat: number; lng: number };
  accident_count: number;
  zone: string;
  description: string;
}

interface Statistics {
  total_accidents: number;
  total_blackspots: number;
  zones: { [key: string]: number };
  last_updated: string;
  user_reports_count?: number;
}

function App() {
  const [selectedSpot, setSelectedSpot] = useState<BlackSpot | null>(null);
  const [blackspots, setBlackspots] = useState<BlackSpot[]>([]);
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [spotsData, statsData] = await Promise.all([
        getBlackSpots(),
        getStatistics(),
      ]);
      setBlackspots(spotsData);
      setStats(statsData);
      setError('');
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to connect to backend. Make sure backend is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Loading SafeRoute Nagpur...</h2>
          <p>Connecting to safety platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />
      
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">SafeRoute Nagpur</h1>
          <p className="hero-subtitle">
            AI-Powered Traffic Safety Platform with Real-Time Analytics & Emergency Services
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">{stats?.total_accidents || 328}</div>
              <div className="hero-stat-label">Accidents Analyzed</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">{stats?.total_blackspots || 23}</div>
              <div className="hero-stat-label">Black Spots</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">{stats?.user_reports_count || 0}</div>
              <div className="hero-stat-label">Community Reports</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">72%</div>
              <div className="hero-stat-label">Safety Score</div>
            </div>
          </div>
        </div>
      </div>

      <main className="main-content">
        {error && (
          <div style={{ backgroundColor: '#fee2e2', border: '2px solid #ef4444', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem', maxWidth: '1280px', margin: '0 auto 1.5rem' }}>
            <p style={{ color: '#7f1d1d', fontSize: '0.875rem', margin: 0 }}>WARNING: {error}</p>
          </div>
        )}

        {/* Analytics Section with ID */}
        <div id="analytics">
          <Analytics />
          <ZoneAnalysis />
        </div>

        {/* Route Safety Section with ID */}
        <div id="route-safety">
          <RouteSafety />
        </div>

        {/* Emergency Section with ID */}
        <div id="emergency">
          <EmergencyServices />
        </div>

        {/* Report Section with ID */}
        <div id="report">
          <ReportAccident />
          <RecentReports />
        </div>

        {/* Map Section */}
        <div className="map-grid">
          <div className="map-section">
            <h2 className="section-title">Accident Hotspot Map</h2>
            <div className="map-container">
              <Map blackspots={blackspots} selectedSpot={selectedSpot} />
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
                <span>Low Risk (less than 5 accidents)</span>
              </div>
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">Top Accident Black Spots</h2>
            <div className="blackspot-list">
              {blackspots.map((spot, index) => (
                <div 
                  key={index}
                  className="blackspot-item"
                  onClick={() => setSelectedSpot(spot)}
                >
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
          <div className="footer-section">
            <h3>About SafeRoute</h3>
            <p>AI-powered platform making Nagpur roads safer through data-driven insights and community engagement.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <a href="#analytics">Analytics</a>
            <a href="#route-safety">Route Safety</a>
            <a href="#report">Report Accident</a>
            <a href="#emergency">Emergency Services</a>
          </div>
          <div className="footer-section">
            <h3>Emergency Contacts</h3>
            <a href="tel:108">Ambulance: 108</a>
            <a href="tel:100">Police: 100</a>
            <a href="tel:101">Fire: 101</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 SafeRoute Nagpur. Built for safer roads. | Last Updated: {stats?.last_updated || '2025-10-25'}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
