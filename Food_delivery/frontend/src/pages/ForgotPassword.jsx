
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {serverUrl} from "../App";
import axios from "axios";
import {ClipLoader} from "react-spinners"

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
const [err,setErr]=useState("")
const [loading,setLoading]=useState(false)

  const handleSendOtp=async()=>{
    setLoading(true)
    try{
      const result=await axios.post(`${serverUrl}/api/auth/send-otp`,{email},
      {withCredentials:true});
      setErr("")
      setStep(2);
      setLoading(false)
    }catch(err){
      setErr(err?.response?.data?.message);
      console.log("Error in sending OTP",err);
      setLoading(false)
    }
  }


  const handleVerifyOtp=async(e)=>{
    e.preventDefault();
    setLoading(True)
    try{
      const result=await axios.post(`${serverUrl}/api/auth/verify-otp`,{email,otp},
      {withCredentials:true});
      console.log(result)
      setErr("")
      setStep(3);
      setLoading(false)
    }catch(err){
      //console.log("Error in sending OTP",err);
      setErr(err?.response?.data?.message)
      setLoading(false)
    }
  }


  const handleResetPassword=async()=>{
    if(newPassword!==confirmPassword){
      alert("Passwords do not match");
      //console.log(result)
      //navigate("/signin");
      return;
    }
    setLoading(true)
    try{
      const result=await axios.post(`${serverUrl}/api/auth/reset-password`,{email,newPassword},
      {withCredentials:true});
      setErr("")
      console.log(result.data);
      setLoading(false)
      navigate("/signin");

      //setStep(3);
      
    }catch(err){
      //console.log("Error in sending OTP",err);
      setErr(err?.response?.data?.message)
    setLoading(false)
    }
  }



  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center cursor-pointer gap-4 mb-4">
          <IoIosArrowRoundBack
            size={30}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>

        {step === 1 && 
          <div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              required/>
            </div>

            <button
              className={`w-full font-semibold py-2 rounded-lg transtion duration-200 bg-[#ff4d2d] text-white cursor-pointer`} onClick={handleSendOtp}
              disabled={loading}
            >
              {/* Send OTP */}
              {loading ?<ClipLoader size={20} color='white'/>:"send OTP"}
            </button>

{err && <p className="text-red-500 text-center my-[10px]">*{err}</p>}


          </div>
        }

        {step == 2 && 
          <div>
            <div className="mb-6">
              <label
                htmlFor="email"
                type="email"
                className="block text-gray-700 font-medium mb-1"
              >
                OTP
              </label>
              <input
                type="text"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              required/>
            </div>
            <button
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleVerifyOtp} disabled={loading}>
                
              {/* verify OTP */}
              {loading ?<ClipLoader size={20} color='white'/>:"verify OTP"}
            </button>

           {err && <p className="text-red-500 text-center my-[10px]">*{err}</p>}

          </div>
        }

         {step === 3 && 
          <div>
            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              required/>
            </div>


             <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              required/>
            </div>

            <button
              className={`w-full font-semibold py-2 rounded-lg transtion duration-200 bg-[#ff4d2d] text-white cursor-pointer`} onClick={handleResetPassword}
             disabled={loading}>
              {/* Reset Password */}
              {loading ?<ClipLoader size={20} color='white'/>:"Reset password"}
            </button>
            {err && <p className="text-red-500 text-center my-[10px]">*{err}</p>}

          </div>
        }


      </div>
    </div>
  );
}

export default ForgotPassword;
