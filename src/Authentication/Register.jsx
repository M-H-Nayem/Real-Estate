import axios from "axios";
import React, { useState, useRef } from "react";
import { FiUploadCloud, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import SocialLogin from "./SocialLogin";

const Register = () => {
  let axiosSecure = useAxiosSecure();
  let { createUser, user, setUser, updateUser, googleLogin } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [preview, setPreview] = useState(null); // for image preview
  let navigate = useNavigate();
  let location = useLocation();

  const fileInputRef = useRef();

  // Validate inputs on submit
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!formData.password) newErrors.password = "Password is required";
    else {
      if (formData.password.length < 6)
        newErrors.password = "Minimum 6 characters required";
      else if (!/[A-Z]/.test(formData.password))
        newErrors.password = "Must include a capital letter";
      else if (!/[!@#$%^&*]/.test(formData.password))
        newErrors.password = "Must include a special character";
    }

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    else if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";

    if (!formData.image) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Upload image to imgbb via axios
  const uploadToImgbb = async (imageFile) => {
    const apiKey = import.meta.env.VITE_IMAGE_API;
    // console.log(apiKey); // Replace with your API key
    const data = new FormData();
    data.append("image", imageFile);

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      return response.data.data.url;
    } else {
      throw new Error("Image upload failed");
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const imageUrl = await uploadToImgbb(formData.image);

      Swal.close();

      // Now you have the imageUrl, you can send it with other form data
      //   console.log("Image URL:", imageUrl);
      console.log("User Data:", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        imageUrl,
      });

      //   here we will implement registration authentication

      

      createUser(formData.email, formData.password)
        .then(async () => {
          try {
            const userData = {
            name: formData.name,
            email: formData.email,
            role: "user",
            by:'register',
            image: imageUrl,
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString(),
          };
            const res = await axios.post("http://localhost:5000/users", userData);
            if (res.data.insertedId) {
              console.log("User saved to database");
            }
          } catch (err) {
            console.error("Error saving user to DB", err);
          }
          updateUser({ displayName: formData.name, photoURL: imageUrl })
            .then(() => {
              setUser({
                ...user,
                displayName: formData.name,
                photoURL: imageUrl,
              });
              // Swal.fire({
              //   icon: "success",
              //   title: "Thanks, Your SignUp Complete",
              //   showConfirmButton: false,
              //   timer: 1500,
              // });

              // from here i post my user info in db
              navigate(`${location.state ? location.state : "/"}`);
            })
            .catch((error) => {
              setUser(user);
            });
            Swal.fire("Success!", "Registration completed.", "success");
        })
        .catch((err) => {console.log(err);});


      // Reset form if you want:
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: null,
      });
      setErrors({});
    } catch (error) {
      Swal.close();
      Swal.fire("Error!", error.message || "Upload failed.", "error");
    }
  };

  // Handle input change for text/email/password
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file select
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file || null,
    }));
  };

  

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
        Register
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <label className="block mb-2 font-medium" htmlFor="name">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={`input input-bordered w-full mb-2 ${
            errors.name ? "input-error" : ""
          }`}
        />
        {errors.name && (
          <p className="text-error text-sm mb-2">{errors.name}</p>
        )}

        {/* Email */}
        <label className="block mb-2 font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={`input input-bordered w-full mb-2 ${
            errors.email ? "input-error" : ""
          }`}
        />
        {errors.email && (
          <p className="text-error text-sm mb-2">{errors.email}</p>
        )}

        {/* Password */}
        <label className="block mb-2 font-medium" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            className={`input input-bordered w-full pr-10 ${
              errors.password ? "input-error" : ""
            }`}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-500"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        {errors.password && (
          <p className="text-error text-sm mb-2">{errors.password}</p>
        )}

        {/* Confirm Password */}
        <label className="block mb-2 font-medium" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`input input-bordered w-full pr-10 ${
              errors.confirmPassword ? "input-error" : ""
            }`}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-500"
            onClick={() => setShowConfirm((v) => !v)}
            tabIndex={-1}
          >
            {showConfirm ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-error text-sm mb-2">{errors.confirmPassword}</p>
        )}

        {/* Upload Image */}
        <label className="block mb-2 font-medium">Profile Image</label>
        <div className="flex items-center gap-3 mb-4">
          <div
            onClick={() => fileInputRef.current.click()}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white cursor-pointer hover:opacity-80 transition"
          >
            <FiUploadCloud size={20} />
          </div>
          <span className="text-sm text-gray-500">
            Click icon to choose image
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            required
            onChange={handleFileChange}
          />
        </div>
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-12 h-12 rounded-full object-cover border"
          />
        )}
        {errors.image && (
          <p className="text-error text-sm mb-2">{errors.image}</p>
        )}

        {/* Submit button */}
        <button type="submit" className="btn btn-primary w-full mt-4">
          Register
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <button className="text-primary font-semibold hover:underline">
          <Link to={"/login"}>Login here</Link>
        </button>
      </p>
      {/* <SocialLogin></SocialLogin> */}
    </div>
  );
};

export default Register;
