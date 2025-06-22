
import { Car, Clock } from 'lucide-react';

interface ParkingSpace {
  id: number;
  isOccupied: boolean;
  timeRemaining?: number | null;
}

interface ParkingGridProps {
  spaces: ParkingSpace[];
}

export const ParkingGrid = ({ spaces }: ParkingGridProps) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Car className="text-purple-400" />
        Parking Layout
      </h2>
      
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
        {spaces.map((space) => (
          <div
            key={space.id}
            className={`aspect-square rounded-lg border-2 transition-all duration-300 hover:scale-105 cursor-pointer relative ${
              space.isOccupied
                ? 'bg-red-500/20 border-red-500 shadow-lg shadow-red-500/25'
                : 'bg-green-500/20 border-green-500 shadow-lg shadow-green-500/25'
            }`}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <span className="text-xs font-bold">{space.id}</span>
              {space.isOccupied && space.timeRemaining && (
                <div className="flex items-center gap-1 mt-1">
                  <Clock size={8} />
                  <span className="text-xs">{space.timeRemaining}m</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-6 mt-8 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500/30 border border-green-500 rounded"></div>
          <span className="text-sm text-slate-300">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500/30 border border-red-500 rounded"></div>
          <span className="text-sm text-slate-300">Occupied</span>
        </div>
      </div>
    </div>
  );
};
