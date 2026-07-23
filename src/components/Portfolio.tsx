'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import TiltCard from './TiltCard';

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
import styles from './Portfolio.module.css';

const projects = [
  {
    title: 'JobPilot AI',
    github: 'https://github.com/Priyatam-UX/JobPilot-AI',
    live: 'https://jobspilotai.space/',
    bgGradient: 'linear-gradient(45deg, #0f172a, #1e3a8a, #312e81, #0f172a)',
    tags: ['Python', 'FastAPI', 'React', 'Neon DB', 'LangGraph'],
    description: 'Enterprise AI-powered job application assistant automating search discovery, ATS optimization, and multi-agent workflows.',
  },
  {
    title: 'StadiumPilot AI',
    github: 'https://github.com/Priyatam-UX/StadiumPilotBot',
    live: 'https://stadiumpilot-bot.vercel.app/',
    bgGradient: 'linear-gradient(45deg, #1e1b4b, #4c1d95, #7e22ce, #1e1b4b)',
    tags: ['JavaScript', 'React', 'SVG Anim', 'Gemini 1.5'],
    description: 'AI command center and decision-support platform for large-scale tournament venues integrating live telemetry and Gemini AI.',
  },
  {
    title: 'MonsoonShield AI',
    github: 'https://github.com/Priyatam-UX/MonsoonShield-AI',
    live: 'https://monsoon-shield-ai.vercel.app/',
    bgGradient: 'linear-gradient(45deg, #064e3b, #047857, #0f766e, #064e3b)',
    tags: ['TypeScript', 'Tailwind v4', 'PWA', 'Gemini Vision'],
    description: 'Preparedness and citizen assistance platform with real-time risk evaluations, offline PWA access, and AI safety overlays.',
  },
  {
    title: 'Personal Cooking Planner',
    github: 'https://github.com/Priyatam-UX/Personal-Cooking-Planner',
    live: 'https://personal-cooking-planner.vercel.app/',
    bgGradient: 'linear-gradient(45deg, #7c2d12, #ea580c, #b45309, #7c2d12)',
    tags: ['JavaScript', 'Gemini API', 'Glassmorphism'],
    description: 'Client-side AI micro-app to generate custom daily cooking plans tailored to budget, diet, and existing pantry ingredients.',
  },
];

export default function Portfolio() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 },
    },
  } as const;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="section-title">
        <h2>Portfolio</h2>
      </div>

      <div className="hud-scrollable">
        <div className={styles.headingBlock}>
          <h3>My Last Projects :</h3>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className={styles.portfolioGrid}
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="laser-card" style={{ height: '100%' }}>
                <TiltCard className={`${styles.projectCard} laser-card-content`}>
                  <div 
                    className={styles.animatedBg}
                    style={{ 

                      width: '100%', 
                      height: '100%', 
                      background: project.bgGradient,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      padding: '25px'
                    }}
                  >
                    <h4 className={styles.projTitle}>{project.title}</h4>
                    <p className={styles.projDesc}>{project.description}</p>
                    
                    <div className={styles.tags}>
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className={styles.tagPill}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className={styles.links}>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkIcon}
                        aria-label={`View code for ${project.title}`}
                      >
                        <GithubIcon size={20} />
                        <span>Code</span>
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.linkIcon}
                          aria-label={`Live Demo of ${project.title}`}
                        >
                          <ExternalLink size={20} />
                          <span>Live</span>
                        </a>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
