import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

export default function Header({ audienceMode, setAudienceMode }) {
  return (
    <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Shanikwa's AI-Powered Portfolio</h1>
              <p className="text-sm text-gray-300">Data Analyst • Working Tools & Intelligent Analysis</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex bg-white/10 rounded-lg p-1 backdrop-blur-sm">
              {['executive', 'technical', 'client'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setAudienceMode(mode)}
                  className={`px-3 py-1 rounded-md text-sm transition-all duration-300 ${
                    audienceMode === mode
                      ? 'bg-white text-gray-900 shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/20'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2 text-sm bg-green-500/20 px-3 py-1 rounded-lg">
              <Sparkles className="w-4 h-4 text-green-400" />
              <span className="text-green-300">AI Demo Active</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
