import React from "react";
import Layout from "./components/Layout/Layout";
import MobileNav from "./components/MobileNav/MobileNav";
import { useTheme } from "./context/ThemeContext";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Education from "./pages/Eduaction/Education";
import Techstack from "./pages/Tech/Tech";
import Projects from "./pages/Projects/Projects";
import WorkExp from "./pages/Work/Work";
import ScrollToTop from "react-scroll-to-top";
import { motion } from "framer-motion";   // ✅ replaced react-awesome-reveal
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [theme] = useTheme();

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

        {/* ✅ Replaced <Tada> with a Framer Motion animation */}
        <div className="footer pb-3 ms-3">
          <motion.h4
            className="text-center"
            animate={{ scale: [1, 1.2, 1, 1.2, 1], rotate: [0, 3, -3, 3, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
          >
            Made with Love Portfolio &copy; 2025
          </motion.h4>
        </div>
      </div>

      <ScrollToTop
        smooth
        color="#f28f67"
        style={{
          backgroundColor: "#1e1e2c",
          borderRadius: "80px",
        }}
      />

      <ToastContainer />
    </>
  );
}

export default App;
