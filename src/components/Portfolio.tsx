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
    title: 'Wildfire Tracker',
    github: 'https://github.com/Priyatam-UX/Wildfire-Tracker',
    image: '/images/portfolio/wildfire1.jpg',
    tags: ['React', 'NASA API', 'Google Maps API'],
    description: 'Real-time wildfire tracker application utilizing NASA API data to plot wildfire events on a Google Maps interface.',
  },
  {
    title: 'Real-time Pizza Tracker',
    github: 'https://github.com/Priyatam-UX/Real-time-pizza-tracker',
    image: '/images/portfolio/pizza1.jpg',
    tags: ['Node.js', 'Express', 'MongoDB', 'Socket.io'],
    description: 'A full-stack pizza ordering application featuring a real-time order tracking dashboard driven by web sockets.',
  },
  {
    title: 'Facebook Clone',
    github: 'https://github.com/Priyatam-UX/fb-clone',
    image: '/images/portfolio/fb1.jpg',
    tags: ['React.js', 'Firebase', 'Context API'],
    description: 'A social media web app clone featuring Google authentication, real-time post feeds, and media uploads.',
  },
  {
    title: 'Shopping Website',
    github: 'https://github.com/priyatam-ux/shopping-website',
    image: '/images/portfolio/shopping.jpg',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    description: 'Responsive frontend e-commerce shopping template showing products catalog, details page, and shopping cart logic.',
  },
  {
    title: 'Travelling Website',
    github: 'https://github.com/priyatam-ux/Travelling-',
    image: '/images/portfolio/travel.jpg',
    tags: ['React.js', 'RWD', 'CSS Modules'],
    description: 'An elegant frontend travel booking agency concept platform showcasing travel destinations and interactive bookings.',
  },
  {
    title: 'Face Recognition Attendance',
    github: 'https://github.com/Priyatam-UX/Face-Recognition-Attendance-System',
    image: '/images/portfolio/facerec.jpg',
    tags: ['Python', 'OpenCV', 'Face Recognition', 'Tkinter'],
    description: 'Computer vision desktop app that automates attendance taking using facial recognition models and spreadsheet logging.',
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
    <div style={{ width: '100%' }}>
      <div className="container">
        <div className="section-title">
          <h2>Portfolio</h2>
        </div>

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
                  <div className={styles.imgWrapper}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className={styles.projectImg}
                    />
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
                            aria-label={`View code for ${project.title}`}
                          >
                            <GithubIcon size={20} />
                            <span>Code</span>
                          </a>
                        </div>
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
