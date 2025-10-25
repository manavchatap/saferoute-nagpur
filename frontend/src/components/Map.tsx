import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface BlackSpot {
  name: string;
  location: { lat: number; lng: number };
  accident_count: number;
  zone: string;
  description: string;
}

interface MapProps {
  blackspots: BlackSpot[];
  center?: LatLngExpression;
  zoom?: number;
  selectedSpot?: BlackSpot | null;
}

function MapUpdater({ center }: { center: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

export default function Map({ blackspots, center = [21.1458, 79.0882], zoom = 12, selectedSpot }: MapProps) {
  const getRiskColor = (count: number) => {
    if (count >= 10) return '#dc2626'; // red
    if (count >= 5) return '#f59e0b';  // amber
    return '#3b82f6'; // blue
  };

  const currentCenter = selectedSpot 
    ? [selectedSpot.location.lat, selectedSpot.location.lng] as LatLngExpression
    : center;

  console.log('Map rendering with', blackspots.length, 'blackspots');

  return (
    <MapContainer
      center={currentCenter}
      zoom={selectedSpot ? 15 : zoom}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
      scrollWheelZoom={true}
    >
      <MapUpdater center={currentCenter} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {blackspots && blackspots.length > 0 && blackspots.map((spot, index) => (
        <div key={index}>
          <Circle
            center={[spot.location.lat, spot.location.lng]}
            radius={300}
            pathOptions={{
              fillColor: getRiskColor(spot.accident_count),
              fillOpacity: 0.3,
              color: getRiskColor(spot.accident_count),
              weight: 2,
            }}
          />
          <Marker position={[spot.location.lat, spot.location.lng]}>
            <Popup>
              <div style={{ padding: '8px', minWidth: '200px' }}>
                <h3 style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>{spot.name}</h3>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Zone: {spot.zone}</p>
                <p style={{ fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', color: '#dc2626' }}>Accidents: {spot.accident_count}</span>
                </p>
                <p style={{ fontSize: '11px', color: '#888' }}>{spot.description}</p>
              </div>
            </Popup>
          </Marker>
        </div>
      ))}
    </MapContainer>
  );
}
