import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";
import { FaSearch } from "react-icons/fa";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const { data: properties = [], isLoading, refetch } = useQuery({
    queryKey: ["all-verified-properties", searchQuery,sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get(
          `/properties?verified=verified&location=${searchQuery}&sort=${sortOrder}`
      );
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setSearchQuery(searchTerm);
    refetch() // Triggers the query
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    
  };

  // console.log('sorted data',sortOrder);
  
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <title>All-Properties</title>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">All Verified Properties</h2>

        {/* 🔍 Search Bar */}
        <form onSubmit={handleSearch} className="mb-6 max-w-md mx-auto flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by location..."
            className="input input-bordered w-full rounded-l-md"
          />
          <button
            type="submit"
            className="btn btn-primary rounded-l-none"
            title="Search"
          >
            <FaSearch />
          </button>
        </form>
         <select
            onChange={handleSortChange}
            value={sortOrder}
            className="select select-bordered w-48 my-5"
          >
            <option value="">Sort by Price</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>

        {properties.length === 0 ? (
          <p className="text-center text-gray-500 mt-5">No Verified Property Available.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-xl shadow-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-semibold">{property.title}</h3>
                  <p className="text-gray-600 text-sm">Location 📍- {property.location}</p>

                  <div className="flex items-center gap-3 mt-2">
                    {/* <img
                      src={property.agentImage}
                      alt={property.agentName}
                      className="w-8 h-8 rounded-full border"
                    /> */}
                    {/* <span className="text-sm font-medium">{property.agentName}</span> */}
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
        )}
      </div>
    </div>
  );
};

export default AllProperties;
