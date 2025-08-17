import { FaSearch, FaHandHoldingUsd, FaKey, FaUserCheck, FaSmile } from "react-icons/fa";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch className="text-4xl text-gray-100" />,
      title: "Browse Properties",
      description: "Search from thousands of verified listings and explore detailed property information with high-resolution photos and virtual tours.",
    },
    {
      icon: <FaUserCheck className="text-4xl text-gray-100" />,
      title: "Verify Your Profile",
      description: "Create and verify your profile in a few simple steps. This allows you to securely make offers and manage your property wishlist.",
    },
    {
      icon: <FaHandHoldingUsd className="text-4xl text-gray-100" />,
      title: "Make an Offer",
      description: "Submit an offer directly to the property agent or owner. Our platform ensures all your proposals are sent and received securely.",
    },
    {
      icon: <FaKey className="text-4xl text-gray-100" />,
      title: "Get Approved",
      description: "Once your offer is accepted, our system will immediately update your status. You will receive all necessary documents and payment instructions.",
    },
    {
      icon: <FaSmile className="text-4xl text-gray-100" />,
      title: "Own Your Dream Property",
      description: "Complete your payment through our secure escrow service. Once finalized, you'll receive official property ownership documents and keys.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className=" py-10">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-0">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-800 text-center">
            Our Simple, Transparent Process
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've streamlined the entire process to make finding and owning your dream property effortless.
          </p>
        </div>

        <motion.div
          className="relative md:before:absolute md:before:left-1/2 md:before:-translate-x-1/2 md:before:w-1  md:before:h-full md:before:-top-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className={`flex flex-col items-center md:items-start w-full my-8 ${
                idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              variants={itemVariants}
            >
              {/* Center Circle with Icon for mobile & desktop */}
              <div className="flex-shrink-0 w-24 h-24 rounded-full bg-indigo-500 text-white flex items-center justify-center relative z-10 shadow-xl mb-4 md:mb-0">
                {/* <span className="absolute top-0 right-0 text-2xl font-bold bg-blue-300 rounded-full p-5">{idx + 1}</span> */}
                <span className="absolute inset-0 flex items-center justify-center transform scale-75 md:scale-100">
                  {step.icon}
                </span>
              </div>

              {/* Content Box */}
              <div className={`text-center md:text-left p-6 rounded-xl shadow-lg bg-white w-full md:w-1/2 transition-all duration-300 hover:shadow-2xl ${
                idx % 2 === 0 ? "md:ml-12" : "md:mr-12"
              }`}>
                <h4 className="text-2xl font-bold text-gray-800 mb-2">
                  {step.title}
                </h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;