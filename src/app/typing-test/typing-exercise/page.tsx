'use client';

import { useState, useEffect, useCallback, useRef, KeyboardEvent as ReactKeyboardEvent } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client'; // Import Supabase client
import type { User } from '@supabase/supabase-js'; // Import User type

// Sample sentences for different languages and difficulty levels
const sentences: Record<string, Record<string, string[]>> = {
  english: {
    easy: [
      "The quick brown fox jumps over the lazy dog.",
      "A journey of a thousand miles begins with a single step.",
      "To be or not to be, that is the question.",
      "All that glitters is not gold.",
      "Practice makes perfect."
    ],
    medium: [
      "The Industrial Revolution transformed societies from agrarian economies to machine-driven manufacturing powerhouses.",
      "Cryptography is the practice and study of techniques for secure communication in the presence of third parties called adversaries.",
      "Quantum computing leverages the principles of quantum mechanics to solve complex problems that are intractable for classical computers.",
      "Artificial intelligence is rapidly evolving, with breakthroughs in machine learning, natural language processing, and computer vision.",
      "The internet has connected the world in unprecedented ways, fostering global collaboration and information sharing."
    ],
    hard: [
      "Bioinformatics intertwines biology, computer science, information engineering, mathematics and statistics to analyze and interpret biological data, especially genomic and proteomic sequences.",
      "Geopolitical strategists meticulously analyze the intricate dynamics of international relations, considering economic interdependencies, cultural nuances, and historical precedents to forecast global power shifts.",
      "Neuroplasticity, the brain's remarkable ability to reorganize itself by forming new neural connections throughout life, underpins learning, memory, and recovery from neurological trauma.",
      "Sustainable development aims to meet the needs of the present without compromising the ability of future generations to meet their own needs, balancing economic growth, social equity, and environmental protection.",
      "The philosophical underpinnings of existentialism explore themes of freedom, responsibility, and the inherent meaninglessness of the universe, compelling individuals to create their own purpose."
    ],
  },
  arabic: {
    easy: [
      "ذهب الولد إلى المدرسة.", // The boy went to school.
      "الكتاب فوق الطاولة.", // The book is on the table.
      "أحب القراءة كثيرا.", // I like reading a lot.
      "الجو جميل اليوم.", // The weather is beautiful today.
      "التفاح فاكهة لذيذة." // Apples are a delicious fruit.
    ],
    medium: [
      "تعتبر اللغة العربية من أغنى اللغات من حيث المفردات والتراكيب اللغوية الفريدة.", // Arabic is considered one ofthe richest languages in terms of vocabulary and unique linguistic structures.
      "يجب على الإنسان أن يسعى دائمًا لتحقيق أحلامه وطموحاته في الحياة بالجد والاجتهاد.", // A person must always strive to achieve their dreams and ambitions in life through hard work and diligence.
      "إن المحافظة على البيئة مسؤولية جماعية تتطلب تضافر جهود جميع أفراد المجتمع.", // Preserving the environment is a collective responsibility that requires the concerted efforts of all members of society.
      "تاريخ الحضارة الإسلامية حافل بالإنجازات العلمية والثقافية التي أثرت في مسيرة البشرية.", // The history of Islamic civilization is full of scientific and cultural achievements that have influenced the course of humanity.
      "القراءة تفتح آفاق المعرفة وتساعد على تنمية القدرات العقلية والتفكير النقدي.", // Reading opens horizons of knowledge and helps develop mental abilities and critical thinking.
    ],
    hard: [
      "تتطلب دراسة الفلسفة قدرة عالية على التحليل المنطقي والتفكير المجرد لاستيعاب المفاهيم المعقدة والنظريات المتشعبة.", // The study of philosophy requires a high ability for logical analysis and abstract thinking to comprehend complex concepts and ramified theories.
      "يشكل الذكاء الاصطناعي تحديًا وفرصة في آن واحد، مما يستدعي وضع أطر أخلاقية وقانونية لتنظيم استخدامه وتطبيقاته المتزايدة.", // Artificial intelligence poses both a challenge and an opportunity, necessitating the development of ethical and legal frameworks to regulate its increasing use and applications.
      "تتأثر العلاقات الدولية بشبكة معقدة من العوامل السياسية والاقتصادية والثقافية، مما يجعل فهمها والتنبؤ بمساراتها أمرًا بالغ الصعوبة.", // International relations are influenced by a complex network of political, economic, and cultural factors, making their understanding and prediction of their paths extremely difficult.
      "إن البحث العلمي المتقدم في مجالات مثل الفيزياء النووية والهندسة الوراثية يطرح أسئلة جوهرية حول مستقبل البشرية ومسؤوليتنا تجاه الأجيال القادمة.", // Advanced scientific research in fields such as nuclear physics and genetic engineering raises fundamental questions about the future of humanity and our responsibility towards future generations.
      "تتميز النصوص الأدبية الكلاسيكية بعمقها الفكري وجمالياتها اللغوية التي تجعلها خالدة عبر العصور وقادرة على إلهام القراء والمبدعين على حد سواء.", // Classic literary texts are characterized by their intellectual depth and linguistic aesthetics that make them timeless across ages and capable of inspiring readers and creators alike.
    ],
  }
};

