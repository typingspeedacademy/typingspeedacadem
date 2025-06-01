// src/app/policies/page.tsx
import React from 'react';

const PoliciesPage = () => {
  return (
    <div className="container mx-auto px-6 py-12 min-h-screen bg-off-white text-dark-blue">
      <h1 className="header-main mb-8 text-center">Our Policies</h1>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-8">
        <section>
          <h2 className="header-sub mb-3">Privacy Policy</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            At TypingSpeedAcademy, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
          <h3 className="text-xl font-semibold text-primary-blue mb-2">Information We Collect</h3>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 leading-relaxed mb-4">
            <li><strong>Personal Information:</strong> Name, email address, and payment information (for paid courses) that you voluntarily provide to us when registering or making a purchase.</li>
            <li><strong>Usage Data:</strong> Information about your interaction with our platform, such as typing performance (WPM, accuracy), lesson progress, IP address, browser type, and operating system. This data is collected automatically.</li>
            <li><strong>Cookies:</strong> We use cookies to enhance your experience, remember your preferences, and analyze site traffic. You can control cookie settings through your browser.</li>
          </ul>
          <h3 className="text-xl font-semibold text-primary-blue mb-2">How We Use Your Information</h3>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 leading-relaxed mb-4">
            <li>To provide, operate, and maintain our services.</li>
            <li>To personalize your learning experience and track your progress.</li>
            <li>To process transactions and send you related information, including purchase confirmations and invoices.</li>
            <li>To communicate with you, including responding to your comments, questions, and requests, and providing customer service.</li>
            <li>To send you technical notices, updates, security alerts, and support and administrative messages.</li>
            <li>To monitor and analyze trends, usage, and activities in connection with our services.</li>
            <li>For compliance purposes, including enforcing our Terms of Service, or other legal rights, or as may be required by applicable laws and regulations or requested by any judicial process or governmental agency.</li>
          </ul>
          <h3 className="text-xl font-semibold text-primary-blue mb-2">Information Sharing</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential. We may also release information when it's release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property or safety.
          </p>
        </section>

        <section>
          <h2 className="header-sub mb-3">Terms of Service</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Please read these Terms of Service carefully before using TypingSpeedAcademy. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>
          <h3 className="text-xl font-semibold text-primary-blue mb-2">User Accounts</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
          </p>
          <h3 className="text-xl font-semibold text-primary-blue mb-2">Content</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
          </p>
          <h3 className="text-xl font-semibold text-primary-blue mb-2">Termination</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
        </section>

        <section>
          <h2 className="header-sub mb-3">Contact Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            If you have any questions about these Policies, please contact us at <a href="mailto:support@typingspeed.academy" className="text-accent-blue hover:underline">support@typingspeed.academy</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PoliciesPage;