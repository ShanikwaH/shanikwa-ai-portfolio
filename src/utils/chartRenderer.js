import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, AreaChart, Area, ScatterChart, Scatter } from 'recharts';

export const renderChart = (data, type, fallbackData) => {
  const chartData = data || fallbackData;

  switch (type) {
    case 'line':
      return (
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey={Object.keys(chartData[0])[0]} stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
          {Object.keys(chartData[0]).slice(1).map((key, index) => (
            <Line key={key} type="monotone" dataKey={key} stroke={['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'][index % 4]} strokeWidth={2} />
          ))}
        </LineChart>
      );
    case 'area':
      return (
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey={Object.keys(chartData[0])[0]} stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
          {Object.keys(chartData[0]).slice(1).map((key, index) => (
            <Area key={key} type="monotone" dataKey={key} stackId="1" stroke={['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'][index % 4]} fill={['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'][index % 4]} fillOpacity={0.6} />
          ))}
        </AreaChart>
      );
    case 'scatter':
      const scatterData = chartData.map((item, index) => ({
        x: Object.values(item)[1],
        y: Object.values(item)[2],
        name: Object.values(item)[0]
      }));
      return (
        <ScatterChart data={scatterData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="x" stroke="#9CA3AF" />
          <YAxis dataKey="y" stroke="#9CA3AF" />
          <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
          <Scatter dataKey="y" fill="#8B5CF6" />
        </ScatterChart>
      );
    default:
      return (
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey={Object.keys(chartData[0])[0]} stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
          {Object.keys(chartData[0]).slice(1).map((key, index) => (
            <Bar key={key} dataKey={key} fill={['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'][index % 4]} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      );
  }
};
