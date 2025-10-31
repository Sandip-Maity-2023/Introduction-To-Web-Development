import React, { useState, useEffect, useRef } from "react";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { AiOutlineMenuFold } from "react-icons/ai";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link } from "react-scroll";
import {
  FcAbout,
  FcBiotech,
  FcBusinessContact,
  FcHome,
  FcPortraitMode,
  FcReadingEbook,
  FcVideoProjector,
} from "react-icons/fc";

import "./MobileNav.css";

const navitems = [
  { to: "home", label: "Home", icon: <FcHome /> },
  { to: "about", label: "About", icon: <FcAbout /> },
  { to: "edu", label: "Education", icon: <FcReadingEbook /> },
  { to: "tech", label: "Tech Stack", icon: <FcBiotech /> },
  { to: "pro", label: "Projects", icon: <FcVideoProjector /> },
  { to: "work", label: "Work Experience", icon: <FcPortraitMode /> },
  { to: "con", label: "Contact", icon: <FcBusinessContact /> },
];

const MobileNav = () => {
  const [open, setopen] = useState(false);
  const [dark, setdark] = useState(
    localStorage.getItem("theme")==="dark");
  const menuRef = useRef(null);

  //toggle menu
  const togglemenu = () => {
    setopen(!open);
  };
  //close memu when link clicked
  const closemenu = () => {
    setopen(false);
  };

  //close menu when clicking outside
  useEffect(() => {
    const handleclick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setopen(false);
      }
    };

    //click outside
    if (open) document.addEventListener("mousedown", handleclick);
    return () => document.removeEventListener("mousedown", handleclick);
  }, [open]);

  //close on ESC key
  useEffect(() => {
    const handlekey = (e) => e.key === "Escape" && setopen(false);
    
    document.addEventListener("keydown", handlekey);
    return () => document.removeEventListener("keydown", handlekey);
  }, []);

  //toggle dark mode
  useEffect(() => {
    document.body.classList.toggle("dark-mode", dark);
    localStorage.setItem("theme",dark ? "dark":"light");
  }, [dark]);

  return (
    <div className="mobile-nav">
      {/* header bar */}
      <div className="mobile-nav-header">
        {open ? (
          <AiOutlineMenuFold
            size={30}
            className="mobile-nav-icon"
            onClick={togglemenu}
          />
        ) : (
          <BsMenuButtonWideFill
            size={30}
            className="mobile-nav-icon"
            onClick={togglemenu}
          />
        )}

        <span className="mobile-nav-title">My Portfolio</span>
        {/* Theme toggle */}
        <button
          className="theme-toggle-btn"
          onClick={() => setdark((prev) => !prev)}
          aria-label="Toggle theme"
        >
          {dark ? <MdLightMode size={26}/> : <MdDarkMode size={26}/>}
        </button>
      </div>

      {/* slide-in menu */}
      <div
        ref={menuRef}
        className={`mobile-nav-menu ${open ? "open" : "closed"}`}
      >
        <nav className="nav-items">
          {navitems.map(({ to, label, icon }) => (
            <div key={to} className="nav-link">
              <Link
                to={to}
                spy={true}
                smooth={true}
                offset={-100}
                duration={400}
                onClick={closemenu}
                activeClass="active"
                aria-label={label}
              >
                {icon}
                <span className="nav-text">{label}</span>
              </Link>
            </div>
          ))}
        </nav>
      </div>

      {/* background overlay when menu open */}
      {open && <div className="menu-overlay" onClick={togglemenu}></div>}
    </div>
  );
};

export default MobileNav;
