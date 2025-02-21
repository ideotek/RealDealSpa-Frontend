import React from 'react'

const Aboutus = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">FINALLY, AFFORDABLE</h1>
          <h2 className="text-3xl font-semibold">WELLNESS FOR EVERYONE</h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* History Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <p className="text-lg text-gray-700 mb-8">
            Real Deal has been in operation since 2004 as a veteran-owned, family-run brand built on the core values of faith, family, health, excellence, and generosity.
          </p>

          {/* Owners Section */}
          <div className="bg-white rounded shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-semibold mb-4">Meet Our Owners</h3>
            <p className="text-gray-700 mb-6">
              Owners JD (53) and Rachel (51) have positively impacted thousands of lives through every company and organization they have been a part of:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Real Deal Sleep, their trusted mattress store</li>
              <li>Real Deal Beasts, their fitness accountability group</li>
              <li>Real Deal Talk, their engaging podcast</li>
            </ul>
          </div>

          {/* Mission Section */}
          <div className="prose lg:prose-xl">
            <p className="text-gray-700 mb-8">
              They've integrated recovery and healing into their daily lives for the last 10 years and although it's worth every penny, they found it to be unaﬀordable for most people. That means that the majority of our population have been priced out and lack access to these amazing, age-defying, holistic, natural means of wellness.
            </p>
          </div>
        </div>

        {/* Highlight Box */}
        <div className="bg-blue-100 rounded-xl p-8 text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            WE ARE THE FIRST WELLNESS CENTER IN HISTORY
          </h2>
          <p className="text-xl text-blue-800">
            to offer unlimited access to all of our services for only $99 a month and if you're new here, then your first session is always free!
          </p>
        </div>

        {/* Closing Statement */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 italic">
            Welcome to the only Real Deal in the wellness industry and welcome to our mission of creating a health and wellness movement by making it affordable and accessible to everyone.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Aboutus
