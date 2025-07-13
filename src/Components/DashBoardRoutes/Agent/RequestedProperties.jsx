import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const RequestedProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: offers = [], refetch } = useQuery({
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Requested / Offered Properties
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full shadow-md bg-white">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Location</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Offer Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id}>
                <td>
                  <img
                    src={offer?.propertyImage}
                    alt={offer?.title}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td>{offer.title}</td>
                <td>{offer.location}</td>
                <td>{offer.buyerName}</td>
                <td>{offer.buyerEmail}</td>
                <td>${offer.offerAmount}</td>
                <td>
                  <span
                    className={`badge font-semibold py-4 ${
                      offer.status === "pending"
                        ? "badge-warning"
                        : offer.status === "accepted"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {offer.status}
                  </span>
                </td>
                <td className="space-x-2">
                  {offer.status === "pending" ? (
                    <>
                      <button
                        onClick={() =>
                          handleDecision(
                            offer._id,
                            offer.propertyId,
                            "accepted"
                          )
                        }
                        className="btn btn-sm btn-success"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleDecision(
                            offer._id,
                            offer.propertyId,
                            "rejected"
                          )
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
                      }  ${
                        offer.status === "rejected" && "btn btn-sm btn-error"
                      }`}
                    >
                      {offer.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {offers.length === 0 && (
          <p className="text-center mt-6 text-gray-500">
            No offers available for your properties.
          </p>
        )}
      </div>
    </div>
  );
};

export default RequestedProperties;
