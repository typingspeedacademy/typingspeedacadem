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
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 md:p-24 text-gray-700 overflow-hidden bg-gradient-to-br from-slate-50 to-sky-100">
      {/* <FluidVisualBackground /> */}
      {/* Replaced FluidVisualBackground with a static gradient for a gentler feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-100 opacity-80"></div>

      <div className="relative z-10 text-center space-y-10 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-slate-800">
          Master the Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-500">Fast Typing</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
          Unlock your potential and type like never before. Join TypingSpeedAcademy and transform your skills.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12">
          <Link 
            href="/typing-test" 
            className="group text-lg font-medium px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg hover:shadow-xl hover:from-sky-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-300 ease-in-out flex items-center justify-center"
          >
            Start for Free <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/paid-courses"
            className="group text-lg font-medium px-8 py-4 rounded-xl bg-white border-2 border-sky-500 text-sky-600 hover:bg-sky-50 hover:text-sky-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-300 ease-in-out flex items-center justify-center"
          >
            See Premium Features
          </Link>
        </div>
      </div>

      {/* Interactive Mini-Typing Demo Link */}
      <div className="relative z-10 mt-20 w-full max-w-2xl mx-auto p-10 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl text-center">
        <h2 className="text-3xl font-semibold text-slate-700 mb-6">Try a Quick Sample!</h2>
        <p className="text-slate-600 mb-8">Ready to test your speed? Click below to start a quick typing test.</p>
        <Link 
          href="/typing-test"
          className="group text-lg font-medium px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all duration-300 ease-in-out flex items-center justify-center max-w-xs mx-auto"
        >
          Start Quick Test <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="relative z-10 mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl hover:shadow-sky-500/30 border border-transparent hover:border-sky-300 transition-all duration-300 transform hover:-translate-y-1.5">
            <div className="text-5xl mb-4 text-sky-500">{benefit.icon}</div>
            <h3 className="text-2xl font-semibold text-slate-700 mb-3">{benefit.title}</h3>
            <p className="text-slate-600 text-base leading-relaxed">{benefit.description}</p>
          </div>
        ))}
      </div>

      {/* How It Works Section */}
      <section className="relative z-10 mt-28 w-full max-w-5xl mx-auto py-16">
        <h2 className="text-4xl sm:text-5xl font-semibold text-center text-slate-800 mb-20">
          How <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-500">It Works</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorksSteps.map((step) => (
            <div key={step.id} className="bg-white/70 backdrop-blur-lg p-6 text-center rounded-2xl shadow-xl hover:shadow-sky-500/30 border border-transparent hover:border-sky-300 transition-all duration-300 transform hover:-translate-y-1.5">
              <div className="text-4xl mb-4 text-sky-500">{step.icon}</div>
              <h3 className="text-xl font-medium text-slate-700 mb-2">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Course Snippet Section */}
      <section className="relative z-10 mt-28 w-full max-w-5xl mx-auto py-16">
        <h2 className="text-4xl sm:text-5xl font-semibold text-center text-slate-800 mb-20">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-500">Course</span>
        </h2>
        <div className="bg-white/80 backdrop-blur-lg p-10 md:p-12 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-10 hover:shadow-sky-500/30 border border-transparent hover:border-sky-300 transition-all duration-300">
          <div className="w-full md:w-1/3 h-52 md:h-64 bg-gradient-to-br from-sky-100 to-indigo-200 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-6xl text-sky-600">🚀</span> 
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h3 className="text-3xl font-semibold text-slate-700 mb-4">Advanced Typing Techniques</h3>
            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              Master complex patterns, improve accuracy under pressure, and learn ergonomic best practices to type faster and more comfortably than ever before. This course is designed for those ready to take their skills to a professional level.
            </p>
            <Link 
              href="/courses/advanced-typing"
              className="inline-block text-lg font-medium px-8 py-4 rounded-xl bg-sky-500 text-white shadow-md hover:bg-sky-600 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-300 ease-in-out"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Leaderboard Teaser Section - Modified to "Coming Soon" */}
      <section className="relative z-10 mt-28 w-full max-w-4xl mx-auto py-16 text-center">
        <h2 className="text-4xl sm:text-5xl font-semibold text-slate-800 mb-16">
          Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-500">Leaderboard</span>
        </h2>
        <div className="relative bg-white/70 backdrop-blur-lg p-10 rounded-2xl shadow-xl mb-10">
          <div className="absolute inset-0 bg-slate-100/80 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center z-20 p-6">
            <h3 className="text-3xl font-semibold text-sky-600 mb-4">Coming Soon!</h3>
            <p className="text-xl text-slate-600 mb-8">Unlock leaderboards and more with our premium courses.</p>
            <Link 
              href="/paid-courses"
              className="inline-block text-lg font-medium px-10 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg hover:shadow-xl hover:from-sky-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-300 ease-in-out"
            >
              Explore Premium Courses
            </Link>
          </div>
          {/* Blurred content underneath */}
          <h3 className="text-2xl font-semibold text-slate-700 mb-6 opacity-10">Top Typer Spotlight</h3>
          <div className="space-y-3 text-slate-600 opacity-10">
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
        {/* Updated heading style for better theme consistency */}
        <h2 className="text-4xl sm:text-5xl font-semibold text-center text-slate-800 mb-20">
          Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-500">Typists Worldwide</span> & Many More!
        </h2>
        <div className="testimonial-outer-container overflow-x-hidden">
          <div className="testimonial-inner-container flex py-4 space-x-8">
            {[ // Array of testimonial objects. Each object represents a single testimonial.
            {
              quote: "My WPM skyrocketed! The interface is sleek and motivating.",
              name: "Alex R.",
              avatarSeed: "AlexR", // Used for generating a unique avatar from ui-avatars.com
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
            // Duplicate set of testimonials for a smoother infinite scroll visual effect.
            // Ensure unique keys for React if these are directly rendered without further processing.
            {
              quote: "My WPM skyrocketed! The interface is sleek and motivating.",
              name: "Alex R. 2", 
              avatarSeed: "AlexR",
              role: "Student"
            },
            {
              quote: "Finally, a typing app that doesn't look like it's from the 90s. Love the design!",
              name: "Mia K. 2", 
              avatarSeed: "MiaK",
              role: "Developer"
            },
            {
              quote: "The progressive difficulty helped me break my plateau. Highly recommend!",
              name: "Jordan P. 2", 
              avatarSeed: "JordanP",
              role: "Writer"
            },
            {
              quote: "The analytics are incredibly detailed. It's helped me pinpoint exactly where I need to improve.",
              name: "Samira B. 2", 
              avatarSeed: "SamiraB",
              role: "Data Analyst"
            },
            {
              quote: "I use this to warm up before coding sessions. It's fun and effective.",
              name: "Kenji T. 2", 
              avatarSeed: "KenjiT",
              role: "Software Engineer"
            },
            {
              quote: "As a professional transcriber, speed and accuracy are key. This platform delivers on both.",
              name: "Laura V. 2", 
              avatarSeed: "LauraV",
              role: "Transcriptionist"
            }
            // Mapping over the testimonials array to render each card.
          ].map((testimonial, index) => (
            <div 
              key={`${testimonial.name}-${index}`} 
              // Updated card styling for better theme consistency and modern look
              className="bg-white/80 backdrop-blur-lg p-8 flex flex-col items-center text-center rounded-2xl shadow-xl hover:shadow-sky-500/30 border border-slate-200 hover:border-sky-400 transition-all duration-300 transform hover:-translate-y-1.5 flex-shrink-0 w-80 md:w-96"
            >
              <img 
                // Using ui-avatars.com for dynamic, consistent avatar generation.
                // Colors are chosen to fit the website's theme.
                src={`https://ui-avatars.com/api/?name=${testimonial.avatarSeed}&background=E0F2FE&color=0284C7&bold=true&size=96&rounded=true`}
                alt={`${testimonial.name}'s testimonial avatar`}
                className="w-24 h-24 rounded-full mb-6 border-2 border-sky-300 shadow-md"
              />
              {/* Testimonial quote with appropriate styling */}
              <p className="text-slate-600 italic text-md mb-4 flex-grow">"{testimonial.quote}"</p>
              {/* Testimonial author's name */}
              <h4 className="text-xl font-semibold text-slate-700">{testimonial.name}</h4>
              {/* Testimonial author's role, styled to fit the theme */}
              <p className="text-sky-600 text-sm">{testimonial.role}</p>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* FAQ Section Placeholder */}
      <section className="relative z-10 mt-28 w-full max-w-3xl mx-auto py-16">
        <h2 className="text-4xl sm:text-5xl font-semibold text-center text-slate-800 mb-20">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-500">Questions</span>
        </h2>
        <div className="space-y-6">
          <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-medium text-slate-700 mb-3">What is TypingSpeedAcademy?</h3>
            <p className="text-slate-600 text-base">TypingSpeedAcademy is an online platform dedicated to helping users improve their typing speed and accuracy through a variety of exercises, courses, and challenges.</p>
          </div>
          <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-medium text-slate-700 mb-3">How do I improve my typing speed?</h3>
            <p className="text-slate-600 text-base">Consistent practice is key! Utilize our targeted exercises, focus on accuracy first, then speed. Our platform provides detailed feedback to help you identify areas for improvement.</p>
          </div>
          <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-medium text-slate-700 mb-3">Are there any free courses or trials?</h3>
            <p className="text-slate-600 text-base">Yes! We offer a range of free exercises and a basic trial to get you started. Premium features and advanced courses are available with a subscription.</p>
          </div>
          <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-medium text-slate-700 mb-3">Can I track my progress?</h3>
            <p className="text-slate-600 text-base">Absolutely! TypingSpeedAcademy provides detailed analytics, including WPM (Words Per Minute), accuracy charts, and progress over time, so you can see how you're improving.</p>
          </div>
          <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-medium text-slate-700 mb-3">Is there a competitive aspect?</h3>
            <p className="text-slate-600 text-base">Yes, you can compete with other users on our global leaderboards. Challenge yourself and see how you rank against typists from around the world!</p>
          </div>
        </div>
        <p className="text-center text-slate-500 mt-10 text-base">More questions? <Link href="/contact" className="text-sky-600 hover:underline">Contact us</Link>.</p>
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