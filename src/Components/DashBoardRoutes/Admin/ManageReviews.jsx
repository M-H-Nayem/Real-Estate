import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], refetch, isLoading } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/reviews/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Review has been deleted.", "success");
          refetch();
        }
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white p-4 rounded-lg shadow-lg  relative"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={review.reviewerImage}
                alt={review.reviewerName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{review.reviewerName}</h3>
                <p className="text-sm text-gray-500">{review.reviewerEmail}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Property:</span>{" "}
              {review.propertyTitle}
            </p>
            <p className="text-gray-800 mb-3 italic">"{review.review}"</p>
            <button
              onClick={() => handleDelete(review._id)}
              className="btn btn-sm btn-error flex items-center gap-2"
            >
              <FaTrash /> Delete
            </button>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <p className="text-center text-gray-500 mt-5">No reviews available.</p>
      )}
    </div>
  );
};

export default ManageReviews;
