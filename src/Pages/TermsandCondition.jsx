import { motion } from "framer-motion";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Real Deal Wellness!</h1>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
        </motion.div>

        {/* Membership Terms Section */}
        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">MEMBERSHIP TERMS AND CONDITIONS</h2>
          <div className="space-y-4 text-gray-600">
            <p>Our unlimited membership means you can come in every day and do multiple services if you want; however, only one of each service per day is permitted.</p>
            
            <p>We do not have any long term contracts so you can cancel or pause at any time. All we require is that you give us a 30 day notice. This means if your monthly membership is due to charge within 30 days of your pause or cancellation, it will still charge on that date but the following month will not.</p>
            
            <p className="bg-blue-50 p-4 rounded-md">Keep in mind, our $99/month is an introductory rate; however, you are locked in at that price for one year from the time you signed up, even if we have to raise it in the near future.</p>
            
            <p>If you cancel during your first year and want to come back later, it will be at whatever price we're charging at that time. If you pause your membership, then you will come back at $99 if/when you come back within a year of your original signup. We can pause your membership for 90 days at a time, twice per year.</p>
          </div>
        </motion.section>

        {/* Website Terms Section */}
        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">WEBSITE TERMS AND CONDITIONS</h2>
          <div className="space-y-6 text-gray-600">
            {/* Add other terms sections here with similar styling */}
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">Use of Website and Services</h3>
              <p className="mb-2"><span className="font-medium">License:</span> We grant you a limited, non-exclusive, revocable license to access and use our website and services for personal, non-commercial purposes.</p>
              
              <div className="ml-4">
                <h4 className="font-medium mb-2">Prohibited Activities:</h4>
                <ul className="list-disc ml-4 space-y-1">
                  <li>Violating any laws, regulations, or third-party rights</li>
                  <li>Interfering with or disrupting the integrity or performance of our website or services</li>
                  <li>Attempting to gain unauthorized access to our website or services</li>
                  <li>Using our website or services for any illegal or unauthorized purpose</li>
                </ul>
              </div>
            </div>
                      </div>
        </motion.section>
      </div>
    </div>
  );
};

export default TermsAndConditions;