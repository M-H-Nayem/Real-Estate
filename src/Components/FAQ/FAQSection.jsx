import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const FAQSection = () => {
  const faqs = [
    {
      question: "How can I make an offer on a property?",
      answer:
        "First, register or log in as a user. Visit the property details page and click the 'Make Offer' button. You’ll be able to set your offer amount and submit it for agent approval.",
    },
    {
      question: "What happens after my offer is accepted?",
      answer:
        "Once an agent accepts your offer, a 'Pay' button will appear on your dashboard under 'Property Bought'. Clicking it will allow you to pay securely through Stripe.",
    },
    {
      question: "Can I trust the listed properties?",
      answer:
        "Yes, all listed properties are verified by our admin team before appearing publicly to ensure authenticity and quality.",
    },
    {
      question: "Who can add properties?",
      answer:
        "Only users with the 'agent' role can add properties. Admins must verify the property before it becomes visible to everyone.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className=" py-10 px-4 lg:px-0">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-800 text-center"> Frequently Asked Questions ❓</h2>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 border-b border-gray-300 pb-3 transition-all duration-300"
          >
            <button
              className="flex justify-between items-center w-full text-left text-lg font-medium text-gray-800 hover:text-indigo-600"
              onClick={() => toggleIndex(index)}
            >
              <span>{faq.question}</span>
              <FaChevronDown
                className={`transform transition-transform duration-200 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {activeIndex === index && (
              <p className="mt-3 text-gray-600 text-sm transition-opacity duration-300">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
