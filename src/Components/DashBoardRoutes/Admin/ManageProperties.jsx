import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const ManageProperties = () => {
  const queryClient = useQueryClient();
  let useAxios = useAxiosSecure();

  // Fetch all properties added by agents
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["manage-properties"],
    queryFn: async () => {
      const res = await useAxios.get("/properties"); // Adjust the endpoint as needed
      return res.data;
    },
  });

  // Mutation to update property status
  const mutation = useMutation({
    mutationFn: async ({ id, verificationStatus }) => {
      const res = await useAxios.patch(`/properties/${id}`, { verificationStatus });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["manage-properties"]);
    },
  });

  const handleUpdateStatus = (id, verificationStatus) => {
    Swal.fire({
      title: `Are you sure to ${verificationStatus} this property?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${verificationStatus}`,
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ id, verificationStatus });
        Swal.fire("Success", `Property ${verificationStatus} successfully`, "success");
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className=" sm:p-6 lg:p-8">
      <title>Manage Properties</title>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800">
        Manage Properties
      </h2>

      {properties?.length === 0 ? (
        <p className="text-center text-gray-500 mt-5">No Property is added by any Agent</p>
      ) : (
        <>
          {/* Card View for Mobile and Tablet (up to lg breakpoint) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-lg shadow-md p-4 space-y-3 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
                <p className="text-sm text-gray-500">{property.location}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Agent:</span> {property.agentName}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {property.agentEmail}
                </p>
                <p className="text-sm text-green-700 font-bold">
                  <span className="font-medium text-gray-700">Price Range:</span> ${property.minPrice} - ${property.maxPrice}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span
                    className={`px-2 py-1 text-xs rounded font-semibold ${
                      property.verification === "pending"
                        ? "bg-yellow-200 text-yellow-700"
                        : property.verification === "verified"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {property.status}
                  </span>
                  <div className="space-x-1">
                    {property.verification === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleUpdateStatus(property._id, "verified")
                          }
                          className="btn btn-sm btn-success"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStatus(property._id, "rejected")
                          }
                          className="btn btn-sm btn-error"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {property.verification === "verified" && <button className="btn btn-sm btn-success">Verified</button>}
                    {property.verification === "rejected" && <button className="btn btn-sm btn-error">Rejected</button>}
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
                  <th className="py-3 px-4 text-left">No</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-left">Agent</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Price Range</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property, index) => (
                  <tr key={property._id} className="border-b border-gray-200">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{property.title}</td>
                    <td className="py-2 px-4">{property.location}</td>
                    <td className="py-2 px-4">{property.agentName}</td>
                    <td className="py-2 px-4">{property.agentEmail}</td>
                    <td className="py-2 px-4">${property.minPrice} - ${property.maxPrice}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 text-xs rounded font-semibold ${
                          property.verification === "pending"
                            ? "bg-yellow-200 text-yellow-700"
                            : property.verification === "verified"
                            ? "bg-green-200 text-green-700"
                            : "bg-red-200 text-red-700"
                        }`}
                      >
                        {property.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 space-x-1">
                      {property.verification === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleUpdateStatus(property._id, "verified")
                            }
                            className="btn btn-sm btn-success"
                          >
                            Verify
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateStatus(property._id, "rejected")
                            }
                            className="btn btn-sm btn-error"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {property.verification === "verified" && <button className="btn btn-sm btn-success">Verified</button>}
                      {property.verification === "rejected" && <button className="btn btn-sm btn-error">Rejected</button>}
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

export default ManageProperties;
