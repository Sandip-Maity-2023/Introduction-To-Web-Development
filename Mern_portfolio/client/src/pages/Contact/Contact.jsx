import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", msg: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, msg } = formData;

    if (!name || !email || !msg) {
      toast.error("Please fill all fields!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/v1/portfolio/sendEmail", formData);
      if (res.data.success) {
        toast.success("Message sent successfully!");
        setSent(true);
        setFormData({ name: "", email: "", msg: "" });
        setTimeout(() => setSent(false), 3000);
      } else {
        toast.error(res.data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4"
    >
      {/* Decorative background circles */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-teal-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full"></div>

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center z-10">
        {/* Left Image with animation */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <img
            src="https://img.freepik.com/free-photo/hot-line-contact-us-call-center-search-interface_53876-124009.jpg?w=2000"
            alt="contact"
            className="rounded-2xl object-cover w-full max-w-md h-[450px] shadow-2xl border border-gray-700"
          />
        </motion.div>

        {/* Right Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-xl border border-gray-700 p-8 rounded-2xl shadow-2xl flex flex-col space-y-4 text-gray-100"
        >
          <h2 className="text-4xl font-bold text-center text-white mb-2">
            Let’s Connect 💬
          </h2>
          <p className="text-center text-gray-300 mb-4">
            I’d love to hear from you! Fill out the form and I’ll get back to you soon.
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <BsLinkedin size={30} color="#0A66C2" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <BsGithub size={30} color="#fff" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <BsFacebook size={30} color="#1877f2" />
            </a>
          </div>

          {/* Form Inputs */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800/60 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800/60 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 outline-none"
          />

          <textarea
            name="msg"
            placeholder="Your Message"
            rows="4"
            value={formData.msg}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800/60 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 outline-none"
          ></textarea>

          {/* reCAPTCHA Placeholder */}
          <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-3 text-gray-400 text-sm text-center">
            [Google reCAPTCHA will appear here]
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-3 w-full flex justify-center items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-300 shadow-lg ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin" /> Sending...
              </>
            ) : sent ? (
              "✅ Sent!"
            ) : (
              "Send Message"
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
