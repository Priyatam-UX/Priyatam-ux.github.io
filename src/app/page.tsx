'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
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

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [currentColor, setCurrentColor] = useState('#06b6d4'); // Default skin color (cyan)

  // Track active section during scroll using IntersectionObserver
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Activates when section is centered in viewport
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
      {/* Dynamic 3D WebGL Constellation Background */}
      <Canvas3D color={currentColor} />

      {/* Trailing cursor spotlight */}
      <CursorGlow />

      {/* Floating Theme Controller */}
      <ThemeToggle currentColor={currentColor} setCurrentColor={setCurrentColor} />

      {/* Floating Top Navigation */}
      <Navbar activeSection={activeSection} setActiveSection={handleNavigate} />

      {/* Page Sections Stacking Content Wrapper */}
      <div className="stack-container interactive-content">
        <section className="stack-section" id="home">
          <div className="content-inner">
            <Hero onNavigate={handleNavigate} skinColor={currentColor} />
          </div>
        </section>

        <section className="stack-section" id="about">
          <div className="content-inner">
            <About />
          </div>
        </section>

        <section className="stack-section" id="services">
          <div className="content-inner">
            <Services />
          </div>
        </section>

        <section className="stack-section" id="portfolio">
          <div className="content-inner">
            <Portfolio />
          </div>
        </section>

        <section className="stack-section" id="contact">
          <div className="content-inner">
            <Contact />
          </div>
        </section>
      </div>
    </main>
  );
}
