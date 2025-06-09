'use client';

import React, { useEffect, useRef } from 'react';
import { Chart, registerables, Filler } from 'chart.js'; // Added Filler
import type { ChartData, ChartOptions } from 'chart.js';

Chart.register(...registerables, Filler); // Registered Filler

interface ProgressDataPoint {
  date: string; // Or Date, depending on your data source
  wpm: number;
  accuracy: number;
}

interface FuturisticLineChartProps {
  data: ProgressDataPoint[];
  className?: string;
}

const FuturisticLineChart: React.FC<FuturisticLineChartProps> = ({ data, className }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // Custom plugin for glow effect (remains as it's a key feature)
  const glowPlugin = {
    id: 'glowPlugin',
    beforeDatasetsDraw: (chart: Chart) => {
      const ctx = chart.ctx;
      chart.data.datasets.forEach((dataset, i) => {
        if (chart.isDatasetVisible(i) && (dataset as any).drawGlow) {
          const meta = chart.getDatasetMeta(i);
          const points = meta.data;
          if (points.length === 0) return;

          ctx.save();
          ctx.beginPath();
          points.forEach((point, index) => {
            if (index === 0) {
              ctx.moveTo(point.x, point.y);
            } else {
              // Using quadraticCurveTo for smoother curves than bezier in this context
              const prevPoint = points[index - 1];
              const xc = (prevPoint.x + point.x) / 2;
              const yc = (prevPoint.y + point.y) / 2;
              // Simplified: control point halfway for smoother, less exaggerated curves
              // For more complex curves, bezierCurveTo with calculated control points is better
              // ctx.quadraticCurveTo(prevPoint.x, point.y, point.x, point.y); // Original thought, but let's try simpler first
              ctx.lineTo(point.x, point.y); // Keep it simple for glow, tension handles curve
            }
          });

          ctx.lineWidth = (dataset.borderWidth as number) * 2.5; 
          ctx.strokeStyle = dataset.borderColor as string;
          ctx.shadowColor = dataset.borderColor as string;
          ctx.shadowBlur = 15; 
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.stroke();
          ctx.restore();
        }
      });
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      // Create gradient fills
      const wpmGradient = ctx.createLinearGradient(0, 0, 0, chartRef.current.offsetHeight);
      wpmGradient.addColorStop(0, 'rgba(0, 240, 255, 0.5)'); // Brighter at top
      wpmGradient.addColorStop(1, 'rgba(0, 240, 255, 0.05)'); // Fades to transparent

      const accuracyGradient = ctx.createLinearGradient(0, 0, 0, chartRef.current.offsetHeight);
      accuracyGradient.addColorStop(0, 'rgba(255, 0, 247, 0.5)'); // Brighter at top
      accuracyGradient.addColorStop(1, 'rgba(255, 0, 247, 0.05)'); // Fades to transparent

      const labels = data.length > 0 ? data.map(item => new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })) : ['Start'];
      const wpmData = data.map(item => item.wpm);
      const accuracyData = data.map(item => item.accuracy);

      const chartData: ChartData<'line'> = {
        labels,
        datasets: [
          {
            label: 'Speed (WPM)',
            data: wpmData,
            borderColor: '#00f0ff',
            backgroundColor: wpmGradient, // Apply gradient
            fill: true, // Enable fill
            tension: 0.4, // Slightly more curve
            pointRadius: 5,
            pointBackgroundColor: '#00f0ff',
            pointBorderColor: '#1a1f3c', // Darker border for points
            pointBorderWidth: 2,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#00f0ff',
            pointHoverBorderWidth: 2,
            borderWidth: 2.5, // Slightly thicker line
            drawGlow: true, 
          } as any, 
          {
            label: 'Accuracy (%)',
            data: accuracyData,
            borderColor: '#ff00f7',
            backgroundColor: accuracyGradient, // Apply gradient
            fill: true, // Enable fill
            tension: 0.4, // Slightly more curve
            pointRadius: 5,
            pointBackgroundColor: '#ff00f7',
            pointBorderColor: '#1a1f3c', // Darker border for points
            pointBorderWidth: 2,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#ff00f7',
            pointHoverBorderWidth: 2,
            borderWidth: 2.5, // Slightly thicker line
            drawGlow: true, 
          } as any, 
        ],
      };

      const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { // Enhanced interaction
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#e0e0e0', 
              font: {
                size: 14,
                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Modern font
              },
              padding: 20, // More padding for legend items
            },
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(10, 15, 44, 0.85)', // Darker, more integrated tooltip
            titleColor: '#00f0ff',
            bodyColor: '#e0e0e0',
            borderColor: '#333c5b',
            borderWidth: 1,
            padding: 10,
            cornerRadius: 8,
            titleFont: { size: 14, weight: 'bold', family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
            bodyFont: { size: 12, family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
            callbacks: {
              title: function(tooltipItems) {
                // More descriptive title for tooltip
                if (tooltipItems.length > 0) {
                  const date = new Date(tooltipItems[0].label);
                  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
                }
                return '';
              },
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y + (context.dataset.label?.toLowerCase().includes('accuracy') ? '%' : '');
                }
                return label;
              },
              labelColor: function(context) {
                return {
                    borderColor: context.dataset.borderColor as string,
                    backgroundColor: context.dataset.borderColor as string,
                    borderWidth: 2,
                    borderRadius: 2,
                };
            }
            }
          },
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // Subtler grid lines
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: '#b0b0b0', 
              font: {
                size: 11,
                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              },
              maxRotation: 0, // Prevent label rotation
              autoSkipPadding: 20, // More padding for auto skip
            },
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', 
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: '#b0b0b0', 
              font: {
                size: 11,
                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              },
              callback: function (value) {
                return Number(value).toFixed(0) + (this.chart.data.datasets.some(ds => ds.label?.toLowerCase().includes('accuracy')) && this.id === this.chart.getDatasetMeta(1)?.yAxisID ? '%' : '');
              },
              padding: 10, // Padding for y-axis labels
            },
            beginAtZero: true,
            suggestedMax: 100, // Suggest max for accuracy, WPM can go higher
          },
        },
        animation: {
          duration: 1200,
          easing: 'easeOutExpo', // Smoother easing
        },
      };

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'line',
        data: chartData,
        options: options,
        plugins: [glowPlugin]
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]); // Removed glowPlugin from deps as it's stable

  return (
    <div className={`bg-[#0a0f2c] p-4 sm:p-6 rounded-xl shadow-2xl ${className || ''}`}>
      <div style={{ height: '350px', width: '100%' }}> {/* Increased height slightly */}
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default FuturisticLineChart;