'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ThemeToggle from '@/components/ThemeToggle';
import CursorGlow from '@/components/CursorGlow';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Achievements from '@/components/Achievements';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
import FloatingPhotoGallery from '@/components/FloatingPhotoGallery';
import Preloader from '@/components/Preloader';

// Dynamically import the 3D Canvas with SSR disabled to prevent Node compile errors
const Canvas3D = dynamic(() => import('@/components/Canvas3D'), { ssr: false });

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [currentColor, setCurrentColor] = useState('#06b6d4');
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [appReady, setAppReady] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setAppReady(true);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    if (isMobile) {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const offsetPosition = elementRect - bodyRect - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  const transitionConfig = { duration: 1.5, ease: [0.22, 1, 0.36, 1] } as const;

  if (!mounted) {
    return (
      <main className="main-wrapper">
        <Preloader />
        <Canvas3D color={currentColor} activeSection={activeSection} />
        <CursorGlow />
      </main>
    );
  }

  return (
    <main className="main-wrapper">
      <Preloader onComplete={handlePreloaderComplete} />

      {/* 3D cosmos planetary flight background */}
      <Canvas3D color={currentColor} activeSection={activeSection} />

      {/* Ambient cursor glow */}
      <CursorGlow />

      {appReady && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }} // exceptionally smooth, slow fade
          style={{ width: '100%', height: '100%' }}
        >
          {/* Floating Theme Controller (bottom-right) */}
          <ThemeToggle currentColor={currentColor} setCurrentColor={setCurrentColor} />

          {/* Floating Top Navigation */}
          <Navbar activeSection={activeSection} setActiveSection={handleNavigate} />

          {/* ── RIGHT-SIDE FLOATING PHOTO CARDS (Desktop Only) ── */}
          {!isMobile && (
            <AnimatePresence>
              {activeSection === 'home' && (
                <motion.div
                  key="photo-gallery"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  style={{
                    position: 'fixed',
                    // Sits in the right half, vertically centered
                    top: '50%',
                    left: '58%',
                    transform: 'translate(0, -50%)',
                    width: 380,
                    height: 440,
                    zIndex: 12,
                    pointerEvents: 'auto',
                  }}
                >
                  <FloatingPhotoGallery />
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* ── RESPONSIVE LAYOUT ROUTER ── */}
          <div className="interactive-content">
            {isMobile ? (
              /* Mobile View: Stack sections sequentially with scroll reveal */
              <div style={{ padding: '80px 0 20px 0', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <motion.div id="home" className="hud-wrapper" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
                  <div className="hud-panel">
                    <Hero onNavigate={handleNavigate} skinColor={currentColor} />
                  </div>
                </motion.div>
                
                {/* Mobile Photo Gallery */}
                <motion.div className="hud-wrapper hud-wrapper-right" style={{ minHeight: '400px' }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
                  <div className="hud-panel" style={{ padding: 0, position: 'relative' }}>
                    <FloatingPhotoGallery />
                  </div>
                </motion.div>

                <motion.div id="about" className="hud-wrapper hud-wrapper-right" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
                  <div className="hud-panel">
                    <About />
                  </div>
                </motion.div>
                <motion.div id="achievements" className="hud-wrapper" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
                  <div className="hud-panel">
                    <Achievements />
                  </div>
                </motion.div>
                <motion.div id="portfolio" className="hud-wrapper hud-wrapper-right" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
                  <div className="hud-panel">
                    <Portfolio />
                  </div>
                </motion.div>
                <motion.div id="contact" className="hud-wrapper" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
                  <div className="hud-panel">
                    <Contact />
                  </div>
                </motion.div>
              </div>
            ) : (
              /* Desktop View: Cinematic 3D HUD Panels */
              <AnimatePresence mode="wait">
                {activeSection === 'home' && (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={transitionConfig}
                    className="hud-wrapper"
                  >
                    <div className="hud-panel">
                      <Hero onNavigate={handleNavigate} skinColor={currentColor} />
                    </div>
                  </motion.div>
                )}

                {activeSection === 'about' && (
                  <motion.div
                    key="about"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={transitionConfig}
                    className="hud-wrapper hud-wrapper-right"
                  >
                    <div className="hud-panel">
                      <About />
                    </div>
                  </motion.div>
                )}

                {activeSection === 'achievements' && (
                  <motion.div
                    key="achievements"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={transitionConfig}
                    className="hud-wrapper"
                  >
                    <div className="hud-panel">
                      <Achievements />
                    </div>
                  </motion.div>
                )}

                {activeSection === 'portfolio' && (
                  <motion.div
                    key="portfolio"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={transitionConfig}
                    className="hud-wrapper hud-wrapper-right"
                  >
                    <div className="hud-panel">
                      <Portfolio />
                    </div>
                  </motion.div>
                )}

                {activeSection === 'contact' && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={transitionConfig}
                    className="hud-wrapper"
                  >
                    <div className="hud-panel">
                      <Contact />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      )}
    </main>
  );
}
