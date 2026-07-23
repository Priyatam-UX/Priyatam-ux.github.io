'use client';

import { motion } from 'framer-motion';
import { Award, Trophy, ShieldCheck, Star, Target, Zap } from 'lucide-react';
import TiltCard from './TiltCard';
import styles from './Services.module.css'; // Keep using the same CSS module name for ease, or I'll create Achievements.module.css

const achievements = [
  {
    icon: ShieldCheck,
    title: 'ServiceNow CSA',
    date: '2022',
    desc: 'Certified System Administrator. Mastered core configuration, administration, and implementation of ServiceNow platform capabilities.',
  },
  {
    icon: Target,
    title: 'ServiceNow CAD',
    date: '2023',
    desc: 'Certified Application Developer. Demonstrated expertise in designing, building, and deploying custom applications on the Now Platform.',
  },
  {
    icon: Trophy,
    title: 'Sony Hackathon',
    date: '2021',
    desc: 'Top Innovator Award. Built and deployed a scalable Deep Learning pipeline using Python, AWS, and Sony Neural Network Libraries.',
  },
  {
    icon: Star,
    title: 'InMorphis Excellence',
    date: '2023',
    desc: 'Recognized for outstanding delivery of complex API integrations and automating business-critical processes with 100% accuracy.',
  },
  {
    icon: Zap,
    title: 'Open Source Contributor',
    date: 'Ongoing',
    desc: 'Active contributor to multiple open-source repositories focusing on modern web development, UI/UX libraries, and developer tools.',
  },
  {
    icon: Award,
    title: 'LPU Hackathon',
    date: '2019',
    desc: 'First Place Winner. Developed a full-stack emergency response tracking application under a 24-hour deadline.',
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
