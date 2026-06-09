


import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { MdMarkEmailRead } from "react-icons/md";
import { FaLinkedin, FaGithub, FaFileDownload } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { FiArrowDown } from "react-icons/fi";
import { useTheme } from "../../context/useTheme";
import Resume from "../../assets/docs/ats.pdf";
import "../Home/Home1.css";

const Home = () => {
  const themeContext = useTheme();
  const [theme, setTheme] = themeContext || ["light", () => {}];

  const handle = () => {
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
  };

  return (
    <div className={`home-container ${theme}`} id="home">

      {/* VIDEO BACKGROUND */}
      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source
          src="https://res.cloudinary.com/dabmttnpz/video/upload/v1780932677/Spaceship_travel_from_left_right_202606082046_qzsf1o.mp4"
          type="video/mp4"
        />
      </video>

      {/* DARK OVERLAY */}
      <div className="video-overlay"></div>

      {/* THEME BUTTON */}
      <div className="theme-btn" onClick={handle}>
        {theme === "light" ? (
          <BsFillMoonStarsFill size={30} />
        ) : (
          <BsFillSunFill size={30} />
        )}
      </div>

      {/* CONTENT */}
      <div className="home-content container">

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{ color: theme === "light" ? "#0646db" : "#64b5f6", fontWeight: "500" }}>
            Hi, I'm a{" "}
            <span className="highlight" style={{ color: theme === "light" ? "#0646db" : "#64b5f6", fontWeight: "500" }}>
              <strong>Software Development Engineer</strong>
            </span>
          </h2>

<section className="h2p">
  <h1 className={`typewriter-text ${theme}`}>
    <Typewriter
      options={{
        strings: [
          "Machine Learning Developer!",
          "MERN Stack Developer!",
          "React Native Developer!",
        ],
        autoStart: true,
        loop: true,
      }}
    />
  </h1>
</section>
        </motion.div>

        <motion.div
          className="home-buttons"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="home-buttons">
            <a
              className="btn btn-hire"
              href="mailto:12sandip125@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              Send Email
              <MdMarkEmailRead
                size={20}
                style={{ marginLeft: "5px", marginTop: "3px" }}
              />
            </a>

            <a
              className="btn btn-cv"
              href={Resume}
              target="_blank"
              rel="noreferrer"
              download="Sandip82.pdf"
            >
              Download CV
              <FaFileDownload
                size={20}
                style={{ marginLeft: "5px", marginTop: "3px" }}
              />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="social-links"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="https://www.linkedin.com/in/sandip-maity-243537292"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin size={30} />
          </a>

          <a
            href="https://github.com/Sandip-Maity-2023"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub size={30} />
          </a>

          <a
            href="https://leetcode.com/Sandip-Maity-2023/"
            target="_blank"
            rel="noreferrer"
          >
            <SiLeetcode size={30} />
          </a>

          <a
            href="hhttps://www.geeksforgeeks.org/user/4sandipmaity2023/"
            target="_blank"
            rel="noreferrer"
          >
            <SiGeeksforgeeks size={30} />
          </a>
        </motion.div>

        <motion.div
  className="hero-info"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1 }}
>
  <div className="glass-card">
    🕒 {new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}
  </div>

  <div className="glass-card">
    📅 {new Date().toLocaleDateString()}
  </div>

</motion.div>

        <div className="scroll-down">
          <a href="#about">
            <FiArrowDown size={40} style={{ marginTop: "10px" }} />
          </a>
        </div>

      </div>
    </div>
  );
};

export default Home;