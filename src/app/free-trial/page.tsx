'use client';

import Link from 'next/link';
import { ChevronRightIcon, SparklesIcon, ClockIcon, ArrowTrendingUpIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline'; // Using outline icons for a cleaner look

const features = [
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

export default function FreeTrialPage() {
  return (
    <div className="min-h-screen bg-dark-navy text-subtle-white flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="header-main text-electric-blue animate-pulse">
            Explore Our Free Tier
          </h1>
          <p className="header-sub mt-2 text-slate-300">
            Get a taste of what TypingSpeedAcademy offers, no strings attached.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature) => (
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

        <div className="text-center">
          <p className="text-slate-300 mb-6 text-lg">
            Ready to unlock your full potential? Our Premium plan offers advanced features, personalized training, and an ad-free experience.
          </p>
          <Link href="/paid" legacyBehavior>
            <a className="btn-primary group">
              Upgrade to Premium for Full Experience
              <ChevronRightIcon className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Link>
        </div>

        <div className="mt-12 text-center">
            <Link href="/" legacyBehavior>
                <a className="text-electric-blue hover:text-violet transition-colors duration-300 font-medium">
                    &larr; Back to Home
                </a>
            </Link>
        </div>

      </div>
    </div>
  );
}