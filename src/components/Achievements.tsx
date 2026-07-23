'use client';

import { motion } from 'framer-motion';
import { Award, Trophy, Star, Target, Code, Flame, Bot, Globe } from 'lucide-react';
import TiltCard from './TiltCard';
import styles from './Services.module.css'; // Keep using the same CSS module name for ease, or I'll create Achievements.module.css

const achievements = [
  {
    icon: Trophy,
    title: 'Smart India Hackathon',
    date: '2019',
    desc: 'Grand Finale Participant in one of the world\'s largest open innovation models.',
  },
  {
    icon: Star,
    title: 'InterviewBit Top Scorer',
    date: 'LPU',
    desc: 'Top Scorer with 40,000+ points on the competitive programming platform from LPU University.',
  },
  {
    icon: Code,
    title: 'CodeNcounter 4.0',
    date: 'Finalist',
    desc: 'Finalist in the CodeNcounter 4.0 competitive programming competition.',
  },
  {
    icon: Award,
    title: 'Campus Coding Contests',
    date: 'Winner',
    desc: 'Winner of 4+ campus-level coding and algorithmic problem-solving contests.',
  },
  {
    icon: Target,
    title: 'Microsoft FutureX Hackathon',
    date: 'Finalist',
    desc: 'Finalist in the Microsoft FutureX Hackathon organized by UpGrad.',
  },
  {
    icon: Flame,
    title: 'National Hackathons',
    date: '10+ Events',
    desc: 'Actively participated in over 10 national-level hackathons, building diverse and innovative solutions.',
  },
  {
    icon: Bot,
    title: 'Google Build With AI',
    date: 'Runner Up',
    desc: 'Runner Up in the Google / Promptwars Build With AI Hackathon.',
  },
  {
    icon: Globe,
    title: 'Browser-Use Hackathon',
    date: 'Runner Up',
    desc: 'Runner Up in the Browser-Use Hackathon: Go-To-Market (GTM) Edition.',
  },
];

export default function Achievements() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 120 },
    },
  } as const;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="section-title">
        <h2>Achievements</h2>
      </div>

      <div className="hud-scrollable">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className={styles.servicesGrid}
        >
          {achievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <div className="laser-card">
                  <TiltCard className={`${styles.serviceCard} laser-card-content`}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: '15px' 
                    }}>
                      <div className={styles.iconContainer} style={{ margin: 0 }}>
                        <Icon className={styles.icon} />
                      </div>
                      <span style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '0.7rem',
                        color: 'var(--skin-color)',
                        backgroundColor: 'var(--skin-glow)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        letterSpacing: '1px'
                      }}>
                        {item.date}
                      </span>
                    </div>
                    
                    <h4 className={styles.cardTitle} style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
                      {item.title}
                    </h4>
                    
                    <p className={styles.cardDesc} style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                      {item.desc}
                    </p>
                    
                    {/* Decorative cyber lines */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, var(--skin-color), transparent)',
                      opacity: 0.3
                    }} />
                  </TiltCard>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
