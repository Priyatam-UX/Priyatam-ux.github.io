'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import Terminal from './Terminal';
import Magnetic from './Magnetic';
import styles from './Hero.module.css';

interface HeroProps {
  onNavigate: (section: string) => void;
  skinColor: string;
}

const words = ['Full-Stack Developer', 'Software Engineer', 'ServiceNow Developer', 'Tech Blogger'];

export default function Hero({ onNavigate, skinColor }: HeroProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const word = words[currentWordIndex];

    if (!isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(word.substring(0, currentText.length + 1));
        setTypingSpeed(100);
      }, typingSpeed);

      if (currentText === word) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      timer = setTimeout(() => {
        setCurrentText(word.substring(0, currentText.length - 1));
        setTypingSpeed(50);
      }, typingSpeed);

      if (currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setTypingSpeed(120);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 22, stiffness: 110 },
    },
  } as const;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="hud-scrollable">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={styles.heroGrid}
        >
          {/* ── TOP: text content ─────────────────────── */}
          <div className={styles.heroContent}>
            <motion.h3 variants={itemVariants} className={styles.hello}>
              Hello, I'm <span className={styles.name}>Priyatam</span>
            </motion.h3>

            <motion.h1 variants={itemVariants} className={styles.profession}>
              And I'm a{' '}
              <span className={styles.typedText}>{currentText}</span>
              <span className={styles.cursor}>|</span>
            </motion.h1>

            <motion.p variants={itemVariants} className={styles.description}>
              Software Engineer specializing in full-stack web architectures, automated
              workflow integrations &amp; high-performance interactive experiences.
            </motion.p>

            <motion.div variants={itemVariants} className={styles.buttons}>
              <Magnetic>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
                  className="btn"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
                >
                  Hire Me <ArrowRight size={16} />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://drive.google.com/file/d/1NHG5iGIcBxhZsjK3E01aDchSZ5XTcXy-/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnSecondary}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
                >
                  Download CV <Download size={16} />
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* ── Interactive Terminal ───────────── */}
          <motion.div variants={itemVariants} className={styles.heroVisual}>
            <Terminal skinColor={skinColor} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
