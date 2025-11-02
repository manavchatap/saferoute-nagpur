import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import AnalyticsPage from './pages/AnalyticsPage';
import RouteSafetyPage from './pages/RouteSafetyPage';
import ReportPage from './pages/ReportPage';
import EmergencyPage from './pages/EmergencyPage';
import HotspotsPage from './pages/HotspotsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/route-safety" element={<RouteSafetyPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/hotspots" element={<HotspotsPage />} />
          </Routes>
        </main>
        
        <footer className="professional-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>About SafeRoute</h3>
              <p>AI-powered platform making Nagpur roads safer.</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <a href="/analytics">Analytics</a>
              <a href="/route-safety">Route Safety</a>
              <a href="/report">Report</a>
            </div>
            <div className="footer-section">
              <h3>Emergency</h3>
              <a href="tel:108">Ambulance: 108</a>
              <a href="tel:100">Police: 100</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 SafeRoute Nagpur</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
