import React from "react";
import "./Menus.css";
import { Fade, Zoom } from "react-awesome-reveal";
import { Link } from "react-scroll";
import {
  FcAbout,
  FcBiotech,
  FcHome,
  FcPortraitMode,
  FcReadingEbook,
  FcVideoProjector,
} from "react-icons/fc";
import { MdAddToHomeScreen } from "react-icons/md";
import { FcAndroidOs,FcContacts,FcCamcorderPro,FcBriefcase,FcCallback,FcBusinessContact } from "react-icons/fc";
//import {motion} from "framer-motion"
//import profilePic from "../../assets/san.jpg";

// Navigation items array for cleaner mapping
const NAV_ITEMS = [
  { to: "home", label: "Home", icon: <FcBusinessContact size={25}/>  },
  { to: "about", label: "About", icon: <FcAbout size={25}/> },
  { to: "education", label: "Education", icon: <FcReadingEbook size={25}/> },
  { to: "techstack", label: "Tech Stack", icon: <FcAndroidOs size={25}/> },
  { to: "projects", label: "Projects", icon: <FcCamcorderPro size={25}/> },
  { to: "work", label: "Experience", icon: <FcBriefcase size={25}/> },
  { to: "contact", label: "Contact", icon: <FcCallback size={25}/> },
];

const Menus = ({ toggle }) => {
  return (
    <div className="menu-container">
      {toggle ? (
        <>
          {/* Profile Picture */}
          <Zoom>
            <div className="navbar-profile-pic">
              <img
                src="./ii.jpg"
                alt="Profile"
              />
            </div>
          </Zoom>

          {/* Full Menu with Labels. to the name or id of the target section
          spy — watches scroll position and adds activeClass when the target is near top.
smooth — smooth scrolling animation.
offset={-200} or -100 — adjusts final scroll position (useful when you have a fixed header).
duration={100} — time in milliseconds for the scroll animation (100ms is very quick; you may prefer 300–600ms)
          
          */}
          <Fade direction="left">
            <nav className="nav-items">
              {NAV_ITEMS.map(({ to, label, icon }) => (
                <div key={to} className="nav-link">
                  <Link
                    to={to}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={100}
                    activeClass="active"
                  >
                    {icon}
                    <span className="nav-text">{label}</span>
                  </Link>
                </div>
              ))}
            </nav>
          </Fade>
        </>
      ) : (
        <>
          {/* Collapsed Menu (Icons Only) */}
          <nav className="nav-items">
            {NAV_ITEMS.map(({ to, icon }) => (
              <div key={to} className="nav-link">
                <Link
                  to={to}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={100}
                  activeClass="active"
                >
                  {icon}
                </Link>
              </div>
            ))}
          </nav>
        </>
      )}
    </div>
  );
};

export default Menus;
        