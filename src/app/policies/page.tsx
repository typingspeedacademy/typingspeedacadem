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
          <h2 className="header-sub mb-3">Cookie Policy</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Effective Date: [Insert Date]
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            TypingSpeedAcademy ("us", "we", or "our") uses cookies on the typingspeed.academy website (the "Service"). By using the Service, you consent to the use of cookies.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Our Cookies Policy explains what cookies are, how we use cookies, how third-parties we may partner with may use cookies on the Service, your choices regarding cookies and further information about cookies.
          </p>
          <h3 className="text-xl font-semibold text-primary-blue mb-2">What Are Cookies</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
          </p>
          <h3 className="text-xl font-semibold text-primary-blue mb-2">How TypingSpeedAcademy Uses Cookies</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 leading-relaxed mb-4">
            <li>To enable certain functions of the Service</li>
            <li>To provide analytics</li>
            <li>To store your preferences</li>
            {/* <li>To enable advertisements delivery, including behavioral advertising.</li> */}
          </ul>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            We use both session and persistent cookies on the Service and we use different types of cookies to run the Service:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 leading-relaxed mb-4">
            <li><strong>Essential cookies.</strong> We may use essential cookies to authenticate users and prevent fraudulent use of user accounts.</li>
            <li><strong>Preferences cookies.</strong> We may use preferences cookies to remember information that changes the way the Service behaves or looks, such as the "remember me" functionality of a registered user or a user's language preference.</li>
            <li><strong>Analytics cookies.</strong> We may use analytics cookies to track information how the Service is used so that we can make improvements. We may also use analytics cookies to test new advertisements, pages, features or new functionality of the Service to see how our users react to them.</li>
          </ul>
          <h3 className="text-xl font-semibold text-primary-blue mb-2">Third-Party Cookies</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.
          </p>
          <h3 className="text-xl font-semibold text-primary-blue mb-2">What Are Your Choices Regarding Cookies</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
          </p>
        </section>

        <section>
          <h2 className="header-sub mb-3">Refund Policy</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Effective Date: [Insert Date]
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Thank you for choosing TypingSpeedAcademy for your typing skill development. We strive to provide the best learning experience possible. Please read our refund policy carefully.
          </p>
          <h3 className="text-xl font-semibold text-primary-blue mb-2">Paid Courses and Subscriptions</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            For our paid courses and subscription services, refunds may be considered under the following conditions:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 leading-relaxed mb-4">
            <li><strong>Technical Issues:</strong> If you experience persistent technical issues that prevent you from accessing or using the course content, and we are unable to resolve the issue within a reasonable timeframe (e.g., 7 business days), you may be eligible for a full or partial refund.</li>
            <li><strong>Course Not as Described:</strong> If the course content significantly differs from its description on our website, you may request a refund within [e.g., 7 days] of purchase.</li>
            <li><strong>Duplicate Purchase:</strong> If you accidentally purchased the same course or subscription multiple times, please contact us immediately for a refund of the duplicate transaction(s).</li>
          </ul>
          <h3 className="text-xl font-semibold text-primary-blue mb-2">Non-Refundable Circumstances</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Refunds will generally not be provided in the following circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 leading-relaxed mb-4">
            <li>Change of mind after purchase.</li>
            <li>Failure to use the course or service after purchase.</li>
            <li>Partial completion of a course (unless due to unresolved technical issues from our side).</li>
            <li>Promotional or discounted purchases, unless explicitly stated otherwise in the promotion terms.</li>
          </ul>
          <h3 className="text-xl font-semibold text-primary-blue mb-2">How to Request a Refund</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            To request a refund, please contact our support team at <a href="mailto:support@typingspeed.academy" className="text-accent-blue hover:underline">support@typingspeed.academy</a> with your purchase details and a clear explanation of your reason for the request. We aim to process refund requests within [e.g., 5-7 business days].
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            TypingSpeedAcademy reserves the right to modify this refund policy at any time. Any changes will be effective immediately upon posting the updated policy on our website.
          </p>
        </section>

        <section>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            If you have any questions about these Policies, please contact us at <a href="mailto:support@typingspeed.academy" className="text-accent-blue hover:underline">support@typingspeed.academy</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PoliciesPage;