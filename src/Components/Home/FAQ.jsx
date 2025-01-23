import React, { useState } from 'react';

const FAQ = () => {
  const faqs = [
    { question: 'How do I book an appointment with a nurse?', answer: 'You can book an appointment online or via our app with just a few clicks.' },
    { question: 'What types of nursing services are offered?', answer: 'We offer home care, post-surgical care, and chronic illness support.' },
    { question: 'What are the payment options?', answer: 'We accept credit cards, insurance, and other common payment methods.' },
    { question: 'Is my personal health information safe?', answer: 'Yes, we follow strict confidentiality protocols to protect your data.' },
    { question: 'What if I have a medical emergency?', answer: 'In case of emergencies, please contact your local emergency services immediately.' },
    { question: 'How long do appointments typically last?', answer: 'Appointments usually last between 30 minutes to 1 hour, depending on the service.' },
    { question: 'Are services available on holidays?', answer: 'Yes, we provide services 24/7, including holidays.' },
    { question: 'How do I get a prescription if needed?', answer: 'Our nurses can guide you to a licensed physician for prescriptions.' },
    { question: 'Do you offer support for non-English speakers?', answer: 'Yes, we have multilingual support available.' },
    { question: 'What if I’m late for my appointment?', answer: 'If you are late, please notify us as soon as possible to reschedule.' },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Frequently Asked Questions</h2>
      <p className="text-center text-gray-600 mb-8">We have put together some commonly asked questions</p>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-sm p-4"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-medium">{faq.question}</h3>
              <button
                className={`transform transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <p className="text-gray-600">Didn’t find what you’re looking for? <a href="#" className="text-red-500 font-medium hover:underline">Contact us</a></p>
      </div>
    </div>
  );
};

export default FAQ;
