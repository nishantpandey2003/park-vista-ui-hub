
import { useState } from 'react';
import { ParkingGrid } from '../components/parking/ParkingGrid.jsx';
import { AlertSystem } from '../components/parking/AlertSystem.jsx';
import { TicketingSystem } from '../components/parking/TicketingSystem.jsx';
import { CloudBackup } from '../components/parking/CloudBackup.jsx';
import { StatsOverview } from '../components/parking/StatsOverview.jsx';
import { Navigation } from '../components/parking/Navigation.jsx';
import './Index.css';

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
    <div className="main-container">
      <div className="container">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="main-content">
          {activeTab === 'dashboard' && (
            <div className="dashboard-content">
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
