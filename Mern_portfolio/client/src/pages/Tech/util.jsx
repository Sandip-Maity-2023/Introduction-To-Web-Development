import { BsFiletypeHtml, BsFiletypeCss, BsBootstrap } from "react-icons/bs";
import { FaNodeJs } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import {
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiFigma,
  SiAdobexd,
  SiAdobephotoshop,
  SiMongodb,
  SiMysql,
  SiTypescript,
  SiGithub,
  SiWordpress,
  SiFirebase,
  SiDocker,
  SiExpress,
} from "react-icons/si";

export const TechstackList = [
  {
    _id: 1,
    name: "HTML",
    icon: BsFiletypeHtml,
    category: "Frontend",
    experience: 3,
  },
  {
    _id: 2,
    name: "CSS/SCSS",
    icon: BsFiletypeCss,
    category: "Frontend",
    experience: 3,
  },
  {
    _id: 3,
    name: "Bootstrap",
    icon: BsBootstrap,
    category: "Frontend",
    experience: 2,
  },
  {
    _id: 4,
    name: "JavaScript",
    icon: SiJavascript,
    category: "Frontend",
    experience: 3,
  },
  {
    _id: 5,
    name: "TypeScript",
    icon: SiTypescript,
    category: "Frontend",
    experience: 2,
  },
  {
    _id: 7,
    name: "React JS",
    icon: SiReact,
    category: "Frontend",
    experience: 2,
  },
  {
    _id: 10,
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    category: "Frontend",
    experience: 2,
  },

  // Design
  { _id: 11, name: "Figma", icon: SiFigma, category: "Design", experience: 2 },
  {
    _id: 12,
    name: "Adobe XD",
    icon: SiAdobexd,
    category: "Design",
    experience: 1.5,
  },
  {
    _id: 13,
    name: "Photoshop",
    icon: SiAdobephotoshop,
    category: "Design",
    experience: 3,
  },

  // Mobile
  {
    _id: 14,
    name: "React Native",
    icon: SiReact,
    category: "Mobile",
    experience: 1.5,
  },

  // Backend
  {
    _id: 15,
    name: "Node JS",
    icon: FaNodeJs,
    category: "Backend",
    experience: 2,
  },
  {
    _id: 16,
    name: "Express JS",
    icon: SiExpress,
    category: "Backend",
    experience: 2,
  },
  {
    _id: 17,
    name: "WordPress",
    icon: SiWordpress,
    category: "Backend",
    experience: 2,
  },

  // Database
  {
    _id: 18,
    name: "MongoDB",
    icon: SiMongodb,
    category: "Database",
    experience: 2,
  },
  {
    _id: 19,
    name: "MySQL",
    icon: SiMysql,
    category: "Database",
    experience: 1.5,
  },
  {
    _id: 20,
    name: "Firebase",
    icon: SiFirebase,
    category: "Database",
    experience: 1.5,
  },

  // Tools / DevOps
  {
    _id: 21,
    name: "Git / GitHub",
    icon: SiGithub,
    category: "Tools",
    experience: 2.5,
  },
  {
    _id: 22,
    name: "Docker",
    icon: SiDocker,
    category: "DevOps",
    experience: 1,
  },
];
