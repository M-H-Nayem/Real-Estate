import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router"; // Corrected import to react-router-dom for Link
import { FaCreditCard } from "react-icons/fa";
import Swal from "sweetalert2";

// Assuming a Loading component exists
const Loading = () => (
  <div className="flex justify-center items-center h-full min-h-[300px]">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

const PropertyBought = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch all property offers made by the user
  const { data: offers = [], isLoading, refetch } = useQuery({
    queryKey: ["offers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers?email=${user.email}`);
      return res.data;
    },
  });

  const handleDeleteOffer = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this offer? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/offers/${id}`);
          if (res.data.success) {
            Swal.fire("Deleted!", "Your offer has been deleted.", "success");
            refetch(); // Refresh the list after deletion
          } else {
            Swal.fire("Error!", res.data.message || "Something went wrong.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", error.message || "Failed to delete the offer.", "error");
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="sm:p-6 lg:p-8">
      <title>Property Bought</title>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800">
        My  Offered Property
      </h2>

      {offers.length === 0 ? (
        <p className="text-center text-gray-500 mt-5">You haven’t made any offers yet.</p>
      ) : (
        <>
          {/* Card View for Mobile and Tablet (up to md breakpoint) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
            {offers.map((offer) => (
              <div
                key={offer._id}
                className="bg-white rounded-lg shadow-md p-4 space-y-3 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={offer?.propertyImage}
                    alt={offer?.title}
                    className="w-20 h-14 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{offer?.title}</h3>
                    <p className="text-sm text-gray-500">{offer?.location}</p>
                  </div>
                </div>

                <div className="space-y-1 mt-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Agent:</span> {offer?.agentName}
                  </p>
                  <p className="text-sm font-bold text-green-700">
                    <span className="font-medium text-gray-700">Offered Amount:</span> ${offer?.offerAmount}
                  </p>
                </div>
                {offer.transactionId && (
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Transaction ID:</span> {offer.transactionId}
                  </p>
                )}
                <div className="flex justify-between items-center mt-2">
                  <span
                    className={`px-2 py-1 text-sm rounded capitalize font-semibold ${
                      offer.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : offer.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : offer.status === "bought"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {offer.status}
                  </span>
                  <div>
                    {offer.status === "accepted" && !offer.transactionId && (
                      <Link
                        to={`/dashboard/payment/${offer._id}`}
                        className="btn btn-sm btn-primary flex items-center gap-1"
                      >
                        <FaCreditCard /> Pay
                      </Link>
                    )}
                    {offer.status === "bought" && (
                      <span className="text-sm text-green-700 font-medium bg-green-300 py-1 px-2 rounded-xl">
                        Paid
                      </span>
                    )}
                    {!offer.transactionId && offer.status !== 'bought' && (
                      <button
                        onClick={() => handleDeleteOffer(offer._id)}
                        className="btn btn-sm bg-red-200 text-red-700 font-semibold ml-2"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
                
              </div>
            ))}
          </div>

          {/* Table View for Large Devices (lg breakpoint and above) */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="table w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200 text-gray-800">
                <tr>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-left">Agent</th>
                  <th className="py-3 px-4 text-left">Offered Amount</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Transaction ID</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer) => (
                  <tr key={offer._id} className="border-b border-gray-200">
                    <td className="py-2 px-4">
                      <img
                        src={offer?.propertyImage}
                        alt={offer?.title}
                        className="w-20 h-14 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 px-4">{offer?.title}</td>
                    <td className="py-2 px-4">{offer?.location}</td>
                    <td className="py-2 px-4">{offer?.agentName}</td>
                    <td className="py-2 px-4">${offer?.offerAmount}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 text-sm rounded capitalize font-semibold ${
                          offer.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : offer.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : offer.status === "bought"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {offer.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      {offer.transactionId ? (
                        <span className="text-sm text-green-700">{offer.transactionId}</span>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="py-2 px-4 flex gap-2 items-center">
                      {offer.status === "accepted" && !offer.transactionId && (
                        <Link
                          to={`/dashboard/payment/${offer._id}`}
                          className="btn btn-sm btn-primary flex items-center gap-1"
                        >
                          <FaCreditCard /> Pay
                        </Link>
                      )}
                      {offer.status === "bought" && (
                        <span className="text-sm text-green-700 font-medium bg-green-300 py-1 px-2 rounded-xl">
                          Paid
                        </span>
                      )}
                      {!offer.transactionId && offer.status !== 'bought' && (
                        <button
                          onClick={() => handleDeleteOffer(offer._id)}
                          className="btn btn-sm bg-red-200 text-red-700 font-semibold"
                        >
                          Delete
                        </button>
                      )}
                    </td>
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

export default PropertyBought;
