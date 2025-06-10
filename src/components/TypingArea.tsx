// src/components/TypingArea.tsx
import React from 'react';

interface TypingAreaProps {
  textToType: string;
  userInput: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
  language: 'en' | 'es' | 'ar'; // Added language prop
}

const TypingArea: React.FC<TypingAreaProps> = ({ textToType, userInput, onInputChange, disabled, language }) => {
  const getCharClass = (char: string, index: number) => {
    if (index < userInput.length) {
      return userInput[index] === char ? 'text-green-400' : 'text-red-400 bg-red-900/30';
    }
    return 'text-gray-500'; // Untyped characters
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-xl border border-gray-300">
      <div 
        className={`text-xl md:text-2xl p-3 mb-4 font-sans whitespace-pre-wrap break-all leading-relaxed tracking-wide text-gray-800 rounded-md bg-gray-100 border border-gray-300 min-h-[100px] ${language === 'ar' ? 'rtl text-right' : 'ltr text-left'}`}
        dir={language === 'ar' ? 'rtl' : 'ltr'} // Set text direction
      >
        {textToType.split('').map((char, index) => (
          <span key={index} className={getCharClass(char, index)}>
            {char}
          </span>
        ))}
      </div>
      <textarea
        value={userInput}
        onChange={onInputChange}
        disabled={disabled}
        placeholder={disabled ? "Test ended. Press 'Reset' or change settings to start again." : "Start typing here..."}
        className={`w-full p-3 text-xl md:text-2xl font-sans bg-gray-50 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none transition-colors duration-200 ${language === 'ar' ? 'rtl text-right' : 'ltr text-left'}`}
        
        rows={3}
        dir={language === 'ar' ? 'rtl' : 'ltr'} // Set text direction for textarea
      />
    </div>
  );
};

export default TypingArea;