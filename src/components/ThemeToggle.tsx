'use client';

import { useState, useEffect, useRef } from 'react';
import { Settings, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  currentColor: string;
  setCurrentColor: (color: string) => void;
}

const colors = [
  { hex: '#ec1839', name: 'red', glow: 'rgba(236, 24, 57, 0.15)' },
  { hex: '#2196f3', name: 'blue', glow: 'rgba(33, 150, 243, 0.15)' },
  { hex: '#fa5b0f', name: 'orange', glow: 'rgba(250, 91, 15, 0.15)' },
  { hex: '#72b626', name: 'green', glow: 'rgba(114, 182, 38, 0.15)' },
  { hex: '#e91e63', name: 'pink', glow: 'rgba(233, 30, 99, 0.15)' },
];

export default function ThemeToggle({ currentColor, setCurrentColor }: ThemeToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true); // Default to Dark mode for futuristic portfolio
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  // Set default theme state on mount
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'dark';
    setIsDark(theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme);

    const savedColor = localStorage.getItem('skin-color') || '#ec1839';
    const colorObj = colors.find((c) => c.hex === savedColor) || colors[0];
    setCurrentColor(colorObj.hex);
    document.documentElement.style.setProperty('--skin-color', colorObj.hex);
    document.documentElement.style.setProperty('--skin-glow', colorObj.glow);
  }, [setCurrentColor]);

  const toggleTheme = () => {
    const nextTheme = !isDark ? 'dark' : 'light';
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const handleColorChange = (hex: string, glow: string) => {
    setCurrentColor(hex);
    document.documentElement.style.setProperty('--skin-color', hex);
    document.documentElement.style.setProperty('--skin-glow', glow);
    localStorage.setItem('skin-color', hex);
  };

  return (
    <div className={styles.switcherContainer} ref={panelRef}>
      {/* Theme Toggle Button */}
      <button className={styles.floatingBtn} onClick={toggleTheme} aria-label="Toggle Dark/Light Mode">
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Settings Panel Toggle Button */}
      <button className={styles.floatingBtn} onClick={() => setIsOpen(!isOpen)} aria-label="Open Settings Panel">
        <Settings size={20} className={styles.gearIcon} />
      </button>

      {/* Settings Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={`${styles.panel} glass`}
          >
            <div className={styles.themeSection}>
              <h4>Theme Colors</h4>
              <div className={styles.colors}>
                {colors.map((c) => (
                  <button
                    key={c.name}
                    className={`${styles.colorDot} ${currentColor === c.hex ? styles.colorDotActive : ''}`}
                    style={{ backgroundColor: c.hex }}
                    onClick={() => handleColorChange(c.hex, c.glow)}
                    aria-label={`Switch theme color to ${c.name}`}
                  />
                ))}
              </div>
            </div>

            <div className={styles.toggleRow}>
              <span>Light/Dark Mode</span>
              <button
                className={styles.floatingBtn}
                style={{ width: 35, height: 35, boxShadow: 'none' }}
                onClick={toggleTheme}
                aria-label="Toggle Theme Mode"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
