'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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

  const formatXAxisTick = (tick: string) => {
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

  return (
    <div className={`bg-slate-800 p-4 rounded-lg shadow-xl ${className || ''}`} style={{ height: '350px', width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 0, // Adjusted left margin for better YAxis label visibility
            bottom: 20, // Increased bottom margin for better XAxis label visibility
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
            stroke="#9ca3af" 
            tick={{ fontSize: 10 }} // Slightly smaller font for more ticks
            padding={{ left: 10, right: 10 }}
            tickFormatter={formatXAxisTick} // Use the dynamic formatter
            interval="preserveStartEnd" // Show start and end ticks, let Recharts decide others
            // minTickGap={50} // Adjust gap between ticks if they overlap
          />
          <YAxis 
            stroke="#9ca3af" 
            tick={{ fontSize: 12 }} 
            yAxisId="left"
            label={{ value: 'WPM', angle: -90, position: 'insideLeft', fill: '#00f0ff', fontSize: 14, dy: -10, dx: -5 }}
            domain={[0, (dataMax: number) => Math.max(100, dataMax + 20)]} // Ensure WPM axis goes at least to 100 or slightly above max
          />
          <YAxis 
            stroke="#9ca3af" 
            tick={{ fontSize: 12 }} 
            yAxisId="right"
            orientation="right"
            label={{ value: 'Accuracy (%)', angle: -90, position: 'insideRight', fill: '#ff00f7', fontSize: 14, dy: 40, dx: -5 }}
            domain={[0, 100]} // Accuracy is 0-100
            tickFormatter={(tick) => `${tick}%`}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
            labelStyle={{ color: '#e5e7eb', fontWeight: 'bold' }}
            itemStyle={{ color: '#9ca3af' }}
            formatter={(value: number, name: string) => {
              return name === 'accuracy' ? [`${value}%`, 'Accuracy'] : [value, 'WPM'];
            }}
          />
          <Legend wrapperStyle={{ color: '#e5e7eb', paddingTop: '10px' }} />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="wpm" 
            stroke="#00f0ff" 
            strokeWidth={2.5} 
            activeDot={{ r: 7, stroke: '#fff', strokeWidth: 2, fill: '#00f0ff' }} 
            dot={{ r: 4, fill: '#00f0ff', strokeWidth:0 }}
            name="Speed (WPM)"
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="accuracy" 
            stroke="#ff00f7" 
            strokeWidth={2.5} 
            activeDot={{ r: 7, stroke: '#fff', strokeWidth: 2, fill: '#ff00f7' }} 
            dot={{ r: 4, fill: '#ff00f7', strokeWidth:0 }}
            name="Accuracy (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RechartsLineChart;