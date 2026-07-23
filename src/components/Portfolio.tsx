'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import TiltCard from './TiltCard';

const Portfolio3DScenes = dynamic(() => import('./Portfolio3DScenes'), { ssr: false });

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
    id: 'jobpilot',
    title: 'JobPilot AI',
    github: 'https://github.com/Priyatam-UX/JobPilot-AI',
    live: 'https://jobspilotai.space/',
    themeColor: '#1e3a8a',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    tags: ['Python', 'FastAPI', 'React', 'Neon DB', 'LangGraph'],
    description: 'Enterprise AI-powered job application assistant automating search discovery, ATS optimization, and multi-agent workflows.',
  },
  {
    id: 'stadiumpilot',
    title: 'StadiumPilot AI',
    github: 'https://github.com/Priyatam-UX/StadiumPilotBot',
    live: 'https://stadiumpilot-bot.vercel.app/',
    themeColor: '#7e22ce',
    image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=800&auto=format&fit=crop',
    tags: ['JavaScript', 'React', 'SVG Anim', 'Gemini 1.5'],
    description: 'AI command center and decision-support platform for large-scale tournament venues integrating live telemetry and Gemini AI.',
  },
  {
    id: 'monsoonshield',
    title: 'MonsoonShield AI',
    github: 'https://github.com/Priyatam-UX/MonsoonShield-AI',
    live: 'https://monsoon-shield-ai.vercel.app/',
    themeColor: '#047857',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=800&auto=format&fit=crop',
    tags: ['TypeScript', 'Tailwind v4', 'PWA', 'Gemini Vision'],
    description: 'Preparedness and citizen assistance platform with real-time risk evaluations, offline PWA access, and AI safety overlays.',
  },
  {
    id: 'cookingplanner',
    title: 'Personal Cooking Planner',
    github: 'https://github.com/Priyatam-UX/Personal-Cooking-Planner',
    live: 'https://personal-cooking-planner.vercel.app/',
    themeColor: '#ea580c',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4f?q=80&w=800&auto=format&fit=crop',
    tags: ['JavaScript', 'Gemini API', 'Glassmorphism'],
    description: 'Client-side AI micro-app to generate custom daily cooking plans tailored to budget, diet, and existing pantry ingredients.',
  },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [show3D, setShow3D] = useState(false);
  
  // Delay mounting heavy WebGL contexts until completely after the 1.5s navigation animations finish
  useEffect(() => {
    const timer = setTimeout(() => setShow3D(true), 1600);
    return () => clearTimeout(timer);
  }, []);
  
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
    <div ref={containerRef} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
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
              <div className="laser-card" style={{ height: '100%', position: 'relative' }}>
                <TiltCard className={`${styles.projectCard} laser-card-content`}>
                  
                  {/* Localized 3D WebGL scenes acting as the card background */}
                  {show3D && <Portfolio3DScenes type={project.id} index={index} />}
                  
                  <div className={styles.overlay}>
                    <div className={styles.overlayContent}>
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
                          style={{ '--skin-color': project.themeColor, '--skin-glow': `${project.themeColor}88` } as React.CSSProperties}
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
                            style={{ '--skin-color': project.themeColor, '--skin-glow': `${project.themeColor}88` } as React.CSSProperties}
                            aria-label={`Live Demo of ${project.title}`}
                          >
                            <ExternalLink size={20} />
                            <span>Live</span>
                          </a>
                        )}
                      </div>
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
