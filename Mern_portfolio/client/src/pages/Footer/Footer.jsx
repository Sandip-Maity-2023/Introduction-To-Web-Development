import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFileDownload,
  FaCommentDots,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section">
          <h3>Sandip Maity</h3>

          <span className="status-badge">
            🟢 Open to Opportunities
          </span>

          <p className="mt-3">
            Full Stack Developer specializing in React, Node.js,
            Express.js and MongoDB.
          </p>

          <p>
            Passionate about building scalable web applications,
            solving real-world problems, and creating exceptional
            user experiences.
          </p>
        </div>

        {/* Navigation */}
        <div className="footer-section">
          <h4>Navigation</h4>

          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Me</a></li>
            <li><a href="#techstack">Tech Stack</a></li>
            <li><a href="#work">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact</h4>

          <p>
            <FaEnvelope /> 12sandip125@gmail.com
          </p>

          <p>
            <FaPhone /> +91 9002838296
          </p>

          <p>
            <FaMapMarkerAlt /> India
          </p>
        </div>

        {/* Resources */}
        <div className="footer-section">
          <h4>Resources</h4>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="footer-btn"
          >
            <FaFileDownload /> Download Resume
          </a>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfmMN6h9tvsrGIXTNvEfuh_CHlMvW-Bc1jXNhl7qGXnoxbf8g/viewform?usp=publish-editor"
            target="_blank"
            rel="noreferrer"
            className="footer-btn mt-2"
          >
            <FaCommentDots /> Give Feedback
          </a>
        </div>
      </div>

      {/* Social Icons */}
      <div className="footer-social">
        <a
          href="https://github.com/Sandip-Maity-2023"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </a>

        <a
          href="https://linkedin.com/in/sandipmaity"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin />
        </a>

        <a
          href="https://instagram.com/sandipmaity"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </a>
      </div>

      {/* Bottom Section */}
      <motion.div
        className="footer-bottom"
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <p>
          ❤️ Designed & Developed by <strong>Sandip Maity</strong>
        </p>

        <p>
          Portfolio © {new Date().getFullYear()} | Built with React,
          Bootstrap, Framer Motion & MERN Stack
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;