import { useState } from 'react';
import { parseCSV, toCSV } from '../utils/csv';
import { computeStatisticalSummary } from '../utils/stats';

const useUploadedData = () => {
  const [uploadedData, setUploadedData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [statisticalSummary, setStatisticalSummary] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const { data, headers } = parseCSV(text);

      setUploadedData(data);
      setFilteredData(data);
      setSelectedColumns(headers);
      setStatisticalSummary(computeStatisticalSummary(data));

      alert(`Successfully loaded ${data.length} rows with ${headers.length} columns`);
    } catch (error) {
      console.error('Error processing file:', error);
      alert("Error processing file. Please ensure it's a valid CSV.");
    }
  };

  const applyDataFilter = (filterColumn, filterValue, operator = 'equals') => {
    if (!uploadedData) return;

    let filtered = uploadedData.filter(row => {
      const cellValue = row[filterColumn];
      switch (operator) {
        case 'equals':
          return cellValue == filterValue;
        case 'greater':
          return cellValue > filterValue;
        case 'less':
          return cellValue < filterValue;
        case 'contains':
          return String(cellValue).toLowerCase().includes(String(filterValue).toLowerCase());
        default:
          return true;
      }
    });

    setFilteredData(filtered);
    setStatisticalSummary(computeStatisticalSummary(filtered));
  };

  const clearFilters = () => {
    setFilteredData(uploadedData);
    setStatisticalSummary(computeStatisticalSummary(uploadedData));
  };

  const downloadData = () => {
    if (!filteredData) return;

    const csvContent = toCSV(filteredData);

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'analyzed_data.csv';
    link.click();
  };

  const downloadChart = () => {
    alert('Chart download feature would export the current visualization as PNG/SVG in a real deployment.');
  };

  return {
    uploadedData,
    filteredData,
    selectedColumns,
    statisticalSummary,
    handleFileUpload,
    applyDataFilter,
    clearFilters,
    downloadData,
    downloadChart,
  };
};

export default useUploadedData;
