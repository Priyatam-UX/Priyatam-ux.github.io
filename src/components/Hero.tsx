'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import styles from './Hero.module.css';

interface HeroProps {
  onNavigate: (section: string) => void;
}

const words = ['Full-Stack Developer', 'Software Engineer', 'Web Designer', 'Tech Blogger'];

export default function Hero({ onNavigate }: HeroProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const word = words[currentWordIndex];

    if (!isDeleting) {
      // Typing
      timer = setTimeout(() => {
        setCurrentText(word.substring(0, currentText.length + 1));
        setTypingSpeed(100);
      }, typingSpeed);

      if (currentText === word) {
        // Pause at completion
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      // Deleting
      timer = setTimeout(() => {
        setCurrentText(word.substring(0, currentText.length - 1));
        setTypingSpeed(50);
      }, typingSpeed);

      if (currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setTypingSpeed(150);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 120 },
    },
  } as const;

  return (
    <section className="section" id="home">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={styles.heroGrid}
        >
          <div className={styles.heroContent}>
            <motion.h3 variants={itemVariants} className={styles.hello}>
              Hello, I'm <span className={styles.name}>Priyatam</span>
            </motion.h3>
            
            <motion.h2 variants={itemVariants} className={styles.profession}>
              And I'm a <span className={styles.typedText}>{currentText}</span>
              <span className={styles.cursor}>|</span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className={styles.description}>
              I'm a Software Engineer with hands-on experience designing, testing, and developing modern full-stack web applications.
              Highly skilled in creating high-quality systems, integrations, and user interfaces with a strong foundation in data structures and algorithms.
            </motion.p>
            
            <motion.div variants={itemVariants} className={styles.buttons}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                }}
                className="btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                Hire Me <ArrowRight size={18} />
              </a>
              <a
                href="https://drive.google.com/file/d/1NHG5iGIcBxhZsjK3E01aDchSZ5XTcXy-/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btnSecondary}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                Download CV <Download size={18} />
              </a>
            </motion.div>
          </div>
          
          {/* Empty spacer on desktop to make room for R3F 3D geometry floating in space */}
          <div className={styles.heroVisual} />
        </motion.div>
      </div>
    </section>
  );
}
