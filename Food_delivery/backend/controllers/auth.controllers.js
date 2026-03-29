import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";


// Sign Up
export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    if (!fullName || !email || !password || !mobile || !role) {
      return res.status(400).json({ message: "all fields are required" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already exist." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 characters." });
    }

    if (mobile.length < 10) {
      return res
        .status(400)
        .json({ message: "mobile no must be at least 10 digits" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullName,
      email,
      role,
      mobile,
      password: hashedPassword,
    });

    const token = await genToken(user._id);
    if (!token) {
      return res.status(500).json({ message: "token generation failed" });
    }

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
    });
  } catch (err) {
    return res.status(500).json({ message: `sign up error ${err?.message || err}` });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exits." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = await genToken(user._id);
    if (!token) {
      return res.status(500).json({ message: "token generation failed" });
    }

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
    });
  } catch (err) {
    return res.status(500).json({ message: `sign In error ${err?.message || err}` });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(200).json(`sign out error ${err}`);
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; //5 minutes
    user.isOtpVerified = false;
    await user.save();
    await sendOtpMail(email, otp);
    return res
      .status(200)
      .json({ message: "OTP sent to your email successfully" });
  } catch (err) {
    return res.status(500).json(`send OTP erroe ${err}`);
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    return res.status(500).json(`verify OTP error ${err}`);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "OTP not verified" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    return res.status(500).json(`reset password error ${err}`);
  }
};


export const googleAuth=async(req,res)=>{
  try{
const {fullName,email,mobile,role}=req.body
if (!email) {
  return res.status(400).json({ message: "email is required" });
}

let user=await User.findOne({email})
if(!user){
  if (!fullName || !mobile || !role) {
    return res.status(400).json({ message: "fullName, mobile and role are required for first-time Google sign in" });
  }

  user=await User.create({
    fullName,email,mobile,role
  })
}
    const token = await genToken(user._id);
    if (!token) {
      return res.status(500).json({ message: "token generation failed" });
    }

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
return res.status(200).json({
  _id: user._id,
  fullName: user.fullName,
  email: user.email,
  mobile: user.mobile,
  role: user.role,
})
  }catch(err){
return res.status(500).json({ message: `googleAuth error ${err?.message || err}` })
  }
}

