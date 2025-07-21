import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const PaymentForm = ({ offer }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate()
  // console.log(offer);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data } = await axiosSecure.post("/create-payment-intent", {
      price: offer.offerAmount ,
    });

    const card = elements.getElement(CardElement);
    if (!stripe ||!elements || !card) return;

    const { paymentMethod, error: methodError } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (methodError) {
      Swal.fire("Payment Error", methodError.message, "error");
      setLoading(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      Swal.fire("Payment Failed", confirmError.message, "error");
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const paymentData = {
        transactionId: paymentIntent.id,
        status: "bought",
        offerId: offer._id,
      };

      // console.log(paymentData);

      const res = await axiosSecure.patch(`/offers/payment`, paymentData);
      await axiosSecure.patch(`/properties/sold/${offer.propertyId}`);

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Payment completed!", "success");
      }
navigate('/dashboard/bought')
      
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-md shadow">
      <title>Payment</title>
      <h2 className="text-2xl font-semibold mb-4">Make Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement />
        <button
          className="btn btn-primary w-full mt-4"
          type="submit"
          disabled={!stripe || loading}
        >
          Pay ${offer.offerAmount}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
