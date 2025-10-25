interface IconProps {
  type: 'location' | 'warning' | 'vehicle' | 'people' | 'camera' | 'folder' | 
        'video' | 'photo' | 'note' | 'user' | 'phone' | 'success' | 'loading' |
        'hospital' | 'police' | 'fire' | 'ambulance' | 'alert';
  className?: string;
}

export default function Icon({ type, className = '' }: IconProps) {
  const icons: { [key: string]: string } = {
    location: 'Ì≥ç',
    warning: '‚ö†Ô∏è',
    vehicle: 'Ì∫ó',
    people: 'Ì±•',
    camera: 'Ì≥∑',
    folder: 'Ì≥Å',
    video: 'Ìæ•',
    photo: 'Ì≥∏',
    note: 'Ì≥ù',
    user: 'Ì±§',
    phone: '‚òéÔ∏è',
    success: '‚úì',
    loading: '‚è≥',
    hospital: 'Ìø•',
    police: 'Ì±Æ',
    fire: 'Ì∫í',
    ambulance: 'Ì∫ë',
    alert: 'Ì∫®'
  };

  return (
    <span className={`icon ${className}`} style={{ fontFamily: 'Arial, sans-serif' }}>
      {icons[type] || '‚Ä¢'}
    </span>
  );
}
