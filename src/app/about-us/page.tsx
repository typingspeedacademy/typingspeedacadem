// src/app/about-us/page.tsx
import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">
      <h1 className="text-4xl sm:text-5xl font-semibold text-center text-slate-800 mb-12">
        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-500">TypingSpeedAcademy</span>
      </h1>
      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-xl border border-sky-200">
        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          Welcome to TypingSpeedAcademy! Our mission is to provide a comprehensive and engaging platform for individuals of all skill levels to improve their typing speed and accuracy. We believe that proficient typing is a crucial skill in today's digital world, enhancing productivity and communication for students, professionals, and casual users alike.
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-700 mb-4 mt-8">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-500">Vision</span>
        </h2>
        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          We envision a world where everyone can type effortlessly and efficiently. TypingSpeedAcademy aims to be the go-to resource for typing education, offering innovative tools, personalized feedback, and a supportive community to help users achieve their typing goals.
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-700 mb-4 mt-8">
          What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-500">Offer</span>
        </h2>
        <ul className="list-disc list-inside space-y-4 text-lg text-slate-700 leading-relaxed mb-6">
          <li>
            <span className="font-semibold text-sky-600">Interactive Lessons:</span> Our curriculum is designed to take you from beginner to expert with structured lessons, engaging exercises, and real-world typing scenarios.
          </li>
          <li>
            <span className="font-semibold text-sky-600">Personalized Practice:</span> Tailor your practice sessions with various modes, including timed tests, specific key drills, and custom text challenges.
          </li>
          <li>
            <span className="font-semibold text-sky-600">Progress Tracking:</span> Monitor your improvement with detailed statistics on your words per minute (WPM), accuracy, and error patterns.
          </li>
          <li>
            <span className="font-semibold text-sky-600">Gamified Learning:</span> Earn badges, compete on leaderboards, and stay motivated with our fun and interactive approach to learning.
          </li>
          <li>
            <span className="font-semibold text-sky-600">Supportive Community:</span> Connect with fellow learners, share tips, and celebrate milestones in our community forums.
          </li>
        </ul>
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-700 mb-4 mt-8">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-500">Team</span>
        </h2>
        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          TypingSpeedAcademy was founded by a passionate team of educators, developers, and designers dedicated to creating the best possible typing tutor experience. We are constantly working to improve our platform and add new features based on user feedback and the latest educational research.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed">
          Thank you for choosing TypingSpeedAcademy. We're excited to help you on your journey to becoming a typing pro!
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;