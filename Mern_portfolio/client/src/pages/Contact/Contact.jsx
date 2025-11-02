import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./Contact.css";
import { motion } from "framer-motion";
import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";

const Contact = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !msg) {
        toast.error("Please provide all fields");
        return;
      }

      const res = await axios.post("/api/v1/portfolio/sendEmail", {
        name,
        email,
        msg,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setname("");
        setEmail("");
        setMsg("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="contact" id="contact">
      <div className="card card0 border-0">
        <div className="row">
          {/* Left Image Section */}
          <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12">
            <div className="card1">
              <div className="row border-line">
                <motion.img
                  src="https://img.freepik.com/free-photo/hot-line-contact-us-call-center-search-interface_53876-124009.jpg?w=2000"
                  alt="contact"
                  className="image"
                  initial={{ opacity: 0, x: -150 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="col-lg-6 col-md-6">
            <motion.div
              className="card2 d-flex card border-0 px-4 py-5"
              initial={{ opacity: 0, rotateY: 90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="row">
                {/* Social Icons */}
                <div className="row">
                  <h6>
                    Contact With
                    <BsLinkedin color="blue" size={30} className="ms-2" />
                    <BsGithub color="black" size={30} className="ms-2" />
                    {/* <BsFacebook color="blue" size={30} className="ms-2" /> */}
                  </h6>
                </div>

                {/* Divider */}
                <div className="row px-3 mb-4">
                  <div className="line" />
                  <small className="or text-center">OR</small>
                  <div className="line" />
                </div>

                {/* Input Fields */}
                <motion.div
                  className="row px-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your Name"
                    className="mb-3"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </motion.div>

                <motion.div
                  className="row px-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email Address"
                    className="mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </motion.div>

                <motion.div
                  className="row px-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <textarea
                    type="text"
                    name="msg"
                    placeholder="Write your message"
                    className="mb-3"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  className="row px-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="button" onClick={handleSubmit} style={{padding:"7px",borderRadius:"10px",backgroundColor:"blue"}}>
                    SEND MESSAGE
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
