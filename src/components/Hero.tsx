'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, ChevronsDown } from 'lucide-react';
import Terminal from './Terminal';
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

  // Scroll parallax for fade out
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

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
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 100 },
    },
  } as const;

  return (
    <motion.div 
      style={{ opacity: heroOpacity, scale: heroScale, width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center' }}
    >
      <div style={{ width: '100%' }}>
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
            
            <motion.h1 variants={itemVariants} className={styles.profession}>
              And I'm a <br />
              <span className={styles.typedText}>{currentText}</span>
              <span className={styles.cursor}>|</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className={styles.description}>
              I'm a Software Engineer specializing in designing, testing, and developing modern full-stack web architectures and automated workflow integrations.
              Highly skilled in creating high-performance systems and interactive user experiences.
            </motion.p>
            
            <motion.div variants={itemVariants} className={styles.buttons}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                }}
                className="btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
              >
                Hire Me <ArrowRight size={18} />
              </a>
              <a
                href="https://drive.google.com/file/d/1NHG5iGIcBxhZsjK3E01aDchSZ5XTcXy-/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnSecondary}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
              >
                Download CV <Download size={18} />
              </a>
            </motion.div>
          </div>
          
          {/* Cyber Interactive CLI Console Terminal */}
          <div className={styles.heroVisual}>
            <Terminal skinColor={skinColor} />
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className={styles.scrollIndicator}
        onClick={() => onNavigate('about')}
      >
        <span>Scroll Down</span>
        <ChevronsDown className={styles.scrollArrow} size={18} />
      </motion.div>
    </motion.div>
  );
}
