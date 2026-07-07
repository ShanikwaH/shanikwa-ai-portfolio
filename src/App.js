import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TabNav from './components/TabNav';
import Footer from './components/Footer';
import Overview from './components/Overview';
import DataTools from './components/DataTools';
import Calculators from './components/Calculators';
import AIChat from './components/AIChat';
import useUploadedData from './hooks/useUploadedData';
import useAISimulation from './hooks/useAISimulation';
import { computeROI } from './utils/stats';
import { performanceData } from './data/sampleData';

const AIPortfolioDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [audienceMode, setAudienceMode] = useState('executive');
  const [animatedMetrics, setAnimatedMetrics] = useState([]);
  const [chartAnimation, setChartAnimation] = useState(false);
  const [groupByColumn, setGroupByColumn] = useState('');
  const [aggregationType, setAggregationType] = useState('sum');
  const [correlationResults, setCorrelationResults] = useState(null);

  const [roiInputs, setRoiInputs] = useState({ investment: '', revenue: '', timeframe: '' });
  const [roiResult, setRoiResult] = useState(null);

  const {
    uploadedData,
    filteredData,
    selectedColumns,
    statisticalSummary,
    handleFileUpload,
    applyDataFilter,
    clearFilters,
    downloadData,
    downloadChart,
  } = useUploadedData();

  const {
    isAnalyzing,
    analysisResults,
    analyzeWithClaude,
    chatMessages,
    currentMessage,
    setCurrentMessage,
    isTyping,
    handleChatMessage,
    clearChat,
  } = useAISimulation({ uploadedData, statisticalSummary, roiResult, audienceMode });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedMetrics(performanceData);
    }, 500);

    if (activeSection === 'datatools') {
      setChartAnimation(true);
      const chartTimer = setTimeout(() => setChartAnimation(false), 1000);
      return () => clearTimeout(chartTimer);
    }

    return () => clearTimeout(timer);
  }, [activeSection]);

  const calculateROI = () => {
    const { investment, revenue, timeframe } = roiInputs;

    if (!investment || !revenue || !timeframe) {
      alert('Please fill in all ROI calculation fields');
      return;
    }

    setRoiResult(computeROI(roiInputs));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Header audienceMode={audienceMode} setAudienceMode={setAudienceMode} />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <TabNav activeSection={activeSection} setActiveSection={setActiveSection} />
        {activeSection === 'overview' && (
          <Overview
            audienceMode={audienceMode}
            setActiveSection={setActiveSection}
            isAnalyzing={isAnalyzing}
            analysisResults={analysisResults}
            onAnalyze={analyzeWithClaude}
          />
        )}
        {activeSection === 'datatools' && (
          <DataTools
            uploadedData={uploadedData}
            filteredData={filteredData}
            statisticalSummary={statisticalSummary}
            onFileUpload={handleFileUpload}
            applyDataFilter={applyDataFilter}
            clearFilters={clearFilters}
            downloadChart={downloadChart}
            downloadData={downloadData}
            isAnalyzing={isAnalyzing}
            onAnalyze={analyzeWithClaude}
          />
        )}
        {activeSection === 'calculators' && (
          <Calculators
            uploadedData={uploadedData}
            roiInputs={roiInputs}
            setRoiInputs={setRoiInputs}
            roiResult={roiResult}
            onCalculateROI={calculateROI}
            isAnalyzing={isAnalyzing}
            onAnalyze={analyzeWithClaude}
          />
        )}
        {activeSection === 'chat' && (
          <AIChat
            uploadedData={uploadedData}
            chatMessages={chatMessages}
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            isTyping={isTyping}
            onSend={handleChatMessage}
            onClear={clearChat}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AIPortfolioDashboard;
