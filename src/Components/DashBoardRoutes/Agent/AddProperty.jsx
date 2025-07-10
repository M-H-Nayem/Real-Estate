import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddProperty = () => {
  const { user } = useAuth();
  let useAxios = useAxiosSecure()
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const location = form.location.value;
    const minPrice = parseFloat(form.minPrice.value);
    const maxPrice = parseFloat(form.maxPrice.value);
    const agentName = user?.displayName;
    const agentEmail = user?.email;
    const image = form.image.files[0];
    const createdAt = new Date().toISOString(); // ✅ Add creation date

    if (!image) {
      return Swal.fire("Error", "Please upload an image", "error");
    }

    // Upload image to imgbb
    const formData = new FormData();
    formData.append("image", image);

    try {
        const apiKey = import.meta.env.VITE_IMAGE_API;
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );
      console.log(imgRes);

      const imageUrl = imgRes.data.data.display_url;

      const propertyData = {
        title,
        location,
        description,
        image: imageUrl,
        minPrice,
        maxPrice,
        agentName,
        agentImage:user.photoURL,
        agentEmail,
        verification: "pending",
        status: "Pending",
        createdAt, // ✅ Include in DB
      };

      // Post to your backend
      const res = await useAxios.post("/properties", propertyData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Property added successfully!", "success");
        form.reset();
        setSelectedImage(null);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  const handlePreview = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
    else setSelectedImage(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        🏡 Add New Property
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Property Title"
          className="input input-bordered w-full"
          required
        />
        

        <input
          type="text"
          name="location"
          placeholder="Property Location"
          className="input input-bordered w-full"
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={handlePreview}
          required
        />
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Preview"
            className="w-full h-60 object-cover rounded-md"
          />
        )}

        <input
          type="text"
          value={user?.displayName || ""}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />

        <div className="flex gap-4">
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            className="input input-bordered w-full"
            required
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            className="input input-bordered w-full"
            required
          />
        </div>
        <textarea
          type="text"
          name="description"
          placeholder="Property Description"
          className="input input-bordered w-full"
          required
        />

        <button type="submit" className="btn btn-primary w-full text-white">
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
