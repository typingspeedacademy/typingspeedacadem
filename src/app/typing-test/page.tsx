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

export default function TypingTestPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-navy via-black to-violet text-subtle-white flex flex-col items-center justify-center p-4 sm:p-8">
      <main className="relative z-10 container mx-auto max-w-3xl w-full glass-panel p-6 sm:p-10 border border-violet/50 shadow-xl shadow-violet/20 rounded-lg">

        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-electric-blue animate-pulse mb-2">
            Start Your Typing Journey!
          </h2>
          <p className="text-slate-300 mb-6">
            Test your speed, accuracy, and improve your skills. Here's what you can do:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {freeTierFeatures.map((feature) => (
            <div
              key={feature.name}
              className="glass-panel p-6 flex flex-col items-start border border-electric-blue/30 hover:border-electric-blue/70 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <feature.icon className="h-10 w-10 text-electric-blue mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-subtle-white mb-2">{feature.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h1 className="header-main text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-electric-blue to-violet">
            Ready to Test Your Skills?
          </h1>
          <p className="text-slate-300 mb-6 text-lg">
            Click the button below to start the typing exercise.
          </p>
          <Link href="/typing-test/typing-exercise" legacyBehavior>
            <a className="inline-flex items-center justify-center px-8 py-4 text-xl font-semibold text-white bg-gradient-to-r from-electric-blue to-violet rounded-lg shadow-lg hover:from-electric-blue/90 hover:to-violet/90 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 group">
              Start Typing Exercise
              <ChevronRightIcon className="ml-2 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Link>
        </div>

        <div className="mt-12 text-center border-t border-violet/30 pt-8">
          <p className="text-slate-300 mb-6 text-lg">
            Ready to unlock your full potential? Our Premium plan offers advanced features, personalized training, and an ad-free experience.
          </p>
          <Link href="/paid-courses" legacyBehavior>
            <a className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-green-400 to-cyan-500 rounded-lg shadow-md hover:from-green-500 hover:to-cyan-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 group">
              Explore Premium Courses
              <ChevronRightIcon className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Link>
        </div>

      </main>
    </div>
  );
}