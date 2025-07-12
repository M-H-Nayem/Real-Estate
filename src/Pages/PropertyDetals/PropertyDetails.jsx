import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  let useAxios = useAxiosSecure()

  // Fetch single property
  const { data: property = {}, isLoading } = useQuery({
    queryKey: ["property-details", id],
    queryFn: async () => {
      const res = await useAxios.get(`/properties/${id}`);
      return res.data;
    },
  });

  // Fetch reviews for this property
  const { data: reviews = [] ,refetch } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await useAxios.get(`/reviews/${id}`);
      return res.data;
    },
  });

  // Wishlist handler
  const handleAddToWishlist = async () => {


const result = await Swal.fire({
    title: "Add to Wishlist?",
    text: "Do you want to add this property to your wishlist?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, add it!",
  });

  if (!result.isConfirmed) return;

    const wishlistData = {
      propertyId: property._id,
      title: property.title,
      image: property.image,
      location: property.location,
      agentName: property.agentName,
      agentImage: property.agentImage,
      status: property.status,
      minPrice: property.minPrice,
      maxPrice: property.maxPrice,
      userEmail: user?.email,
    };

    // const res = await useAxios.post("/wishlist", wishlistData);

  //   if (res.data.insertedId) {
  //     Swal.fire("Added!", "Property added to wishlist", "success");
  //   }
  // };


   try {
    const res = await useAxios.post("/wishlist", wishlistData);

    if (res.data.insertedId) {
      Swal.fire("Added!", "Property added to your wishlist.", "success");
    }
  } catch (err) {
    if (err.response?.status === 400) {
      Swal.fire("Already Added", "This property is already in your wishlist.", "error");
    } else {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  }
}

  // Review submit handler
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const reviewText = form.review.value;

    const reviewData = {
      propertyId: property._id,
      reviewerName: user.displayName,
      reviewerEmail: user.email,
      reviewerImage: user.photoURL,
      review: reviewText,
      propertyTitle: property.title,
      timestamp: new Date(),
    };

    const res = await useAxios.post("/reviews", reviewData);
    if (res.data.insertedId) {
      Swal.fire("Review Added", "Thanks for your feedback!", "success");
      form.reset();
      setShowModal(false);
    }
    refetch()
  };

  if (isLoading) return <Loading></Loading>

  return (
    <div className="min-h-screen bg-gray-200 black py-20">
<div className="max-w-5xl mx-auto px-4 py-8 bg-white rounded-2xl">
      <div className="grid md:grid-cols-2 gap-6 md:justify-center">
        <img  src={property.image} alt={property.title} className="rounded-xl " />

        <div className="">
          <h2 className="text-4xl font-bold mt-5">{property.title}</h2>
          <p className="text-gray-600 mt-2">{property.description}</p>
          <p className="mt-4 text-xl">
            <strong>Location:</strong> {property.location}
          </p>
          <p className="flex items-center gap-3 mt-2">
            <strong className="text-xl font-bold">Price Range:</strong> <p className="text-[18px] font-semibold ">${property.minPrice} - ${property.maxPrice}</p>
          </p>
          <div className="mt-2 flex items-center gap-3">
            <strong className="text-xl ">Agent:</strong>
            {/* <img src={property.agentImage} alt={property.agentName} className="w-10 h-10 rounded-full" /> */}
            <span className="font-semibold">{property.agentName}</span>
          </div>
          <button onClick={handleAddToWishlist} className="btn btn-primary mt-6">
            Add to Wishlist
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Reviews</h3>
          <button onClick={() => setShowModal(true)} className="btn btn-outline btn-sm">
            Add a Review
          </button>
        </div>

        {reviews?.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews?.map((r) => (
              <div
                key={r._id}
                className=" p-4 rounded-lg bg-gray-200 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={r.reviewerImage}
                    alt={r.reviewerName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{r.reviewerName}</p>
                    <p className="text-xs text-gray-500">{r.reviewerEmail}</p>
                  </div>
                </div>
                <p className="text-gray-700">{r.review}</p>
              </div>
            ))}
          </div>
        
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <textarea
                name="review"
                className="textarea textarea-bordered w-full"
                placeholder="Write your review..."
                required
              />
              <div className="flex justify-end mt-4 gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-sm btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>

    </div>
  );
};

export default PropertyDetails;
