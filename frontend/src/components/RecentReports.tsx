import { useState, useEffect } from 'react';
import axios from 'axios';

interface Report {
  id: number;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  severity: string;
  vehicle_type: string;
  casualties: number;
  description: string;
  reporter: {
    name: string;
    contact: string;
  };
  timestamp: string;
  photos: string[];
  status: string;
}

export default function RecentReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedReport, setExpandedReport] = useState<number | null>(null);

  useEffect(() => {
    fetchReports();
    const interval = setInterval(fetchReports, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:8000/reports/recent?limit=5');
      setReports(response.data.reports);
      setError('');
    } catch (err) {
      setError('Failed to load recent reports');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'fatal': return '#dc2626';
      case 'severe': return '#ef4444';
      case 'moderate': return '#f59e0b';
      case 'minor': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'fatal': return 'FATAL';
      case 'severe': return 'SEVERE';
      case 'moderate': return 'WARN';
      case 'minor': return 'MINOR';
      default: return 'INFO';
    }
  };

  const getVehicleIcon = (vehicleType: string) => {
    switch (vehicleType) {
      case 'two-wheeler': return 'BIKE';
      case 'three-wheeler': return 'AUTO';
      case 'car': return 'CAR';
      case 'heavy-vehicle': return 'TRUCK';
      case 'pedestrian': return 'PERSON';
      case 'multiple': return 'MULTI';
      default: return 'VEH';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  if (loading) {
    return (
      <div className="recent-reports-container">
        <h2 className="section-title">Recent Accident Reports</h2>
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          Loading reports...
        </div>
      </div>
    );
  }

  return (
    <div className="recent-reports-container">
      <div className="reports-header">
        <h2 className="section-title">Recent Accident Reports</h2>
        <div className="reports-badge">
          <span className="live-indicator"></span>
          Live Updates
        </div>
      </div>
      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
        Community-reported accidents from Nagpur citizens
      </p>

      {error && (
        <div className="error-message">{error}</div>
      )}

      {reports.length === 0 ? (
        <div className="no-reports">
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', textAlign: 'center', padding: '2rem' }}>
            No recent reports. Be the first to report an accident!
          </p>
        </div>
      ) : (
        <div className="reports-list">
          {reports.map((report) => (
            <div key={report.id} className="report-card">
              <div className="report-header">
                <div className="report-severity" style={{ backgroundColor: getSeverityColor(report.severity) + '20', color: getSeverityColor(report.severity) }}>
                  {getSeverityIcon(report.severity)}
                </div>
                <div className="report-time">{formatTimestamp(report.timestamp)}</div>
              </div>

              <div className="report-location">
                <span className="location-icon">Location</span>
                <span className="location-text">{report.location.name}</span>
              </div>

              <div className="report-details">
                <div className="detail-item">
                  <span className="detail-icon">{getVehicleIcon(report.vehicle_type)}</span>
                  <span className="detail-text">{report.vehicle_type.replace('-', ' ')}</span>
                </div>
                {report.casualties > 0 && (
                  <div className="detail-item">
                    <span className="detail-icon">PEOPLE</span>
                    <span className="detail-text">{report.casualties} casualties</span>
                  </div>
                )}
              </div>

              {report.description && (
                <div className="report-description">
                  {expandedReport === report.id ? (
                    <>
                      <p>{report.description}</p>
                      <button 
                        onClick={() => setExpandedReport(null)}
                        className="read-more-btn"
                      >
                        Show less
                      </button>
                    </>
                  ) : (
                    <>
                      <p>
                        {report.description.length > 100 
                          ? `${report.description.substring(0, 100)}...` 
                          : report.description
                        }
                      </p>
                      {report.description.length > 100 && (
                        <button 
                          onClick={() => setExpandedReport(report.id)}
                          className="read-more-btn"
                        >
                          Read more
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}

              <div className="report-footer">
                <span className="reporter-name">
                  USER: {report.reporter.name}
                </span>
                <span className="report-status" style={{ 
                  color: report.status === 'verified' ? '#10b981' : '#f59e0b' 
                }}>
                  {report.status === 'verified' ? 'VERIFIED' : 'PENDING'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button onClick={fetchReports} className="refresh-btn">
          REFRESH REPORTS
        </button>
      </div>
    </div>
  );
}
