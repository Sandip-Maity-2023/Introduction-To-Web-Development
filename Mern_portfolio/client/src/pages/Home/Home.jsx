import React,{useRef} from "react";
import "../Home/Home.css";
import { useTheme } from "../../context/ThemeContext";
import Resume from "../../assets/docs/ats.pdf";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiArrowDown } from "react-icons/fi";
import Fade from "react-awesome-reveal";
import  Typewriter  from "typewriter-effect";

//import { motion, useScroll, useTransform } from "framer-motion";

const Home = () => {
  const themeContext = useTheme();

  const [theme,setTheme] = themeContext || ["light", () => {}]; //safe fallback //error boundary
  //handle theme toggle
  const handle = () => {
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
  };

  return (
    <section className={`home-container ${theme}`} id="home">
      {/* theme toggle button */}
      <div className="theme-btn" onClick={handle}>
        {theme === "light" ? (
          <BsFillMoonStarsFill size={30} />
        ) : (
          <BsFillSunFill size={30} />
        )}
      </div>

      {/* home content */}
      <div className="home-content container">
        <Fade right>
          <h2>Hi 👋 I'm a <span className="highlight"><strong>Passionate Software Developer Engineer</strong></span></h2>
          <section className="h2p">
          <h1>
            <Typewriter
              options={{
                strings: [
                  "Machine Learning Developer!",
                  "MERN Stack Developer!",
                  "React-Native Develper!",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          </section>
        </Fade>

        <Fade bottom>
          <div className="home-buttons">
            <a
              className="btn btn-hire"
              // href="https://api.whatsapp.com/send?phone=9002838296"
              href="mailto:12sandip125@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              Send Email
            </a>
            <a
              className="btn btn-cv"
              href={Resume}
              target="_blank"
              rel="noreferrer"
              download="ats.pdf"
            >
              Download CV
              {/* {" "} */}
              <FiArrowDown
                size={20}
                style={{ marginLeft: "5px", marginTop: "3px" }}
              />
            </a>
          </div>
        </Fade>

        {/* social links */}
        <Fade direction="up" delay={400}>
          <div className="social-links">
            <a
              href="https://www.linkedin.com/in/sanath-s-2b4b00199/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin size={30} />
            </a>

            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub size={30} />
            </a>

            <a
              href="https://www.instagram.com/sanath_s_/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={30} />
            </a>

            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter size={30} />
            </a>
          </div>
        </Fade>

        {/* scroll down indicator */}
        <div className="scroll-down">
          <a href="#about">
            <FiArrowDown size={40} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
