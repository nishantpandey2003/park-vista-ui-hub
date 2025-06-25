
import React, { useState } from 'react';
import './CloudBackup.css';

export const CloudBackup = () => {
  const [backupStatus, setBackupStatus] = useState({
    lastBackup: new Date(Date.now() - 3600000), // 1 hour ago
    nextBackup: new Date(Date.now() + 3600000), // 1 hour from now
    status: 'success',
    dataSize: '2.4 GB',
    storageUsed: 65,
    storageTotal: 100,
  });
  
  const [isBackingUp, setIsBackingUp] = useState(false);

  const startManualBackup = async () => {
    setIsBackingUp(true);
    setBackupStatus(prev => ({ ...prev, status: 'pending' }));

    // Simulate backup process
    await new Promise(resolve => setTimeout(resolve, 3000));

    setBackupStatus(prev => ({
      ...prev,
      lastBackup: new Date(),
      nextBackup: new Date(Date.now() + 3600000),
      status: 'success',
    }));
    setIsBackingUp(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return '✅';
      case 'pending':
        return '⏰';
      case 'error':
        return '⚠️';
      default:
        return '☁️';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return '#22c55e';
      case 'pending':
        return '#f59e0b';
      case 'error':
        return '#ef4444';
      default:
        return '#3b82f6';
    }
  };

  return (
    <div className="backup-container">
      <div className="backup-header">
        <h2 className="backup-title">
          <span className="title-icon">☁️</span>
          Cloud Backup & Storage
        </h2>
        <p className="backup-subtitle">Secure cloud backup with real-time synchronization</p>
      </div>

      <div className="backup-grid">
        {/* Backup Status Card */}
        <div className="backup-card">
          <div className="card-header">
            <h3 className="card-title">
              <span style={{ color: getStatusColor(backupStatus.status) }}>
                {getStatusIcon(backupStatus.status)}
              </span>
              Backup Status
            </h3>
          </div>
          <div className="card-content">
            <div className="status-details">
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span 
                  className="detail-value status"
                  style={{ color: getStatusColor(backupStatus.status) }}
                >
                  {isBackingUp ? 'Backing up...' : backupStatus.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Last Backup:</span>
                <span className="detail-value">{backupStatus.lastBackup.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Next Backup:</span>
                <span className="detail-value">{backupStatus.nextBackup.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Data Size:</span>
                <span className="detail-value">{backupStatus.dataSize}</span>
              </div>
            </div>

            <button
              onClick={startManualBackup}
              disabled={isBackingUp}
              className="backup-button"
            >
              {isBackingUp ? (
                <div className="button-loading">
                  <div className="spinner"></div>
                  Backing Up...
                </div>
              ) : (
                'Start Manual Backup'
              )}
            </button>
          </div>
        </div>

        {/* Storage Usage Card */}
        <div className="backup-card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="card-icon">💾</span>
              Storage Usage
            </h3>
          </div>
          <div className="card-content">
            <div className="storage-info">
              <div className="detail-row">
                <span className="detail-label">Used:</span>
                <span className="detail-value">{backupStatus.storageUsed} GB</span>
              </div>
              <div className="storage-bar">
                <div
                  className="storage-progress"
                  style={{ width: `${backupStatus.storageUsed}%` }}
                ></div>
              </div>
              <div className="storage-labels">
                <span>0 GB</span>
                <span>{backupStatus.storageTotal} GB</span>
              </div>
            </div>

            <div className="storage-summary">
              <div className="detail-row">
                <span className="detail-label">Available:</span>
                <span className="detail-value available">{backupStatus.storageTotal - backupStatus.storageUsed} GB</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Total:</span>
                <span className="detail-value">{backupStatus.storageTotal} GB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Encryption Card */}
        <div className="backup-card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="card-icon">🛡️</span>
              Security
            </h3>
          </div>
          <div className="card-content">
            <div className="security-features">
              <div className="security-item">
                <span className="detail-label">Encryption:</span>
                <div className="security-status">
                  <span className="security-icon">✅</span>
                  <span className="security-text">AES-256</span>
                </div>
              </div>
              <div className="security-item">
                <span className="detail-label">Backup Integrity:</span>
                <div className="security-status">
                  <span className="security-icon">✅</span>
                  <span className="security-text">Verified</span>
                </div>
              </div>
              <div className="security-item">
                <span className="detail-label">Access Control:</span>
                <div className="security-status">
                  <span className="security-icon">✅</span>
                  <span className="security-text">Active</span>
                </div>
              </div>
              <div className="security-item">
                <span className="detail-label">Auto-Sync:</span>
                <div className="security-status">
                  <span className="security-icon">✅</span>
                  <span className="security-text">Enabled</span>
                </div>
              </div>
            </div>

            <div className="security-note">
              <p>All data is encrypted end-to-end and stored securely in the cloud</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Backups */}
      <div className="history-card">
        <div className="card-header">
          <h3 className="card-title">
            <span className="card-icon">⏰</span>
            Recent Backup History
          </h3>
        </div>
        <div className="card-content">
          <div className="history-list">
            {[
              { time: '2 hours ago', status: 'success', size: '2.4 GB' },
              { time: '1 day ago', status: 'success', size: '2.3 GB' },
              { time: '2 days ago', status: 'success', size: '2.2 GB' },
              { time: '3 days ago', status: 'success', size: '2.1 GB' },
            ].map((backup, index) => (
              <div key={index} className="history-item">
                <div className="history-info">
                  <span className="history-icon">✅</span>
                  <span className="history-text">Backup completed</span>
                </div>
                <div className="history-details">
                  <p className="history-time">{backup.time}</p>
                  <p className="history-size">{backup.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
