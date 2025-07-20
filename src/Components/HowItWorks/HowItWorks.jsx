import { FaSearch, FaHandHoldingUsd, FaKey, FaUserCheck, FaSmile } from "react-icons/fa";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch className="text-4xl text-indigo-500" />,
      title: "Browse Properties",
      description: "Search from verified listings and explore detailed property information.",
    },
    {
      icon: <FaUserCheck className="text-4xl text-green-500" />,
      title: "Verify Profile",
      description: "Sign in or register to make offers and manage your property wishlist securely.",
    },
    {
      icon: <FaHandHoldingUsd className="text-4xl text-yellow-500" />,
      title: "Make an Offer",
      description: "Submit offers directly to property agents and wait for their response.",
    },
    {
      icon: <FaKey className="text-4xl text-purple-500" />,
      title: "Get Approved",
      description: "If accepted, your offer status is updated and payment becomes available.",
    },
    {
      icon: <FaSmile className="text-4xl text-pink-500" />,
      title: "Own Your Dream Property",
      description: "Complete your payment securely and receive official property ownership.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
          🚀 How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center "
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: idx * 0.2,
                }}
                className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-indigo-100"
              >
                {step.icon}
              </motion.div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">
                {step.title}
              </h4>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
