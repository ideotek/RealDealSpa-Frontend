import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto bg-white p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Real Deal Wellness Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-8">Effective Date: Jan, 1, 2024</p>

        <div className="space-y-8">
          <section>
            <p className="text-gray-700 leading-relaxed mb-6">
              Welcome to Real Deal Wellness! This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website (realdealwellness.net) or use our services. Please read this Privacy Policy carefully. By accessing or using our website or services, you agree to the terms outlined in this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Personal Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  When you visit our website or use our services, we may collect personal information such as your name, email address, phone number, and any other information you provide voluntarily.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Usage Data</h3>
                <p className="text-gray-700 leading-relaxed">
                  We may also collect information about how you access and use our website or services. This may include your IP address, browser type, device information, pages visited, and other usage statistics.
                </p>
              </div>
            </div>
          </section>

          {/* Add similar sections for other policy content */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We retain your personal information for as long as your account is active or as needed to provide our services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you delete your account, we will retain your data for up to 30 days to allow for account recovery or to comply with legal obligations. After this period, your data will be permanently deleted or anonymized unless retention is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Deletion & Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to access, update, or delete your personal data at any time. You can request deletion in the following ways:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Account Deletion:</strong> You can delete your account and associated data within the app by navigating to your Profile and selecting "Terminate Account".
              </li>
              <li>
                <strong>Manual Request:</strong> You may request deletion by contacting us at <span className="font-medium text-gray-900">info@m.realdealwellness.net</span>.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Upon receiving a valid request, we will process and delete your personal data within 7–30 days, unless we are required to retain certain information for legal, security, or regulatory purposes.
            </p>
            <p className="text-gray-700 leading-relaxed">
              After deletion, your data will either be permanently removed or anonymized so that it can no longer be associated with you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or our practices, please contact us at:
            </p>
            <div className="mt-4">
              <p className="font-medium text-gray-900">Real Deal Wellness</p>
              <p className="text-gray-700">Email: info@m.realdealwellness.net</p>
            </div>
          </section>

          <footer className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Thank you for choosing Real Deal Wellness. Your privacy is important to us, and we are committed to protecting your personal information.
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
