import React, { useState } from 'react';
import { Upload, Filter, BarChart3, Download, Sparkles } from 'lucide-react';
import { ResponsiveContainer } from 'recharts';
import { renderChart } from '../utils/chartRenderer';
import { sampleBusinessData } from '../data/sampleData';

const DataTools = ({
  uploadedData,
  filteredData,
  statisticalSummary,
  onFileUpload,
  applyDataFilter,
  clearFilters,
  downloadChart,
  downloadData,
  isAnalyzing,
  onAnalyze,
}) => {
  const [chartType, setChartType] = useState('bar');

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center mb-8">Working Data Analysis Tools</h2>

      {/* File Upload */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Upload className="w-5 h-5 mr-2" />
          Upload Your Data
        </h3>
        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept=".csv"
            onChange={onFileUpload}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700"
          />
          <span className="text-sm text-gray-300">
            {uploadedData ? `${uploadedData.length} rows loaded` : 'Upload CSV file for analysis'}
          </span>
        </div>
      </div>

      {/* Data Controls and Chart Display */}
      {uploadedData && (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h4 className="font-semibold mb-4 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filter Data
              </h4>
              <div className="space-y-3">
                <select
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  onChange={(e) => {
                    if (e.target.value) {
                      const [column, operator, value] = e.target.value.split('|');
                      applyDataFilter(column, value, operator);
                    }
                  }}
                >
                  <option value="">Select filter...</option>
                  {Object.keys(uploadedData[0]).map(column => (
                    <option key={column} value={`${column}|contains|`}>{column}</option>
                  ))}
                </select>
                <button
                  onClick={clearFilters}
                  className="w-full bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h4 className="font-semibold mb-4 flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                Chart Type
              </h4>
              <div className="space-y-3">
                <select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                >
                  <option value="bar">Bar Chart</option>
                  <option value="line">Line Chart</option>
                  <option value="area">Area Chart</option>
                  <option value="scatter">Scatter Plot</option>
                </select>
                <button
                  onClick={downloadChart}
                  className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm"
                >
                  Download Chart
                </button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h4 className="font-semibold mb-4 flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export & Analysis
              </h4>
              <div className="space-y-3">
                <button
                  onClick={downloadData}
                  className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
                >
                  Download CSV
                </button>
                <button
                  onClick={() => onAnalyze('data-insights')}
                  disabled={isAnalyzing}
                  className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm disabled:opacity-50 flex items-center justify-center space-x-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{isAnalyzing ? 'Analyzing...' : 'AI Data Analysis'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">Interactive Data Visualization</h3>
            <ResponsiveContainer width="100%" height={400}>
              {renderChart(filteredData || uploadedData || sampleBusinessData, chartType, sampleBusinessData)}
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* Show sample chart when no data uploaded */}
      {!uploadedData && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold mb-4">Sample Business Data Visualization</h3>
          <ResponsiveContainer width="100%" height={400}>
            {renderChart(filteredData || uploadedData || sampleBusinessData, chartType, sampleBusinessData)}
          </ResponsiveContainer>
          <p className="text-sm text-gray-400 mt-4 text-center">Upload your own CSV data to see your data visualized here</p>
        </div>
      )}

      {/* Statistical Summary */}
      {statisticalSummary && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold mb-4">Statistical Summary</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(statisticalSummary).map(([column, stats]) => (
              <div key={column} className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-purple-300 mb-2">{column}</h4>
                <div className="space-y-1 text-sm">
                  <div>Count: {stats.count}</div>
                  <div>Mean: {stats.mean}</div>
                  <div>Median: {stats.median}</div>
                  <div>Std Dev: {stats.stdDev}</div>
                  <div>Range: {stats.min} - {stats.max}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTools;
