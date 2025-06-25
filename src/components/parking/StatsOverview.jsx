
import React from 'react';
import './StatsOverview.css';

export const StatsOverview = ({ totalSpaces, occupiedSpaces, availableSpaces }) => {
  const occupancyRate = Math.round((occupiedSpaces / totalSpaces) * 100);

  return (
    <div className="stats-grid">
      <div className="stat-card available">
        <div className="stat-content">
          <div className="stat-info">
            <p className="stat-label">Available Spaces</p>
            <p className="stat-value">{availableSpaces}</p>
          </div>
          <div className="stat-icon">
            <span className="icon">✅</span>
          </div>
        </div>
      </div>

      <div className="stat-card occupied">
        <div className="stat-content">
          <div className="stat-info">
            <p className="stat-label">Occupied Spaces</p>
            <p className="stat-value">{occupiedSpaces}</p>
          </div>
          <div className="stat-icon">
            <span className="icon">🚗</span>
          </div>
        </div>
      </div>

      <div className="stat-card rate">
        <div className="stat-content">
          <div className="stat-info">
            <p className="stat-label">Occupancy Rate</p>
            <p className="stat-value">{occupancyRate}%</p>
          </div>
          <div className="stat-icon">
            <span className="icon">⏰</span>
          </div>
        </div>
      </div>
    </div>
  );
};
