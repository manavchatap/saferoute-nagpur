import { useState } from 'react';
import { Bar } from 'react-chartjs-2';

interface ZoneData {
  name: string;
  total_accidents: number;
  fatal: number;
  severe: number;
  moderate: number;
  minor: number;
  blackspots: number;
  peak_hours: string;
  common_causes: string[];
  safety_score: number;
}

const ZONE_DATA: { [key: string]: ZoneData } = {
  'Pardi': {
    name: 'Pardi',
    total_accidents: 48,
    fatal: 3,
    severe: 12,
    moderate: 18,
    minor: 15,
    blackspots: 3,
    peak_hours: '6PM-9PM',
    common_causes: ['Overspeeding', 'Poor road conditions', 'Heavy traffic'],
    safety_score: 42
  },
  'Indora': {
    name: 'Indora',
    total_accidents: 44,
    fatal: 2,
    severe: 10,
    moderate: 16,
    minor: 16,
    blackspots: 1,
    peak_hours: '7PM-10PM',
    common_causes: ['Signal violations', 'Two-wheeler accidents', 'Narrow roads'],
    safety_score: 48
  },
  'Sitabuldi': {
    name: 'Sitabuldi',
    total_accidents: 40,
    fatal: 2,
    severe: 8,
    moderate: 15,
    minor: 15,
    blackspots: 4,
    peak_hours: '5PM-8PM',
    common_causes: ['High traffic density', 'Multiple junctions', 'Pedestrian crossings'],
    safety_score: 52
  },
  'Ajni': {
    name: 'Ajni',
    total_accidents: 46,
    fatal: 4,
    severe: 11,
    moderate: 17,
    minor: 14,
    blackspots: 2,
    peak_hours: '8AM-10AM, 6PM-9PM',
    common_causes: ['Railway crossing delays', 'Rush hour traffic', 'Road construction'],
    safety_score: 45
  },
  'Dharampeth': {
    name: 'Dharampeth',
    total_accidents: 38,
    fatal: 1,
    severe: 8,
    moderate: 14,
    minor: 15,
    blackspots: 3,
    peak_hours: '6PM-9PM',
    common_causes: ['Residential traffic', 'School zones', 'Parking issues'],
    safety_score: 58
  },
  'Dhantoli': {
    name: 'Dhantoli',
    total_accidents: 32,
    fatal: 1,
    severe: 6,
    moderate: 12,
    minor: 13,
    blackspots: 3,
    peak_hours: '7PM-9PM',
    common_causes: ['Narrow lanes', 'Market congestion', 'Poor lighting'],
    safety_score: 65
  },
  'Sadar': {
    name: 'Sadar',
    total_accidents: 28,
    fatal: 1,
    severe: 5,
    moderate: 10,
    minor: 12,
    blackspots: 1,
    peak_hours: '12PM-3PM',
    common_causes: ['Market traffic', 'Pedestrian movement', 'Old roads'],
    safety_score: 68
  },
  'Khamla': {
    name: 'Khamla',
    total_accidents: 24,
    fatal: 0,
    severe: 4,
    moderate: 9,
    minor: 11,
    blackspots: 1,
    peak_hours: '6PM-8PM',
    common_causes: ['Residential area', 'Speed breakers', 'Animal crossings'],
    safety_score: 75
  }
};

