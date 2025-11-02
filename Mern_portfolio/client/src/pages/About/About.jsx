import React from "react";
import "./About.css";
import { motion, scale } from "framer-motion";
import {
  FaDownload,
  FaLaptopCode,
  FaGlobeAsia,
  FaUserGraduate,
} from "react-icons/fa";
import Resume from "../../assets/docs/ats.pdf"
const About = () => {
  const skills = [
    { icon: <FaLaptopCode />, label: "Full Stack Development" },
    { icon: <FaUserGraduate />, label: "Machine Learing" },
    { icon: <FaGlobeAsia />, label: "React-Native Development" },
  ];

  return (
    <section className="about" id="about">
      {/* top heading */}
      <motion.h1
        className="about-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        id="about"
      >
        About Me
      </motion.h1>

{/* left side */}
      <div className="about-container">
        <motion.img
          className="about-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        src=".\src\assets\docs\q.jpg"
        alt="about-profile-pic"
        >

        </motion.img>

        {/* Right Content */}
        <motion.div
          className="about-right"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="about-text">
            I’m a <b>pre-final year student pursuing Computer Science & Enginnering (AIML) at Adamas University,Kolkata.<br/><br/>I completed my 10th (WBBSE) in 2021 with 92% and my 12th (WBCHSE) in 2023 with 77% from Panchrol High School, Purba Medinipur, West Bengal.</b>{" "}
            <b>Machine Learning</b>, <b>Deep Learning</b>, and I focus on
            building impactful applications.<b></b>.
            <br />
            <br />
            <b>I want to become a Software Developer Enginner</b>
            <br />
            <b>My hobbies include flower Gardening,Travelling & Exploring,watching movies</b>
            <br />
            My approach blends innovation and purpose — I love turning ideas
            into scalable, user-friendly technology.
          </p>

          {/* skills section */}
          <div className="skills">
            {skills.map((skills, index) => (
              <motion.div
                className="skill-card"
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="skill-icon">{skills.icon}</div>
                <p>{skills.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Download */}
          <motion.a
            href={Resume}
            download="ats.pdf"
            className="download-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaDownload style={{ marginRight: "8px" }} />
            Download Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
