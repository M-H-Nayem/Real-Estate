import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UpdateProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const useAxios = useAxiosSecure()

  // Fetch the property data by ID using TanStack Query
  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await useAxios.get(`/properties/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Local form state (only set after property is fetched)
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        location: property.location,
        image: property.image,
        agentName: property.agentName,
        agentEmail: property.agentEmail,
        minPrice: property.minPrice,
        maxPrice: property.maxPrice,
      });
    }
  }, [property]);

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change and upload to imgbb
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formImg = new FormData();
    formImg.append("image", file);

    try {
        const apiKey = import.meta.env.VITE_IMAGE_API;
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formImg
      );
      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.data.url }));
        Swal.fire("Success!", "Image uploaded!", "success");
      }
    } catch {
      Swal.fire("Error", "Image upload failed", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      priceRange: `${formData.minPrice} - ${formData.maxPrice}`,
    };

    try {
      await useAxios.put(`/properties/${id}`, updatedData);
      Swal.fire("Updated!", "Property updated successfully", "success");
      navigate("/dashboard/my-properties");
    } catch (error) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  if (isLoading || !formData) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto my-10 bg-white p-6 rounded-lg shadow">
      <title>Update Property</title>
      <h2 className="text-2xl font-bold mb-6 text-center">Update Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          placeholder="Property Title"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          placeholder="Location"
          required
        />
        <input
          type="text"
          name="agentName"
          value={formData.agentName}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />
        <input
          type="email"
          name="agentEmail"
          value={formData.agentEmail}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />
        <div className="flex gap-4">
          <input
            type="number"
            name="minPrice"
            value={formData.minPrice}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            placeholder="Min Price"
            required
          />
          <input
            type="number"
            name="maxPrice"
            value={formData.maxPrice}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            placeholder="Max Price"
            required
          />
        </div>
        <div className="space-y-2">
          <p className="font-medium">Change Image</p>
          <input
            type="file"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Property"
              className="mt-3 w-full h-48 object-cover rounded"
            />
          )}
        </div>
        <button className="btn btn-primary w-full">Update Property</button>
      </form>
    </div>
  );
};

export default UpdateProperty;
