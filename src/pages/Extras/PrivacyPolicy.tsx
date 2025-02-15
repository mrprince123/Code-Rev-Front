import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="flex justify-center items-center min-h-screen px-4 mt-20 mb-20">
      <div className=" max-w-3xl w-full rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Privacy Policy
        </h1>

        <p className="mb-6 text-center">Last updated: Feburary 12, 2025</p>

        <p className="text-gray-600 text-lg mb-6">
          At <strong>Code Rev.</strong>, your privacy is our priority. This
          Privacy Policy explains how we collect, use, store, and protect your
          personal information when you interact with our platform.
        </p>

        {/* Information We Collect */}
        <h2 className="text-2xl font-bold text-gray-700 mb-3">
          1. Information We Collect
        </h2>
        <p className="text-gray-600 mb-4">
          When using Code Rev., we may collect the following information:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>
            Personal details such as name, email address, and contact
            information.
          </li>
          <li>
            Code snippets, comments, and other content you upload to our
            platform.
          </li>
          <li>
            Usage data, including login history, interactions, and preferences.
          </li>
          <li>
            Technical details such as IP address, browser type, and device
            information.
          </li>
        </ul>

        {/* How We Use Your Information */}
        <h2 className="text-2xl font-bold text-gray-700 mb-3">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-600 mb-4">
          We use your personal data for the following purposes:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>To provide and improve our code-sharing services.</li>
          <li>To personalize your experience on the platform.</li>
          <li>
            To enhance security and prevent unauthorized access or fraudulent
            activity.
          </li>
          <li>
            To communicate important updates, news, or changes to our services.
          </li>
        </ul>

        {/* Data Security */}
        <h2 className="text-2xl font-bold text-gray-700 mb-3">
          3. Data Security
        </h2>
        <p className="text-gray-600 mb-6">
          We implement industry-standard security measures, including encryption
          and secure servers, to protect your data from unauthorized access or
          breaches. However, no online service is completely secure. We
          encourage users to create strong passwords and be cautious when
          sharing sensitive information.
        </p>

        {/* Cookies & Tracking */}
        <h2 className="text-2xl font-bold text-gray-700 mb-3">
          4. Cookies & Tracking Technologies
        </h2>
        <p className="text-gray-600 mb-4">
          Code Rev. uses cookies and tracking technologies to improve your
          experience. These help us:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>Remember your preferences and settings.</li>
          <li>Analyze site traffic and usage patterns.</li>
          <li>Provide personalized recommendations.</li>
        </ul>
        <p className="text-gray-600 mb-6">
          You can manage or disable cookies through your browser settings.
        </p>

        {/* Third-Party Links */}
        <h2 className="text-2xl font-bold text-gray-700 mb-3">
          5. Third-Party Services & External Links
        </h2>
        <p className="text-gray-600 mb-6">
          Our platform may contain links to external websites or third-party
          services. We are not responsible for their privacy policies or data
          protection practices. We recommend reviewing their policies before
          sharing personal data.
        </p>

        {/* User Rights */}
        <h2 className="text-2xl font-bold text-gray-700 mb-3">
          6. Your Rights & Control Over Your Data
        </h2>
        <p className="text-gray-600 mb-4">You have the right to:</p>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>Request access to your personal information.</li>
          <li>Modify or update inaccurate data.</li>
          <li>Request deletion of your account and associated data.</li>
          <li>Opt out of promotional emails or notifications.</li>
        </ul>
        <p className="text-gray-600 mb-6">
          To exercise any of these rights, please contact us at{" "}
          <strong className="text-blue-500">support@coderev.com</strong>.
        </p>

        {/* Policy Updates */}
        <h2 className="text-2xl font-bold text-gray-700 mb-3">
          7. Policy Updates & Changes
        </h2>
        <p className="text-gray-600 mb-6">
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or legal requirements. Any updates will be posted on
          this page, and we encourage users to review it periodically.
        </p>

        {/* Contact Us */}
        <h2 className="text-2xl font-bold text-gray-700 mb-3">8. Contact Us</h2>
        <p className="text-gray-600 mb-6">
          If you have any questions or concerns regarding our Privacy Policy,
          please reach out to us at:
        </p>
        <p className="text-gray-700 font-semibold text-lg mb-2">
          📧 Email: <span className="text-blue-500">support@coderev.com</span>
        </p>

        {/* Last Updated */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Last updated: [Insert Date]
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
