import React from "react";
import Layout from "./components/Layout/Layout";
import MobileNav from "./components/MobileNav/MobileNav";
import { useTheme } from "./context/useTheme";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Education from "./pages/Eduaction/Education";
import Techstack from "./pages/Tech/Tech";
import Projects from "./pages/Projects/Projects";
import WorkExp from "./pages/Work/Work";
import ScrollToTop from "react-scroll-to-top";
import { motion } from "framer-motion"; // ✅ replaced react-awesome-reveal
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "./pages/Footer/Footer"
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./App.css";

function App() {
  const [theme] = useTheme();

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div id={theme}>
        <Layout />
        <MobileNav />

        <div className="container">
          <About />
          <Education />
          <Techstack />
          <Projects />
          <WorkExp />
          <Contact />
        </div>

        <Footer />
      </div>

      <div className="scroll-buttons">
        <button onClick={scrollToTop}>
          <FaArrowUp />
        </button>

        <button onClick={scrollToBottom}>
          <FaArrowDown />
        </button>
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
