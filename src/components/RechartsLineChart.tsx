'use client';

import React, { useMemo } from 'react'; // Added useMemo
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

interface ProgressDataPoint {
  date: string; // Or Date, depending on your data source
  wpm: number;
  accuracy: number;
}

interface RechartsLineChartProps {
  data: ProgressDataPoint[];
  className?: string;
  timeFrame?: 'monthly' | 'weekly' | 'daily' | 'hourly' | 'minutely'; // Add timeFrame prop
}

const RechartsLineChart: React.FC<RechartsLineChartProps> = ({ data, className, timeFrame }) => {
  // Ensure data has at least one point for the chart to render, or provide default if empty
  const chartData = data.length > 0 ? data : [{ date: 'N/A', wpm: 0, accuracy: 0 }];

  const formatXAxis = (tick: string) => { // Renamed from formatXAxisTick
    if (!tick || tick === 'N/A') return 'N/A';
    try {
      const dateObj = new Date(tick);
      if (isNaN(dateObj.getTime())) {
        // Handle custom string formats like "Week 32, 2023" or "Aug 2023"
        // This part might need more robust parsing depending on the exact string formats
        if (timeFrame === 'weekly' && tick.includes('Week')) return tick.split(',')[0]; // e.g. Week 32
        if (timeFrame === 'monthly') return tick; // e.g. Aug 2023 (already formatted)
        return tick; // Fallback for unparseable or custom strings
      }

      switch (timeFrame) {
        case 'monthly':
          return dateObj.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }); // Jan '23
        case 'weekly': // Weekly data is pre-formatted as "Week W, YYYY"
          return tick.split(',')[0]; // Should be handled by custom string check above, but as fallback
        case 'daily':
          return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); // Aug 1
        case 'hourly':
          return dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }); // 1:00 AM
        case 'minutely':
          return dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }); // 1:05 AM
        default:
          return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
    } catch (error) {
      console.error('Error formatting date tick:', tick, error);
      return tick; // Return original tick if formatting fails
    }
  };

  const formattedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      // Ensure date is a number for proper domain calculation if needed
      timestamp: new Date(item.date).getTime(), // Changed item.timestamp to item.date
      // Format date for XAxis tick display based on timeFrame
      name: formatXAxis(new Date(item.date).toISOString()), // Changed item.timestamp to item.date and ensure it's a string for new Date()
      wpm: item.wpm,
      accuracy: item.accuracy,
    }));
  }, [data, timeFrame]);

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-gray-800 bg-opacity-80 text-white p-3 rounded-lg shadow-lg border border-gray-700">
          <p className="text-sm font-semibold mb-1">{`${new Date(dataPoint.timestamp).toLocaleDateString()} ${new Date(dataPoint.timestamp).toLocaleTimeString()}`}</p>
          <p className="text-sm text-green-400">{`Speed (WPM): ${dataPoint.wpm}`}</p>
          <p className="text-sm text-orange-400">{`Accuracy: ${dataPoint.accuracy}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`w-full ${className} bg-gray-900 p-4 rounded-xl shadow-2xl`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" /> {/* Darker grid lines */}
          <XAxis 
            dataKey="name" 
            stroke="#A0AEC0" /* Light gray ticks */
            tick={{ fontSize: 10, fill: '#A0AEC0' }} 
            angle={timeFrame === 'monthly' ? -30 : 0} // Removed 'allTime'
            textAnchor={timeFrame === 'monthly' ? 'end' : 'middle'} // Removed 'allTime'
            dy={timeFrame === 'monthly' ? 10 : 5} // Removed 'allTime'
            interval="preserveStartEnd" // Show first and last tick
          />
          <YAxis yAxisId="left" stroke="#A0AEC0" tick={{ fontSize: 10, fill: '#A0AEC0' }} label={{ value: 'WPM', angle: -90, position: 'insideLeft', fill: '#A0AEC0', fontSize: 12, dx: -5 }} />
          <YAxis yAxisId="right" orientation="right" stroke="#A0AEC0" tick={{ fontSize: 10, fill: '#A0AEC0' }} domain={[0, 100]} label={{ value: 'Accuracy (%)', angle: 90, position: 'insideRight', fill: '#A0AEC0', fontSize: 12, dx: 5 }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }}/>
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ color: '#E2E8F0', fontSize: '12px' }}
          />
          <Line yAxisId="left" type="monotone" dataKey="wpm" name="Speed (WPM)" stroke="#34D399" strokeWidth={2} dot={{ r: 4, fill: '#34D399', strokeWidth:1, stroke: '#10B981' }} activeDot={{ r: 6, fill: '#34D399', stroke: '#059669' }} />
          <Line yAxisId="right" type="monotone" dataKey="accuracy" name="Accuracy (%)" stroke="#F97316" strokeWidth={2} dot={{ r: 4, fill: '#F97316', strokeWidth:1, stroke: '#EA580C' }} activeDot={{ r: 6, fill: '#F97316', stroke: '#D97706' }} />
          
          {/* Optional: Add a reference line for average WPM or Accuracy */}
          {/* <ReferenceLine yAxisId="left" y={averageWpm} label="Avg WPM" stroke="#60A5FA" strokeDasharray="3 3" /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RechartsLineChart;