import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const LatestUserReviews = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["latestUserReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews/latest");
      return res.data;
    },
  });

  if (isLoading || reviews.length === 0) return null;

  return (
    <section className="py-10">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-0">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-800 text-center">
          📝 Latest User Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition"
            >
              <div className="flex items-center mb-4 gap-4">
                <img
                  src={review.reviewerImage}
                  alt={review.reviewerName}
                  className="w-12 h-12 rounded-full border"
                />
                <div>
                  <h4 className="font-semibold">{review.reviewerName}</h4>
                  <p className="text-sm text-gray-500">
                    🏠 {review.propertyTitle}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestUserReviews;
