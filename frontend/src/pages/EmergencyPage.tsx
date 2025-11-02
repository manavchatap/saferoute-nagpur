import EmergencyServices from '../components/EmergencyServices';

export default function EmergencyPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Emergency Services</h1>
        <p className="page-subtitle">Quick access to hospitals, police, and fire services</p>
      </div>
      <EmergencyServices />
    </div>
  );
}
