import { useEffect, useState } from 'react';
import { AlertTriangle, Activity, MapPin, TrendingDown } from 'lucide-react';
import { BlackSpot, Statistics } from '../types';

export default function Home() {
  const [blackspots, setBlackspots] = useState<BlackSpot[]>([]);
  const [stats, setStats] = useState<Statistics | null>(null);

  useEffect(() => {
    // Demo data
    setBlackspots([
      {
        name: "Prakash High School to Kapsi Bridge",
        location: { lat: 21.0891, lng: 79.0641 },
        accident_count: 15,
        zone: "Pardi",
        description: "Highest accident rate"
      },
    ]);
    setStats({
      total_accidents: 327,
      total_blackspots: 5,
      zones: { MIDC: 52, Indora: 44 },
      last_updated: "2025-10-22"
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Nagpur Traffic Accident Predictor
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            AI-powered safety analysis
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Dashboard Loaded!</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded">
              <p className="text-sm text-gray-600">Total Accidents</p>
              <p className="text-3xl font-bold">{stats?.total_accidents}</p>
            </div>
            <div className="p-4 bg-red-50 rounded">
              <p className="text-sm text-gray-600">Black Spots</p>
              <p className="text-3xl font-bold">{stats?.total_blackspots}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Black Spots:</h3>
            {blackspots.map((spot, i) => (
              <div key={i} className="p-3 border rounded mb-2">
                <p className="font-medium">{spot.name}</p>
                <p className="text-sm text-gray-600">{spot.accident_count} accidents</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
