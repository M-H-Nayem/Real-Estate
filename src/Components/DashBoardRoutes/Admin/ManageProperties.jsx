import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const ManageProperties = () => {
  const queryClient = useQueryClient();
  let useAxios = useAxiosSecure()

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
      const res = await useAxios.patch(`/properties/${id}`, {verificationStatus});
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

  if (isLoading) return <><Loading></Loading></>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Properties</h2>

<title>Manage Properties</title>
      {properties?.length === 0 ? (
          <p className="text-center text-gray-500 mt-5">No Property is added by any Agent</p>
        ):
      <>
      
      <table className="table table-zebra w-full text-sm bg-amber-50">
        <thead>
          <tr className="bg-base-200 text-gray-700">
            <th>No</th>
            <th>Title</th>
            <th>Location</th>
            <th>Agent</th>
            <th>Email</th>
            <th>Price Range</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property, index) => (
            <tr key={property._id}>
              <td>{index + 1}</td>
              <td>{property.title}</td>
              <td>{property.location}</td>
              <td>{property.agentName}</td>
              <td>{property.agentEmail}</td>
              <td>
                ${property.minPrice} - ${property.maxPrice}
              </td>
              <td>
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
              <td className="space-x-1">
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
                {property.verification=== "verified" && <button className="btn btn-sm btn-success">Verified</button>}
                {property.verification=== "rejected" && <button className="btn btn-sm btn-error">Rejected</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      </>}
    </div>
  );
};

export default ManageProperties;
