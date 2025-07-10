import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";

const AllProperties = () => {
    let useAxios = useAxiosSecure()
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["all-verified-properties"],
    queryFn: async () => {
      const res = await useAxios.get("/properties?verified=verified"); // Backend route to get verified only
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Verified Properties</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-xl shadow-2xl overflow-hidden  hover:shadow-lg transition-all duration-300"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-gray-600 text-sm">📍 {property.location}</p>

              <div className="flex items-center gap-3 mt-2">
                <img
                  src={property.agentImage}
                  alt={property.agentName}
                  className="w-8 h-8 rounded-full border"
                />
                <span className="text-sm font-medium">{property.agentName}</span>
              </div>

              <div className="text-sm font-semibold">
                Price: ${property.minPrice} - ${property.maxPrice}
              </div>

              <span className="inline-block text-xs px-2 py-1 rounded bg-green-200 text-green-700 font-medium">
                ✅ Verified
              </span>

              <Link to={`/property/${property._id}`}>
                <button className="mt-3 btn btn-primary btn-sm w-full">Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AllProperties;
