import { FaShieldAlt, FaRegSmile, FaClock, FaTags, FaHome, FaHandshake } from "react-icons/fa";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const highlights = [
    {
      icon: <FaShieldAlt className="text-3xl text-blue-600" />,
      title: "Trusted & Verified Listings",
      desc: "All properties are manually verified by our admin team to ensure safety and transparency.",
    },
    {
      icon: <FaRegSmile className="text-3xl text-green-500" />,
      title: "User Friendly Experience",
      desc: "From browsing to buying, we provide a seamless and intuitive platform for every user.",
    },
    {
      icon: <FaClock className="text-3xl text-purple-600" />,
      title: "Fast Offer Response",
      desc: "Agents respond quickly to property offers. No more waiting endlessly!",
    },
    {
      icon: <FaTags className="text-3xl text-yellow-500" />,
      title: "Best Price Guarantee",
      desc: "Find competitive property prices in your location with flexible offer options.",
    },
    {
      icon: <FaHome className="text-3xl text-red-500" />,
      title: "Diverse Property Options",
      desc: "From apartments to villas, explore a wide range of properties that fit every need.",
    },
    {
      icon: <FaHandshake className="text-3xl text-pink-500" />,
      title: "Transparent Deals",
      desc: "Clear communication, honest pricing, and smooth transactions with trusted agents.",
    },
  ];

  return (
    <section className=" py-10 pt-0 px-4 lg:px-0">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-800 text-center">
          🌟 Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-sm  hover:shadow-indigo-200 transition-all duration-300 group"
            >
              {/* Icon with continuous bounce */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
                className="flex justify-center items-center w-14 h-14 mx-auto mb-4 rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition"
              >
                {item.icon}
              </motion.div>
              <h4 className="text-lg font-semibold text-center group-hover:text-indigo-600 transition mb-2">
                {item.title}
              </h4>
              <p className="text-gray-600 text-sm text-center">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
