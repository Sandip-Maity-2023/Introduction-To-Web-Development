

// About.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaDownload, FaLaptopCode, FaGlobeAsia, FaUserGraduate } from "react-icons/fa";
import Resume from "../../assets/docs/Sandip82.pdf";
import ProfileImage from "../../assets/docs/q.jpg";
import "./About.css";

const About = () => {
  const skills = [
    { icon: <FaLaptopCode />, label: "Full Stack Development" },
    { icon: <FaUserGraduate />, label: "Machine Learning" },
    { icon: <FaGlobeAsia />, label: "React Native Development" },
  ];

  return (
    <section className="about" id="about">

      {/* Background Video */}
      <video
        className="about-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source
          src="https://res.cloudinary.com/dabmttnpz/video/upload/v1780986133/kling_20260609_VIDEO_generate_v_3654_0_mqddij.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="about-overlay"></div>

      {/* All content above video */}
      <div className="about-content">
        <motion.h1
          className="about-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
      ABOUT ME
        </motion.h1>

        <div className="about-container">
          <motion.img
            className="about-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            src={ProfileImage}
            alt="about-profile-pic"
           color="transparent"/>

          <motion.div
            className="about-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="about-text">
              I'm a <b>Computer Science and Engineering student at Adamas University,kolkata specializing in full-stack web development and machine learning. Driven by a passion for creating impactful software, I have hands-on experience building intelligent multi-agent AI systems, engineering computer vision applications, and developing scalable university management platforms. With practical internship experience as both a Full Stack Developer and a Machine Learning Intern</b>
              <br /><br />
              I completed my 10th (WBBSE) in 2021 with 92% and my 12th (WBCHSE) in 2023 with 77% from Panchrol High School, Purba Medinipur, West Bengal.
              <br /><br />
              I enjoy working in <b>Machine Learning</b>, <b>Deep Learning</b>, and full-stack development, with a focus on building impactful applications.
              <br /><br />
              <b>I want to become a Software Development Engineer.</b>
              <br />
              <b>My hobbies include flower gardening, travelling, exploring, and watching movies.</b>
              <br /><br />
              My approach blends innovation and purpose. I love turning ideas into scalable, user-friendly technology.
            </p>

            <div className="skills">
              {skills.map((skill, index) => (
                <motion.div
                  className="skill-card"
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="skill-icon">{skill.icon}</div>
                  <p>{skill.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.a
              href={Resume}
              download="Sandip82.pdf"
              className="download-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaDownload style={{ marginRight: "8px" }} />
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;