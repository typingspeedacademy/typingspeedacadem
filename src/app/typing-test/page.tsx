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
import { sampleTexts, SampleText } from '@/data/sampleTexts';

const TypingTestPage = () => {
  const [text, setText] = useState(''); // Initialize with empty string
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null); // Added to store current lesson ID
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [testActive, setTestActive] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  const [duration, setDuration] = useState(60); // seconds
  const [timeLeft, setTimeLeft] = useState(duration);
  const [difficulty, setDifficulty] = useState('medium');
  const [language, setLanguage] = useState<'en' | 'es' | 'ar'>('en'); // Added 'ar'
  const [user, setUser] = useState<User | null>(null); // Added user state
  const supabase = createClient(); // Initialize Supabase client

  // State for accumulating stats across multiple texts in a single session
  const [totalWordsTyped, setTotalWordsTyped] = useState(0);
  const [totalCharsInTexts, setTotalCharsInTexts] = useState(0);
  const [totalErrorsInSession, setTotalErrorsInSession] = useState(0);

  // Function to get a new text based on settings
  const getNewText = useCallback((isFullReset = true) => {
    const filteredTexts = sampleTexts.filter(
      (st) => st.difficulty === difficulty && st.language === language
    );
    if (filteredTexts.length > 0) {
      const selectedText = filteredTexts[Math.floor(Math.random() * filteredTexts.length)];
      setText(selectedText.text);
      setCurrentLessonId(selectedText.id); // Set current lesson ID
    } else {
      // Fallback if no text matches criteria (e.g. show any English text of selected difficulty)
      const fallbackTexts = sampleTexts.filter(st => st.difficulty === difficulty && st.language === 'en');
      if (fallbackTexts.length > 0) {
        const selectedText = fallbackTexts[Math.floor(Math.random() * fallbackTexts.length)];
        setText(selectedText.text);
        setCurrentLessonId(selectedText.id); // Set current lesson ID
        setLanguage('en'); // Optionally reset language to 'en' if specific language text not found
      } else {
         // Fallback to any text if no specific difficulty/language found
        const selectedText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        setText(selectedText.text);
        setCurrentLessonId(selectedText.id); // Set current lesson ID
      }
    }
    setUserInput('');
    setErrors(0);
    if (isFullReset) {
      setStartTime(null);
      setEndTime(null);
      setTestActive(false);
      setTestCompleted(false);
      setTimeLeft(duration);
      setTotalWordsTyped(0);
      setTotalCharsInTexts(0);
      setTotalErrorsInSession(0);
    }
    // If not a full reset (i.e., getting next text in an active session),
    // startTime, timeLeft, testActive remain as they are.
  }, [difficulty, language, duration]);

  // Fetch user and initialize text
  useEffect(() => {
    const getUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
    };
    getUser();
    getNewText(true); // Initialize text on component mount (full reset)
  }, [supabase]); // Removed getNewText from here to avoid re-triggering on its own changes

  // useEffect to get new text when settings (difficulty, language, duration) change
  useEffect(() => {
    if(startTime === null) { // Only reset if the test hasn't been started yet or after a full reset
        getNewText(true);
    }
    // If a test is active, changing settings should ideally prompt the user or reset fully.
    // For now, we'll let getNewText(true) handle the reset if called via resetTest().
  }, [difficulty, language, duration]);


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
        // If time is left, get a new sentence, otherwise end the test
        if (timeLeft > 0) {
          // Accumulate stats for the completed text before getting a new one
          setTotalWordsTyped(prev => prev + userInput.trim().split(/\s+/).filter(Boolean).length);
          setTotalCharsInTexts(prev => prev + text.length);
          setTotalErrorsInSession(prev => prev + errors);
          
          getNewText(false); // Pass false to indicate it's not a full reset
          setUserInput(''); 
          setErrors(0); 
        } else {
          endTest();
        }
      }
    }
  };

  const startTest = () => {
    // Get a fresh text for the new test start
    getNewText(true); // This will reset userInput, errors, and session stats
    setStartTime(Date.now());
    setEndTime(null);
    setTestActive(true);
    setTestCompleted(false);
    setTimeLeft(duration); // Ensure timer is set to full duration
  };

  const saveTestAnalytics = async () => {
    if (!user) return;

    // Use accumulated stats for saving analytics
    // If the test ended due to time, the last partial text's stats need to be added.
    let finalTotalWordsTyped = totalWordsTyped;
    let finalTotalCharsInTexts = totalCharsInTexts;
    let finalTotalErrorsInSession = totalErrorsInSession;

    if (userInput.trim().length > 0 && timeLeft === 0) { // Add stats from the current text if time ran out mid-text
        finalTotalWordsTyped += userInput.trim().split(/\s+/).filter(Boolean).length;
        finalTotalCharsInTexts += text.length; // Or userInput.length for typed chars?
        finalTotalErrorsInSession += errors;
    }

    const durationInMinutes = duration / 60;
    const calculatedWpm = durationInMinutes > 0 ? Math.round(finalTotalWordsTyped / durationInMinutes) : 0;
    const calculatedAccuracy = finalTotalCharsInTexts > 0 ? Math.round(((finalTotalCharsInTexts - finalTotalErrorsInSession) / finalTotalCharsInTexts) * 100) : 0;

    const { error } = await supabase.from('user_typing_analytics').insert([
      {
        user_id: user.id,
        wpm: calculatedWpm,
        accuracy: calculatedAccuracy,
        errors: errors,
        // test_duration_seconds: duration, // Removed as per user request
        // text_difficulty: difficulty, // Removed
        // text_language: language, // Removed
        // text_typed: userInput, // Removed
        // original_text: text, // Removed
      },
    ]);
    if (error) {
      console.error('Error saving analytics:', error);
    }
  };

  const saveCompletedLesson = async () => {
    if (!user || !currentLessonId) {
      console.log('User not logged in or lesson ID not set, skipping save completed lesson.');
      return;
    }

    // Check if the lesson is already completed by the user to avoid duplicates
    const { data: existingCompletion, error: fetchError } = await supabase
      .from('user_completed_lessons')
      .select('id')
      .eq('user_id', user.id)
      .eq('lesson_id', currentLessonId)
      .maybeSingle();

    if (fetchError) {
      console.error('Error checking existing lesson completion:', fetchError);
      return; // Don't proceed if there's an error checking
    }

    if (existingCompletion) {
      console.log('Lesson already marked as completed for this user.');
      return; // Lesson already completed, no need to insert again
    }

    const { error: insertError } = await supabase.from('user_completed_lessons').insert([
      {
        user_id: user.id,
        lesson_id: currentLessonId,
        // completed_at is handled by the database default (NOW())
      },
    ]);

    if (insertError) {
      console.error('Error saving completed lesson:', insertError);
    } else {
      console.log('Lesson completion saved successfully for lesson ID:', currentLessonId);
    }
  };

  const endTest = () => {
    setEndTime(Date.now());
    setTestActive(false);
    setTestCompleted(true);
    // saveTestAnalytics will be called in a useEffect dependent on testCompleted
  };

  // Save analytics and completed lesson when test is completed
  useEffect(() => {
    if (testCompleted) {
      saveTestAnalytics();
      // saveCompletedLesson might need adjustment. If a session involves multiple texts,
      // which lesson ID should be saved? For now, it saves the last one that was active.
      saveCompletedLesson(); 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testCompleted]); // Removed saveTestAnalytics and saveCompletedLesson from deps to avoid potential loops if they change state that re-triggers this effect.

  const calculateWPM = () => {
    if (!testCompleted || totalWordsTyped === 0) return 0;
    const timeTakenMinutes = duration / 60; // Use the total session duration
    if (timeTakenMinutes <= 0) return 0;
    return Math.round(totalWordsTyped / timeTakenMinutes);
  };

  const calculateAccuracy = () => {
    if (!testCompleted || totalCharsInTexts === 0) return 100;
    const correctChars = totalCharsInTexts - totalErrorsInSession;
    return Math.round((correctChars / totalCharsInTexts) * 100);
  };

  const resetTest = () => {
    getNewText(true); // Perform a full reset
    // startTest() also calls getNewText(true) and resets timer and active state, so it's more comprehensive for a full reset button.
    // If this resetTest is for the button, startTest() might be more appropriate.
    // For now, getNewText(true) will reset text and session stats.
    // To ensure the timer also resets and test becomes active for a "New Test" button:
    startTest(); 
  };

  const handleSettingsChange = (newDuration: number, newDifficulty: string, newLanguage: string) => { // Renamed duration to newDuration for clarity
    setDuration(newDuration); // Changed setTestDuration to setDuration
    setDifficulty(newDifficulty);
    setLanguage(newLanguage as 'en' | 'es' | 'ar'); // Cast and set language
    // getNewText will be called by the useEffect due to dependency change on duration, difficulty, or language
    // However, to ensure immediate reset with new settings, explicitly call resetTest or getNewText.
    // For consistency with previous logic, let's ensure getNewText is called after settings update.
    // The getNewText in useEffect depends on `duration` which is updated here.
    // Explicitly calling resetTest() which calls getNewText() ensures the text is refreshed immediately.
    resetTest(); 
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-semibold text-center text-slate-800 mb-8 sm:mb-12">
        Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-500">Exercises</span>
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
          currentLanguage={language} // Pass language
        />
        <div className="mt-4 text-center text-2xl font-semibold text-sky-700">
          Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
        {timeLeft === 0 && testCompleted && (
          <div className="mt-4 text-center text-2xl font-bold text-red-600">
            Time's Up!
          </div>
        )}
      </div>

      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl border border-sky-200 mb-8">
        <TypingArea
          textToType={text}
          userInput={userInput}
          onInputChange={handleInputChange}
          disabled={testCompleted || !testActive && userInput.length > 0} // Disable if completed or if started but not active (e.g. after reset)
          language={language} // Pass language to TypingArea
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