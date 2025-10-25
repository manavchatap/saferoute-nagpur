import { useState, useEffect } from 'react';

interface EmergencyService {
  name: string;
  type: 'hospital' | 'police' | 'fire' | 'ambulance';
  phone: string;
  address: string;
  distance?: string;
  available24x7: boolean;
}

const EMERGENCY_SERVICES: EmergencyService[] = [
  { name: "Government Medical College & Hospital", type: "hospital", phone: "0712-2542381", address: "Medical Square, Nagpur", available24x7: true },
  { name: "Lata Mangeshkar Hospital", type: "hospital", phone: "0712-2226101", address: "Digdoh Hills, Hingna Road", available24x7: true },
  { name: "AIIMS Nagpur", type: "hospital", phone: "0712-2803333", address: "MIHAN, Nagpur", available24x7: true },
  { name: "Orange City Hospital", type: "hospital", phone: "0712-2247000", address: "Central Bazar Road", available24x7: true },
  { name: "Kingsway Hospital", type: "hospital", phone: "0712-2561111", address: "Central Avenue, Nagpur", available24x7: true },
  { name: "Sitabuldi Police Station", type: "police", phone: "0712-2523333", address: "Sitabuldi, Nagpur", available24x7: true },
  { name: "Dhantoli Police Station", type: "police", phone: "0712-2443333", address: "Dhantoli, Nagpur", available24x7: true },
  { name: "Ajni Police Station", type: "police", phone: "0712-2720333", address: "Ajni Square, Nagpur", available24x7: true },
  { name: "Traffic Police Control Room", type: "police", phone: "0712-2561349", address: "Nagpur Traffic Police HQ", available24x7: true },
  { name: "Ambulance Service (108)", type: "ambulance", phone: "108", address: "Statewide Emergency", available24x7: true },
  { name: "Fire Brigade", type: "fire", phone: "101", address: "Nagpur Fire Services", available24x7: true },
  { name: "Police Emergency", type: "police", phone: "100", address: "Emergency Police", available24x7: true },
];

export default function EmergencyServices() {
  const [filter, setFilter] = useState<'all' | 'hospital' | 'police' | 'fire' | 'ambulance'>('all');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === 'granted') {
        sendTestNotification();
      }
    }
  };

  const sendTestNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('Accident Alert Enabled', {
        body: 'You will now receive notifications about nearby accidents and safety alerts.',
        tag: 'test-notification'
      });
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const handleEmergencyCall = (phone: string, name: string) => {
    console.log(`Emergency call initiated: ${name} - ${phone}`);
    
    if (Notification.permission === 'granted') {
      new Notification('Emergency Call', {
        body: `Calling ${name} at ${phone}`,
        tag: 'emergency-call'
      });
    }
    
    window.location.href = `tel:${phone}`;
  };

  const filteredServices = filter === 'all' 
    ? EMERGENCY_SERVICES 
    : EMERGENCY_SERVICES.filter(s => s.type === filter);

  const getServiceIcon = (type: string) => {
    switch(type) {
      case 'hospital': return 'H+';
      case 'police': return 'POL';
      case 'fire': return 'FIRE';
      case 'ambulance': return 'AMB';
      default: return 'TEL';
    }
  };

  const getServiceColor = (type: string) => {
    switch(type) {
      case 'hospital': return '#ef4444';
      case 'police': return '#3b82f6';
      case 'fire': return '#f59e0b';
      case 'ambulance': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="emergency-services-container">
      <div className="emergency-header">
        <h2 className="section-title">EMERGENCY SERVICES</h2>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
          Quick access to hospitals, police, and emergency contacts in Nagpur
        </p>
      </div>

      <div className="notification-section">
        <div className="notification-card">
          <div className="notification-info">
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
              BELL Safety Alerts
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              Get notified about accidents near your saved routes
            </p>
          </div>
          <button 
            onClick={requestNotificationPermission}
            className={`notification-btn ${notificationPermission === 'granted' ? 'enabled' : ''}`}
            disabled={notificationPermission === 'granted'}
          >
            {notificationPermission === 'granted' ? 'ENABLED' : 'Enable Alerts'}
          </button>
        </div>
        {showNotification && (
          <div className="notification-success">
            SUCCESS: Notifications enabled! You will receive safety alerts.
          </div>
        )}
      </div>

      <div className="quick-emergency-grid">
        <button 
          onClick={() => handleEmergencyCall('108', 'Ambulance')}
          className="emergency-quick-btn ambulance"
        >
          <span className="emergency-icon">🚑</span>
          <span className="emergency-text">
            <strong>Ambulance</strong>
            <small>Call 108</small>
          </span>
        </button>
        <button 
          onClick={() => handleEmergencyCall('100', 'Police')}
          className="emergency-quick-btn police"
        >
          <span className="emergency-icon">👮</span>
          <span className="emergency-text">
            <strong>Police</strong>
            <small>Call 100</small>
          </span>
        </button>
        <button 
          onClick={() => handleEmergencyCall('101', 'Fire Brigade')}
          className="emergency-quick-btn fire"
        >
          <span className="emergency-icon">🚒</span>
          <span className="emergency-text">
            <strong>Fire Brigade</strong>
            <small>Call 101</small>
          </span>
        </button>
      </div>

      <div className="service-filters">
        <button 
          onClick={() => setFilter('all')}
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        >
          All Services
        </button>
        <button 
          onClick={() => setFilter('hospital')}
          className={`filter-btn ${filter === 'hospital' ? 'active' : ''}`}
        >
          H+ Hospitals
        </button>
        <button 
          onClick={() => setFilter('police')}
          className={`filter-btn ${filter === 'police' ? 'active' : ''}`}
        >
          POL Police
        </button>
        <button 
          onClick={() => setFilter('ambulance')}
          className={`filter-btn ${filter === 'ambulance' ? 'active' : ''}`}
        >
          AMB Ambulance
        </button>
      </div>

      <div className="services-list">
        {filteredServices.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon-container" style={{ backgroundColor: getServiceColor(service.type) + '20' }}>
              <span className="service-icon" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: getServiceColor(service.type) }}>
                {getServiceIcon(service.type)}
              </span>
            </div>
            <div className="service-info">
              <h4 className="service-name">{service.name}</h4>
              <p className="service-address">{service.address}</p>
              <div className="service-meta">
                {service.available24x7 && (
                  <span className="service-badge">24x7 Available</span>
                )}
              </div>
            </div>
            <button 
              onClick={() => handleEmergencyCall(service.phone, service.name)}
              className="call-btn"
              style={{ backgroundColor: getServiceColor(service.type) }}
            >
              CALL {service.phone}
            </button>
          </div>
        ))}
      </div>

      <div className="safety-tips-section">
        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
          EMERGENCY SAFETY TIPS
        </h3>
        <ul className="safety-tips-list">
          <li>Save emergency numbers in your phone for quick access</li>
          <li>In case of accident, call 108 immediately for ambulance</li>
          <li>Move to a safe location away from traffic</li>
          <li>Do not move injured persons unless there is immediate danger</li>
          <li>Take photos of accident scene for insurance and police</li>
          <li>Keep first-aid kit in your vehicle</li>
        </ul>
      </div>
    </div>
  );
}
