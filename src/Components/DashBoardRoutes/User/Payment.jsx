import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
const { id } = useParams(); 
  const axiosSecure = useAxiosSecure();

  const { data: offer=[], isLoading } = useQuery({
    queryKey: ["offer", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offer/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;


// console.log(id);
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm offer={offer}></PaymentForm>
    </Elements>
  );
};

export default Payment;
