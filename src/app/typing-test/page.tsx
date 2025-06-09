'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRightIcon, SparklesIcon, ClockIcon, ArrowTrendingUpIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline'; // Using outline icons for a cleaner look

const freeTierFeatures = [
  {
    name: 'Access to Beginner Lessons',
    description: 'Start your journey with fundamental typing techniques and exercises.',
    icon: SparklesIcon,
  },
  {
    name: 'Daily Typing Tests (Limited)',
    description: 'Practice with a fresh set of typing challenges each day to build consistency.',
    icon: ClockIcon,
  },
  {
    name: 'Basic Progress Tracking',
    description: 'Monitor your WPM and accuracy improvements over time with simple charts.',
    icon: ArrowTrendingUpIcon,
  },
  {
    name: 'Ad-Supported Experience',
    description: 'This free tier includes advertisements to support the platform.',
    icon: ShieldExclamationIcon,
  },
];

import TypingArea from '@/components/TypingArea';
import StatsDisplay from '@/components/StatsDisplay';
import SettingsPanel from '@/components/SettingsPanel';
import { sampleTexts } from '@/data/sampleTexts';

const TypingTestPage = () => {
  const [text, setText] = useState(sampleTexts[0].text);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [testActive, setTestActive] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  const [duration, setDuration] = useState(60); // seconds
  const [difficulty, setDifficulty] = useState('medium');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!testActive && !testCompleted) {
      startTest();
    }
    if (testActive && !testCompleted) {
      setUserInput(e.target.value);
      // Basic error checking (can be more sophisticated)
      let currentErrors = 0;
      for (let i = 0; i < e.target.value.length; i++) {
        if (e.target.value[i] !== text[i]) {
          currentErrors++;
        }
      }
      setErrors(currentErrors);

      if (e.target.value.length === text.length) {
        endTest();
      }
    }
  };

  const startTest = () => {
    setUserInput('');
    setErrors(0);
    setStartTime(Date.now());
    setEndTime(null);
    setTestActive(true);
    setTestCompleted(false);
  };

  const endTest = () => {
    setEndTime(Date.now());
    setTestActive(false);
    setTestCompleted(true);
  };

  const calculateWPM = () => {
    if (!startTime || !endTime || text.length === 0) return 0;
    const timeTakenMinutes = (endTime - startTime) / 60000;
    const wordsTyped = text.split(' ').length;
    // Prevent division by zero if timeTakenMinutes is very small or zero
    if (timeTakenMinutes <= 0) return 0; 
    return Math.round(wordsTyped / timeTakenMinutes);
  };

  const calculateAccuracy = () => {
    if (text.length === 0) return 100;
    const correctChars = text.length - errors;
    return Math.round((correctChars / text.length) * 100);
  };

  const resetTest = () => {
    // Select a new random text or based on difficulty
    const newText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)].text;
    setText(newText);
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setErrors(0);
    setTestActive(false);
    setTestCompleted(false);
  };

  const handleSettingsChange = (newDuration: number, newDifficulty: string) => {
    setDuration(newDuration);
    setDifficulty(newDifficulty);
    // Potentially fetch new text based on difficulty
    resetTest(); // Reset test with new settings
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-semibold text-center text-slate-800 mb-8 sm:mb-12">
        Typing <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-500">Challenge</span>
      </h1>

      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl border border-sky-200 mb-8">
        <SettingsPanel 
          onSettingsChange={handleSettingsChange} 
          currentDuration={duration} 
          currentDifficulty={difficulty} 
        />
      </div>

      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl border border-sky-200 mb-8">
        <TypingArea
          textToType={text}
          userInput={userInput}
          onInputChange={handleInputChange}
          disabled={testCompleted || !testActive && userInput.length > 0} // Disable if completed or if started but not active (e.g. after reset)
        />
      </div>

      {(testActive || testCompleted) && (
        <div className="w-full max-w-3xl bg-white/70 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl border border-sky-200 mb-8">
          <StatsDisplay
            wpm={calculateWPM()}
            accuracy={calculateAccuracy()}
            errors={errors}
            timeElapsed={startTime && endTime ? ((endTime - startTime) / 1000) : (startTime ? (Date.now() - startTime) / 1000 : 0)}
          />
        </div>
      )}

      <button
        onClick={resetTest}
        className="px-8 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out text-lg"
      >
        {testCompleted ? 'Try Another Text' : (testActive || userInput.length > 0 ? 'Reset Test' : 'Start Test')}
      </button>
    </div>
  );
};

export default TypingTestPage;