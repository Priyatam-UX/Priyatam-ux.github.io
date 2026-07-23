'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, User, List, Briefcase, Phone, Globe, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  // 3D Tilt Logic for Avatar Logo
  const logoRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['25deg', '-25deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-25deg', '25deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'achievements', label: 'Achievements', icon: List },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    setActiveSection(id);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <a
          ref={logoRef}
          href="#home"
          className={styles.brand}
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
        >
          <motion.img 
            src="/images/3d laptop.png" 
            alt="3D Developer Avatar" 
            className={styles.avatarImage} 
            style={{ rotateX, rotateY }}
            fetchPriority="high"
          />
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontWeight: 800,
              fontSize: '1.2rem',
              letterSpacing: '1px',
              color: 'var(--text-color)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            PRIYATAM
            <motion.span
              animate={{ color: ['var(--skin-color)', '#ffffff', 'var(--skin-color)'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{ color: 'var(--skin-color)' }}
            >
              .UX
            </motion.span>
          </motion.div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className={styles.navList}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                >
                  <Icon size={16} />
                  {item.label}
                </a>
              </li>
            );
          })}

          {/* External Blog Link */}
          <li>
            <a
              href="https://pritu2478.wixsite.com/priyatam"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navLink}
            >
              <Globe size={16} />
              Blog
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          className={styles.hamburger}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100vh - 80px)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={styles.mobileMenu}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
                >
                  <Icon size={20} />
                  {item.label}
                </a>
              );
            })}

            <a
              href="https://pritu2478.wixsite.com/priyatam"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileNavLink}
            >
              <Globe size={20} />
              Blog
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          transformOrigin: 'left',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          backgroundColor: 'var(--skin-color)',
          boxShadow: '0 0 10px var(--skin-color)',
          zIndex: 1002,
        }}
      />
    </nav>
  );
}
