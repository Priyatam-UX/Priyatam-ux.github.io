'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Home, User, List, Briefcase, Phone, Globe, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();

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
          href="#home"
          className={styles.logo}
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
        >
          <img src="/images/anime_avatar.jpg" alt="Priyatam 3D Anime Avatar" className={styles.avatarImage} />
          <div><span>P</span>ortfolio</div>
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
