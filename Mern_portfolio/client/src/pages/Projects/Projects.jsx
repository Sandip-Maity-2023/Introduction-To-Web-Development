import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "./Projects.css";

const projects = [
  {
    id: 1,
    title: "Research Mind",
    type: "Multi-Agent AI Research Assistant",
    tech: ["LangChain", "RAG", "AstraDB", "Streamlit"],
    image:
      "https://res.cloudinary.com/dabmttnpz/image/upload/v1781027335/i3_io5mke.jpg",
    github: "https://github.com/Sandip-Maity-2023/Advanced_Development/tree/main/multiAgent",
    live: "https://advanceddevelopment-5yzkdbhpswjca4zvggebhn.streamlit.app/",
  },
  {
    id: 2,
    title: "NewsSphere",
    type: "Cross-Platform News Aggregator",
    tech: ["React", "MongoDB", "Node.js", "Express"],
    image:
      "https://res.cloudinary.com/dabmttnpz/image/upload/v1781027336/i2_wxqd5k.jpg",
    github: "https://github.com/Sandip-Maity-2023/Introduction-To-Web-Development/tree/main/NewsPaper",
    live: "https://glistening-torrone-4e821f.netlify.app/",
  },
  {
    id: 3,
    title: "AI-Based Cataract Detection System",
    type: "Mobile app for cataract detection",
    tech: ["React Native", "TypeScript", "Firebase","PyTorch"],
    image:
      "https://res.cloudinary.com/dabmttnpz/image/upload/v1781027335/i1_h99n5o.jpg",
    github: "https://github.com/Sandip-Maity-2023/Mini_Project",
    live: "https://mini-project-mjx11f0dg-sandip-maity-2023s-projects.vercel.app/",
  },
];

const Projects = () => {
  return (
    <div className="container project" id="projects">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Top Recent Projects
      </motion.h2>
      <hr />
      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Explore some of my featured projects built using cutting-edge
        technologies across web, mobile, and backend.
      </motion.p>

      <div className="projects-grid">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="project-card"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <div className="card-img-wrapper">
              <img src={project.image} alt={project.title} className="card-img" />
              <span className="badge">{project.type}</span>
            </div>

            <div className="card-content">
              <h4>{project.title}</h4>
              <div className="tech-tags">
                {project.tech.map((tech, idx) => (
                  <span key={idx} className="tag">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="card-actions">
                <a href={project.github} target="_blank" rel="noreferrer">
                  <FaGithub /> Code
                </a>
                <a href={project.live} target="_blank" rel="noreferrer">
                  <FaExternalLinkAlt /> Live
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
