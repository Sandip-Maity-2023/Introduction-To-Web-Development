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
      "Developed a scalable university management system using the MERN stack, supporting 200+ student records, with secure JWT authentication and modular REST APIs. • Optimized React components, reducing page load time by 25% and improving UI responsiveness across devices.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    icon: <SiReact />,
    link: "https://www.cycoders.in/",
  },
  {
    id: 2,
    role: "Machine Learning Intern",
    company:"Codsoft Technologies",
    period: "2026",
    description:
      " Worked on Machine Learning and Deep Learning projects involving NLP, preprocessing, feature engineering, model training and evaluation using Python, Scikit-learn, TensorFlow, and Keras. • Built and deployed ML applications using Flask, FastAPI, Streamlit, Docker and Google Colab for real-time prediction and interactive visualization.",
    tech: ["Python", "Flask", "fastAPI", "TensorFlow","PyTorch","scikit-learn"],
    icon: <SiNodedotjs />,
    link: "https://www.codsoft.in/",
    certificate: "https://drive.google.com/file/d/1Pv5DZWbkY2sGzEHjm5MWG3i3ZvYSbNf_/preview",
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
                  <a href={exp.link} target="_blank" rel="noreferrer" style={{color: "sky", textDecoration: "none"}}>
                    {exp.company}
                  </a>
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
                  href={exp.certificate}
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
