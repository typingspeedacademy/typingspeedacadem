'use client';

import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';

Chart.register(...registerables);

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

  // Custom plugin for glow effect
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
              const prevPoint = points[index - 1];
              const cp1x = (2 * prevPoint.x + point.x) / 3;
              const cp1y = (2 * prevPoint.y + point.y) / 3;
              const cp2x = (prevPoint.x + 2 * point.x) / 3;
              const cp2y = (prevPoint.y + 2 * point.y) / 3;
              ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, point.x, point.y);
            }
          });

          ctx.lineWidth = (dataset.borderWidth as number) * 2.5; // Glow width relative to line width
          ctx.strokeStyle = dataset.borderColor as string;
          ctx.shadowColor = dataset.borderColor as string;
          ctx.shadowBlur = 15; // Glow intensity
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

      const labels = data.length > 0 ? data.map(item => item.date) : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      const wpmData = data.map(item => item.wpm);
      const accuracyData = data.map(item => item.accuracy);

      const chartData: ChartData<'line'> = {
        labels,
        datasets: [
          {
            label: 'Speed (WPM)',
            data: wpmData,
            borderColor: '#00f0ff',
            backgroundColor: 'transparent',
            tension: 0.3,
            pointRadius: 4,
            pointBackgroundColor: '#00f0ff',
            pointBorderColor: '#fff',
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#00f0ff',
            borderWidth: 2,
            drawGlow: true, // Custom property for the plugin
          } as any, // Using 'as any' to allow custom 'drawGlow' property
          {
            label: 'Accuracy (%)',
            data: accuracyData,
            borderColor: '#ff00f7',
            backgroundColor: 'transparent',
            tension: 0.3,
            pointRadius: 4,
            pointBackgroundColor: '#ff00f7',
            pointBorderColor: '#fff',
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#ff00f7',
            borderWidth: 2,
            drawGlow: true, // Custom property for the plugin
          } as any, // Using 'as any' to allow custom 'drawGlow' property
        ],
      };

      const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#ffffff', // White legend text
              font: {
                size: 14,
              }
            },
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#ffffff',
            borderWidth: 1,
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y + (context.datasetIndex === 1 ? '%' : '');
                }
                return label;
              }
            }
          },
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.2)', // Light grid lines
            },
            ticks: {
              color: '#ffffff', // White X-axis ticks
              font: {
                size: 12,
              }
            },
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.2)', // Light grid lines
            },
            ticks: {
              color: '#ffffff', // White Y-axis ticks
              font: {
                size: 12,
              },
              callback: function (value, index, values) {
                // Add '%' to accuracy axis if needed, assuming accuracy is the second dataset
                // This needs to be smarter if you have multiple y-axes
                return value + (this.chart.data.datasets.length > 1 && this.chart.getDatasetMeta(1).yAxisID === this.id ? '%' : '');
              }
            },
            beginAtZero: true,
          },
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart',
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
  }, [data, glowPlugin]); // Add glowPlugin to dependency array

  return (
    <div className={`bg-[#0a0f2c] p-4 sm:p-6 rounded-xl shadow-2xl ${className || ''}`}>
      <div style={{ height: '300px', width: '100%' }}> {/* Ensure canvas has dimensions */}
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default FuturisticLineChart;