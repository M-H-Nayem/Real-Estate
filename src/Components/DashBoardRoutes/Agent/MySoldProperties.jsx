import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const MySoldProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch all sold properties (status: 'bought') for this agent
  const { data: soldProperties = [], isLoading } = useQuery({
    queryKey: ["mySoldProperties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/offers/sold?agentEmail=${user?.email}`
      );
      return res.data;
    },
  });

  const totalAmount = soldProperties.reduce(
    (sum, property) => sum + (property.offerAmount || 0),
    0
  );

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Sold Properties</h2>
       <div className="text-right text-lg font-semibold mb-4 text-green-700">
        Total Sold Amount: ${totalAmount}
      </div>

      {soldProperties.length===0?
          <p className="text-center text-gray-500 mt-5">No property sold yet.</p>
      :
      <div className="overflow-x-auto">
        <table className="table w-full bg-white shadow-md">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Location</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Sold Price</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {soldProperties.map((property) => (
              <tr key={property._id}>
                <td>
                  <img
                    src={property?.propertyImage}
                    alt={property?.title}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td>{property.title}</td>
                <td>{property.location}</td>
                <td>{property.buyerName}</td>
                <td>{property.buyerEmail}</td>
                <td>${property.offerAmount}</td>
                <td>{property.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {soldProperties.length === 0 && (
          <p className="text-center text-gray-500 mt-5">No sold properties yet.</p>
        )}
      </div>
      }
    </div>
  );
};

export default MySoldProperties;
