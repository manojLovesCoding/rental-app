import { useState } from "react";

function FAQsAccordion() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to settings and click on 'Change Password'."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept credit/debit cards, UPI, and net banking."
    },
    {
      question: "How can I contact support?",
      answer: "You can contact us via the contact form or live chat."
    }
  ];

  return (
    <div>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <button
            onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
            className="text-left w-full p-2 text-blue-600 font-semibold bg-gray-200 rounded-md"
          >
            {faq.question}
          </button>
          {openFAQ === index && (
            <div className="p-2 mt-2 text-gray-700 bg-gray-100 rounded-md">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FAQsAccordion;
