import React from "react";
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyAddedProperties = () => {
  const { user } = useAuth();
  let useAxios = useAxiosSecure()

  const { data: properties = [], refetch } = useQuery({
    queryKey: ["myProperties", user?.email],
    queryFn: async () => {
      const res = await useAxios.get(
        `/properties?agentEmail=${user?.email}`
      );
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this property?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await useAxios.delete(`/properties/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Property has been deleted.", "success");
        refetch();
      }
    }
  };

  return (
<>
<title>My-Added-Properties</title>
{properties.length === 0 ? (
        <div className="text-center mt-16 space-y-4" >
          <h2 className="text-2xl font-semibold text-gray-700">No Properties Added Yet</h2>
          <p className="text-gray-500 mt-2">Start by adding your first property!</p>
          <button className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"><Link to={'/dashboard/add-property'}>Add Property</Link></button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property._id} className="bg-white shadow-lg rounded-2xl p-4">
              <img
                src={property.image}
                alt={property.title}
                className="rounded-xl h-52 w-full object-cover"
              />
              <h2 className="text-xl font-semibold mt-3">{property.title}</h2>
              <p className="text-gray-500">{property.location}</p>
              <p className="text-sm text-gray-600 mt-1">
                Agent: <span className="font-medium">{property.agentName}</span>
              </p>
              <p className="text-sm text-gray-600">
                Price: ${property.minPrice} - ${property.maxPrice}
              </p>
              <div className="mt-2 flex items-center gap-2">
                {property.verification === "verified" ? (
                  <span className="text-green-600 font-bold flex items-center gap-1">
                    <FaCheckCircle /> Verified
                  </span>
                ) : property.verification === "rejected" ? (
                  <span className="text-red-600 font-bold flex items-center gap-1">
                    <FaTimesCircle /> Rejected
                  </span>
                ) : (
                  <span className="text-yellow-500 font-bold">Pending</span>
                )}
              </div>
              <div className="flex gap-2 mt-4">
                {property.verification !== "rejected" && (
                  <Link to={`/dashboard/update-property/${property._id}`}>
                    <button className="btn btn-sm btn-outline text-blue-600">
                      <FaEdit /> Update
                    </button>
                  </Link>
                )}
                <button
                  onClick={() => handleDelete(property._id)}
                  className="btn btn-sm btn-outline text-red-600"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
</>

    
  );
};

export default MyAddedProperties;
