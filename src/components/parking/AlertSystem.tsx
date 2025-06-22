
import { useState, useEffect } from 'react';
import { Bell, AlertTriangle, CheckCircle, X } from 'lucide-react';

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'success';
  message: string;
  timestamp: Date;
}

export const AlertSystem = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
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

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="text-yellow-400" size={20} />;
      case 'success':
        return <CheckCircle className="text-green-400" size={20} />;
      default:
        return <Bell className="text-blue-400" size={20} />;
    }
  };

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/30';
      case 'success':
        return 'bg-green-500/10 border-green-500/30';
      default:
        return 'bg-blue-500/10 border-blue-500/30';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Bell className="text-purple-400" />
        Alerts & Notifications
      </h2>

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <Bell size={48} className="mx-auto mb-4 opacity-50" />
            <p>No active alerts</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start gap-4 p-4 rounded-xl border backdrop-blur-sm ${getAlertStyles(alert.type)}`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium">{alert.message}</p>
                <p className="text-slate-400 text-sm mt-1">
                  {alert.timestamp.toLocaleTimeString()}
                </p>
              </div>
              <button
                onClick={() => removeAlert(alert.id)}
                className="flex-shrink-0 text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
