interface IconProps {
  type: 'location' | 'warning' | 'vehicle' | 'people' | 'camera' | 'folder' | 
        'video' | 'photo' | 'note' | 'user' | 'phone' | 'success' | 'loading' |
        'hospital' | 'police' | 'fire' | 'ambulance' | 'alert';
  className?: string;
}

export default function Icon({ type, className = '' }: IconProps) {
  const icons: { [key: string]: string } = {
    location: '📍',
    warning: '⚠️',
    vehicle: '🚕',
    people: '👥',
    camera: '📷',
    folder: '📁',
    video: '📸',
    photo: '📷',
    note: '🗒️',
    user: '👤',
    phone: '☎️',
    success: '✅',
    loading: '⏳',
    hospital: '🏥',
    police: '👮',
    fire: '🔥',
    ambulance: '🚑',
    alert: '🚨'
  };

  return (
    <span className={`icon ${className}`} style={{ fontFamily: 'Arial, sans-serif' }}>
      {icons[type] || '•'}
    </span>
  );
}
