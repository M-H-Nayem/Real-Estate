import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AdvertisementSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data: advertised = [] } = useQuery({
    queryKey: ["advertised-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertised-properties");
      return res.data;
    },
  });

//   if (advertised.length === 0)
//     { return  (
//   <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-4 rounded-md shadow-md max-w-5xl mx-auto my-8">
//     <h2 className="text-xl font-semibold mb-1">🚧 No Advertised Properties Available</h2>
//     <p className="text-sm">
//       Please check back later — exciting properties might be advertised soon!
//     </p>
//   </div>
// );;} // Don’t render if no data

  return (
    <div className="max-w-[1400px] mx-auto px-3 lg:px-0  py-10">
      <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-800 text-center">
    
        🔥 Featured  Properties
        </h2>
    

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {advertised.map((property) => (
          <div
            key={property._id}
            className="bg-white shadow-md hover:shadow-xl rounded-xl overflow-hidden transition-all duration-300"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-gray-600">Location - {property.location}</p>
              <p className="text-sm">
                Price: ${property.minPrice} - ${property.maxPrice}
              </p>
              {/* <div className="flex items-center gap-2 mt-2">
                <img
                  src={property.agentImage}
                  alt={property.agentName}
                  className="w-8 h-8 rounded-full border"
                />
                <span className="text-sm font-medium">{property.agentName}</span>
              </div> */}

              <Link to={`/property/${property._id}`}>
                <button className="btn btn-primary btn-sm w-full mt-3">
                  View more Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvertisementSection;