const difficultyLevels = [
  { id: 'easy', name: 'Easy', defaultTime: 60 }, // time in seconds
  { id: 'medium', name: 'Medium', defaultTime: 90 },
  { id: 'hard', name: 'Hard', defaultTime: 120 },
];

const languages = [
  { id: 'english', name: 'English' },
  { id: 'arabic', name: 'العربية' },
];

const timeOptions = [
  { value: 30, label: '30s' },
  { value: 60, label: '1m' },
  { value: 90, label: '1m 30s' },
  { value: 120, label: '2m' },
  { value: 180, label: '3m' },
  { value: 300, label: '5m' },
];

const keyboardLayouts: Record<string, string[][]> = {
  english: [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
    ['space'],
  ],
  arabic: [
    ['ذ', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠', '-', '='],
    ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'د', '\\'],
    ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط'],
    ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ز', 'ظ'],
    ['مسافة'], // Space
  ],
};

interface KeyboardProps {
  layout: string[][];
  pressedKeys: Set<string>;
  nextChar?: string | null;
  language: string; // Added language prop
}

const Keyboard: React.FC<KeyboardProps> = ({ layout, pressedKeys, nextChar, language }) => {
  return (
    <div className="mt-8 p-4 bg-slate-800/50 rounded-lg shadow-xl border border-violet/30">
      {layout.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className={`flex justify-center gap-1 my-1 ${rowIndex === layout.length -1 && 'px-16'} ${language === 'arabic' ? 'flex-row-reverse' : ''}`}>
          {row.map((key) => {
            const isPressed = pressedKeys.has(key.toLowerCase());
            const isNext = nextChar && nextChar.toLowerCase() === key.toLowerCase();
            let keyClass = 'min-w-[30px] h-10 sm:min-w-[40px] sm:h-12 rounded font-mono text-sm sm:text-base flex items-center justify-center transition-all duration-100 ';
            if (key === 'space' || key === 'مسافة') {
              keyClass += 'w-1/2 sm:w-1/3 ';
            }
            if (isPressed) {
              keyClass += 'bg-electric-blue text-dark-navy scale-110 shadow-lg';
            } else if (isNext) {
              keyClass += 'bg-green-500 text-white animate-pulse';
            } else {
              keyClass += 'bg-slate-700 hover:bg-slate-600 text-subtle-white';
            }
            return (
              <div key={key} className={keyClass}>
                {key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};


const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(remainingSeconds).padStart(2, '0');
  return `${paddedMinutes}:${paddedSeconds}`;
};

export default function TypingExercisePage() {
  const supabase = createClient(); // Initialize Supabase client
  const [user, setUser] = useState<User | null>(null); // State for user session
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0].id);
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficultyLevels[0]);
  const [selectedTime, setSelectedTime] = useState(selectedDifficulty.defaultTime);
  const [currentSentence, setCurrentSentence] = useState('');
  const [typedText, setTypedText] = useState('');
  const [timeLeft, setTimeLeft] = useState(selectedTime);
  const [timerActive, setTimerActive] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [results, setResults] = useState<{ wpm: number; accuracy: number; score: number; errors: number; typedChars: number }>({ wpm: 0, accuracy: 0, score: 0, errors: 0, typedChars: 0 });
  const [showStartNotification, setShowStartNotification] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null); // Ref for the hidden input
  const sentenceBoxRef = useRef<HTMLDivElement>(null); // Ref for the sentence display box
  const [isBlinking, setIsBlinking] = useState(false);
  const [preTestCountdown, setPreTestCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (isBlinking) {
      const blinkTimer = setTimeout(() => setIsBlinking(false), 1000); // Blink for 1 second
      return () => clearTimeout(blinkTimer);
    }
  }, [isBlinking]);

  useEffect(() => {
    if (showStartNotification) {
      const timer = setTimeout(() => {
        setShowStartNotification(false);
      }, 2000); // Hide after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [showStartNotification]);

  useEffect(() => {
    // Fetch user session
    const getUserSession = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user session:', error);
        setUser(null);
      } else {
        setUser(data.user);
      }
    };
    getUserSession();
  }, [supabase]);

  const loadNewSentence = useCallback(() => {
    const availableSentences = sentences[selectedLanguage]?.[selectedDifficulty.id] || sentences['english']['easy']; // Fallback
    const randomIndex = Math.floor(Math.random() * availableSentences.length);
    const newSentence = availableSentences[randomIndex];
    setCurrentSentence(newSentence);
    setTypedText('');
  }, [selectedDifficulty.id, selectedLanguage]);

  const handleKeyDownEvent = useCallback((event: ReactKeyboardEvent<HTMLInputElement>) => {
    // This function is called on keydown in the text input.
    // Native browser behavior handles most character input and backspace for controlled components.
    // Add specific logic here if you need to override or add behavior for certain keys (e.g., Enter).
    // console.log('Input key down:', event.key);
  }, []);

  useEffect(() => {
    setTimeLeft(selectedTime);
    loadNewSentence();
    setTestFinished(false);
    setTimerActive(false);
    setTypedText('');
    setResults({ wpm: 0, accuracy: 0, score: 0, errors: 0, typedChars: 0 });
  }, [selectedDifficulty, selectedLanguage, selectedTime, loadNewSentence]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (testFinished || !timerActive) return;
      let key = event.key.toLowerCase();
      if (key === ' ') key = 'space'; // Normalize space key
      if (selectedLanguage === 'arabic' && keyboardLayouts.arabic.flat().includes(event.key)) {
        key = event.key; // Use original key for Arabic if it's on the layout
      } else if (selectedLanguage === 'arabic' && event.key === ' ') {
        key = 'مسافة';
      }

      setPressedKeys((prev) => new Set(prev).add(key));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      let key = event.key.toLowerCase();
      if (key === ' ') key = 'space';
      if (selectedLanguage === 'arabic' && keyboardLayouts.arabic.flat().includes(event.key)) {
        key = event.key;
      } else if (selectedLanguage === 'arabic' && event.key === ' ') {
        key = 'مسافة';
      }
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [testFinished, timerActive, selectedLanguage]);


  useEffect(() => {
    console.log(`[TimerEffect] Fired. pre: ${preTestCountdown}, active: ${timerActive}, left: ${timeLeft}`);
    let intervalId: NodeJS.Timeout | undefined;

    if (preTestCountdown !== null && preTestCountdown > 0) {
      console.log('[TimerEffect] Condition A: Pre-countdown running.');
      intervalId = setInterval(() => {
        setPreTestCountdown(prev => {
          console.log('[TimerEffect] Interval A: prev preTestCountdown:', prev);
          return prev !== null ? prev - 1 : null;
        });
      }, 1000);
    } else if (preTestCountdown === 0) {
      console.log('[TimerEffect] Condition B: Pre-countdown finished. Setting timerActive=true.');
      setPreTestCountdown(null);
      setTimerActive(true); // Start the actual test timer
      setStartTime(Date.now());
      inputRef.current?.focus(); // Focus after pre-test countdown
    } else if (timerActive && timeLeft > 0) {
      console.log('[TimerEffect] Condition C: Main timer running.');
      intervalId = setInterval(() => {
        setTimeLeft(prev => {
          console.log('[TimerEffect] Interval C: prev timeLeft:', prev);
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      console.log('[TimerEffect] Condition D: Main timer finished.');
      setTimerActive(false);
      setTestFinished(true);
      calculateResults();
    }

    return () => {
      if (intervalId) {
        console.log('[TimerEffect] Cleanup: Clearing interval', intervalId);
        clearInterval(intervalId);
      }
    };
  }, [timerActive, timeLeft, preTestCountdown]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (testFinished) return;

    const newTypedText = e.target.value;
    if (!timerActive && preTestCountdown === null && newTypedText.length > 0 && !testFinished) {
      // This condition is to start the timer if user types before clicking start, 
      // but now we have a pre-test countdown, so this might need adjustment or removal
      // For now, let's assume startTest is always called first.
      // setTimerActive(true);
      // setStartTime(Date.now());
    }
    setTypedText(newTypedText);

    // For languages like Arabic, word count might be different, but char count is fine for now
    if (newTypedText.length === currentSentence.length) {
        if (timeLeft > 0) {
            calculateResults(true); // Calculate intermediate results
            loadNewSentence(); // Load new sentence immediately
        }
    }
  };

  const calculateResults = (intermediate = false) => {
    if (!startTime && !intermediate) return;

    const durationInMinutes = intermediate && startTime 
        ? (Date.now() - startTime) / 60000 
        : selectedTime / 60;

    if (durationInMinutes === 0 && !intermediate) return;

    let correctChars = 0;
    let errorCount = 0;

    const comparisonLength = Math.min(typedText.length, currentSentence.length);
    for (let i = 0; i < comparisonLength; i++) {
      if (typedText[i] === currentSentence[i]) {
        correctChars++;
      } else {
        errorCount++;
      }
    }
    // Penalize extra characters typed beyond the sentence length
    if (typedText.length > currentSentence.length) {
        errorCount += (typedText.length - currentSentence.length);
    }

    // WPM calculation can be tricky for non-space-separated languages if not handled carefully.
    // Using a simple space split for now, might need refinement for Arabic.
    const typedWords = typedText.trim().split(/\s+/).filter(Boolean).length;
    const wpm = durationInMinutes > 0 ? Math.round(typedWords / durationInMinutes) : 0;
    
    // Accuracy based on characters typed so far vs correct characters for those typed
    const accuracy = typedText.length > 0 ? Math.round((correctChars / typedText.length) * 100) : 0;
    
    if (intermediate) {
        // Accumulate results for intermediate calculations (e.g., when a sentence is completed before time runs out)
        setResults(prevResults => ({
            ...prevResults, // Preserve existing score if any, or other properties
            wpm: prevResults.wpm + wpm, 
            accuracy: accuracy, 
            errors: prevResults.errors + errorCount,
            typedChars: prevResults.typedChars + typedText.length,
            score: prevResults.score // Ensure score is carried over or updated appropriately
        }));
        setStartTime(Date.now()); // Reset start time for the next sentence segment
    } else {
        // Final results calculation when timer ends
        const totalTypedChars = results.typedChars + typedText.length; // Include current buffer
        const totalErrors = results.errors + errorCount;
        const totalCorrectChars = totalTypedChars - totalErrors; // Approximate
        const finalAccuracy = totalTypedChars > 0 ? Math.round((totalCorrectChars / totalTypedChars) * 100) : 0;
        const finalWpm = selectedTime > 0 ? Math.round((totalTypedChars / 5) / (selectedTime / 60)) : 0; // Standard WPM: (chars/5) / minutes

        const score = Math.round((finalWpm * (finalAccuracy / 100)) * (1 + (selectedDifficulty.id === 'hard' ? 0.2 : selectedDifficulty.id === 'medium' ? 0.1 : 0)));
        const finalResults = {
            wpm: finalWpm,
            accuracy: finalAccuracy,
            errors: totalErrors,
            typedChars: totalTypedChars,
            score: score
        };
        setResults(finalResults);

        // Save to Supabase if it's the final calculation and user exists
        if (!intermediate && user && user.id) {
          const saveAnalytics = async () => {
            try {
              const { error: insertError } = await supabase
                .from('user_typing_analytics') // Ensure this table name is correct
                .insert({
                  user_id: user.id,
                  wpm: finalResults.wpm,
                  accuracy: finalResults.accuracy
                  // created_at is usually handled by Supabase default value
                  // Other fields like errors, chars_typed, test_language, etc., can be added here
                  // if they exist in your user_typing_analytics table.
                });
              if (insertError) {
                console.error('Error saving typing analytics to Supabase:', insertError);
                // Optionally, notify the user or handle the error more gracefully
              }

              // Also save to user_completed_lessons
              // Using currentSentence as a proxy for lesson_id. This might need a more robust lesson identifier.
              const { error: lessonError } = await supabase
                .from('user_completed_lessons')
                .insert({
                  user_id: user.id,
                  lesson_id: currentSentence, // Using the sentence text as a temporary lesson ID
                  // completed_at is handled by Supabase default value (timestamptz)
                });

              if (lessonError) {
                console.error('Error saving completed lesson to Supabase:', lessonError);
              }

            } catch (e) {
              console.error('Exception while saving analytics or lesson:', e);
            }
          };
          saveAnalytics();
        }
    }
  };

  const startTest = () => {
    setTestFinished(false);
    setTimerActive(false); 
    setTimeLeft(selectedTime);
    loadNewSentence();
    setTypedText(''); // Clear previously typed text
    setResults({ wpm: 0, accuracy: 0, score: 0, errors: 0, typedChars: 0 });
    setStartTime(null); 
    // inputRef.current?.focus(); // Focus will happen after pre-test countdown
    setShowStartNotification(true); // Show "Test Started!" briefly
    sentenceBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setIsBlinking(true);
    console.log('[startTest] Called. Setting preTestCountdown to 3.');
    setPreTestCountdown(3); // Start 3-second pre-test countdown
  };

  const getHighlightedText = () => {
    return currentSentence.split('').map((char: string, index: number) => {
      let color = 'text-slate-400';
      if (index < typedText.length) {
        color = typedText[index] === char ? 'text-electric-blue' : 'text-red-500';
      }
      return <span key={index} className={color}>{char}</span>;
    });
  };

  return (
    <div dir={selectedLanguage === 'arabic' ? 'rtl' : 'ltr'} className="min-h-screen bg-gradient-to-br from-dark-navy via-black to-violet text-subtle-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 transition-all duration-500 ease-in-out">
      <main className="container mx-auto max-w-4xl w-full glass-panel p-6 sm:p-8 md:p-10 border border-violet/50 shadow-2xl shadow-violet/30 rounded-xl">
        {showStartNotification && (
          <div className="mb-4 p-3 text-center text-lg font-semibold text-white bg-green-500 rounded-md shadow-lg">
            Test Started!
          </div>
        )}
        {!testFinished ? (
          <>
            {/* Settings Row */}
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 sm:gap-3">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="input-style bg-slate-800/60 border-violet-500/50 hover:border-violet-500 focus:ring-violet-500 text-sm sm:text-base"
                  disabled={timerActive}
                >
                  {languages.map(lang => (
                    <option key={lang.id} value={lang.id}>{lang.name}</option>
                  ))}
                </select>
                <select
                  value={selectedDifficulty.id}
                  onChange={(e) => {
                    const newDiff = difficultyLevels.find(d => d.id === e.target.value) || difficultyLevels[0];
                    setSelectedDifficulty(newDiff);
                    setSelectedTime(newDiff.defaultTime); // Reset time to default for new difficulty
                  }}
                  className="input-style bg-slate-800/60 border-violet-500/50 hover:border-violet-500 focus:ring-violet-500 text-sm sm:text-base"
                  disabled={timerActive}
                >
                  {difficultyLevels.map(level => (
                    <option key={level.id} value={level.id}>{level.name}</option>
                  ))}
                </select>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(Number(e.target.value))}
                  className="input-style bg-slate-800/60 border-violet-500/50 hover:border-violet-500 focus:ring-violet-500 text-sm sm:text-base"
                  disabled={timerActive}
                >
                  {timeOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className={`text-3xl sm:text-4xl font-mono font-bold tracking-wider ${preTestCountdown !== null && preTestCountdown > 0 ? 'text-green-400' : 'text-electric-blue'}`}>
                {preTestCountdown !== null && preTestCountdown > 0 ? formatTime(preTestCountdown) : formatTime(timeLeft)}
              </div>
            </div>

            {/* Sentence Display */}
            {/* Sentence Display */}
            <div 
              ref={sentenceBoxRef}
              className={`mb-6 sm:mb-8 p-4 sm:p-6 bg-slate-900 rounded-lg border text-lg sm:text-xl md:text-2xl leading-relaxed sm:leading-loose tracking-wide transition-all duration-300 ${isBlinking ? 'border-green-500 shadow-green-500/50 shadow-lg scale-105' : 'border-electric-blue'}`}>
              {preTestCountdown !== null && preTestCountdown > 0 ? (
                <div className="flex items-center justify-center h-full text-4xl font-bold text-green-400">
                  {preTestCountdown}
                </div>
              ) : (
                getHighlightedText()
              )}
            </div>

            {/* Hidden Input for Mobile/Accessibility - can be focused by clicking sentence */}
            <input
              type="text"
              className="opacity-0 absolute w-0 h-0"
              value={typedText} // Controlled component
              onChange={handleInputChange} // Handles actual logic
              onKeyDown={handleKeyDownEvent} // Handles special keys like backspace
              autoFocus
              ref={inputRef} // Ref to focus programmatically
              disabled={testFinished}
              aria-label="Type here"
            />
            
            {/* Start Button / Info */}
            {!timerActive && !testFinished && (
                <div className="text-center my-6">
                    <button 
                        onClick={startTest}
                        className="btn-primary text-lg sm:text-xl px-8 sm:px-10 py-3 sm:py-4 group shadow-lg shadow-electric-blue/30 hover:shadow-xl hover:shadow-electric-blue/50 transition-all duration-300 transform hover:scale-105"
                    >
                        Start Typing
                    </button>
                    <p className="text-slate-400 mt-3 text-sm">Click or start typing to begin the test.</p>
                  </div>
              )}
        {/* Existing code for results display, etc. */}

            <Keyboard layout={keyboardLayouts[selectedLanguage] || keyboardLayouts.english} pressedKeys={pressedKeys} nextChar={typedText.length < currentSentence.length ? currentSentence[typedText.length] : null} language={selectedLanguage} />

          </>
        ) : (
          // Results Display
          <div className="max-w-2xl mx-auto mt-8 p-8 bg-slate-900 rounded-xl shadow-2xl border-2 border-electric-blue/70">
            <h2 className="text-4xl font-bold text-center text-electric-blue mb-10">
              Test Results {user?.user_metadata?.username ? `for ${user.user_metadata.username}` : ''}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 text-center mb-10">
              {/* WPM */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <p className="text-emerald-100 text-lg font-medium">WPM</p>
                <p className="text-5xl font-bold mt-1">{results.wpm}</p>
              </div>
              {/* Accuracy */}
              <div className="bg-gradient-to-br from-sky-500 to-cyan-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <p className="text-cyan-100 text-lg font-medium">Accuracy</p>
                <p className="text-5xl font-bold mt-1">{results.accuracy}%</p>
              </div>
              {/* Errors */}
              <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <p className="text-rose-100 text-lg font-medium">Errors</p>
                <p className="text-5xl font-bold mt-1">{results.errors}</p>
              </div>
              {/* Chars Typed */}
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <p className="text-indigo-100 text-lg font-medium">Chars Typed</p>
                <p className="text-5xl font-bold mt-1">{results.typedChars}</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-5">
              <button 
                onClick={startTest} 
                className="w-full sm:w-auto bg-gradient-to-r from-electric-blue to-violet-600 hover:from-electric-blue/90 hover:to-violet-600/90 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-75 text-lg"
              >
                {selectedLanguage === 'arabic' ? 'إعادة المحاولة' : 'Try Again'}
              </button>
              <Link href="/typing-test" className="text-slate-300 hover:text-electric-blue transition-colors duration-300 text-sm font-medium">
                {selectedLanguage === 'arabic' ? 'العودة إلى صفحة الاختبار' : 'Back to Test Page'}
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}