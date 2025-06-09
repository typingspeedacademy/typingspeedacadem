// src/components/SettingsPanel.tsx
import React from 'react';

interface SettingsPanelProps {
  onSettingsChange: (duration: number, difficulty: string) => void;
  currentDuration: number;
  currentDifficulty: string;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onSettingsChange, currentDuration, currentDifficulty }) => {
  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSettingsChange(parseInt(e.target.value, 10), currentDifficulty);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSettingsChange(currentDuration, e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-around items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 rounded-lg">
      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-slate-700 mb-1">
          Test Duration (seconds)
        </label>
        <select
          id="duration"
          value={currentDuration}
          onChange={handleDurationChange}
          className="block w-full sm:w-auto p-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 bg-white text-slate-800"
        >
          <option value="30">30 seconds</option>
          <option value="60">60 seconds</option>
          <option value="120">120 seconds</option>
        </select>
      </div>
      <div>
        <label htmlFor="difficulty" className="block text-sm font-medium text-slate-700 mb-1">
          Difficulty
        </label>
        <select
          id="difficulty"
          value={currentDifficulty}
          onChange={handleDifficultyChange}
          className="block w-full sm:w-auto p-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 bg-white text-slate-800"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  );
};

export default SettingsPanel;