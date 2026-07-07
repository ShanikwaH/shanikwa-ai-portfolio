import React from 'react';
import { Globe, BarChart3, Calculator, MessageSquare } from 'lucide-react';

export default function TabNav({ activeSection, setActiveSection }) {
  return (
    <nav className="flex space-x-1 mb-8 bg-white/5 rounded-xl p-1 backdrop-blur-sm">
      {[
        { id: 'overview', label: 'Overview', icon: Globe },
        { id: 'datatools', label: 'Data Tools', icon: BarChart3 },
        { id: 'calculators', label: 'Calculators', icon: Calculator },
        { id: 'chat', label: 'AI Assistant', icon: MessageSquare }
      ].map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveSection(id)}
          className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 flex-1 justify-center ${
            activeSection === id
              ? 'bg-white text-gray-900 shadow-lg'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span className="font-medium">{label}</span>
        </button>
      ))}
    </nav>
  );
}
