import React from "react";
import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { SiReact, SiNodedotjs, SiMongodb } from "react-icons/si";
import "./Work.css";

const experiences = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "Techverse Innovations Pvt. Ltd.",
    period: "2023 - Present",
    description:
      "Leading development of scalable full-stack web applications. Working with React, Node.js, and MongoDB to deliver end-to-end solutions.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    icon: <SiReact />,
    link: "#",
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "XYZ Digital Solutions",
    period: "2020 - 2022",
    description:
      "Developed responsive, user-centric UIs using React and Material UI. Collaborated with designers and backend developers for seamless integration.",
    tech: ["React", "Redux", "Material UI"],
    icon: <SiNodedotjs />,
    link: "#",
  },
  {
    id: 3,
    role: "Junior Developer",
    company: "CodeCrafters Inc.",
    period: "2018 - 2020",
    description:
      "Assisted in building web interfaces, optimized components for performance, and contributed to the company’s internal tool ecosystem.",
    tech: ["HTML", "CSS", "JavaScript"],
    icon: <SiMongodb />,
    link: "#",
  },
];

const WorkExp = () => {
  return (
    <div className="work" id="work">
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
                <h3 className="vertical-timeline-element-title">
                  {exp.role}
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  {exp.company}
                </h4>
                <p>{exp.description}</p>
                <div className="tech-tags">
                  {exp.tech.map((t, i) => (
                    <span key={i} className="tag">
                      {t}
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
