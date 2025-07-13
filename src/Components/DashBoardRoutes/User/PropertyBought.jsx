import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaCreditCard } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";

const PropertyBought = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: offers = [], isLoading ,refetch } = useQuery({
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
        const res = await axiosSecure.delete(`/offers/${id}`); // use axiosSecure if needed
        if (res.data.success) {
          Swal.fire("Deleted!", "Your offer has been deleted.", "success");
          refetch()
          // Optionally refetch or update state
        } else {
          Swal.fire("Error!", res.data.message || "Something went wrong.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", error.message || "Failed to delete the offer.", "error");
      }
    }
  });
};


  if (isLoading) return <><Loading></Loading></>;

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">My Property Offers</h2>

      {offers.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t made any offers yet.</p>
      ) : (
        <table className="table w-full bg-white shadow-md">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Location</th>
              <th>Agent</th>
              <th>Offered Amount</th>
              <th>Status</th>
              <th>Transaction ID</th>
              <th>Action</th>
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
                <td>{offer?.title}</td>
                <td>{offer?.location}</td>
                <td>{offer?.agentName}</td>
                <td>${offer?.offerAmount}</td>
                <td>
                  <span
                    className={`px-2 py-1 text-sm rounded ${
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
                <td>
                  {offer.transactionId ? (
                    <span className="text-sm text-green-700">{offer.transactionId}</span>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="flex gap-2 items-center">
                  {/* {offer.status === "pending" && (
                    <span className="text-sm text-yellow-600 font-medium">Wait</span>
                  )} */}
                  {offer.status === "accepted" && !offer.transactionId && (
                    <Link
                      to={`/dashboard/payment/${offer._id}`}
                      className="btn btn-primary flex items-center gap-2"
                    >
                      <FaCreditCard /> Pay
                    </Link>
                  )}
                  {offer.status === "bought" && (
                    <span className="text-sm text-green-700 font-medium bg-green-300 py-3 px-5 rounded-xl">Paid</span>
                  )}
                  {!offer.transactionId && <button onClick={()=>handleDeleteOffer(offer._id)} className="btn px-2 py-1 rounded font-semibold  bg-red-200 text-red-700">Delete</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PropertyBought;
