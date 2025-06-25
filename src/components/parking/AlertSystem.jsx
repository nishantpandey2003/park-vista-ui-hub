
import React, { useState } from 'react';
import './AlertSystem.css';

export const AlertSystem = () => {
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      type: 'info',
      message: 'Space A-15 will be available in 5 minutes',
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'warning',
      message: 'High occupancy detected - 85% full',
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: '3',
      type: 'success',
      message: 'Daily backup completed successfully',
      timestamp: new Date(Date.now() - 600000),
    },
  ]);

  const removeAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'success':
        return '✅';
      default:
        return '🔔';
    }
  };

  return (
    <div className="alert-container">
      <h2 className="alert-title">
        <span className="title-icon">🔔</span>
        Alerts & Notifications
      </h2>

      <div className="alerts-list">
        {alerts.length === 0 ? (
          <div className="no-alerts">
            <span className="no-alerts-icon">🔔</span>
            <p>No active alerts</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className={`alert-item ${alert.type}`}>
              <div className="alert-icon">
                {getAlertIcon(alert.type)}
              </div>
              <div className="alert-content">
                <p className="alert-message">{alert.message}</p>
                <p className="alert-time">
                  {alert.timestamp.toLocaleTimeString()}
                </p>
              </div>
              <button
                onClick={() => removeAlert(alert.id)}
                className="alert-close"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
