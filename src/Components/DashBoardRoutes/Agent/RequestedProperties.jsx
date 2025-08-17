import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

// Assuming a Loading component exists
const Loading = () => (
  <div className="flex justify-center items-center h-full min-h-[300px]">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

const RequestedProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch all requested properties (status: 'pending') for this agent
  const { data: offers = [], refetch, isLoading } = useQuery({
    queryKey: ["requestedOffers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agent/offers?email=${user.email}`);
      return res.data;
    },
  });

  const handleDecision = async (id, propertyId, decision) => {
    try {
      const res = await axiosSecure.patch(`/agent/offers/${id}`, {
        decision,
        propertyId,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire(
          "Success!",
          `Offer has been ${
            decision === "accepted" ? "accepted" : "rejected"
          }.`,
          "success"
        );
        refetch();
      }
    } catch (err) {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };
  
  if (isLoading) return <Loading />;

  return (
    <div className=" sm:p-6 lg:p-8">
      <title>Requested Properties</title>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800">
        Requested Properties
      </h2>

      {offers.length === 0 ? (
        <p className="text-center text-gray-500 mt-5">No property is Requested.</p>
      ) : (
        <>
          {/* Card View for Mobile and Tablet (up to lg breakpoint) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 lg:hidden">
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
                    <h3 className="text-lg font-semibold text-gray-800">{offer.title}</h3>
                    <p className="text-sm text-gray-500">{offer.location}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Buyer:</span> {offer.buyerName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Buyer Email:</span> {offer.buyerEmail}
                  </p>
                  <p className="text-sm font-bold text-green-700">
                    <span className="font-medium text-gray-700">Offer Amount:</span> ${offer.offerAmount}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`badge font-semibold capitalize py-4 ${
                      offer.status === "pending"
                        ? "badge-warning"
                        : offer.status === "accepted"
                        ? "badge-success"
                        : offer.status === "bought"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {offer.status}
                  </span>
                  <div className="space-x-2">
                    {offer.status === "pending" ? (
                      <>
                        <button
                          onClick={() =>
                            handleDecision(offer._id, offer.propertyId, "accepted")
                          }
                          className="btn btn-sm btn-success"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleDecision(offer._id, offer.propertyId, "rejected")
                          }
                          className="btn btn-sm btn-error"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-sm capitalize text-gray-500">
                        {offer.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table View for Large Devices (lg breakpoint and above) */}
          {/* Added overflow-x-auto to prevent horizontal scrolling on small devices */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="table w-full shadow-md bg-white rounded-lg">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-left">Buyer Name</th>
                  <th className="py-3 px-4 text-left">Buyer Email</th>
                  <th className="py-3 px-4 text-left">Offer Amount</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Actions</th>
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
                    <td className="py-2 px-4">{offer.title}</td>
                    <td className="py-2 px-4">{offer.location}</td>
                    <td className="py-2 px-4">{offer.buyerName}</td>
                    <td className="py-2 px-4">{offer.buyerEmail}</td>
                    <td className="py-2 px-4">${offer.offerAmount}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`badge font-semibold capitalize py-4 ${
                          offer.status === "pending"
                            ? "badge-warning"
                            : offer.status === "accepted"
                            ? "badge-success"
                            : offer.status === "bought"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {offer.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 space-x-2">
                      {offer.status === "pending" ? (
                        <>
                          <button
                            onClick={() =>
                              handleDecision(offer._id, offer.propertyId, "accepted")
                            }
                            className="btn btn-sm btn-success"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              handleDecision(offer._id, offer.propertyId, "rejected")
                            }
                            className="btn btn-sm btn-error"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span
                          className={`text-sm capitalize ${
                            offer.status === "accepted" && "btn btn-sm btn-success"
                          } 
                        ${
                          offer.status === "rejected" && "btn btn-sm btn-error"
                        }
                        ${
                          offer.status === "bought" && "btn btn-sm btn-success"
                        }
                        `}
                        >
                          {offer.status}
                        </span>
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

export default RequestedProperties;
