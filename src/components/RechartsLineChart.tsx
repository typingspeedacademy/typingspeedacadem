'use client';

import React, { useMemo } from 'react';
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
  date: string; 
  wpm: number;
  accuracy: number;
}

interface RechartsLineChartProps {
  data: ProgressDataPoint[];
  className?: string;
  timeFrame?: 'monthly' | 'weekly' | 'daily' | 'hourly' | 'minutely';
}

const RechartsLineChart: React.FC<RechartsLineChartProps> = ({ data, className, timeFrame }) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [{ date: 'N/A', wpm: 0, accuracy: 0, timestamp: 0, name: 'N/A' }];
    // Sort data by date to ensure left-to-right progression
    return [...data]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(item => ({
        ...item,
        timestamp: new Date(item.date).getTime(),
        name: formatXAxis(item.date, timeFrame), // Pass original date string
      }));
  }, [data, timeFrame]);

  const formatXAxis = (dateString: string, currentTF?: typeof timeFrame) => {
    if (!dateString || dateString === 'N/A') return 'N/A';
    try {
      const dateObj = new Date(dateString);
      if (isNaN(dateObj.getTime())) return dateString; 

      switch (currentTF) {
        case 'monthly':
          return dateObj.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        case 'weekly':
          // Assuming dateString for weekly is the start of the week
          const weekNumber = Math.ceil(dateObj.getDate() / 7);
          return `W${weekNumber}, ${dateObj.toLocaleDateString('en-US', { month: 'short' })}`;
        case 'daily':
          return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        case 'hourly':
        case 'minutely': // Minutely and Hourly can share similar formatting for simplicity here
          return dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        default: // Fallback if timeFrame is not set or unrecognized
          return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
    } catch (error) {
      console.error('Error formatting date tick:', dateString, error);
      return dateString;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-gray-800 bg-opacity-90 text-white p-3 rounded-lg shadow-lg border border-gray-700">
          <p className="text-sm font-semibold mb-1">
            {formatXAxis(dataPoint.date, timeFrame)} - {new Date(dataPoint.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true})}
          </p>
          <p className="text-sm text-sky-400">{`Speed (WPM): ${dataPoint.wpm}`}</p>
          <p className="text-sm text-teal-400">{`Accuracy: ${dataPoint.accuracy}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`w-full ${className} bg-slate-900 p-4 rounded-xl shadow-2xl`}>
      <ResponsiveContainer width="100%" height={300}> {/* Adjusted height for better visibility */}
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 25 }}> {/* Increased bottom margin for angled labels */}
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" /> {/* Darker gray grid */}
          <XAxis 
            dataKey="name" 
            stroke="#9ca3af" /* Lighter gray for axis line */
            tick={{ fontSize: 10, fill: '#9ca3af' }} 
            angle={(timeFrame === 'monthly' || timeFrame === 'weekly') ? -35 : 0} // Angle for monthly/weekly
            textAnchor={(timeFrame === 'monthly' || timeFrame === 'weekly') ? 'end' : 'middle'}
            dy={(timeFrame === 'monthly' || timeFrame === 'weekly') ? 10 : 5}
            interval="preserveStartEnd" 
          />
          <YAxis yAxisId="left" stroke="#9ca3af" tick={{ fontSize: 10, fill: '#9ca3af' }} label={{ value: 'WPM', angle: -90, position: 'insideLeft', fill: '#9ca3af', fontSize: 12, dx: -5 }} />
          <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" tick={{ fontSize: 10, fill: '#9ca3af' }} domain={[0, 100]} label={{ value: 'Accuracy (%)', angle: 90, position: 'insideRight', fill: '#9ca3af', fontSize: 12, dx: 5 }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(156, 163, 175, 0.1)' }}/>
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ color: '#e5e7eb', fontSize: '12px', paddingTop: '10px' }}
          />
          <Line yAxisId="left" type="monotone" dataKey="wpm" name="Speed (WPM)" stroke="#38bdf8" strokeWidth={2} dot={{ r: 4, fill: '#38bdf8', strokeWidth:1, stroke: '#0ea5e9' }} activeDot={{ r: 6, fill: '#38bdf8', stroke: '#0284c7' }} /> {/* Sky blue for WPM */}
          <Line yAxisId="right" type="monotone" dataKey="accuracy" name="Accuracy (%)" stroke="#2dd4bf" strokeWidth={2} dot={{ r: 4, fill: '#2dd4bf', strokeWidth:1, stroke: '#14b8a6' }} activeDot={{ r: 6, fill: '#2dd4bf', stroke: '#0d9488' }} /> {/* Teal for Accuracy */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RechartsLineChart;