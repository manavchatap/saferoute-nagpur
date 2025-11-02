import ReportAccident from '../components/ReportAccident';
import RecentReports from '../components/RecentReports';

export default function ReportPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Report an Accident</h1>
        <p className="page-subtitle">Help make roads safer by reporting incidents</p>
      </div>
      <ReportAccident />
      <RecentReports />
    </div>
  );
}
