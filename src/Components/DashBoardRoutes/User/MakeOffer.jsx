import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";

const MakeOffer = () => {
  const { id } = useParams(); // property ID
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();

  // Get single property info
  const { data: property = {}, isLoading } = useQuery({
    queryKey: ["singleProperty", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      console.log(res.data);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    const offerAmount = parseFloat(data.offerAmount);
    const min = property.minPrice;
    const max = property.maxPrice;

    if (offerAmount < min || offerAmount > max) {
      return Swal.fire(
        "Invalid Amount",
        `Offer must be between $${min} and $${max}`,
        "error"
      );
    }

    const offerData = {
      propertyId: property._id,
      propertyImage: property.image,
      title: property.title,
      location: property.location,
      agentName: property.agentName,
      agentEmail: property.agentEmail,
      buyerEmail: user.email,
      transactionId:'',
      buyerName: user.displayName,
      buyingDate: new Date().toISOString(),
      offerAmount,
      status: "pending",
    };

    // 🔒 Confirm before submitting
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to make an offer for this property?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Offer!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.post("/offers", offerData);
          console.log(res.data.result.insertedId);
          if (res.data.result.insertedId) {
            Swal.fire("Success!", "Offer submitted successfully.", "success");
            navigate("/dashboard/bought");
          }
        } catch (err) {
          // 💥 Handle already existing offer case from backend
          if (
            err.response &&
            err.response.data &&
            err.response.data.message ===
              "You have already made an offer for this property."
          ) {
            Swal.fire(
              "Already Offered!",
              "You have already made an offer for this property.",
              "error"
            );
          } else{
            Swal.fire("Error!", "Failed to submit offer.", "error");
          }
        }
      }
    });
  };

  if (isLoading)
    return (
      <>
        <Loading></Loading>
      </>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md my-6">
      <h2 className="text-2xl font-bold mb-4">Make an Offer</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Readonly Fields */}
        <label className="font-semibold">Property Title</label>
        <input
          type="text"
          className="input input-bordered w-full"
          defaultValue={property.title}
          readOnly
          {...register("title")}
        />
        <label className="font-semibold">Property Location</label>

        <input
          type="text"
          className="input input-bordered w-full"
          defaultValue={property.location}
          readOnly
          {...register("location")}
        />
        <label className="font-semibold">Agent Name</label>

        <input
          type="text"
          className="input input-bordered w-full"
          defaultValue={property.agentName}
          readOnly
          {...register("agentName")}
        />
        <label className="font-semibold">Buyer Name</label>

        <input
          type="text"
          className="input input-bordered w-full"
          defaultValue={user?.displayName}
          readOnly
          {...register("buyerName")}
        />
        <label className="font-semibold">Buyer Email</label>

        <input
          type="email"
          className="input input-bordered w-full"
          defaultValue={user?.email}
          readOnly
          {...register("buyerEmail")}
        />

        {/* Editable Fields */}
        {/* <input
          type="date"
          className="input input-bordered w-full"
          required
          {...register("buyingDate")}
        /> */}
        <label className="font-semibold">Offer Value</label>

        <input
          type="number"
          step="0.01"
          className="input input-bordered w-full"
          placeholder={`Offer between $${property.minPrice} - $${property.maxPrice}`}
          required
          {...register("offerAmount")}
        />

        <button className="btn btn-primary w-full">Submit Offer</button>
      </form>
    </div>
  );
};

export default MakeOffer;
