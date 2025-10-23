import React from "react";
import "./Menus.css";
import { Fade, Zoom } from "react-awesome-reveal";
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

//import profilePic from "../../assets/san.jpg";

// Navigation items array for cleaner mapping
const NAV_ITEMS = [
  { to: "home", label: "Home", icon: <FcHome /> },
  { to: "about", label: "About", icon: <FcAbout /> },
  { to: "education", label: "Education", icon: <FcReadingEbook /> },
  { to: "techstack", label: "Tech Stack", icon: <FcBiotech /> },
  { to: "projects", label: "Projects", icon: <FcVideoProjector /> },
  { to: "work", label: "Work Experience", icon: <FcPortraitMode /> },
  { to: "contact", label: "Contact", icon: <FcBusinessContact /> },
];

const Menus = ({ toggle }) => {
  return (
    <>
      {toggle ? (
        <>
          {/* Profile Picture */}
          <Zoom>
            <div className="navbar-profile-pic">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
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
                    spy
                    smooth
                    offset={-200}
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
                  spy
                  smooth
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
    </>
  );
};

export default Menus;



// const Menus = ({ toggle }) => {
//   return (
//     <>
//       {toggle ? (
//         <>
//           <Zoom>
//             <div className="navbar-profile-pic">
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
//                 alt="profile pic"
//               />
//             </div>
//           </Zoom>
//           <Fade left>
//             <div className="nav-items">
//               <div className="nav-item">
//                 <div className="nav-link">
//                   <Link
//                     to="home"
//                     spy={true}
//                     smooth={true}
//                     offset={-100}
//                     duration={100}
//                   >
//                     <FcHome />
//                     Home
//                   </Link>
//                 </div>
//                 <div className="nav-link">
//                   <Link
//                     to="about"
//                     spy={true}
//                     smooth={true}
//                     offset={-100}
//                     duration={100}
//                   >
//                     <FcAbout />
//                     About
//                   </Link>
//                 </div>
//                 <div className="nav-link">
//                   <Link
//                     to="education"
//                     spy={true}
//                     smooth={true}
//                     offset={-100}
//                     duration={100}
//                   >
//                     <FcReadingEbook />
//                     Education
//                   </Link>
//                 </div>

//                 <div className="nav-link">
//                   <Link
//                     to="techstack"
//                     spy={true}
//                     smooth={true}
//                     offset={-100}
//                     duration={100}
//                   >
//                     <FcBiotech />
//                     Tech Stack
//                   </Link>
//                 </div>

//                 <div className="nav-link">
//                   <Link
//                     to="projects"
//                     spy={true}
//                     smooth={true}
//                     offset={-100}
//                     duration={100}
//                   >
//                     <FcVideoProjector />
//                     Projects
//                   </Link>
//                 </div>
//                 <div className="nav-link">
//                   <Link
//                     to="work"
//                     spy={true}
//                     smooth={true}
//                     offset={-100}
//                     duration={100}
//                   >
//                     <FcPortraitMode />
//                     Work Experince
//                   </Link>
//                 </div>
//                 <div className="nav-link">
//                   <Link
//                     to="contact"
//                     spy={true}
//                     smooth={true}
//                     offset={-100}
//                     duration={100}
//                   >
//                     <FcBusinessContact />
//                     Contact
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </Fade>
//         </>
//       ) : (
//         <>
//           <div className="nav-items">
//             <div className="nav-item">
//               <div className="nav-link">
//                 <Link
//                   to="home"
//                   spy={true}
//                   smooth={true}
//                   offset={-100}
//                   duration={100}
//                 >
//                   <FcHome />
//                 </Link>
//               </div>
//               <div className="nav-link">
//                 <Link
//                   to="about"
//                   spy={true}
//                   smooth={true}
//                   offset={-100}
//                   duration={100}
//                 >
//                   <FcAbout />
//                 </Link>
//               </div>
//               <div className="nav-link">
//                 <Link
//                   to="education"
//                   spy={true}
//                   smooth={true}
//                   offset={-100}
//                   duration={100}
//                 >
//                   <FcReadingEbook />
//                 </Link>
//               </div>

//               <div className="nav-link">
//                 <Link
//                   to="techstack"
//                   spy={true}
//                   smooth={true}
//                   offset={-100}
//                   duration={100}
//                 >
//                   <FcBiotech />
//                 </Link>
//               </div>

//               <div className="nav-link">
//                 <Link
//                   to="projects"
//                   spy={true}
//                   smooth={true}
//                   offset={-100}
//                   duration={100}
//                 >
//                   <FcVideoProjector />
//                 </Link>
//               </div>
//               <div className="nav-link">
//                 <Link
//                   to="work"
//                   spy={true}
//                   smooth={true}
//                   offset={-100}
//                   duration={100}
//                 >
//                   <FcPortraitMode />
//                 </Link>
//               </div>
//               <div className="nav-link">
//                 <Link
//                   to="contact"
//                   spy={true}
//                   smooth={true}
//                   offset={-100}
//                   duration={100}
//                 >
//                   <FcBusinessContact />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Menus;
