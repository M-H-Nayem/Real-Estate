import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaHandshake } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router"; // Corrected import from react-router to react-router-dom
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../Loading/Loading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Wishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: wishlist = [], refetch, isLoading } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
      return res.data;
    },
  });

  const handleRemove = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to remove this property from your wishlist?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!',
      });

      if (confirm.isConfirmed) {
        const res = await axiosSecure.delete(`/wishlist/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire('Removed!', 'Property removed from wishlist.', 'success');
          refetch(); // refetch wishlist
        } else {
          Swal.fire('Error', 'Property could not be removed.', 'error');
        }
      }
    } catch (error) {
      console.error('Remove Error:', error);
      Swal.fire('Error', 'Something went wrong while removing the property.', 'error');
    }
  };

  if (isLoading) return <div className="text-center py-20"><Loading /></div>;

  return (
    <div className=" sm:p-6 lg:p-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-gray-800 text-left">My Wishlist</h2>

      {wishlist?.length === 0 ? (
        <p className="text-center text-gray-500 mt-5">No properties in your wishlist.</p>
      ) : (
        <>
          {/* Desktop/Tablet View (hidden on small screens) */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="table w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-gray-200 text-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Image</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Location</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Agent</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Price Range</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((property) => (
                  <tr key={property._id} className="border-t border-gray-200">
                    <td className="p-4">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-20 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-4 font-medium">{property.title}</td>
                    <td className="p-4 text-gray-600">{property.location}</td>
                    <td className="p-4 text-gray-600">{property.agentName}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          property.status === "Available"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {property.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">${property.minPrice} - ${property.maxPrice}</td>
                    <td className="">
                      <Link
                        to={`/dashboard/make-offer/${property.propertyId}`}
                        className="flex items-center justify-center px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors text-sm mb-3"
                      >
                        <FaHandshake className="mr-2" />
                        Make an Offer
                      </Link>
                      <button
                        onClick={() => handleRemove(property._id)}
                        className="flex w-full items-center justify-center px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors text-sm"
                      >
                        <FaTrash className="mr-2" />
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/Small Screen View (hidden on large screens) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
            {wishlist.map((property) => (
              <div key={property._id} className="bg-white rounded-lg shadow-md p-4">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{property.location}</p>
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      property.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {property.status}
                  </span>
                  <p className="text-lg font-semibold text-gray-800">${property.minPrice} - ${property.maxPrice}</p>
                </div>
                <div className="text-gray-600 text-sm mb-4">
                  <p>Agent: {property.agentName}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <Link
                    to={`/dashboard/make-offer/${property.propertyId}`}
                    className="flex items-center justify-center w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    <FaHandshake className="mr-2" />
                    Make an Offer
                  </Link>
                  <button
                    onClick={() => handleRemove(property._id)}
                    className="flex items-center justify-center w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                  >
                    <FaTrash className="mr-2" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
