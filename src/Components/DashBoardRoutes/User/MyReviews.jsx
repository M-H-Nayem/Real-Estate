import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Your review has been deleted.", "success");
        refetch();
      }
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
   <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>

      {reviews.length === 0 && (
        <p className="text-center text-gray-500">You haven't added any reviews yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 relative"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={review.reviewerImage}
                alt="Reviewer"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{review.reviewerName}</p>
                <p className="text-sm text-gray-500">{new Date(review.timestamp).toLocaleString()}</p>
              </div>
            </div>

            <p className="text-gray-800 mb-2">
              <span className="font-semibold">Property:</span> {review.propertyTitle}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Review:</span> {review.review}
            </p>

            <button
              onClick={() => handleDelete(review._id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              title="Delete Review"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
