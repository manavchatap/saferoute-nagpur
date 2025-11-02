import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="landing-page">
      <div className="hero-landing">
        <div className="hero-content-landing">
          <h1 className="hero-title-landing">SafeRoute Nagpur</h1>
          <p className="hero-subtitle-landing">
            AI-Powered Traffic Safety Platform for Smarter, Safer Roads
          </p>
          
          <div className="stats-showcase">
            <div className="stat-showcase">
              <div className="stat-number">328</div>
              <div className="stat-text">Accidents Analyzed</div>
            </div>
            <div className="stat-showcase">
              <div className="stat-number">23</div>
              <div className="stat-text">Black Spots Identified</div>
            </div>
            <div className="stat-showcase">
              <div className="stat-number">72%</div>
              <div className="stat-text">Safety Score</div>
            </div>
          </div>

          <div className="cta-buttons">
            <Link to="/route-safety" className="cta-primary">Check Route Safety</Link>
            <Link to="/analytics" className="cta-secondary">View Analytics</Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-heading">Platform Features</h2>
        <div className="features-grid">
          <Link to="/analytics" className="feature-card">
            <div className="feature-icon"></div>
            <h3>Analytics Dashboard</h3>
            <p>Comprehensive accident data analysis with visual insights</p>
          </Link>
          
          <Link to="/route-safety" className="feature-card">
            <div className="feature-icon"></div>
            <h3>Route Safety Checker</h3>
            <p>AI-powered route analysis with safety score prediction</p>
          </Link>
          
          <Link to="/report" className="feature-card">
            <div className="feature-icon"></div>
            <h3>Report Accident</h3>
            <p>Community-driven reporting with photo/video upload</p>
          </Link>
          
          <Link to="/emergency" className="feature-card">
            <div className="feature-icon"></div>
            <h3>Emergency Services</h3>
            <p>Quick access to hospitals, police, and fire services</p>
          </Link>
        </div>
      </div>

      <div className="mission-section">
        <h2 className="section-heading">Our Mission</h2>
        <p className="mission-text">
          SafeRoute Nagpur leverages artificial intelligence and community participation 
          to create safer roads for Nagpur citizens. Through data-driven insights and 
          real-time accident reporting, we're building a comprehensive safety platform 
          that saves lives.
        </p>
      </div>
    </div>
  );
}
