import React from "react";
import { motion } from "framer-motion";
import "./ExperienceTimeline.css";

export default function ExperienceTimeline({ sections, theme }) {
  console.log("TIMELINE SECTION RECEIVED:", sections);
  console.log("EXPERIENCES:", sections.experiences);

  const section = sections; // sekarang 1 object, bukan array

  return (
    <div className="timeline-wrapper">

      <h2 className="timeline-title" style={{ color: theme.text }}>
        {section.title}
      </h2>

      <div className="timeline-vertical-line"></div>

      <div className="timeline-items">
        {section.experiences.map((exp, index) => {
          
          let logo = null;
          try {
            logo = require(`../../assests/images/${exp.logo_path}`);
          } catch (e) {
            console.warn("Image not found:", exp.logo_path);
          }

          return (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="timeline-dot" />

              <div
                className="timeline-card"
                style={{
                  background: theme.body,
                  borderLeft: `6px solid ${exp.color}`,
                  boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                }}
              >
                {logo && (
                  <div className="timeline-card-logo">
                    <img src={logo} alt="" />
                  </div>
                )}

                <div className="timeline-card-header">
                  <h3 style={{ color: theme.text }}>{exp.title}</h3>

                  <p>
                    <a
                      href={exp.company_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: theme.text }}
                    >
                      {exp.company}
                    </a>
                  </p>

                  <p style={{ color: theme.secondaryText }}>
                    {exp.duration} — {exp.location}
                  </p>
                </div>

                <p style={{ color: theme.secondaryText }}>
                  {exp.description}
                </p>

                {exp.features?.length > 0 && (
                  <ul>
                    {exp.features.map((f, idx) => (
                      <li key={idx} style={{ color: theme.secondaryText }}>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
