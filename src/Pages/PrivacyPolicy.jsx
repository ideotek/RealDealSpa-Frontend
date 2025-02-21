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
