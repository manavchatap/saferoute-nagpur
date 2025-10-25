import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'year'>('month');

  // Monthly Accident Trends Data
  const monthlyTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '2024 Accidents',
        data: [28, 32, 35, 30, 38, 42, 45, 40, 38, 43, 39, 35],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: '2023 Accidents',
        data: [25, 28, 30, 27, 32, 35, 38, 36, 34, 37, 33, 30],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  // Zone-wise Accidents Data
  const zoneData = {
    labels: ['Pardi', 'Indora', 'Sitabuldi', 'Ajni', 'Dharampeth', 'Dhantoli', 'Sadar', 'Khamla'],
    datasets: [{
      label: 'Accidents by Zone',
      data: [48, 44, 40, 46, 38, 32, 28, 24],
      backgroundColor: [
        '#ef4444',
        '#f59e0b',
        '#10b981',
        '#3b82f6',
        '#8b5cf6',
        '#ec4899',
        '#f97316',
        '#06b6d4'
      ],
    }]
  };

  // Vehicle Type Breakdown Data
  const vehicleData = {
    labels: ['Two-wheeler', 'Car', 'Heavy Vehicle', 'Auto-rickshaw', 'Pedestrian', 'Multiple'],
    datasets: [{
      data: [145, 87, 45, 32, 12, 7],
      backgroundColor: [
        '#ef4444',
        '#f59e0b',
        '#10b981',
        '#3b82f6',
        '#8b5cf6',
        '#ec4899'
      ],
    }]
  };

  // Severity Distribution Data
  const severityData = {
    labels: ['Minor', 'Moderate', 'Severe', 'Fatal'],
    datasets: [{
      data: [152, 98, 58, 20],
      backgroundColor: [
        '#3b82f6',
        '#f59e0b',
        '#ef4444',
        '#7f1d1d'
      ],
    }]
  };

  // Time-of-Day Data
  const timeData = {
    labels: ['12AM-3AM', '3AM-6AM', '6AM-9AM', '9AM-12PM', '12PM-3PM', '3PM-6PM', '6PM-9PM', '9PM-12AM'],
    datasets: [{
      label: 'Accidents by Time',
      data: [8, 5, 35, 28, 32, 45, 52, 23],
      backgroundColor: [
        '#1e3a8a',
        '#1e40af',
        '#ef4444',
        '#f59e0b',
        '#f59e0b',
        '#ef4444',
        '#dc2626',
        '#3b82f6'
      ],
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2 className="section-title">Analytics Dashboard</h2>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
          Visual analysis of accident patterns and trends in Nagpur
        </p>
      </div>

      {/* Period Selector */}
      <div className="period-selector">
        <button 
          onClick={() => setSelectedPeriod('month')}
          className={`period-btn ${selectedPeriod === 'month' ? 'active' : ''}`}
        >
          This Month
        </button>
        <button 
          onClick={() => setSelectedPeriod('year')}
          className={`period-btn ${selectedPeriod === 'year' ? 'active' : ''}`}
        >
          This Year
        </button>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Monthly Trends */}
        <div className="chart-card large">
          <h3 className="chart-title">Monthly Accident Trends</h3>
          <div className="chart-container">
            <Line data={monthlyTrendsData} options={chartOptions} />
          </div>
          <p className="chart-insight">
            Peak accidents in July 2024 (45 accidents) • 10% increase from 2023
          </p>
        </div>

        {/* Zone-wise Distribution */}
        <div className="chart-card">
          <h3 className="chart-title">Zone-wise Accidents</h3>
          <div className="chart-container">
            <Bar data={zoneData} options={chartOptions} />
          </div>
          <p className="chart-insight">
            Pardi zone has highest accidents (48)
          </p>
        </div>

        {/* Vehicle Type */}
        <div className="chart-card">
          <h3 className="chart-title">Vehicle Type Breakdown</h3>
          <div className="chart-container">
            <Doughnut data={vehicleData} options={chartOptions} />
          </div>
          <p className="chart-insight">
            Two-wheelers account for 44% of accidents
          </p>
        </div>

        {/* Severity Distribution */}
        <div className="chart-card">
          <h3 className="chart-title">Severity Distribution</h3>
          <div className="chart-container">
            <Pie data={severityData} options={chartOptions} />
          </div>
          <p className="chart-insight">
            46% minor, 30% moderate, 18% severe, 6% fatal
          </p>
        </div>

        {/* Time-of-Day Analysis */}
        <div className="chart-card">
          <h3 className="chart-title">Time-of-Day Analysis</h3>
          <div className="chart-container">
            <Bar data={timeData} options={chartOptions} />
          </div>
          <p className="chart-insight">
            Most accidents during 6PM-9PM (52 accidents)
          </p>
        </div>
      </div>

      {/* Key Insights Section */}
      <div className="insights-section">
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
          Key Insights
        </h3>
        <div className="insights-grid">
          <div className="insight-card red">
            <div className="insight-icon">HIGH</div>
            <div className="insight-content">
              <h4>Peak Hours</h4>
              <p>6PM-9PM sees 52 accidents monthly. Avoid rush hours.</p>
            </div>
          </div>
          <div className="insight-card orange">
            <div className="insight-icon">WARN</div>
            <div className="insight-content">
              <h4>High-Risk Zones</h4>
              <p>Pardi, Indora & Ajni zones need urgent safety measures.</p>
            </div>
          </div>
          <div className="insight-card blue">
            <div className="insight-icon">INFO</div>
            <div className="insight-content">
              <h4>Two-Wheeler Safety</h4>
              <p>44% accidents involve two-wheelers. Helmet mandatory.</p>
            </div>
          </div>
          <div className="insight-card green">
            <div className="insight-icon">TIP</div>
            <div className="insight-content">
              <h4>Improvement</h4>
              <p>Dhantoli zone shows 15% reduction in accidents.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
