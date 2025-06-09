'use client';
import Link from 'next/link';

import { ChevronRightIcon } from '@heroicons/react/24/solid';

// Enhanced Fluid Visual Background
const FluidVisualBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* More dynamic and layered abstract shapes */}
      <div className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 bg-gradient-to-br from-electric-blue/30 to-violet/30 opacity-50 rounded-full filter blur-3xl animate-sway-slow"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 bg-gradient-to-tl from-violet/40 to-electric-blue/20 opacity-60 rounded-full filter blur-3xl animate-sway-slow animation-delay-3000"></div>
      <div className="absolute top-10 right-10 w-1/2 h-1/2 bg-gradient-to-bl from-glow-accent/20 to-transparent opacity-40 rounded-full filter blur-2xl animate-sway-fast"></div>
      <div className="absolute bottom-20 left-20 w-1/3 h-1/3 bg-gradient-to-tr from-electric-blue/10 to-violet/10 opacity-50 rounded-lg filter blur-xl animate-sway-fast animation-delay-1500"></div>

      {/* Subtle moving particles or stars (example) */}
      {[...Array(50)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full bg-glow-accent/70 animate-twinkle"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 5 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default function HomePage() {
  const benefits = [
    { title: "Boost Your Speed", description: "Dramatically increase your WPM with targeted exercises.", icon: "⚡" },
    { title: "Track Your Progress", description: "Monitor your improvement with detailed analytics.", icon: "📊" },
    { title: "Compete Globally", description: "Challenge typists worldwide and climb the leaderboards.", icon: "🌍" },
  ];

  const howItWorksSteps = [
    { id: 1, title: "Sign Up Free", description: "Create your account in seconds and start your journey.", icon: "👤" },
    { id: 2, title: "Practice Daily", description: "Engage with tailored exercises and fun challenges.", icon: "⌨️" },
    { id: 3, title: "Track & Improve", description: "See detailed stats and watch your skills grow.", icon: "📈" },
    { id: 4, title: "Conquer All Levels", description: "Unlock achievements and become a typing master.", icon: "🏆" },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 md:p-24 text-subtle-white overflow-hidden">
      <FluidVisualBackground />
      <div className="relative z-10 text-center space-y-10 max-w-4xl mx-auto">
        <h1 className="header-main">
          Master the Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-violet">Fast Typing</span>
        </h1>
        <p className="header-sub max-w-2xl mx-auto !text-gray-400">
          Unlock your potential and type like never before. Join TypingSpeedAcademy and transform your skills.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12">
          <Link 
            href="/typing-test" 
            className="group text-lg font-semibold px-8 py-4 rounded-lg bg-gradient-to-r from-electric-blue to-violet text-white shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-opacity-50 transition-all duration-300 ease-in-out flex items-center justify-center"
          >
            Start for Free <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/paid-courses" // Assuming '/paid-courses' is the correct path for premium features
            className="group text-lg font-semibold px-8 py-4 rounded-lg bg-transparent border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-dark-navy shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-opacity-50 transition-all duration-300 ease-in-out flex items-center justify-center"
          >
            See Premium Features
          </Link>
        </div>
      </div>

      {/* Placeholder for Interactive Mini-Typing Demo */}
      <div className="relative z-10 mt-16 w-full max-w-2xl mx-auto p-8 glass-panel text-center">
        <h2 className="text-3xl font-bold text-subtle-white mb-6">Try a Quick Sample!</h2>
        <p className="text-slate-400 mb-4">[Interactive typing demo component will go here]</p>
        {/* Example: <MiniTypingTest /> */}
        <p className="text-xs text-slate-500">This is a placeholder for a mini typing test.</p>
      </div>

      <div className="relative z-10 mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="glass-panel p-8 text-center hover:border-electric-blue/70 transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-5xl mb-6 text-electric-blue glow-text-hard">{benefit.icon}</div>
            <h3 className="text-2xl font-bold text-subtle-white mb-3">{benefit.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
          </div>
        ))}
      </div>

      {/* How It Works Section */}
      <section className="relative z-10 mt-24 w-full max-w-5xl mx-auto py-16">
        <h2 className="text-4xl font-bold text-center text-subtle-white mb-16">
          How <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-violet">It Works</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorksSteps.map((step) => (
            <div key={step.id} className="glass-panel p-6 text-center hover:border-electric-blue/70 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-5xl mb-4 text-electric-blue glow-text-hard">{step.icon}</div>
              <h3 className="text-xl font-semibold text-subtle-white mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Course Snippet Section */}
      <section className="relative z-10 mt-24 w-full max-w-5xl mx-auto py-16">
        <h2 className="text-4xl font-bold text-center text-subtle-white mb-16">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-violet">Course</span>
        </h2>
        <div className="glass-panel p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 hover:border-electric-blue/70 transition-all duration-300">
          <div className="w-full md:w-1/3 h-48 md:h-64 bg-gradient-to-br from-dark-navy to-slate-800 rounded-lg flex items-center justify-center shadow-xl">
            {/* Placeholder for course image or icon */}
            <span className="text-6xl text-electric-blue glow-text-hard">🚀</span> 
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h3 className="text-3xl font-semibold text-subtle-white mb-4">Advanced Typing Techniques</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Master complex patterns, improve accuracy under pressure, and learn ergonomic best practices to type faster and more comfortably than ever before. This course is designed for those ready to take their skills to a professional level.
            </p>
            <Link 
              href="/courses/advanced-typing" // Adjust link as needed
              className="inline-block text-lg font-semibold px-8 py-3 rounded-lg bg-electric-blue text-white shadow-md hover:bg-opacity-80 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-opacity-50 transition-all duration-300 ease-in-out"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Leaderboard Teaser Section - Modified to "Coming Soon" */}
      <section className="relative z-10 mt-24 w-full max-w-4xl mx-auto py-16 text-center">
        <h2 className="text-4xl font-bold text-subtle-white mb-6">
          Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-violet">Leaderboard</span>
        </h2>
        <div className="relative glass-panel p-8 mb-8">
          <div className="absolute inset-0 bg-dark-navy/50 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center z-20">
            <h3 className="text-3xl font-bold text-electric-blue glow-text-hard mb-4">Coming Soon!</h3>
            <p className="text-xl text-slate-300 mb-6">Unlock leaderboards and more with our premium courses.</p>
            <Link 
              href="/paid-courses" // Path to paid courses page
              className="inline-block text-lg font-semibold px-10 py-4 rounded-lg bg-gradient-to-r from-electric-blue to-violet text-white shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-opacity-50 transition-all duration-300 ease-in-out"
            >
              Explore Premium Courses
            </Link>
          </div>
          {/* Blurred content underneath */}
          <h3 className="text-2xl font-semibold text-subtle-white mb-6 opacity-30">Top Typer Spotlight</h3>
          <div className="space-y-3 text-slate-300 opacity-30">
            <p>1. SpeedyKeys - 150 WPM</p>
            <p>2. TypeMasterFlex - 145 WPM</p>
            <p>3. QuickFingers - 142 WPM</p>
          </div>
          <p className="text-xs text-slate-500 mt-4 opacity-30">Leaderboard data is illustrative.</p>
        </div>
        {/* Original button removed as it's now part of the blurred overlay */}
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 mt-24 w-full max-w-5xl mx-auto py-16">
        <h2 className="text-4xl font-bold text-center text-subtle-white mb-16 overflow-hidden whitespace-nowrap">
          Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-violet">Typists Worldwide</span> & Many More!
        </h2>
        <div className="testimonial-outer-container overflow-x-hidden">
          <div className="testimonial-inner-container flex py-4 space-x-8">
            {[ // Sample testimonials, ideally fetch these or pass as props
            {
              quote: "My WPM skyrocketed! The interface is sleek and motivating.",
              name: "Alex R.",
              avatarSeed: "AlexR", // For UI Avatars
              role: "Student"
            },
            {
              quote: "Finally, a typing app that doesn't look like it's from the 90s. Love the design!",
              name: "Mia K.",
              avatarSeed: "MiaK",
              role: "Developer"
            },
            {
              quote: "The progressive difficulty helped me break my plateau. Highly recommend!",
              name: "Jordan P.",
              avatarSeed: "JordanP",
              role: "Writer"
            },
            {
              quote: "The analytics are incredibly detailed. It's helped me pinpoint exactly where I need to improve.",
              name: "Samira B.",
              avatarSeed: "SamiraB",
              role: "Data Analyst"
            },
            {
              quote: "I use this to warm up before coding sessions. It's fun and effective.",
              name: "Kenji T.",
              avatarSeed: "KenjiT",
              role: "Software Engineer"
            },
            {
              quote: "As a professional transcriber, speed and accuracy are key. This platform delivers on both.",
              name: "Laura V.",
              avatarSeed: "LauraV",
              role: "Transcriptionist"
            },
            // Duplicate for infinite scroll effect
            {
              quote: "My WPM skyrocketed! The interface is sleek and motivating.",
              name: "Alex R. 2", // Unique key for React
              avatarSeed: "AlexR",
              role: "Student"
            },
            {
              quote: "Finally, a typing app that doesn't look like it's from the 90s. Love the design!",
              name: "Mia K. 2", // Unique key for React
              avatarSeed: "MiaK",
              role: "Developer"
            },
            {
              quote: "The progressive difficulty helped me break my plateau. Highly recommend!",
              name: "Jordan P. 2", // Unique key for React
              avatarSeed: "JordanP",
              role: "Writer"
            },
            {
              quote: "The analytics are incredibly detailed. It's helped me pinpoint exactly where I need to improve.",
              name: "Samira B. 2", // Unique key for React
              avatarSeed: "SamiraB",
              role: "Data Analyst"
            },
            {
              quote: "I use this to warm up before coding sessions. It's fun and effective.",
              name: "Kenji T. 2", // Unique key for React
              avatarSeed: "KenjiT",
              role: "Software Engineer"
            },
            {
              quote: "As a professional transcriber, speed and accuracy are key. This platform delivers on both.",
              name: "Laura V. 2", // Unique key for React
              avatarSeed: "LauraV",
              role: "Transcriptionist"
            }
          ].map((testimonial, index) => (
            <div 
              key={`${testimonial.name}-${index}`} 
              className="glass-panel p-8 flex flex-col items-center text-center border border-violet/30 hover:border-electric-blue/70 transition-all duration-300 transform hover:-translate-y-1 flex-shrink-0 w-80 md:w-96"
            >
              <img 
                src={`https://ui-avatars.com/api/?name=${testimonial.avatarSeed}&background=1A202C&color=7DF9FF&bold=true&size=96&rounded=true`}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mb-6 border-2 border-electric-blue/50"
              />
              <p className="text-slate-300 italic text-md mb-4 flex-grow">"{testimonial.quote}"</p>
              <h4 className="text-xl font-semibold text-subtle-white">{testimonial.name}</h4>
              <p className="text-electric-blue text-sm">{testimonial.role}</p>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* FAQ Section Placeholder */}
      <section className="relative z-10 mt-24 w-full max-w-3xl mx-auto py-16">
        <h2 className="text-4xl font-bold text-center text-subtle-white mb-16">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-violet">Questions</span>
        </h2>
        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h3 className="text-xl font-semibold text-subtle-white mb-2">What is TypingSpeedAcademy?</h3>
            <p className="text-slate-400">TypingSpeedAcademy is an online platform dedicated to helping users improve their typing speed and accuracy through a variety of exercises, courses, and challenges.</p>
          </div>
          <div className="glass-panel p-6">
            <h3 className="text-xl font-semibold text-subtle-white mb-2">How do I improve my typing speed?</h3>
            <p className="text-slate-400">Consistent practice is key! Utilize our targeted exercises, focus on accuracy first, then speed. Our platform provides detailed feedback to help you identify areas for improvement.</p>
          </div>
          <div className="glass-panel p-6">
            <h3 className="text-xl font-semibold text-subtle-white mb-2">Are there any free courses or trials?</h3>
            <p className="text-slate-400">Yes! We offer a range of free exercises and a basic trial to get you started. Premium features and advanced courses are available with a subscription.</p>
          </div>
          <div className="glass-panel p-6">
            <h3 className="text-xl font-semibold text-subtle-white mb-2">Can I track my progress?</h3>
            <p className="text-slate-400">Absolutely! TypingSpeedAcademy provides detailed analytics, including WPM (Words Per Minute), accuracy charts, and progress over time, so you can see how you're improving.</p>
          </div>
          <div className="glass-panel p-6">
            <h3 className="text-xl font-semibold text-subtle-white mb-2">Is there a competitive aspect?</h3>
            <p className="text-slate-400">Yes, you can compete with other users on our global leaderboards. Challenge yourself and see how you rank against typists from around the world!</p>
          </div>
        </div>
        <p className="text-center text-slate-500 mt-8 text-sm">More questions? <Link href="/contact" className="text-electric-blue hover:underline">Contact us</Link>.</p>
      </section>

      {/* Closing Call to Action */}
      <div className="relative z-10 mt-16 text-center py-10">
        <p className="text-slate-400 italic">
          Ready to elevate your typing skills? Your journey starts now.
        </p>
      </div>
      {/* Keyframes for new animations should be in globals.css or tailwind.config.js if used across multiple components */}
      {/* For simplicity, keeping some here if they are very specific to this page's background */}
      <style jsx global>{`
        @keyframes sway-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, -10px) rotate(5deg); }
          50% { transform: translate(-15px, 15px) rotate(-3deg); }
          75% { transform: translate(10px, 5px) rotate(2deg); }
        }
        .animate-sway-slow {
          animation: sway-slow 15s infinite ease-in-out;
        }
        @keyframes sway-fast {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(5px, -5px) scale(1.05); }
        }
        .animate-sway-fast {
          animation: sway-fast 8s infinite ease-in-out alternate;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-twinkle {
          animation: twinkle 8s infinite ease-in-out;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        @keyframes slide-in-left {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.75s ease-out forwards;
        }
        @keyframes horizontal-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%); /* Scroll one half (the first set of testimonials) */
          }
        }
        .testimonial-inner-container {
          /* Duration should be tuned based on the number of items and desired speed */
          animation: horizontal-scroll 40s linear infinite;
        }

      `}</style>
    </main>
  );
}