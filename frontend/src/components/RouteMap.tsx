import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
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

// Custom marker icons
const originIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const destIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface RouteMapProps {
  origin: { lat: number; lng: number } | null;
  destination: { lat: number; lng: number } | null;
  onOriginSelect: (lat: number, lng: number) => void;
  onDestSelect: (lat: number, lng: number) => void;
  mode: 'origin' | 'dest' | null;
}

function MapClickHandler({ mode, onOriginSelect, onDestSelect }: any) {
  useMapEvents({
    click: (e) => {
      if (mode === 'origin') {
        onOriginSelect(e.latlng.lat, e.latlng.lng);
      } else if (mode === 'dest') {
        onDestSelect(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
}

export default function RouteMap({ origin, destination, onOriginSelect, onDestSelect, mode }: RouteMapProps) {
  const center: LatLngExpression = [21.1458, 79.0882]; // Nagpur center

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapClickHandler 
          mode={mode} 
          onOriginSelect={onOriginSelect} 
          onDestSelect={onDestSelect} 
        />

        {/* Origin Marker */}
        {origin && (
          <Marker position={[origin.lat, origin.lng]} icon={originIcon}>
            <Popup>
              <div style={{ padding: '4px' }}>
                <strong>í¿¢ Starting Point</strong>
                <p style={{ fontSize: '11px', margin: '4px 0 0 0' }}>
                  {origin.lat.toFixed(4)}, {origin.lng.toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Destination Marker */}
        {destination && (
          <Marker position={[destination.lat, destination.lng]} icon={destIcon}>
            <Popup>
              <div style={{ padding: '4px' }}>
                <strong>ï¿½ï¿½ Destination</strong>
                <p style={{ fontSize: '11px', margin: '4px 0 0 0' }}>
                  {destination.lat.toFixed(4)}, {destination.lng.toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Route Line */}
        {origin && destination && (
          <Polyline 
            positions={[[origin.lat, origin.lng], [destination.lat, destination.lng]]} 
            color="#3b82f6"
            weight={4}
            opacity={0.7}
            dashArray="10, 10"
          />
        )}
      </MapContainer>

      {/* Instructions Overlay */}
      {mode && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '600',
          zIndex: 1000,
          pointerEvents: 'none'
        }}>
          {mode === 'origin' ? 'í¿¢ Click on map to set Starting Point' : 'í´´ Click on map to set Destination'}
        </div>
      )}
    </div>
  );
}
