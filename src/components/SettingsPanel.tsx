// src/components/SettingsPanel.tsx
import React from 'react';

interface SettingsPanelProps {
  onSettingsChange: (duration: number, difficulty: string, language: string) => void; // Added language to handler
  currentDuration: number;
  currentDifficulty: string;
  currentLanguage: string; // Added current language prop
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onSettingsChange, currentDuration, currentDifficulty, currentLanguage }) => {
  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSettingsChange(parseInt(e.target.value, 10), currentDifficulty, currentLanguage);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSettingsChange(currentDuration, e.target.value, currentLanguage);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => { // Added language change handler
    onSettingsChange(currentDuration, currentDifficulty, e.target.value);
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
      <div>
        <label htmlFor="language" className="block text-sm font-medium text-slate-700 mb-1">
          Language
        </label>
        <select
          id="language"
          value={currentLanguage}
          onChange={handleLanguageChange}
          className="block w-full sm:w-auto p-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 bg-white text-slate-800"
        >
          <option value="en">English</option>
          <option value="es">Español</option> 
          <option value="ar">العربية</option> {/* Added Arabic option */}
          {/* Add more languages as needed */}
        </select>
      </div>
    </div>
  );
};

export default SettingsPanel;