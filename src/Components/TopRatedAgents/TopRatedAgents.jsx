import { motion } from "framer-motion";

const TopRatedAgents = () => {
  const topAgents = [
    {
      name: "MH Nayem",
      image: "https://i.ibb.co.com/x8Gw9rH8/download-9.png",
      propertiesSold: 12,
    },

    

    {
      name: "Sarah Hossain",
      image: "https://i.ibb.co.com/4ZL0wB3W/download-10.png",
      propertiesSold: 9,
    },
    {
      name: "Tanvir Rahman",
      image: "https://i.ibb.co/3QSZJVW/download-1.png",
      propertiesSold: 8,
    },
  ];

  return (
    <section className="pb-14 ">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-0 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-800">
          🌟 Top Rated Agents
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {topAgents.map((agent, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-white shadow-md hover:shadow-indigo-200 transition duration-300 border border-indigo-100 group"
            >
              <div className="relative w-24 h-24 mx-auto">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-24 h-24 rounded-full border-4 border-indigo-400 mx-auto shadow-md group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full ring-2 ring-white animate-ping" />
              </div>
              <h4 className="mt-5 text-xl font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">
                {agent.name}
              </h4>
              <p className="text-gray-500 mt-1 text-sm">
                {agent.propertiesSold} Properties Sold
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedAgents;
