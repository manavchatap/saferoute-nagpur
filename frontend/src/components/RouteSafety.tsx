import { useState, useEffect } from 'react';
import { predictRouteSafety, reverseGeocode } from '../lib/api';
import RouteMap from './RouteMap';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface RouteSafetyData {
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
  distance?: string;
  duration?: string;
}

export default function RouteSafety() {
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [originText, setOriginText] = useState('');
  const [destText, setDestText] = useState('');
  const [mode, setMode] = useState<'origin' | 'dest' | null>('origin'); // Auto-start with origin
  const [loading, setLoading] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [result, setResult] = useState<RouteSafetyData | null>(null);
  const [error, setError] = useState('');
  const [showMap, setShowMap] = useState(true);

  // Auto-switch to destination mode after origin is selected
  useEffect(() => {
    if (origin && !destination && mode === null) {
      setTimeout(() => setMode('dest'), 300);
    }
  }, [origin, destination, mode]);

  // Auto-trigger route check when both points are selected
  useEffect(() => {
    if (origin && destination && !result && !loading) {
      handleCheckRoute();
    }
  }, [origin, destination]);

  const handleOriginSelect = async (lat: number, lng: number) => {
    setOrigin({ lat, lng, address: 'Loading...' });
    setMode(null); // Clear mode immediately
    setGeocoding(true);
    
    try {
      const addressData = await reverseGeocode(lat, lng);
      if (addressData && addressData.display_name) {
        const parts = addressData.display_name.split(',');
        const shortName = parts.slice(0, 2).join(', ');
        setOriginText(shortName);
        setOrigin({ lat, lng, address: addressData.display_name });
      } else {
        setOriginText(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`);
      }
    } catch (err) {
      setOriginText(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`);
    } finally {
      setGeocoding(false);
      // Auto-switch to destination mode
      setTimeout(() => setMode('dest'), 300);
    }
  };

  const handleDestSelect = async (lat: number, lng: number) => {
    setDestination({ lat, lng, address: 'Loading...' });
    setMode(null); // Clear mode
    setGeocoding(true);
    
    try {
      const addressData = await reverseGeocode(lat, lng);
      if (addressData && addressData.display_name) {
        const parts = addressData.display_name.split(',');
        const shortName = parts.slice(0, 2).join(', ');
        setDestText(shortName);
        setDestination({ lat, lng, address: addressData.display_name });
      } else {
        setDestText(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`);
      }
    } catch (err) {
      setDestText(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`);
    } finally {
      setGeocoding(false);
    }
  };

  const handleCheckRoute = async () => {
    if (!origin || !destination) {
      setError('Please select both origin and destination on the map');
      return;
    }

    setLoading(true);
    setError('');
    setShowMap(false); // Hide map when analyzing

    try {
      const data = await predictRouteSafety(origin, destination);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to get route safety prediction');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOrigin(null);
    setDestination(null);
    setOriginText('');
    setDestText('');
    setResult(null);
    setError('');
    setMode('origin');
    setShowMap(true);
  };

  const handleEditRoute = () => {
    setResult(null);
    setShowMap(true);
    setMode('origin');
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getSafetyGrade = (score: number) => {
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  };

  return (
    <div className="route-safety-container">
      <div className="route-safety-header">
        <h2 className="section-title"> Interactive Route Safety Checker</h2>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
          {mode === 'origin' && ' Click anywhere on the map to set your starting point'}
          {mode === 'dest' && ' Click anywhere on the map to set your destination'}
          {!mode && origin && destination && '✓ Both points selected! Analyzing route...'}
          {!mode && !origin && !destination && 'Get started by clicking "Set Starting Point"'}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="progress-steps">
        <div className={`step ${origin ? 'completed' : mode === 'origin' ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <div className="step-label">Starting Point</div>
        </div>
        <div className="step-line"></div>
        <div className={`step ${destination ? 'completed' : mode === 'dest' ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <div className="step-label">Destination</div>
        </div>
        <div className="step-line"></div>
        <div className={`step ${result ? 'completed' : ''}`}>
          <div className="step-number">3</div>
          <div className="step-label">Safety Report</div>
        </div>
      </div>

      {/* Interactive Map */}
      {showMap && (
        <div style={{ marginBottom: '1.5rem', animation: 'fadeIn 0.3s' }}>
          <RouteMap 
            origin={origin}
            destination={destination}
            onOriginSelect={handleOriginSelect}
            onDestSelect={handleDestSelect}
            mode={mode}
          />
          {geocoding && (
            <div style={{ textAlign: 'center', marginTop: '0.5rem', color: '#3b82f6', fontSize: '0.875rem' }}>
               Getting location details...
            </div>
          )}
        </div>
      )}

      {/* Quick Control Buttons */}
      {showMap && (
        <div className="route-controls">
          <button 
            onClick={() => setMode('origin')}
            className={`control-btn ${mode === 'origin' ? 'active' : ''} ${origin ? 'has-value' : ''}`}
            disabled={loading || geocoding}
          >
            {origin ? '✓ Starting Point Set' : ' Set Starting Point'}
          </button>
          <button 
            onClick={() => setMode('dest')}
            className={`control-btn ${mode === 'dest' ? 'active' : ''} ${destination ? 'has-value' : ''}`}
            disabled={loading || geocoding || !origin}
          >
            {destination ? '✓ Destination Set' : ' Set Destination'}
          </button>
          {(origin || destination) && (
            <button 
              onClick={handleReset}
              className="control-btn reset-btn"
              disabled={loading || geocoding}
            >
               Reset
            </button>
          )}
        </div>
      )}

      {/* Selected Locations Display */}
      {(origin || destination) && showMap && (
        <div className="selected-locations" style={{ animation: 'slideDown 0.3s' }}>
          <div className="location-display">
            <span className="location-label"> From:</span>
            <span className="location-value">{originText || '...'}</span>
          </div>
          <div className="location-display">
            <span className="location-label"> To:</span>
            <span className="location-value">{destText || 'Not selected yet'}</span>
          </div>
        </div>
      )}

      {/* Manual Check Button (if needed) */}
      {origin && destination && showMap && !loading && (
        <button 
          onClick={handleCheckRoute}
          className="check-route-btn"
          style={{ width: '100%', marginTop: '1rem', animation: 'fadeIn 0.3s' }}
        >
           Check Route Safety
        </button>
      )}

      {/* Loading State */}
      {loading && (
        <div className="loading-state" style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="spinner"></div>
          <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
            Analyzing route safety...
          </p>
        </div>
      )}

      {error && (
        <div className="error-message" style={{ animation: 'shake 0.5s' }}>
          ⚠️ {error}
        </div>
      )}

      {result && (
        <div className="route-result" style={{ animation: 'fadeIn 0.5s' }}>
          {/* Edit Route Button */}
          <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
            <button onClick={handleEditRoute} className="edit-route-btn">
              ✏️ Edit Route
            </button>
          </div>

          {/* Safety Score Card */}
          <div className="safety-score-card">
            <div className="score-main">
              <div className="score-circle" style={{ borderColor: getRiskColor(result.risk_level), animation: 'scaleIn 0.5s' }}>
                <div className="score-value">{result.safety_score}</div>
                <div className="score-grade">{getSafetyGrade(result.safety_score)}</div>
              </div>
              <div className="score-details">
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Safety Score</h3>
                <div className="risk-badge" style={{ backgroundColor: getRiskColor(result.risk_level) + '20', color: getRiskColor(result.risk_level) }}>
                  {result.risk_level.toUpperCase()} RISK
                </div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  Predicted accidents: <strong>{result.predicted_accidents}</strong>
                </p>
                {result.distance && (
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                     {result.distance} • ⏱️ {result.duration}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* High Risk Segments */}
          {result.high_risk_segments && result.high_risk_segments.length > 0 && (
            <div className="risk-segments">
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                ⚠️ High Risk Areas on Your Route
              </h4>
              {result.high_risk_segments.map((segment, index) => (
                <div key={index} className="risk-segment-item" style={{ animation: `slideUp 0.3s ${index * 0.1}s both` }}>
                  <div className="segment-header">
                    <span className="segment-name">{segment.location}</span>
                    <span className="segment-score" style={{ color: '#ef4444' }}>
                      Risk: {segment.risk_score}%
                    </span>
                  </div>
                  <p className="segment-reason">{segment.reason}</p>
                </div>
              ))}
            </div>
          )}

          {/* Weather Impact */}
          <div className="weather-impact">
            <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
               Weather Impact
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{result.weather_impact}</p>
          </div>

          {/* Recommendations */}
          <div className="recommendations">
            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
               Safety Recommendations
            </h4>
            <ul className="recommendation-list">
              {result.recommendations.map((rec, index) => (
                <li key={index} style={{ animation: `slideUp 0.3s ${index * 0.1}s both` }}>{rec}</li>
              ))}
            </ul>
          </div>

          {/* Check Another Route */}
          <button onClick={handleReset} className="check-route-btn" style={{ width: '100%', marginTop: '1.5rem' }}>
             Check Another Route
          </button>
        </div>
      )}
    </div>
  );
}
