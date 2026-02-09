import React, { useState } from "react";
//import { FaRegMehRollingEyes } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import {auth} from "../firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
//import {useGetCurrentUserData} from "../hooks/useGetCurrentUser"


function SignIn() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e04326";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setShowPassword] = React.useState(false);
  //const [role, setRole] = useState("user");
  const navigate = useNavigate();
  //const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 // const [mobile, setMobile] = useState("");
const [err,setErr]=useState("")
const [loading,setLoading]=useState(false)
const dispatch=useDispatch()

  

const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErr("email and password are required");
      return;
    }
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      //console.log(result.data);
      dispatch(setUserData(result.data));
      setErr("");
      setLoading(false);
      //navigate("/signin");
    } catch (error) {
      console.log(error);
      setErr(error?.response?.data?.message || "Sign in failed");
      setLoading(false);
    }
  };




  const handleGoogleAuth = async () => {
      // if (!mobile) {
      //   return alert("mobile no is required");
      // }
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      //console.log(result)
      //const user=result.user;
      try {
        const { data } = await axios.post(
          `${serverUrl}/api/auth/google-auth`,
          {
            email: result.user.email,
          },
          { withCredentials: true },
        );
        //console.log(data);
        dispatch(setUserData(data))
      } catch (err) {
        console.log(err);
      }
    };


  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`}
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{ color: primaryColor }}
        >
          Food Delivery
        </h1>
        <p className="text-gray-600 mb-8">
          Sign In with your account to get started with delicious food deliveries
        </p>
        
        {/* email */}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter your Email"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          required/>
        </div>

       

        {/* password */}

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border rounded-lg cursor-pointer px-3 py-2 focus:outline-none"
              placeholder="Enter your password"
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            required/>
            <button
              type="button"
              aria-label="Toggle password visibility"
              className="absolute right-3 top-[14px] text-gray-500"
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            >
              {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>

        {/* forgot password */}
        <div className="text-right mb-4 text-[#ff4d2d] font-medium" onClick={()=>navigate("/forgot-password")}>
          Forgot Password
        </div>
        

        <button
          type="button"
          className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64326] cursor-pointer"
          onClick={handleSignIn} disabled={loading}
        >
          {loading?<ClipLoader size={20}/>:"Sign In"}
        </button>

        <button
          type="button"
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 cursor-pointer border-gray-400 hover:bg-gray-100"
        onClick={handleGoogleAuth}>
          <FcGoogle size={20} />
          <span>Sign In with Google</span>
        </button>


{err && <p className="text-red-500 text-center my-[10px]">*{err}</p>}

        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Want to create a new account ?{" "}
          <span className="text-[#ff4d2d] cursor-pointer">Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
