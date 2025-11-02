import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineMenuFold } from "react-icons/ai";
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

const navLinks = [
  { to: "home", icon: <FcHome />, label: "Home" },
  { to: "about", icon: <FcAbout />, label: "About" },
  { to: "education", icon: <FcReadingEbook />, label: "Education" },
  { to: "techstack", icon: <FcBiotech />, label: "Tech Stack" },
  { to: "projects", icon: <FcVideoProjector />, label: "Projects" },
  { to: "work", icon: <FcPortraitMode />, label: "Experience" },
  { to: "contact", icon: <FcBusinessContact />, label: "Contact" },
];

const MobileNav = ({ theme = "light" }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);
  const handleMenuClick = () => setOpen(false);

  return (
    <div className={`mobile-nav ${theme === "dark" ? "dark" : ""}`}>
      {/* Top Bar */}
      <div className="mobile-nav-header">
        {open ? (
          <AiOutlineMenuFold
            size={30}
            className="mobile-nav-icon"
            onClick={handleToggle}
          />
        ) : (
          <GiHamburgerMenu
            size={30}
            className="mobile-nav-icon"
            onClick={handleToggle}
          />
        )}
        <span className="mobile-nav-title">My Portfolio</span>
      </div>

      {/* Slide-In Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-nav-menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="nav-items">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  className="nav-link"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={400}
                    onClick={handleMenuClick}
                    activeClass="active"
                  >
                    <span className="icon">{link.icon}</span>
                    <span className="label">{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
