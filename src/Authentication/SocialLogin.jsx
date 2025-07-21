import React from 'react';
import useAuth from '../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import axios from 'axios';

const SocialLogin = () => {

let axiosSecure = useAxiosSecure()
    let{ googleLogin}=useAuth()
    let navigate = useNavigate()
    let location = useLocation()



let handleGoogleRegi =()=>{
    googleLogin()
    .then(async(result)=>{
try {
    let user = result.user
  const userData = {
            name: user.displayName,
            email: user.email,
            role: "user",
            by:'google',
            image: user.photoURL,
            created_at: new Date().toISOString(),
          } ;   
            const res = await axios.post("https://real-estate-platform-server-six.vercel.app/users", userData);
            // console.log(res.data);
            if (res.data.insertedId) {
              // console.log("User saved to database");
            }
            navigate(`${location.state ? location.state : "/"}`);

          } catch (err) {
            console.error("Error saving user to DB", err);
          }

    })
    .catch(()=>{})
    
  }


    return (
        <button
        onClick={handleGoogleRegi}
        className="btn mt-3 w-full  bg-white text-black border-[#e5e5e5]"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Continue with Google
      </button>
    );
};

export default SocialLogin;