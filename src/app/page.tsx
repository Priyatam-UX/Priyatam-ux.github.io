'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ThemeToggle from '@/components/ThemeToggle';
import CursorGlow from '@/components/CursorGlow';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
import FloatingPhotoGallery from '@/components/FloatingPhotoGallery';

// Dynamically import the 3D Canvas with SSR disabled to prevent Node compile errors
const Canvas3D = dynamic(() => import('@/components/Canvas3D'), { ssr: false });

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [currentColor, setCurrentColor] = useState('#06b6d4');
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const transitionConfig = { duration: 0.4, ease: 'easeOut' } as const;

  if (!mounted) {
    return (
      <main className="main-wrapper">
        <Canvas3D color={currentColor} activeSection={activeSection} />
        <CursorGlow />
        <ThemeToggle currentColor={currentColor} setCurrentColor={setCurrentColor} />
        <Navbar activeSection={activeSection} setActiveSection={handleNavigate} />
      </main>
    );
  }

  return (
    <main className="main-wrapper">
      {/* 3D cosmos planetary flight background */}
      <Canvas3D color={currentColor} activeSection={activeSection} />

      {/* Ambient cursor glow */}
      <CursorGlow />

      {/* Floating Theme Controller (bottom-right) */}
      <ThemeToggle currentColor={currentColor} setCurrentColor={setCurrentColor} />

      {/* Floating Top Navigation */}
      <Navbar activeSection={activeSection} setActiveSection={handleNavigate} />

      {/* ── RIGHT-SIDE FLOATING PHOTO CARDS (only on home, desktop) ── */}
      {!isMobile && (
        <AnimatePresence>
          {activeSection === 'home' && (
            <motion.div
              key="photo-gallery"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
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
          /* Mobile View: Stack sections sequentially */
          <div style={{ padding: '80px 0 20px 0' }}>
            <div id="home" className="hud-wrapper">
              <div className="hud-panel">
                <Hero onNavigate={handleNavigate} skinColor={currentColor} />
              </div>
            </div>
            <div id="about" className="hud-wrapper hud-wrapper-right">
              <div className="hud-panel">
                <About />
              </div>
            </div>
            <div id="services" className="hud-wrapper">
              <div className="hud-panel">
                <Services />
              </div>
            </div>
            <div id="portfolio" className="hud-wrapper hud-wrapper-right">
              <div className="hud-panel">
                <Portfolio />
              </div>
            </div>
            <div id="contact" className="hud-wrapper">
              <div className="hud-panel">
                <Contact />
              </div>
            </div>
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

            {activeSection === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={transitionConfig}
                className="hud-wrapper"
              >
                <div className="hud-panel">
                  <Services />
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
    </main>
  );
}
