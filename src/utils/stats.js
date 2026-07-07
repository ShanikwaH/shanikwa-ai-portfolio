export const computeStatisticalSummary = (data) => {
  if (!data || data.length === 0) return null;

  const numericColumns = Object.keys(data[0]).filter(key =>
    data.some(row => typeof row[key] === 'number' && !isNaN(row[key]))
  );

  const summary = {};

  numericColumns.forEach(column => {
    const values = data.map(row => row[column]).filter(val => typeof val === 'number' && !isNaN(val));

    if (values.length > 0) {
      const sortedValues = values.sort((a, b) => a - b);
      const sum = values.reduce((acc, val) => acc + val, 0);
      const mean = sum / values.length;
      const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
      const stdDev = Math.sqrt(variance);

      summary[column] = {
        count: values.length,
        mean: Math.round(mean * 100) / 100,
        median: sortedValues[Math.floor(sortedValues.length / 2)],
        min: Math.min(...values),
        max: Math.max(...values),
        stdDev: Math.round(stdDev * 100) / 100
      };
    }
  });

  return summary;
};

export const calculateCorrelation = (data, col1, col2) => {
  if (!data || data.length < 2) return null;

  const pairs = data.map(row => [row[col1], row[col2]])
    .filter(([x, y]) => typeof x === 'number' && typeof y === 'number' && !isNaN(x) && !isNaN(y));

  if (pairs.length < 2) return null;

  const n = pairs.length;
  const sumX = pairs.reduce((sum, [x]) => sum + x, 0);
  const sumY = pairs.reduce((sum, [, y]) => sum + y, 0);
  const sumXY = pairs.reduce((sum, [x, y]) => sum + x * y, 0);
  const sumXX = pairs.reduce((sum, [x]) => sum + x * x, 0);
  const sumYY = pairs.reduce((sum, [, y]) => sum + y * y, 0);

  const correlation = (n * sumXY - sumX * sumY) /
    Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));

  return Math.round(correlation * 1000) / 1000;
};

export const computeROI = ({ investment, revenue, timeframe }) => {
  const investmentNum = parseFloat(investment);
  const revenueNum = parseFloat(revenue);
  const timeframeNum = parseFloat(timeframe);

  const totalProfit = revenueNum - investmentNum;
  const roiPercentage = (totalProfit / investmentNum) * 100;
  const annualizedROI = (roiPercentage / timeframeNum);
  const paybackPeriod = investmentNum / (revenueNum / timeframeNum);

  return {
    totalProfit: Math.round(totalProfit),
    roiPercentage: Math.round(roiPercentage * 100) / 100,
    annualizedROI: Math.round(annualizedROI * 100) / 100,
    paybackPeriod: Math.round(paybackPeriod * 100) / 100
  };
};
