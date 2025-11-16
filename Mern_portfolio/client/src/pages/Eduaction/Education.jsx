// import React from "react";
// //import { MdSchool } from "react-icons/md";
// import {
//   VerticalTimeline,
//   VerticalTimelineElement,
// } from "react-vertical-timeline-component";
// import { motion } from "framer-motion";
// import "react-vertical-timeline-component/style.min.css";
// import "./Education.css";

// const educationData =[
//   {
//     title: "Bachelor of Technology (B.TECH)",
//     subtitle: "ADAMAS UNIVERSITY, IN",
//     date: "2023 - 2027",
//     details:[
//       "Computer Science & Engineering (AI & ML)",
//       "Data Structures & Algorithms",
//       "Computer Fundamentals",
//       "System Design",
//       "Web Development",
//       "Emerging Technologies",
//     ],
//   },
// ];

// const Education = () => {
//   return (
//     <section className="education-section" id="education">
//       <motion.h2
//         className="text-4xl font-bold text-center text-teal-500 uppercase mb-2"
//         initial={{ opacity: 0, y: -30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         Education Details
//       </motion.h2>

//       <motion.hr
//         className="mx-auto border-t-4 border-teal-500 w-56 mb-10"
//         initial={{ scaleX: 0 }}
//         whileInView={{ scaleX: 1 }}
//         transition={{ duration: 0.6 }}
//       />

//       <VerticalTimeline>
//         {educationData.map((edu, index) => (
//           <VerticalTimelineElement
//             key={index}
//             className="vertical-timeline-element--education"
//             contentStyle={{
//               background: "rgba(255,255,255,0.1)",
//               backdropFilter: "blur(12px)",
//               color: "white",
//               boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
//             }}
//             contentArrowStyle={{ borderRight: "7px solid rgba(255,255,255,0.3)" }}
//             date={edu.date}
//             iconStyle={{
//               background: "linear-gradient(135deg, #00bfa6 0%, #0077ff 100%)",
//               color: "#fff",
//             }}
//             // icon={<MdSchool />}
//           >
//             <h3 className="vertical-timeline-element-title font-semibold text-teal-400 text-lg">
//               {edu.title}
//             </h3>
//             <h4 className="vertical-timeline-element-subtitle text-gray-200 mb-2">
//               {edu.subtitle}
//             </h4>
//             <div className="text-gray-400 text-sm">
//               Pursuing CourseWork in advanced <h6>Computer Science & Engineering(AI ML)</h6> Data Structure & Algorithm,Computer Fundamentals,System Design,Web Development,
//               and emerging technologies.
//             </div>
//           </VerticalTimelineElement>
//         ))}
//       </VerticalTimeline>
//     </section>
//   );
// };

// export default Education;





import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import "./Education.css";

const educationData = [
  {
    title: "Bachelor of Technology (B.TECH)",
    subtitle: "ADAMAS UNIVERSITY, IN",
    date: "2023 - 2027",
    details: [
      "Computer Science & Engineering (AI & ML)",
      "Data Structures & Algorithms",
      "Computer Fundamentals",
      "System Design",
      "Web Development",
      "Emerging Technologies",
    ],
  },
];

const Education = () => {
  return (
    <section className="education-section" id="education">
      <motion.h2
        className="text-4xl font-bold text-center text-teal-500 uppercase mb-2"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Education Details
      </motion.h2>

      <motion.hr
        className="mx-auto border-t-4 border-teal-500 w-56 mb-10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.6 }}
      />

      <div className="education-container">
        <VerticalTimeline lineColor="#3b82f6">
          {educationData.map((edu, index) => (
            <VerticalTimelineElement
              key={index}
              contentStyle={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
                borderRadius: "14px",
                color: "#fff",
              }}
              contentArrowStyle={{
                borderRight: "7px solid rgba(255,255,255,0.25)",
              }}
              date={edu.date}
              iconStyle={{
                background:
                  "linear-gradient(135deg, #00bfa6 0%, #0077ff 100%)",
                color: "#fff",
              }}
            >
              <h3 className="timeline-title">{edu.title}</h3>
              <h4 className="timeline-subtitle">{edu.subtitle}</h4>

              <ul className="edu-list">
                {edu.details.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default Education;
