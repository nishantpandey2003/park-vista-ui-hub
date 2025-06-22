
import { Car, Clock, CheckCircle } from 'lucide-react';

interface StatsOverviewProps {
  totalSpaces: number;
  occupiedSpaces: number;
  availableSpaces: number;
}

export const StatsOverview = ({ totalSpaces, occupiedSpaces, availableSpaces }: StatsOverviewProps) => {
  const occupancyRate = Math.round((occupiedSpaces / totalSpaces) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-300 text-sm font-medium">Available Spaces</p>
            <p className="text-3xl font-bold text-white mt-2">{availableSpaces}</p>
          </div>
          <div className="bg-green-500/20 p-3 rounded-xl">
            <CheckCircle className="text-green-400" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-300 text-sm font-medium">Occupied Spaces</p>
            <p className="text-3xl font-bold text-white mt-2">{occupiedSpaces}</p>
          </div>
          <div className="bg-red-500/20 p-3 rounded-xl">
            <Car className="text-red-400" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-300 text-sm font-medium">Occupancy Rate</p>
            <p className="text-3xl font-bold text-white mt-2">{occupancyRate}%</p>
          </div>
          <div className="bg-blue-500/20 p-3 rounded-xl">
            <Clock className="text-blue-400" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};
