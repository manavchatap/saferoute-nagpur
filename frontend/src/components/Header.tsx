export default function Header() {
  return (
    <header className="professional-header">
      <div className="header-container">
        <div className="logo-section">
          {/* Custom Logo Icon */}
          <div className="logo-icon-svg">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="50" height="50" rx="12" fill="url(#gradient)"/>
              <path d="M25 10L15 20H22V30H28V20H35L25 10Z" fill="white"/>
              <circle cx="25" cy="37" r="3" fill="white"/>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#10b981"/>
                  <stop offset="1" stopColor="#059669"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div className="logo-text">
            <h1 className="logo-title">SafeRoute</h1>
            <p className="logo-subtitle">Nagpur</p>
          </div>
        </div>
        
        <nav className="nav-menu">
          <a href="#analytics" className="nav-link">Analytics</a>
          <a href="#route-safety" className="nav-link">Route Safety</a>
          <a href="#report" className="nav-link">Report</a>
          <a href="#emergency" className="nav-link emergency-btn">Emergency</a>
        </nav>
      </div>
    </header>
  );
}
