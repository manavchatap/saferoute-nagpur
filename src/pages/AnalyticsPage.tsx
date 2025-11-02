import Analytics from '../components/Analytics';
import ZoneAnalysis from '../components/ZoneAnalysis';

export default function AnalyticsPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Analytics Dashboard</h1>
        <p className="page-subtitle">Comprehensive accident data analysis and trends</p>
      </div>
      <Analytics />
      <ZoneAnalysis />
    </div>
  );
}
