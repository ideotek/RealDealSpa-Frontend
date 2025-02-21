import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const faqs = [
    {
      question: 'What is Cryotherapy and how does it work?',
      answer: 'Cryotherapy is a cold therapy treatment that exposes your body to extremely cold temperatures (-130°C to -170°C) for 2-3 minutes. It helps reduce inflammation, relieve muscle pain, improve recovery time, and boost metabolism.'
    },
    {
      question: 'What should I expect during my first Halotherapy (Salt Therapy) session?',
      answer: 'During a 30-minute halotherapy session, you will relax in our salt room while breathing in microscopic salt particles. The room maintains a comfortable temperature, and you will remain fully clothed. The therapy may help with respiratory issues, skin conditions, and overall wellness.'
    },
    {
      question: 'How often should I do Red Light Therapy sessions?',
      answer: 'For optimal results, we recommend 3-5 sessions per week, each lasting 10-15 minutes. Results are cumulative, and many clients notice improvements in skin health, muscle recovery, and joint pain after 8-12 weeks of consistent treatment.'
    },
    {
      question: 'Are there any contraindications for these treatments?',
      answer: 'Yes, certain conditions may prevent you from receiving specific treatments. For example, cryotherapy isnt recommended for those with severe hypertension or heart conditions. We conduct a thorough health screening before your first session.'
    },
    {
      question: 'How should I prepare for my wellness treatment?',
      answer: 'Arrive 10-15 minutes before your appointment. Wear comfortable, clean clothing. Avoid heavy meals and alcohol before treatments. For cryotherapy, ensure your skin is completely dry and free from lotions or oils.'
    },
    {
      question: 'Can I combine different wellness treatments?',
      answer: 'Yes, many of our treatments complement each other. We can help create a personalized wellness plan combining various therapies for optimal results. Popular combinations include cryotherapy followed by red light therapy.'
    },
    {
      question: 'How soon will I see results?',
      answer: 'Results vary by individual and treatment type. Some clients experience immediate benefits after a single session, while others may need multiple sessions for optimal results. We recommend a consistent treatment schedule for best outcomes.'
    },
    {
      question: 'What are your safety protocols?',
      answer: 'All our treatments are supervised by trained professionals. We maintain strict sanitization procedures, regularly service our equipment, and follow industry-standard safety protocols. Your safety is our top priority.'
    },
    {
      question: 'Do you offer treatment packages?',
      answer: 'Yes, we offer various package options that provide cost savings for multiple sessions. We also have membership plans for regular clients. Ask our staff about current promotions and packages.'
    },
    {
      question: 'What if I need to cancel my appointment?',
      answer: 'We require 24-hour notice for cancellations. Late cancellations or no-shows may result in a cancellation fee. You can reschedule through our booking system or by calling us directly.'
    }
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
            className="border rounded shadow-sm p-4"
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
        <p className="text-gray-600">Didn't find what you're looking for? <span className="text-red-500 font-medium hover:underline"><Link to="/contactus">Contact us</Link></span></p>
      </div>
    </div>
  );
};

export default FAQ;
