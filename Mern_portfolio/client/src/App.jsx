import React from "react";
import Layout from "./components/Layout/Layout";
import MobileNav from "./components/MobileNav/MobileNav";
import { useTheme } from "./context/ThemeContext";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Education from "./pages/Eduaction/Education";

function App() {
  const [theme] = useTheme();
  return (
    <>
      <div id={theme}>
        <Layout />
        <MobileNav />
      </div>

      <div className="container">
        <About />
        <Education/>
        <Contact/>
      </div>
    </>
  );
}

export default App;
