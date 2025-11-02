import React, { useState } from "react";
import { motion } from "framer-motion";
import { TechstackList } from "./util.jsx";
import "./Tech.css";

const Techstack = () => {
  const [category, setCategory] = useState("All");

  // extract categories dynamically
  const categories = ["All", ...new Set(TechstackList.map((item) => item.category || "Other"))];

  const filteredList =
    category === "All"
      ? TechstackList
      : TechstackList.filter((tech) => tech.category === category);

  return (
    <section id="techstack" className="techstack-container">
      {/* Title */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="techstack-title">🧠 Technologies Stack</h2>
        <hr className="techstack-divider" />
        <div className="techstack-subtitle">
          Including programming languages, frameworks, databases, frontend & backend tools, and APIs
        </div>
      </motion.div>

      {/* Filter buttons */}
      <div className="techstack-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`techstack-filter-btn ${category === cat ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tech Cards Grid */}
      <motion.div
        className="techstack-grid"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
        }}
      >
        {filteredList.map((tech) => (
          <motion.div
            key={tech._id}
            className="tech-card"
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            <div className="tech-icon-container">
              <tech.icon className="tech-icon" />
            </div>
            <h5 className="tech-name">{tech.name}</h5>
            {tech.experience && (
              <div className="tech-experience">{tech.experience} yrs experience</div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Techstack;
