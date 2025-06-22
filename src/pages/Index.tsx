
import { useState, useEffect } from 'react';
import { ParkingGrid } from '@/components/parking/ParkingGrid';
import { AlertSystem } from '@/components/parking/AlertSystem';
import { TicketingSystem } from '@/components/parking/TicketingSystem';
import { CloudBackup } from '@/components/parking/CloudBackup';
import { StatsOverview } from '@/components/parking/StatsOverview';
import { Navigation } from '@/components/parking/Navigation';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [parkingSpaces] = useState(() => {
    // Generate 40 parking spaces with random occupancy
    return Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      isOccupied: Math.random() > 0.6,
      timeRemaining: Math.random() > 0.5 ? Math.floor(Math.random() * 120) + 30 : null,
    }));
  });

  const occupiedSpaces = parkingSpaces.filter(space => space.isOccupied).length;
  const availableSpaces = parkingSpaces.length - occupiedSpaces;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Park<span className="text-purple-400">Vista</span>
          </h1>
          <p className="text-slate-300 text-lg">Smart Parking Management System</p>
        </div>

        {/* Navigation */}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main Content */}
        <div className="mt-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <StatsOverview 
                totalSpaces={parkingSpaces.length}
                occupiedSpaces={occupiedSpaces}
                availableSpaces={availableSpaces}
              />
              <ParkingGrid spaces={parkingSpaces} />
              <AlertSystem />
            </div>
          )}
          
          {activeTab === 'ticketing' && <TicketingSystem />}
          
          {activeTab === 'backup' && <CloudBackup />}
        </div>
      </div>
    </div>
  );
};

export default Index;
