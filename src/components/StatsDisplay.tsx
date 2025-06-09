// src/components/StatsDisplay.tsx
import React from 'react';

interface StatsDisplayProps {
  wpm: number;
  accuracy: number;
  errors: number;
  timeElapsed: number;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ wpm, accuracy, errors, timeElapsed }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
      <div>
        <p className="text-3xl font-semibold text-sky-600">{wpm}</p>
        <p className="text-sm text-slate-600">WPM</p>
      </div>
      <div>
        <p className="text-3xl font-semibold text-green-600">{accuracy}%</p>
        <p className="text-sm text-slate-600">Accuracy</p>
      </div>
      <div>
        <p className="text-3xl font-semibold text-red-600">{errors}</p>
        <p className="text-sm text-slate-600">Errors</p>
      </div>
      <div>
        <p className="text-3xl font-semibold text-slate-700">{timeElapsed.toFixed(1)}s</p>
        <p className="text-sm text-slate-600">Time</p>
      </div>
    </div>
  );
};

export default StatsDisplay;