import React, { useState } from 'react';
import { Calculator, TrendingUp, Upload, Sparkles } from 'lucide-react';
import { skillsData } from '../data/sampleData';
import { calculateCorrelation } from '../utils/stats';

const Calculators = ({
  uploadedData,
  roiInputs,
  setRoiInputs,
  roiResult,
  onCalculateROI,
  isAnalyzing,
  onAnalyze,
}) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center mb-8">Business Analysis Calculators</h2>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* ROI Calculator */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-green-400" />
            ROI Calculator
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Initial Investment ($)</label>
              <input
                type="number"
                value={roiInputs.investment}
                onChange={(e) => setRoiInputs({ ...roiInputs, investment: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                placeholder="Enter investment amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total Revenue Generated ($)</label>
              <input
                type="number"
                value={roiInputs.revenue}
                onChange={(e) => setRoiInputs({ ...roiInputs, revenue: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                placeholder="Enter revenue generated"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time Period (years)</label>
              <input
                type="number"
                value={roiInputs.timeframe}
                onChange={(e) => setRoiInputs({ ...roiInputs, timeframe: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                placeholder="Enter time period"
              />
            </div>
            <button
              onClick={onCalculateROI}
              className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium"
            >
              Calculate ROI
            </button>
          </div>

          {roiResult && (
            <>
              <div className="mt-6 p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                <h4 className="font-semibold text-green-300 mb-3">ROI Analysis Results</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-300">Total Profit</div>
                    <div className="text-lg font-semibold text-white">${roiResult.totalProfit.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-300">ROI Percentage</div>
                    <div className="text-lg font-semibold text-green-400">{roiResult.roiPercentage}%</div>
                  </div>
                  <div>
                    <div className="text-gray-300">Annualized ROI</div>
                    <div className="text-lg font-semibold text-white">{roiResult.annualizedROI}%</div>
                  </div>
                  <div>
                    <div className="text-gray-300">Payback Period</div>
                    <div className="text-lg font-semibold text-white">{roiResult.paybackPeriod} years</div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onAnalyze('roi-analysis')}
                disabled={isAnalyzing}
                className="w-full mt-3 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm disabled:opacity-50 flex items-center justify-center space-x-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>{isAnalyzing ? 'Analyzing...' : 'Get AI ROI Insights'}</span>
              </button>
            </>
          )}
        </div>

        {/* Correlation Analysis */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
            Correlation Analysis
          </h3>
          {uploadedData ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-300">Analyze correlations between variables in your uploaded data.</p>
              {Object.keys(uploadedData[0]).length >= 2 && (
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(uploadedData[0]).slice(0, 6).map((col1, i) =>
                    Object.keys(uploadedData[0]).slice(i + 1, 7).map((col2, j) => {
                      const correlation = calculateCorrelation(uploadedData, col1, col2);
                      return correlation !== null ? (
                        <div key={`${col1}-${col2}`} className="bg-white/5 rounded-lg p-3">
                          <div className="text-xs text-gray-400">{col1} vs {col2}</div>
                          <div className={`text-lg font-semibold ${
                            Math.abs(correlation) > 0.7 ? 'text-red-400' :
                            Math.abs(correlation) > 0.3 ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            {correlation.toFixed(3)}
                          </div>
                        </div>
                      ) : null;
                    })
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-gray-400">Upload data to perform correlation analysis</p>
            </div>
          )}
        </div>
      </div>

      {/* Skills Demonstration */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold mb-4">Skills Demonstration</h3>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-purple-300 mb-4">Technical Capabilities</h4>
            <div className="space-y-3">
              {skillsData.map((skill, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="group cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-sm transition-colors duration-300 ${hoveredSkill === index ? 'text-white' : 'text-gray-300'}`}>{skill.name}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-1000"
                          style={{
                            width: `${skill.value}%`,
                            backgroundColor: skill.color,
                          }}
                        ></div>
                      </div>
                      <span className={`text-sm w-10 transition-colors duration-300 ${hoveredSkill === index ? 'text-white' : 'text-gray-300'}`}>{skill.value}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-blue-300 mb-4">Working Tools Available</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>CSV Data Upload &amp; Processing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Statistical Analysis &amp; Summaries</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Interactive Chart Generation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Correlation &amp; Regression Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>ROI &amp; Business Calculators</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Intelligent AI Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Data Export &amp; Visualization</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Real-time Data Processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculators;
