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

  // console.log(users);

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
        refetch(); // Refetch user list
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

  if (isLoading) return <><Loading></Loading></>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table bg-white shadow-md w-full">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>By</th>
              <th>Role</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id}>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.by}</td>
                <td className="capitalize">
                  {u.role}
                </td>
                <td className="space-x-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-fit">           
                      {u.role !== "user" && u.role !== "fraud" ?(
                        <button
                          className="btn btn-xs btn-success py-4 md:py-2 lg:py-0"
                          onClick={() => handleMakeRole(u._id, "user")}
                        >
                          Make User
                        </button>
                      ):""}
                      {u.role !== "admin" && u.role !== "fraud" ?(
                        <button
                          className="btn btn-xs btn-success"
                          onClick={() => handleMakeRole(u._id, "admin")}
                        >
                          Make Admin
                        </button>
                      ):""}
                      {u.role !== "agent" && u.role !== "fraud"  ? (
                        <button
                          className="btn btn-xs btn-info"
                          onClick={() => handleMakeRole(u._id, "agent")}
                        >
                          Make Agent
                        </button>
                      ):""}
                  {u.role === "agent"? (
                    <button
                      className="btn btn-xs btn-warning"
                      onClick={() => handleFraud(u._id, u.email)}
                    >
                      Mark as Fraud
                    </button>
                  ):""}
                  {u.role === "fraud" ?<button
                      className="btn btn-xs btn-error"
                      // onClick={() => handleFraud(u._id, u.email)}
                    >
                     Fraud
                    </button>:'' }
                  

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
        {users.length === 0 && (
          <p className="text-center mt-4 text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