export default function ZoneAnalysis() {
  const [selectedZone, setSelectedZone] = useState<string>('Pardi');
  const zoneInfo = ZONE_DATA[selectedZone];

  const severityData = {
    labels: ['Fatal', 'Severe', 'Moderate', 'Minor'],
    datasets: [{
      label: 'Accidents by Severity',
      data: [zoneInfo.fatal, zoneInfo.severe, zoneInfo.moderate, zoneInfo.minor],
      backgroundColor: ['#7f1d1d', '#ef4444', '#f59e0b', '#3b82f6'],
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const getSafetyColor = (score: number) => {
    if (score >= 70) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getSafetyLabel = (score: number) => {
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Moderate';
    return 'High Risk';
  };

  return (
    <div className="zone-analysis-container">
      <div className="zone-header">
        <h2 className="section-title">Zone-Specific Analysis</h2>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
          Detailed accident statistics and insights for specific zones in Nagpur
        </p>
      </div>

      {/* Zone Selector */}
      <div className="zone-selector">
        <label style={{ fontWeight: '600', fontSize: '0.875rem', color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
          Select Zone:
        </label>
        <select 
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value)}
          className="zone-select"
        >
          {Object.keys(ZONE_DATA).map((zone) => (
            <option key={zone} value={zone}>{zone}</option>
          ))}
        </select>
      </div>

      {/* Zone Statistics Grid */}
      <div className="zone-stats-grid">
        {/* Total Accidents */}
        <div className="zone-stat-card">
          <div className="zone-stat-icon red">TOTAL</div>
          <div className="zone-stat-info">
            <h4>Total Accidents</h4>
            <p className="zone-stat-value">{zoneInfo.total_accidents}</p>
            <p className="zone-stat-label">In 2024</p>
          </div>
        </div>

        {/* Safety Score */}
        <div className="zone-stat-card">
          <div className="zone-stat-icon" style={{ backgroundColor: getSafetyColor(zoneInfo.safety_score) + '20', color: getSafetyColor(zoneInfo.safety_score) }}>
            {zoneInfo.safety_score}
          </div>
          <div className="zone-stat-info">
            <h4>Safety Score</h4>
            <p className="zone-stat-value">{getSafetyLabel(zoneInfo.safety_score)}</p>
            <p className="zone-stat-label">Out of 100</p>
          </div>
        </div>

        {/* Black Spots */}
        <div className="zone-stat-card">
          <div className="zone-stat-icon orange">SPOTS</div>
          <div className="zone-stat-info">
            <h4>Black Spots</h4>
            <p className="zone-stat-value">{zoneInfo.blackspots}</p>
            <p className="zone-stat-label">High-risk areas</p>
          </div>
        </div>

        {/* Peak Hours */}
        <div className="zone-stat-card">
          <div className="zone-stat-icon blue">TIME</div>
          <div className="zone-stat-info">
            <h4>Peak Accident Hours</h4>
            <p className="zone-stat-value">{zoneInfo.peak_hours}</p>
            <p className="zone-stat-label">Most dangerous time</p>
          </div>
        </div>
      </div>

      {/* Severity Breakdown */}
      <div className="zone-chart-section">
        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
          Severity Breakdown - {selectedZone}
        </h3>
        <div style={{ height: '300px' }}>
          <Bar data={severityData} options={chartOptions} />
        </div>
      </div>

      {/* Common Causes */}
      <div className="common-causes-section">
        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
          Common Accident Causes in {selectedZone}
        </h3>
        <div className="causes-grid">
          {zoneInfo.common_causes.map((cause, index) => (
            <div key={index} className="cause-item">
              <span className="cause-number">{index + 1}</span>
              <span className="cause-text">{cause}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Zone-Specific Recommendations */}
      <div className="zone-recommendations">
        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
          Safety Recommendations for {selectedZone}
        </h3>
        <ul className="recommendation-list">
          <li>Avoid traveling during peak hours: {zoneInfo.peak_hours}</li>
          <li>Drive cautiously near identified {zoneInfo.blackspots} black spot(s)</li>
          <li>Be alert for: {zoneInfo.common_causes.join(', ')}</li>
          {zoneInfo.safety_score < 50 && <li>HIGH ALERT: This zone has high accident risk. Exercise extreme caution.</li>}
          {zoneInfo.safety_score >= 70 && <li>This zone has relatively better safety record. Continue safe driving practices.</li>}
        </ul>
      </div>
    </div>
  );
}
