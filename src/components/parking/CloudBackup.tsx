
import { useState, useEffect } from 'react';
import { Cloud, CheckCircle, Clock, AlertTriangle, Database, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BackupStatus {
  lastBackup: Date;
  nextBackup: Date;
  status: 'success' | 'pending' | 'error';
  dataSize: string;
  storageUsed: number;
  storageTotal: number;
}

export const CloudBackup = () => {
  const [backupStatus, setBackupStatus] = useState<BackupStatus>({
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-400" size={20} />;
      case 'pending':
        return <Clock className="text-yellow-400" size={20} />;
      case 'error':
        return <AlertTriangle className="text-red-400" size={20} />;
      default:
        return <Cloud className="text-blue-400" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Cloud className="text-purple-400" />
          Cloud Backup & Storage
        </h2>
        <p className="text-slate-300">Secure cloud backup with real-time synchronization</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Backup Status Card */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              {getStatusIcon(backupStatus.status)}
              Backup Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Status:</span>
                <span className={`font-medium capitalize ${getStatusColor(backupStatus.status)}`}>
                  {isBackingUp ? 'Backing up...' : backupStatus.status}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Last Backup:</span>
                <span className="text-white">{backupStatus.lastBackup.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Next Backup:</span>
                <span className="text-white">{backupStatus.nextBackup.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Data Size:</span>
                <span className="text-white">{backupStatus.dataSize}</span>
              </div>
            </div>

            <Button
              onClick={startManualBackup}
              disabled={isBackingUp}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isBackingUp ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Backing Up...
                </div>
              ) : (
                'Start Manual Backup'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Storage Usage Card */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Database className="text-purple-400" size={20} />
              Storage Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Used:</span>
                <span className="text-white">{backupStatus.storageUsed} GB</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${backupStatus.storageUsed}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>0 GB</span>
                <span>{backupStatus.storageTotal} GB</span>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-700">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Available:</span>
                <span className="text-green-400">{backupStatus.storageTotal - backupStatus.storageUsed} GB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Total:</span>
                <span className="text-white">{backupStatus.storageTotal} GB</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Encryption Card */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="text-purple-400" size={20} />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Encryption:</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" size={16} />
                  <span className="text-green-400 text-sm">AES-256</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Backup Integrity:</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" size={16} />
                  <span className="text-green-400 text-sm">Verified</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Access Control:</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" size={16} />
                  <span className="text-green-400 text-sm">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Auto-Sync:</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" size={16} />
                  <span className="text-green-400 text-sm">Enabled</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700">
              <p className="text-xs text-slate-400 text-center">
                All data is encrypted end-to-end and stored securely in the cloud
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Backups */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="text-purple-400" size={20} />
            Recent Backup History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: '2 hours ago', status: 'success', size: '2.4 GB' },
              { time: '1 day ago', status: 'success', size: '2.3 GB' },
              { time: '2 days ago', status: 'success', size: '2.2 GB' },
              { time: '3 days ago', status: 'success', size: '2.1 GB' },
            ].map((backup, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-400" size={16} />
                  <span className="text-white text-sm">Backup completed</span>
                </div>
                <div className="text-right">
                  <p className="text-slate-300 text-sm">{backup.time}</p>
                  <p className="text-slate-400 text-xs">{backup.size}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
