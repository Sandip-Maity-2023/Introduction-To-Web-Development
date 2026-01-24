//const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendOtpMail = async (to, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to, // list of receivers
    subject:"Reset Your Password - OTP Inside", // Subject line
    html: `<p>Your OTP for password reset is: <b>${otp}</b>.It expires in 5 minutes.</p>`, // html body
  });
};