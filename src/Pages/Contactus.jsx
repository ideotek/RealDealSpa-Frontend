import React from 'react'

const Contactus = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 uppercase">
            Contact Us
          </h1>
          
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or our practices, 
              please contact us at:
            </p>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Real Deal Wellness
              </h2>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="font-medium">Email:</span>
                <a href="mailto:info@m.realdealwellness.net" 
                   className="text-blue-600 hover:text-blue-800 transition-colors">
                  info@m.realdealwellness.net
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contactus
