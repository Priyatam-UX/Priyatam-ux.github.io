'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  const loadingTexts = [
    'INITIALIZING SYSTEM...',
    'ESTABLISHING CONNECTION...',
    'LOADING NEURAL NETWORK...',
    'RENDERING 3D ENVIRONMENT...',
    'ACCESS GRANTED.'
  ];

  useEffect(() => {
    // Progress bar simulation over 4 seconds
    const duration = 4000;
    const intervalTime = 40; // update every 40ms
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = (currentStep / totalSteps) * 100;
      setProgress(currentProgress > 100 ? 100 : currentProgress);
      
      // Update text based on progress
      if (currentProgress < 20) setTextIndex(0);
      else if (currentProgress < 45) setTextIndex(1);
      else if (currentProgress < 70) setTextIndex(2);
      else if (currentProgress < 95) setTextIndex(3);
      else setTextIndex(4);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
        }, 600); // Wait a tiny bit at 100% before fading out
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={(definition) => {
            if (definition === 'exit' || !isLoading) {
              onComplete?.();
            }
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#020208',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'var(--skin-color)',
            fontFamily: 'var(--font-mono), monospace',
          }}
        >
          {/* Cyberpunk Scanner Box */}
          <div style={{
            position: 'relative',
            width: '300px',
            height: '240px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}>
            {/* Corner brackets */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderTop: '2px solid var(--skin-color)', borderLeft: '2px solid var(--skin-color)' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: 20, height: 20, borderTop: '2px solid var(--skin-color)', borderRight: '2px solid var(--skin-color)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 20, height: 20, borderBottom: '2px solid var(--skin-color)', borderLeft: '2px solid var(--skin-color)' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderBottom: '2px solid var(--skin-color)', borderRight: '2px solid var(--skin-color)' }} />
            
            {/* Percentage */}
            <motion.div
              style={{
                fontSize: '4rem',
                fontWeight: 800,
                color: '#fff',
                textShadow: '0 0 20px var(--skin-color)',
                marginBottom: '10px'
              }}
            >
              {Math.floor(progress)}<span style={{ fontSize: '2rem', color: 'var(--skin-color)' }}>%</span>
            </motion.div>

            {/* Loading text with scan glitch */}
            <motion.div
              key={textIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontSize: '0.75rem',
                letterSpacing: '2px',
                textAlign: 'center',
                height: '20px'
              }}
            >
              {loadingTexts[textIndex]}
            </motion.div>

            {/* Progress bar container */}
            <div style={{
              position: 'absolute',
              bottom: 40,
              width: '80%',
              height: '4px',
              backgroundColor: 'rgba(6,182,212,0.1)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              {/* Progress bar fill */}
              <motion.div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: 'var(--skin-color)',
                  boxShadow: '0 0 10px var(--skin-color)',
                }}
              />
            </div>
            
            {/* Decorative data lines */}
            <div style={{ position: 'absolute', bottom: -30, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', opacity: 0.5 }}>
              <span style={{ fontSize: '0.55rem' }}>SYS.BOOT_SEQ</span>
              <span style={{ fontSize: '0.55rem' }}>OVR.RIDE_000</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
