import React from "react";
import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { SiReact, SiNodedotjs, SiMongodb } from "react-icons/si";
import "react-vertical-timeline-component/style.min.css";
import "./Work.css";

const experiences = [
  {
    id: 1,
    role: "Full Stack Developer Intern",
    company: "Cycoders' Club",
    period: "May 2025 - July 2025",
    description:
      "Leading development of scalable full-stack web applications. Working with React, Node.js, and MongoDB to deliver end-to-end solutions.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    icon: <SiReact />,
    link: "https://www.cycoders.in/",
  },
  {
    id: 2,
    role: "Machine Learning Intern",
    company:"Worked on building and optimizing machine learning models for various projects, including natural language processing and computer vision applications. Collaborated with cross-functional teams to integrate ML solutions into production environments.",
    period: "2026",
    description:
      "Developed responsive, user-centric UIs using React and Material UI. Collaborated with designers and backend developers for seamless integration.",
    tech: ["Python", "Flask", "fastAPI", "TensorFlow","PyTorch","scikit-learn"],
    icon: <SiNodedotjs />,
    link: "https://www.codsoft.in/",
  }
];

const WorkExp = () => {
  return (
  <div className="work" id="work">
  <video
    className="work-bg-video"
    autoPlay
    loop
    muted
    playsInline
  >
    <source
      src="https://res.cloudinary.com/dabmttnpz/video/upload/v1781196560/Transition_through_deep_space_202606112158_a4xj0l.mp4"
      type="video/mp4"
    />
  </video>

  <div className="work-overlay"></div>

      <div className="container work-exp">
        <motion.h2
          className="text-center text-uppercase"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Work Experience
        </motion.h2>
        <hr />
        <VerticalTimeline lineColor="#138781">
          {experiences.map((exp) => (
            <VerticalTimelineElement
              key={exp.id}
              contentStyle={{
                background: "linear-gradient(135deg, #ffffff, #e8f7f6)",
                color: "#1e1e2c",
                boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                borderRadius: "15px",
              }}
              contentArrowStyle={{
                borderRight: "7px solid #ffffff",
              }}
              date={exp.period}
              iconStyle={{
                background:
                  "linear-gradient(135deg, #138781 0%, #0eb6a5 100%)",
                color: "#fff",
                boxShadow: "0 0 20px rgba(19,135,129,0.5)",
              }}
              icon={exp.icon}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="vertical-timeline-element-title">{exp.role}</h3>
                <h4 className="vertical-timeline-element-subtitle">
                  {exp.company}
                </h4>
                <p>{exp.description}</p>
                <div className="tech-tags">
                  {exp.tech.map((tech, index) => (
                    <span key={index} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noreferrer"
                  className="exp-btn"
                >
                  View Details
                </a>
              </motion.div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default WorkExp;
