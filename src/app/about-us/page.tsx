// src/app/about-us/page.tsx
import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="container mx-auto px-6 py-12 min-h-screen bg-off-white text-dark-blue">
      <h1 className="header-main mb-8 text-center">About TypingSpeedAcademy</h1>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Welcome to TypingSpeedAcademy! Our mission is to provide a comprehensive and engaging platform for individuals of all skill levels to improve their typing speed and accuracy. We believe that proficient typing is a crucial skill in today's digital world, enhancing productivity and communication for students, professionals, and casual users alike.
        </p>
        <h2 className="header-sub mb-4">Our Vision</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          We envision a world where everyone can type effortlessly and efficiently. TypingSpeedAcademy aims to be the go-to resource for typing education, offering innovative tools, personalized feedback, and a supportive community to help users achieve their typing goals.
        </p>
        <h2 className="header-sub mb-4">What We Offer</h2>
        <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 leading-relaxed mb-6">
          <li>
            <span className="font-semibold text-primary-blue">Interactive Lessons:</span> Our curriculum is designed to take you from beginner to expert with structured lessons, engaging exercises, and real-world typing scenarios.
          </li>
          <li>
            <span className="font-semibold text-primary-blue">Personalized Practice:</span> Tailor your practice sessions with various modes, including timed tests, specific key drills, and custom text challenges.
          </li>
          <li>
            <span className="font-semibold text-primary-blue">Progress Tracking:</span> Monitor your improvement with detailed statistics on your words per minute (WPM), accuracy, and error patterns.
          </li>
          <li>
            <span className="font-semibold text-primary-blue">Gamified Learning:</span> Earn badges, compete on leaderboards, and stay motivated with our fun and interactive approach to learning.
          </li>
          <li>
            <span className="font-semibold text-primary-blue">Supportive Community:</span> Connect with fellow learners, share tips, and celebrate milestones in our community forums.
          </li>
        </ul>
        <h2 className="header-sub mb-4">Our Team</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          TypingSpeedAcademy was founded by a passionate team of educators, developers, and designers dedicated to creating the best possible typing tutor experience. We are constantly working to improve our platform and add new features based on user feedback and the latest educational research.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Thank you for choosing TypingSpeedAcademy. We're excited to help you on your journey to becoming a typing pro!
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;