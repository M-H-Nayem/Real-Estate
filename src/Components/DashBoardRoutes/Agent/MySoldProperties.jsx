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

  if (isLoading) return <Loading />;

  return (
    <div className="sm:p-6 lg:p-8">
      <title>My Sold Properties</title>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">My Sold Properties</h2>
        <div className="text-base sm:text-lg font-semibold mt-2 sm:mt-0 text-green-700">
          Total Sold Amount: ${totalAmount}
        </div>
      </div>

      {soldProperties.length === 0 ? (
        <p className="text-center text-gray-500 mt-5">No property sold yet.</p>
      ) : (
        <>
          {/* Card View for Mobile and Tablet (sm to md) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 lg:hidden">
            {soldProperties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={property?.propertyImage}
                  alt={property?.title}
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">Location:</span> {property.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">Buyer:</span> {property.buyerName} ({property.buyerEmail})
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">Sold Price:</span>{" "}
                    <span className="text-green-600 font-bold">${property.offerAmount}</span>
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    <span className="font-medium text-gray-700">Trans. ID:</span> {property.transactionId}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Table View for Large Devices (lg and above) */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="table w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200 text-gray-800">
                <tr>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-left">Buyer Name</th>
                  <th className="py-3 px-4 text-left">Buyer Email</th>
                  <th className="py-3 px-4 text-left">Sold Price</th>
                  <th className="py-3 px-4 text-left">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {soldProperties.map((property) => (
                  <tr key={property._id} className="border-b border-gray-200">
                    <td className="py-2 px-4">
                      <img
                        src={property?.propertyImage}
                        alt={property?.title}
                        className="w-20 h-14 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 px-4">{property.title}</td>
                    <td className="py-2 px-4">{property.location}</td>
                    <td className="py-2 px-4">{property.buyerName}</td>
                    <td className="py-2 px-4">{property.buyerEmail}</td>
                    <td className="py-2 px-4">${property.offerAmount}</td>
                    <td className="py-2 px-4">{property.transactionId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MySoldProperties;
