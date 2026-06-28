"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { FiExternalLink, FiGithub } from "react-icons/fi"
import { useTheme } from "../contexts/ThemeContext"

const projects = [
  {
    id: 1,
    title: "MAIRA",
    description: "An AI-powered multi-agent research assistant for deep research, literature surveys, and professional report generation with real-time chat, RAG document retrieval, and multi-model support.",
    image: "/maira.png?height=200&width=300",
    tech: ["React", "FastAPI", "LangGraph", "Supabase", "RAG"],
    githubUrl: "https://github.com/Bhuvansai-16/MAIRA",
  },
  {
    id: 2,
    title: "Automatic Grammar Checker",
    description: "An AI-powered grammar correction tool that detects and fixes grammatical errors in English text. This application provides users with a corrected version of their input text and optionally highlights the errors for easy comparison.",
    image: "/image2.jpg?height=200&width=300",
    tech: ["React","Python","LLM", "FastAPI", "Supabase","NLP"],
    liveUrl: "",
    githubUrl: "https://github.com/Bhuvansai-16/Grammar_Checker.git",
  },
  {
    id: 3,
    title: "Automated Book Publisher",
    description: "A web application that automates the process of publishing books, including formatting and distribution.Built for creators, educators, and knowledge publishers who want fast and intelligent control over book workflows.",
    image: "/image4.png?height=200&width=300",
    tech: ["Python", "Streamlit", "Gemini Api","ChromaDB","NLP"],
    liveUrl: "https://automatedbookpublisher-5ygieavx9nppc6x9zlwdep.streamlit.app/",
    githubUrl: "https://github.com/Bhuvansai-16/Automated_Book_Publisher.git",
  },
  {
    id: 4,
    title: "Heart Disease Prediction - Admin Dashboard",
    description: "A web application to predict heart disease risk, register patients, store results, and download PDF reports.Especially designed for Admins.",
    image: "/image3.png?height=200&width=300",
    tech: ["Python", "Pandas", "SQLlite","Numpy","Streamlit","reportlab","Machine Learning"],
    liveUrl: "https://heart-disease-predicter-dfwa4lfqwfccvpyd3h6s.streamlit.app/",
    githubUrl: "https://github.com/Bhuvansai-16/HeartDiseaseprediction.git",
  },
  {
    id: 5,
    title: "Board Vision Detection",
    description: "Real-time Sign Board Detection,using CNN and 43 different classes for training.",
    image: "/image6.png?height=200&width=300",
    tech: ["Opencv","CNN", "Tensorflow", "GUI","DeepLearning"],
    githubUrl: "https://github.com/Bhuvansai-16/Board_Vision_Detection.git",
  },
  {
    id: 6,
    title: "Smart Medical bot",
    description: "Intelligent chatbot which helps you with your medical analysis. You can provide prescription and perform QandA.",
    image: "/image7.png?height=200&width=300",
    tech: ["Python","Langchain","FAISS","Gemini API", "Fastapi", "React","MistralOCR","RAG"],
    liveUrl: "",
    githubUrl: "https://github.com/Bhuvansai-16/HealthBot.git",
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <section id="projects" className="py-16 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 sm:mb-16 p-6 text-white">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="backdrop-blur-sm rounded-lg overflow-hidden border bg-white/10 border-white/20 hover:border-white/40 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-sm text-white/70">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded text-xs bg-white/10 text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FiExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </motion.a>
                    )}
                    <motion.a
                      href={project.githubUrl}
                      className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiGithub className="w-4 h-4" />
                      <span>Code</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="w-full flex justify-center mt-8">
        <a
          href="https://github.com/Bhuvansai-16"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg sm:text-xl md:text-2xl font-semibold underline underline-offset-4 decoration-2 hover:decoration-4 transition-all duration-200 text-white"
        >
          View more projects
        </a>
      </div>
    </section>
  )
}
