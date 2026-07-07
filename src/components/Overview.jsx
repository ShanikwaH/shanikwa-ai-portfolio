import React from 'react';
import { TrendingUp, Upload, Calculator, Brain, Award, Sparkles } from 'lucide-react';
import { getAudienceContent } from '../data/audienceContent';
import { performanceData } from '../data/sampleData';

const Overview = ({ audienceMode, setActiveSection, isAnalyzing, analysisResults, onAnalyze }) => {
  const content = getAudienceContent('overview', audienceMode);

  return (
    <div className="space-y-8">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {content.title}
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          {content.description}
        </p>
        <div className="flex justify-center space-x-8">
          {content.highlights.map((highlight, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-purple-400">{highlight}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Working Features Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-300 cursor-pointer" onClick={() => setActiveSection('datatools')}>
          <Upload className="w-8 h-8 text-purple-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Real Data Upload & Analysis</h3>
          <p className="text-gray-300 text-sm">Upload CSV files, get statistical analysis, create interactive charts, and download results.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-blue-500/50 transition-all duration-300 cursor-pointer" onClick={() => setActiveSection('calculators')}>
          <Calculator className="w-8 h-8 text-blue-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Business Calculators</h3>
          <p className="text-gray-300 text-sm">ROI calculator, correlation analysis, statistical summaries, and business metrics tools.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-green-500/50 transition-all duration-300 cursor-pointer" onClick={() => setActiveSection('chat')}>
          <Brain className="w-8 h-8 text-green-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Intelligent AI Analysis</h3>
          <p className="text-gray-300 text-sm">Chat with sophisticated AI about your data, get insights, and receive customized business recommendations.</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {performanceData.map((metric, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-300"
          >
            <h3 className="text-sm font-medium text-gray-300 mb-2">{metric.metric}</h3>
            <div className="text-3xl font-bold text-white mb-2">
              {metric.value}%
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400">Target: {metric.target}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Live Demo Button */}
      <div className="text-center">
        <button
          onClick={() => onAnalyze('business-performance')}
          disabled={isAnalyzing}
          className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-xl text-lg font-medium hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div>
              <span>AI is analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Get Intelligent Business Analysis</span>
            </>
          )}
        </button>
      </div>

      {/* Analysis Results */}
      {analysisResults && (
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-purple-400" />
            AI Business Analysis - {analysisResults.type}
            <span className="ml-2 text-sm bg-green-500/20 text-green-300 px-2 py-1 rounded">
              Smart Demo
            </span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-purple-300 mb-2">Key Insights</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                {analysisResults.insights.map((insight, i) => (
                  <li key={i}>• {insight}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-pink-300 mb-2">Recommendations</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                {analysisResults.recommendations.map((rec, i) => (
                  <li key={i}>• {rec}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-yellow-300 mb-2">Risk Factors</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                {analysisResults.risks.map((risk, i) => (
                  <li key={i}>• {risk}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-300 mb-2">Success Metrics</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                {analysisResults.metrics.map((metric, i) => (
                  <li key={i}>• {metric}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-400 flex items-center justify-between">
            <span>{analysisResults.dataUsed} | Generated: {analysisResults.timestamp}</span>
            <span className="text-green-400 flex items-center">
              <Sparkles className="w-3 h-3 mr-1" />
              Powered by Intelligent Analysis
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
