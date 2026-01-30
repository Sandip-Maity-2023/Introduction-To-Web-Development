import React, { useState } from "react";
import { FaRegMehRollingEyes } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase.js";
import {ClipLoader} from "react-spinners"
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";


function SignUp() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e04326";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";


  const [showPassword, setShowPassword] = React.useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
 const [err,setErr]=useState("")
const [loading,setLoading]=useState(false)
const dispatch=useDispatch()

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          fullName,
          email,
          password,
          mobile,
          role,
        },
        { withCredentials: true },
      );
      dispatch(setUserData(result.data));
      //console.log(result.data);
      setErr("")
      setLoading(false)
      //navigate("/signin");
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("MESSAGE:", error.response?.data);
      console.log(error?.response?.data?.message);
    }setLoading(false)
  };

  const handleGoogleAuth = async () => {
    if (!mobile) {
      //return alert("mobile no is required");
      return setErr("mobile no is required")
    }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    //console.log(result)
    //const user=result.user;
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          fullName: result.user.displayName,
          email: result.user.email,
          role,
          mobile,
        },
        { withCredentials: true },
      );
      //console.log(data);
      Dispatch(setUserData(data))
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
          Create your account to get started with delicious food deliveries
        </p>
        {/* Fullname */}

        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-medium mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter your Full Name"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          required/>
        </div>

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

        {/* mobile */}

        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-gray-700 font-medium mb-1"
          >
            Mobile
          </label>
          <input
            type="tel"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter your Mobile Number"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
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
        {/* role */}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            Role
          </label>
          <div className="flex gap-2">
            {/* <select value={role} onChange={(e)=>setRole(e.target.value)} className="w-full border rounded-lg cursor-pointer px-3 py-2 focus:outline-none" style={{border:`1px solid ${borderColor}`}}>
    <option value="user">User</option>
    <option value="admin">Admin</option>
    <option value="deliveryBoy">Delivery</option>
  </select> */}
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                key={r}
                className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                onClick={() => setRole(r)}
                style={
                  role === r
                    ? { backgroundColor: primaryColor, color: "white" }
                    : { border: `1px solid ${primaryColor}`, color: "#333" }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64326] cursor-pointer"
          onClick={handleSignUp} disabled={loading}
        >
          {loading?<ClipLoader size={20}/>:"Sign Up"}
          {/* Sign Up */}
        </button>

{err && <p className="text-red-500 text-center my-[10px]">*{err}</p>}

        <button
          type="button"
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 cursor-pointer border-gray-400 hover:bg-gray-100"
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>

        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have an account ?{" "}
          <span className="text-[#ff4d2d] cursor-pointer">Sign In</span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
