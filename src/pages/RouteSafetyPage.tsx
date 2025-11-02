import RouteSafety from '../components/RouteSafety';

export default function RouteSafetyPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Route Safety Checker</h1>
        <p className="page-subtitle">Check safety scores and get route recommendations</p>
      </div>
      <RouteSafety />
    </div>
  );
}
