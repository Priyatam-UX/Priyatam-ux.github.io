'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ThemeToggle from '@/components/ThemeToggle';
import CursorGlow from '@/components/CursorGlow';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';

// Dynamically import the 3D Canvas with SSR disabled to prevent Node compile errors
const Canvas3D = dynamic(() => import('@/components/Canvas3D'), { ssr: false });

interface StackSectionProps {
  id: string;
  children: React.ReactNode;
}

// Ultra-premium 3D perspective scroll stacking section wrapper
function StackSection({ id, children }: StackSectionProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  // Shrinks card, tilts it in 3D, and fades it as the next section slides over it
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <motion.section
      ref={targetRef}
      id={id}
      style={{ scale, rotateX, opacity }}
      className="stack-section"
    >
      <div className="content-inner">{children}</div>
    </motion.section>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [currentColor, setCurrentColor] = useState('#06b6d4'); // Default: Neon Cyan

  // Track active section during scroll using IntersectionObserver
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="main-wrapper">
      {/* Scroll-flight 3D Constellation background */}
      <Canvas3D color={currentColor} />

      {/* Trailing snapping cursor glow */}
      <CursorGlow />

      {/* Floating Theme Controller */}
      <ThemeToggle currentColor={currentColor} setCurrentColor={setCurrentColor} />

      {/* Floating Top Navigation */}
      <Navbar activeSection={activeSection} setActiveSection={handleNavigate} />

      {/* Page Sections 3D Stacking Wrapper */}
      <div className="stack-container interactive-content">
        <StackSection id="home">
          <Hero onNavigate={handleNavigate} skinColor={currentColor} />
        </StackSection>

        <StackSection id="about">
          <About />
        </StackSection>

        <StackSection id="services">
          <Services />
        </StackSection>

        <StackSection id="portfolio">
          <Portfolio />
        </StackSection>

        <StackSection id="contact">
          <Contact />
        </StackSection>
      </div>
    </main>
  );
}
