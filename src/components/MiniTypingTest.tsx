'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { sampleTexts } from '@/data/sampleTexts'; // Assuming sampleTexts is accessible

const MiniTypingTest: React.FC = () => {
  const [textToType, setTextToType] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [testActive, setTestActive] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  const loadNewText = useCallback(() => {
    // Select a short, easy text for the mini test
    const easyTexts = sampleTexts.filter(t => t.difficulty === 'easy' && t.language === 'en' && t.text.length < 150);
    const selectedText = easyTexts.length > 0 
      ? easyTexts[Math.floor(Math.random() * easyTexts.length)] 
      : sampleTexts.find(t => t.id === 'easy-1') || sampleTexts[0]; // Fallback
    
    setTextToType(selectedText.text);
    setUserInput('');
    setStartTime(null);
    setErrors(0);
    setWpm(0);
    setAccuracy(100);
    setTestActive(false);
    setTestCompleted(false);
  }, []);

  useEffect(() => {
    loadNewText();
  }, [loadNewText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (testCompleted) return;

    const { value } = e.target;
    setUserInput(value);

    if (!testActive && value.length > 0) {
      setTestActive(true);
      setStartTime(Date.now());
    }

    if (testActive) {
      let currentErrors = 0;
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== textToType[i]) {
          currentErrors++;
        }
      }
      setErrors(currentErrors);

      const wordsTyped = value.trim().split(/\s+/).filter(Boolean).length;
      const currentTime = Date.now();
      const timeElapsedMinutes = startTime ? (currentTime - startTime) / 60000 : 0;

      if (timeElapsedMinutes > 0) {
        setWpm(Math.round(wordsTyped / timeElapsedMinutes));
      }
      
      const currentAccuracy = textToType.length > 0 
        ? Math.max(0, Math.round(((value.length - currentErrors) / value.length) * 100)) 
        : 100;
      setAccuracy(isNaN(currentAccuracy) ? 100 : currentAccuracy);

      if (value.length === textToType.length) {
        setTestActive(false);
        setTestCompleted(true);
        // Final WPM and Accuracy are already set
      }
    }
  };

  const getCharClass = (char: string, index: number) => {
    if (index < userInput.length) {
      return userInput[index] === char ? 'text-green-500' : 'text-red-500 bg-red-100';
    }
    return 'text-slate-400'; // Untyped characters
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md border border-slate-200">
      <div className="mb-3 p-3 bg-slate-50 border border-slate-200 rounded-md min-h-[60px] text-lg leading-relaxed whitespace-pre-wrap break-all font-mono">
        {textToType.split('').map((char, index) => (
          <span key={index} className={getCharClass(char, index)}>
            {char}
          </span>
        ))}
      </div>
      <textarea
        value={userInput}
        onChange={handleInputChange}
        disabled={testCompleted}
        placeholder={testCompleted ? "Test finished! Try another?" : "Start typing here..."}
        className="w-full p-3 text-lg font-mono bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none transition-colors duration-150 h-24"
        rows={3}
      />
      <div className="mt-3 flex justify-between items-center text-sm text-slate-600">
        <div>
          <span>WPM: <strong>{wpm}</strong></span>
          <span className="ml-4">Accuracy: <strong>{accuracy}%</strong></span>
        </div>
        <button 
          onClick={loadNewText}
          className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors duration-150"
        >
          {testCompleted ? 'New Text' : 'Reset'}
        </button>
      </div>
      {testCompleted && <p className='text-xs text-green-600 mt-2 text-center'>Well done!</p>}
    </div>
  );
};

export default MiniTypingTest;