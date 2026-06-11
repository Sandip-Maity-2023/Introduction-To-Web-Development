import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import "react-vertical-timeline-component/style.min.css";
import "./Education.css";

const educationData = [
  {
    title: "Bachelor of Technology (B.Tech)",
    subtitle: "Adamas University, Kolkata",
    course: "Computer Science & Engineering (AI & ML)",
    duration: "2023 - 2027",
    passingYear: "Expected 2027",
    cgpa: "8.5 / 10",
  },
  {
    title: "Higher Secondary Education",
    subtitle: "Panchrol High School (H.S)",
    duration: "2022 - 2023",
    passingYear: "2023",
    marks: "77%",
  },
  {
    title: "Secondary Education (Class X)",
    subtitle: "Panchrol High School (H.S)",
    duration: "2020 - 2021",
    passingYear: "2021",
    marks: "92%",
  },
];

const Education = () => {
  return (
    <section className="education-section" id="education">
  <video
    className="education-bg-video"
    autoPlay
    loop
    muted
    playsInline
  >
    <source
      src="https://res.cloudinary.com/dabmttnpz/video/upload/v1779742386/kling_20260526_Image_to_Video__956_0_efm61s.mp4"
      type="video/mp4"
    />
  </video>

  <div className="education-overlay"></div>
      <motion.h2
        className="text-3xl font-bold text-center text-teal-500 uppercase mb-2"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      style={{ color: "white" }}>
        EDUCATION
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
              date={edu.duration}
              icon={<FaGraduationCap />}
              iconStyle={{
                background:
                  "linear-gradient(135deg, #00bfa6 0%, #0077ff 100%)",
                color: "#fff",
              }}
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
            >
              <h3 className="timeline-title">{edu.title}</h3>

              <h4 className="timeline-subtitle">{edu.subtitle}</h4>

              {edu.course && (
                <p className="course-name">{edu.course}</p>
              )}

              <div className="education-meta">
                <p style={{ color: "#083e8a" }}>
                  <strong>Duration:</strong> {edu.duration}
                </p>

                {edu.passingYear && (
                  <p style={{ color: "#083e8a" }}>
                    <strong>Passing Year:</strong> {edu.passingYear}
                  </p>
                )}

                {edu.cgpa && (
                  <p style={{ color: "#083e8a" }}>
                    <strong>CGPA:</strong> {edu.cgpa}
                  </p>
                )}

                {edu.marks && (
                  <p style={{ color: "#083e8a" }}>
                    <strong>Marks:</strong> {edu.marks}
                  </p>
                )}
              </div>

              {edu.subjects && edu.subjects.length > 0 && (
                <>
                  <h5 className="subject-heading">
                    Relevant Coursework
                  </h5>

                  <ul className="edu-list">
                    {edu.subjects.map((subject, i) => (
                      <li key={i}>{subject}</li>
                    ))}
                  </ul>
                </>
              )}
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default Education;