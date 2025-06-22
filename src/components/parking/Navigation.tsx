
import { Car, Ticket, Cloud, BarChart3 } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'ticketing', label: 'Ticketing', icon: Ticket },
    { id: 'backup', label: 'Cloud Backup', icon: Cloud },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 bg-slate-800/50 backdrop-blur-sm p-2 rounded-2xl border border-slate-700">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Icon size={20} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
