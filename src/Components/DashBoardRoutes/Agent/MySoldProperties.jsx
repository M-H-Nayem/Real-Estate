import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";

const MySoldProperties = () => {
  const { user, loading } = useAuth();

  // ✅ Fetch sold properties for this agent
  const { data: soldProperties = [], isLoading } = useQuery({
    queryKey: ["soldProperties", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/sold-properties?agentEmail=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-20 font-semibold text-xl">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">My Sold Properties</h2>

      {soldProperties.length === 0 ? (
        <p className="text-gray-600">You have no sold properties yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th>#</th>
                <th>Property Title</th>
                <th>Location</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Sold Price</th>
              </tr>
            </thead>
            <tbody>
              {soldProperties?.map((property, index) => (
                <tr key={property._id}>
                  <td>{index + 1}</td>
                  <td>{property.title}</td>
                  <td>{property.location}</td>
                  <td>{property.buyerName}</td>
                  <td>{property.buyerEmail}</td>
                  <td>${property.offeredAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MySoldProperties;
