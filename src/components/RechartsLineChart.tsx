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
}

const RechartsLineChart: React.FC<RechartsLineChartProps> = ({ data, className }) => {
  // Ensure data has at least one point for the chart to render, or provide default if empty
  const chartData = data.length > 0 ? data : [{ date: 'N/A', wpm: 0, accuracy: 0 }];

  return (
    <div className={`bg-slate-800 p-4 rounded-lg shadow-xl ${className || ''}`} style={{ height: '350px', width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 0, // Adjusted left margin for better YAxis label visibility
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
            stroke="#9ca3af" 
            tick={{ fontSize: 12 }} 
            padding={{ left: 10, right: 10 }}
            // tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} // Simplified date format
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