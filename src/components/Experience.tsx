"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { FiExternalLink } from "react-icons/fi"

const experiences = [
  {
    id: 1,
    title: "AI and Research Intern",
    company: "GEOnius AI",
    duration: "Oct 2025 - Jan 2026",
    description: [
      "Built a GenAI-powered SEO automation platform analyzing brand visibility across AI search engines, enabling faster regional insights and reducing manual analysis effort by 60%.",
      "Developed a Website Assistant (Text-to-SQL Agent) that converts natural language queries into SQL to fetch live business metrics and generate contextual summaries.",
      "Designed and orchestrated multi-agent AI workflows using LangChain and LangGraph for enterprise-scale analytics and decision support.",
      "Implemented prompt engineering and agent orchestration strategies to improve response accuracy and reduce hallucinations.",
      "Collaborated with product and engineering teams to prototype and deploy systems to production.",
    ],
    certificateUrl: "https://www.linkedin.com/posts/bhuvansaich_generativeai-agenticai-langgraph-activity-7421390458561564672-uL-M?utm_source=share&utm_medium=member_desktop&rcm=ACoAADGzxwYBMZceC8jNprWu4VPJFrb5W9e1XA4",
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="py-16 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 sm:mb-16 text-white">
            Experience
          </h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="backdrop-blur-sm rounded-xl p-6 sm:p-8 border transition-all duration-300 bg-white/10 border-white/20 hover:border-white/40"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {exp.title}
                    </h3>
                    <p className="text-lg sm:text-xl font-medium text-white/80">
                      {exp.company}
                    </p>
                  </div>
                  <p className="text-sm sm:text-base mt-2 sm:mt-0 text-white/60">
                    {exp.duration}
                  </p>
                </div>

                {/* Description */}
                <ul className="space-y-3 mb-6">
                  {exp.description.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm sm:text-base text-white/80"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Certificate Button */}
                {exp.certificateUrl && (
                  <motion.a
                    href={exp.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-white/20 text-white border border-white/30 hover:bg-white/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiExternalLink className="w-4 h-4" />
                    View Certificate
                  </motion.a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
