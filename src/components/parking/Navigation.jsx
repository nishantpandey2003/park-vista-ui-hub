
import React from 'react';
import './Navigation.css';

export const Navigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'ticketing', label: 'Ticketing', icon: '🎫' },
    { id: 'backup', label: 'Cloud Backup', icon: '☁️' },
  ];

  return (
    <div className="navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`nav-button ${activeTab === tab.id ? 'active' : ''}`}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
