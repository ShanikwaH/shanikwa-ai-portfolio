import React from 'react';
import { Upload, Calculator, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex justify-center items-center space-x-6 mb-4">
          <div className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-green-400" />
            <span className="text-sm">Real File Processing</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-blue-400" />
            <span className="text-sm">Working Calculators</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-sm">Intelligent AI Analysis</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm">
          This portfolio features fully functional data analysis tools with sophisticated AI demonstrations.
          <br />All features showcase the analytical capabilities and intelligent insights you'll get working with Shanikwa.
        </p>
      </div>
    </footer>
  );
}
