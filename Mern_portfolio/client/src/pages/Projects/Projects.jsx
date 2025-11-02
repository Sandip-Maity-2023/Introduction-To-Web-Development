import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "./Projects.css";

const projects = [
  {
    id: 1,
    title: "Techinfoyt Shopping Website",
    type: "Full Stack",
    tech: ["Node", "Express", "React", "MongoDB"],
    image:
      "https://unctad.org/sites/default/files/2021-03/2021-03-15_eCommerceCOVID19report-1-1220x675px.jpg",
    github: "https://github.com/techinfo-youtube/ecommerce-app-2023",
    live: "#",
  },
  {
    id: 2,
    title: "Techinfoyt Coding App",
    type: "Mobile App",
    tech: ["React Native", "iOS / Android"],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR356D-1YtSagN4-_ZdjZ5H9o6PKUO4h12dvw&usqp=CAU",
    github: "https://github.com/techinfo-youtube/ecommerce-app-2023",
    live: "#",
  },
  {
    id: 3,
    title: "Techinfoyt Job Portal",
    type: "Backend",
    tech: ["Node", "Express", "NoSQL"],
    image:
      "https://www.nextwebi.com/assets/img/img-source/mobile-top-banner-28.png",
    github: "#",
    live: "#",
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
        ⚙️ Explore some of my featured projects built using cutting-edge
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
