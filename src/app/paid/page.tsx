'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CheckCircleIcon, SparklesIcon, ChartBarIcon, ShieldCheckIcon, UserGroupIcon, StarIcon, ChevronRightIcon } from '@heroicons/react/24/solid'; // Using solid icons for premium feel

const premiumFeatures = [
  {
    name: 'AI-Generated Personal Training Paths',
    description: 'Customized learning journeys designed by AI to maximize your typing speed and accuracy based on your unique progress.',
    icon: SparklesIcon,
  },
  {
    name: 'Advanced Analytics Dashboard',
    description: 'Deep dive into your performance with detailed stats, heatmaps of problem keys, and progress over time.',
    icon: ChartBarIcon,
  },
  {
    name: 'Completely Ad-Free Experience',
    description: 'Focus on your training without any interruptions or distractions for a seamless learning environment.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Access to Pro-Level Courses & Competitions',
    description: 'Unlock exclusive advanced courses, specialized drills, and participate in elite typing competitions.',
    icon: UserGroupIcon,
  },
];

const testimonials = [
  {
    quote: 'My typing speed doubled in just a month! The AI training paths are a game-changer.',
    name: 'Sarah L.',
    avatar: '/avatars/sarah.png', // Placeholder - replace with actual paths or a generator
    stat: '95 WPM, 98% Accuracy',
  },
  {
    quote: 'The advanced analytics helped me pinpoint my weaknesses. I never thought I could type this fast!',
    name: 'Mike P.',
    avatar: '/avatars/mike.png',
    stat: '110 WPM, 97% Accuracy',
  },
  {
    quote: 'No ads and pro courses? Worth every penny. TypingSpeedAcademy Premium is top-notch.',
    name: 'Jessica B.',
    avatar: '/avatars/jessica.png',
    stat: '105 WPM, 99% Accuracy',
  },
];

const pricingTiers = {
  monthly: {
    price: '$19',
    billing: '/month',
    id: 'price_monthly_premium',
  },
  annual: {
    price: '$190',
    billing: '/year (Save $38)',
    id: 'price_annual_premium',
  },
};

export default function PaidPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-navy via-black to-violet text-subtle-white overflow-x-hidden">
      {/* Fluid Visual Background - Placeholder for a more complex component if needed */}
      <div className="absolute inset-0 opacity-20">
        {/* Add some subtle animated shapes or lines here */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue rounded-full filter blur-3xl animate-pulse-slow opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000 opacity-30"></div>
      </div>

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <header className="text-center mb-16 sm:mb-20">
          <h1 className="header-main bg-clip-text text-transparent bg-gradient-to-r from-electric-blue to-violet mb-4">
            Unlock Your Full Typing Potential
          </h1>
          <p className="header-sub text-slate-300 max-w-2xl mx-auto">
            Join TypingSpeedAcademy Premium and gain access to exclusive features designed to make you a typing virtuoso.
          </p>
        </header>

        {/* Premium Features Section */}
        <section className="mb-20 sm:mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-subtle-white mb-12">Why Go Premium?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {premiumFeatures.map((feature) => (
              <div key={feature.name} className="glass-panel p-6 sm:p-8 border border-violet/50 hover:border-violet transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <feature.icon className="h-12 w-12 text-violet mb-4" />
                <h3 className="text-xl sm:text-2xl font-semibold text-subtle-white mb-2">{feature.name}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mb-20 sm:mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-subtle-white mb-12">Choose Your Plan</h2>
          <div className="flex justify-center mb-8">
            <div className="relative flex p-1 bg-dark-navy/50 rounded-lg border border-violet/30">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`relative w-1/2 py-2 px-4 text-sm font-medium rounded-md transition-colors focus:outline-none
                  ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`relative w-1/2 py-2 px-4 text-sm font-medium rounded-md transition-colors focus:outline-none
                  ${billingCycle === 'annual' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Annual (Save 15%)
              </button>
              <div
                className={`absolute inset-0 m-1 rounded-md bg-electric-blue/80 transition-transform duration-300 ease-in-out transform
                  ${billingCycle === 'monthly' ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ width: 'calc(50% - 0.25rem)' }}
              />
            </div>
          </div>

          <div className="max-w-md mx-auto glass-panel border border-electric-blue/50 p-8 sm:p-10 rounded-xl shadow-2xl shadow-electric-blue/20">
            <div className="text-center">
              <p className="text-5xl font-extrabold text-subtle-white">{pricingTiers[billingCycle].price}</p>
              <p className="text-slate-400">{pricingTiers[billingCycle].billing}</p>
            </div>
            <ul className="mt-8 space-y-3 text-slate-300">
              {[...premiumFeatures.slice(0,3), {name: 'And much more!', description: '', icon: CheckCircleIcon}].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircleIcon className="flex-shrink-0 h-6 w-6 text-electric-blue mr-2 mt-0.5" />
                  <span>{feature.name}</span>
                </li>
              ))}
            </ul>
            <button className="btn-primary w-full mt-10 group">
              Join the Elite Typists
              <ChevronRightIcon className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </section>

        {/* Testimonial Carousel Section */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-subtle-white mb-12">Loved by Typists Worldwide</h2>
          <div className="relative max-w-3xl mx-auto glass-panel p-8 sm:p-12 border border-violet/40 rounded-xl shadow-xl shadow-violet/15">
            <div className="text-center">
              {/* Placeholder for avatar - ideally use an Image component from Next.js */}
              <img src={testimonials[currentTestimonial].avatar || `https://ui-avatars.com/api/?name=${testimonials[currentTestimonial].name.replace(' ', '+')}&background=2E0249&color=A955F7&bold=true&size=128`} alt={testimonials[currentTestimonial].name} className="w-24 h-24 rounded-full mx-auto mb-6 border-2 border-violet" />
              <p className="text-lg sm:text-xl italic text-slate-300 leading-relaxed">"{testimonials[currentTestimonial].quote}"</p>
              <p className="mt-6 font-semibold text-subtle-white text-lg">{testimonials[currentTestimonial].name}</p>
              <p className="text-electric-blue text-sm">{testimonials[currentTestimonial].stat}</p>
            </div>
            <button 
              onClick={prevTestimonial} 
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-electric-blue/20 hover:bg-electric-blue/40 text-white transition-colors focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ChevronRightIcon className="h-6 w-6 transform rotate-180" />
            </button>
            <button 
              onClick={nextTestimonial} 
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-electric-blue/20 hover:bg-electric-blue/40 text-white transition-colors focus:outline-none"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </section>

        <div className="text-center mt-12">
            <Link href="/" legacyBehavior>
                <a className="text-electric-blue hover:text-violet transition-colors duration-300 font-medium text-lg">
                    &larr; Back to Home
                </a>
            </Link>
        </div>

      </main>
    </div>
  );
}