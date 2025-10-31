import React from "react"
import {MdSchool} from "react-icons/md";
import {verticalTimeline,verticalTimelineElement} from "react-vertical-timeline-component";
import {motion} from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import "./Education.css";

const Education=()=>{
    return(
        <section className="education-section" id="education">
            <motion.h2 className="text-4xl font-bold text-center text-teal-600 uppercase mb-2" initial={{opacity:0,y:-30}} whileInView={{opacity:1,y:0}} transition={{duration:0.5}}>
                Education Details
            </motion.h2>

            <motion.hr className="mx-auto border-t-4 border-teal-500 w-56 mb-8"
            initial={{scale:0}}
            whileInView={{scaleX:1}}
            transition={{duration:0.6}}
            />

            <verticalTimeline>
                {education}
            </verticalTimeline>
        </section>
    )
}
export default Education;
