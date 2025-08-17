import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeRole = async (id, role) => {
    try {
      const res = await axiosSecure.patch(`/users/role/${id}`, { role });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", `User is now ${role}`, "success");
        refetch();
      }
    } catch {
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  const handleFraud = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Mark this agent as fraud? Their properties will be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark as fraud!",
      confirmButtonColor: "#d33",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/users/fraud/${id}`);
        if (res.data.updateUser.modifiedCount > 0) {
          Swal.fire("Success", "Agent marked as fraud", "success");
          refetch();
        }
      } catch (error) {
        Swal.fire("Error", "Failed to mark user as fraud", "error");
      }
    }
  };

  const handleDelete = async (id, email) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/users/${id}?email=${email}`);
        if (res.data.success) {
          Swal.fire("Deleted!", "User deleted successfully", "success");
          refetch();
        }
      } catch {
        Swal.fire("Error", "Failed to delete user", "error");
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="sm:p-6 lg:p-8">
      <title>Manage Users</title>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800">
        Manage Users
      </h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-500 mt-5">No users found.</p>
      ) : (
        <>
          {/* Card View for Mobile and Tablet (up to lg breakpoint) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
            {users.map((u) => (
              <div
                key={u._id}
                className="bg-white rounded-lg shadow-md p-4 space-y-3 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{u.name}</h3>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span> {u.email}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                      <span className="font-medium">Role:</span> {u.role}
                    </p>
                  </div>
                 
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {u.role !== "user" && u.role !== "fraud" ? (
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handleMakeRole(u._id, "user")}
                    >
                      Make User
                    </button>
                  ) : null}
                  {u.role !== "admin" && u.role !== "fraud" ? (
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handleMakeRole(u._id, "admin")}
                    >
                      Make Admin
                    </button>
                  ) : null}
                  {u.role !== "agent" && u.role !== "fraud" ? (
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => handleMakeRole(u._id, "agent")}
                    >
                      Make Agent
                    </button>
                  ) : null}
                  {u.role === "agent" ? (
                    <button
                      className="btn btn-xs btn-warning"
                      onClick={() => handleFraud(u._id, u.email)}
                    >
                      Mark as Fraud
                    </button>
                  ) : null}
                  {u.role === "fraud" ? (
                    <button className="btn btn-xs btn-error">Fraud</button>
                  ) : null}
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(u._id, u.email)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Table View for Large Devices (lg breakpoint and above) */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="table w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">User Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">By</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u._id} className="border-b border-gray-200">
                    <td className="py-2 px-4">{i + 1}</td>
                    <td className="py-2 px-4">{u.name}</td>
                    <td className="py-2 px-4">{u.email}</td>
                    <td className="py-2 px-4">{u.by}</td>
                    <td className="py-2 px-4 capitalize">{u.role}</td>
                    <td className="py-2 px-4 space-x-2">
                      {u.role !== "user" && u.role !== "fraud" ? (
                        <button
                          className="btn btn-xs btn-success"
                          onClick={() => handleMakeRole(u._id, "user")}
                        >
                          Make User
                        </button>
                      ) : null}
                      {u.role !== "admin" && u.role !== "fraud" ? (
                        <button
                          className="btn btn-xs btn-success"
                          onClick={() => handleMakeRole(u._id, "admin")}
                        >
                          Make Admin
                        </button>
                      ) : null}
                      {u.role !== "agent" && u.role !== "fraud" ? (
                        <button
                          className="btn btn-xs btn-info"
                          onClick={() => handleMakeRole(u._id, "agent")}
                        >
                          Make Agent
                        </button>
                      ) : null}
                      {u.role === "agent" ? (
                        <button
                          className="btn btn-xs btn-warning"
                          onClick={() => handleFraud(u._id, u.email)}
                        >
                          Mark as Fraud
                        </button>
                      ) : null}
                      {u.role === "fraud" ? (
                        <button className="btn btn-xs btn-error">Fraud</button>
                      ) : null}
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleDelete(u._id, u.email)}
                      >
                        Delete
                      </button>
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

export default ManageUsers;
