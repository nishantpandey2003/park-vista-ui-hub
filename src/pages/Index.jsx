
import { useState } from 'react';
import { ParkingGrid } from '../components/parking/ParkingGrid.jsx';
import { StatsOverview } from '../components/parking/StatsOverview.jsx';
import './Index.css';

const Index = () => {
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
        <div className="dashboard-content">
          <StatsOverview 
            totalSpaces={parkingSpaces.length}
            occupiedSpaces={occupiedSpaces}
            availableSpaces={availableSpaces}
          />
          <ParkingGrid spaces={parkingSpaces} />
        </div>
      </div>
    </div>
  );
};

export default Index;
