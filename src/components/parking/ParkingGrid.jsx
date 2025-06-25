
import React from 'react';
import './ParkingGrid.css';

export const ParkingGrid = ({ spaces }) => {
  return (
    <div className="parking-container">
      <h2 className="parking-title">
        <span className="title-icon">🚗</span>
        Parking Layout
      </h2>
      
      <div className="parking-grid">
        {spaces.map((space) => (
          <div
            key={space.id}
            className={`parking-space ${space.isOccupied ? 'occupied' : 'available'}`}
          >
            <div className="space-content">
              <span className="space-number">{space.id}</span>
              {space.isOccupied && space.timeRemaining && (
                <div className="time-info">
                  <span className="clock-icon">⏰</span>
                  <span className="time-text">{space.timeRemaining}m</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color available"></div>
          <span className="legend-text">Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-color occupied"></div>
          <span className="legend-text">Occupied</span>
        </div>
      </div>
    </div>
  );
};
