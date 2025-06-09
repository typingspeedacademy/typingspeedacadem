// src/components/TypingArea.tsx
import React from 'react';

interface TypingAreaProps {
  textToType: string;
  userInput: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
}

const TypingArea: React.FC<TypingAreaProps> = ({ textToType, userInput, onInputChange, disabled }) => {
  return (
    <div className="mb-4">
      <p className="text-lg text-slate-700 p-4 bg-slate-100 rounded-md mb-4 whitespace-pre-wrap font-mono">
        {textToType}
      </p>
      <textarea
        value={userInput}
        onChange={onInputChange}
        disabled={disabled}
        className="w-full p-3 border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500 resize-none font-mono text-lg bg-white/90 text-slate-800"
        rows={5}
        placeholder="Start typing here..."
      />
    </div>
  );
};

export default TypingArea;