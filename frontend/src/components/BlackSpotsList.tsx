import { BlackSpot } from '../types';
import { MapPin, AlertTriangle } from 'lucide-react';

interface BlackSpotsListProps {
  blackspots: BlackSpot[];
  onSelectSpot: (spot: BlackSpot) => void;
}

export default function BlackSpotsList({ blackspots, onSelectSpot }: BlackSpotsListProps) {
  const getRiskBadge = (count: number) => {
    if (count >= 10) {
      return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">High Risk</span>;
    } else if (count >= 5) {
      return <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">Medium Risk</span>;
    }
    return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Low Risk</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        Accident Black Spots
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {blackspots.map((spot, index) => (
          <div
            key={index}
            onClick={() => onSelectSpot(spot)}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-sm">{spot.name}</h4>
              {getRiskBadge(spot.accident_count)}
            </div>
            <p className="text-xs text-gray-600 mb-2">{spot.description}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-gray-500">
                <MapPin className="w-3 h-3" />
                {spot.zone}
              </span>
              <span className="font-semibold text-red-600">
                {spot.accident_count} accidents
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
