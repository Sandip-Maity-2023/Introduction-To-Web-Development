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
      <div className="theme-btn" onClick={handle}>
        {theme === "light" ? (
          <BsFillMoonStarsFill size={30} />
        ) : (
          <BsFillSunFill size={30} />
        )}
      </div>

      <div className="home-content container">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2>
            Hi, I'm a{" "}
            <span className="highlight">
              <strong>Passionate Software Development Engineer</strong>
            </span>
          </h2>
          <section className="h2p">
            <h1>
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
              download="ats.pdf"
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
            href="https://www.linkedin.com/in/sanath-s-2b4b00199/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={30} />
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={30} />
          </a>

          <a
            href="https://leetcode.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LeetCode"
          >
            <SiLeetcode size={30} />
          </a>

          <a
            href="https://www.geeksforgeeks.org"
            target="_blank"
            rel="noreferrer"
            aria-label="GeeksforGeeks"
          >
            <SiGeeksforgeeks size={30} />
          </a>
        </motion.div>

        <div className="scroll-down">
          <a href="#about" aria-label="Scroll to About section">
            <FiArrowDown size={40} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
