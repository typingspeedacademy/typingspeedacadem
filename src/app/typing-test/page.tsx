'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRightIcon, SparklesIcon, ClockIcon, ArrowTrendingUpIcon, ShieldExclamationIcon, PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/outline'; // Using outline icons for a cleaner look
import { createClient } from '@/utils/supabase/client'; // Added Supabase client
import type { User } from '@supabase/supabase-js'; // Added User type

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
import { sampleTexts, SampleText } from '@/data/sampleTexts'; // Import SampleText interface

const TypingTestPage = () => {
  const [text, setText] = useState(''); // Initialize with empty string
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [testActive, setTestActive] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  const [duration, setDuration] = useState(60); // seconds
  const [timeLeft, setTimeLeft] = useState(duration);
  const [difficulty, setDifficulty] = useState('medium');
  const [language, setLanguage] = useState('en'); // Added language state, default to English
  const [user, setUser] = useState<User | null>(null); // Added user state
  const supabase = createClient(); // Initialize Supabase client

  // Function to get a new text based on settings
  const getNewText = useCallback(() => {
    const filteredTexts = sampleTexts.filter(
      (st) => st.difficulty === difficulty && st.language === language
    );
    if (filteredTexts.length > 0) {
      setText(filteredTexts[Math.floor(Math.random() * filteredTexts.length)].text);
    } else {
      // Fallback if no text matches criteria (e.g. show any English text of selected difficulty)
      const fallbackTexts = sampleTexts.filter(st => st.difficulty === difficulty && st.language === 'en');
      if (fallbackTexts.length > 0) {
        setText(fallbackTexts[Math.floor(Math.random() * fallbackTexts.length)].text);
        setLanguage('en'); // Optionally reset language to 'en' if specific language text not found
      } else {
         // Fallback to any text if no specific difficulty/language found
        setText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)].text);
      }
    }
    setUserInput('');
    setErrors(0);
    setStartTime(null);
    setEndTime(null);
    setTestActive(false);
    setTestCompleted(false);
    setTimeLeft(duration);
  }, [difficulty, language, duration]);

  // Fetch user and initialize text
  useEffect(() => {
    const getUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
    };
    getUser();
    getNewText(); // Initialize text on component mount and when settings change
  }, [supabase, getNewText]); // getNewText is now a dependency

  // Timer logic
  useEffect(() => {
    if (testActive && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0 && testActive) {
      endTest();
    }
  }, [testActive, timeLeft]);

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
    setTimeLeft(duration); // Reset timer
  };

  const saveTestAnalytics = async () => {
    if (!user || !testCompleted || !startTime || !endTime) return;

    const wpm = calculateWPM();
    const accuracy = calculateAccuracy();
    const timeTakenSeconds = (endTime - startTime) / 1000;

    const { error } = await supabase
      .from('user_typing_analytics')
      .insert([
        {
          user_id: user.id,
          wpm: wpm,
          accuracy: accuracy,
          errors: errors,
          duration_seconds: timeTakenSeconds, // Ensure this is calculated correctly
          text_used: text,
          difficulty: difficulty,
          language: language, // Save language
        },
      ]);

    if (error) {
      console.error('Error saving typing analytics:', error);
    } else {
      console.log('Typing analytics saved successfully!');
    }
  };

  const endTest = () => {
    setEndTime(Date.now());
    setTestActive(false);
    setTestCompleted(true);
    // saveTestAnalytics will be called in a useEffect dependent on testCompleted
  };

  // Save analytics when test is completed
  useEffect(() => {
    if (testCompleted) {
      saveTestAnalytics();
    }
  }, [testCompleted]); // Dependencies: testCompleted, saveTestAnalytics (if it's memoized with useCallback)

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
    getNewText();
  };

  const handleSettingsChange = (newDuration: number, newDifficulty: string, newLanguage: string) => {
    setDuration(newDuration);
    setDifficulty(newDifficulty);
    setLanguage(newLanguage);
    // getNewText will be called by the useEffect due to dependency change
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-semibold text-center text-slate-800 mb-8 sm:mb-12">
        Typing <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-500">Challenge</span>
      </h1>
      {/* Add a message if user is not logged in */} 
      {!user && (
        <div className="w-full max-w-3xl bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md mb-6" role="alert">
          <p className="font-bold">Heads up!</p>
          <p>You are not logged in. Your test results will not be saved. <Link href="/login" className="font-semibold underline hover:text-yellow-800">Login</Link> or <Link href="/signup" className="font-semibold underline hover:text-yellow-800">Signup</Link> to save your progress.</p>
        </div>
      )}

      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl border border-sky-200 mb-8">
        <SettingsPanel 
          onSettingsChange={handleSettingsChange} 
          currentDuration={duration} 
          currentDifficulty={difficulty} 
          currentLanguage={language} // Pass current language
        />
        <div className="mt-4 text-center text-2xl font-semibold text-sky-700">
          Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
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