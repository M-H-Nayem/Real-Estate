import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaHandshake } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router";
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
    console.log(id);
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

    console.log(confirm);

    if (confirm.isConfirmed) {
      // for delete an wishlist by id
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



  if (isLoading) return <div className=""><Loading></Loading></div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      <div className="overflow-x-auto">
        <table className="table w-full bg-white shadow-md">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Location</th>
              <th>Agent</th>
              <th>Status</th>
              <th>Price Range</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((property) => (
              <tr key={property._id}>
                <td>
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-20 h-16 object-cover rounded"
                  />
                </td>
                <td>{property.title}</td>
                <td>{property.location}</td>
                <td>{property.agentName}</td>
                <td>
                  <span
                    className={`px-2 py-1 text-sm rounded ${
                      property.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {property.status}
                  </span>
                </td>
                <td>${property.minPrice} - ${property.maxPrice}</td>
                <td className="items-center">
                  <Link
                    to={`/dashboard/make-offer/${property.propertyId}`}
                    className="btn btn-s btn-primary "
                  >
                    <FaHandshake className="mr-1" />Make an Offer
                  </Link>
                  <button
                    onClick={() => handleRemove(property._id)}
                    className="btn btn-s btn-error lg:ml-3 mt-2 lg:mt-0"
                  >
                    <FaTrash className="mr-1" /> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {wishlist.length === 0 && (
          <p className="text-center text-gray-500 mt-5">No properties in wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
