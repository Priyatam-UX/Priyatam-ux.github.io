'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '@/components/Sidebar';
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
  const [currentColor, setCurrentColor] = useState('#ec1839'); // Default skin color (red)

  // Track active section during scroll using IntersectionObserver
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Activates when section is centered in viewport
      threshold: 0.1,
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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="main-wrapper">
      {/* Dynamic 3D WebGL background */}
      <Canvas3D color={currentColor} />

      {/* Trailing cursor spotlight */}
      <CursorGlow />

      {/* Floating Theme Controller */}
      <ThemeToggle currentColor={currentColor} setCurrentColor={setCurrentColor} />

      {/* Navigation Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={handleNavigate} />

      {/* Page Sections Content Wrapper */}
      <div className="content-wrapper interactive-content">
        <Hero onNavigate={handleNavigate} />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </div>
    </main>
  );
}
