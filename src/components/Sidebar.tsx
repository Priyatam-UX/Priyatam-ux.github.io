'use client';

import { useState } from 'react';
import { Home, User, List, Briefcase, Phone, Globe, Menu, X } from 'lucide-react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'services', label: 'Services', icon: List },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Toggler */}
      <button
        className={`${styles.toggler} ${isOpen ? styles.togglerActive : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Sidebar container */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div>
          <a href="#home" className={styles.logo} onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>
            <span>P</span>ortfolio
          </a>
          
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
                    <Icon className={styles.navIcon} />
                    {item.label}
                  </a>
                </li>
              );
            })}
            
            {/* Blog External Link */}
            <li>
              <a
                href="https://pritu2478.wixsite.com/priyatam"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navLink}
              >
                <Globe className={styles.navIcon} />
                Blog
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.footerText}>
          <p>© {new Date().getFullYear()} Priyatam</p>
          <p>Created with Next.js & 3D WebGL</p>
        </div>
      </aside>
    </>
  );
}
