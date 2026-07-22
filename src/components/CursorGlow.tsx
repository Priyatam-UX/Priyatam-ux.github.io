'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  // 1. Large background cursor glow coordinates
  const bgMouseX = useMotionValue(-1000);
  const bgMouseY = useMotionValue(-1000);
  const bgSpringConfig = { damping: 45, stiffness: 120, mass: 0.8 };
  const bgGlowX = useSpring(bgMouseX, bgSpringConfig);
  const bgGlowY = useSpring(bgMouseY, bgSpringConfig);

  // 2. Foreground custom cursor ring coordinates
  const ringMouseX = useMotionValue(-1000);
  const ringMouseY = useMotionValue(-1000);
  const ringSpringConfig = { damping: 28, stiffness: 220, mass: 0.35 };
  const ringX = useSpring(ringMouseX, ringSpringConfig);
  const ringY = useSpring(ringMouseY, ringSpringConfig);

  // 3. Center dot coordinates
  const [dotPos, setDotPos] = useState({ x: -1000, y: -1000 });

  // 4. Snapping status & styling dimensions
  const [isSnapping, setIsSnapping] = useState(false);
  const [snapStyles, setSnapStyles] = useState({
    width: 28,
    height: 28,
    borderRadius: '50%',
  });

  useEffect(() => {
    // Hide standard cursor on desktops to support the custom tracking ring
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    if (isDesktop) {
      document.body.style.cursor = 'none';
      const style = document.createElement('style');
      style.innerHTML = `
        a, button, input, textarea, [role="button"], .chip, [data-theme-color] {
          cursor: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Update background coordinates
      bgMouseX.set(clientX);
      bgMouseY.set(clientY);
      
      // Update dot coordinates
      setDotPos({ x: clientX, y: clientY });

      // Update ring coordinate target if not snapped to a button box
      if (!isSnapping) {
        ringMouseX.set(clientX - 14); // center the 28px width
        ringMouseY.set(clientY - 14); // center the 28px height
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Detect interactive tags or custom chips
      const interactive = target.closest('a, button, input, textarea, [role="button"], .chip, [data-theme-color]');
      
      if (interactive) {
        setIsSnapping(true);
        const rect = interactive.getBoundingClientRect();
        
        // Lock ring target coordinates to target element bounds
        ringMouseX.set(rect.left - 4);
        ringMouseY.set(rect.top - 4);

        // Inherit exact border-radius of the target element
        const borderRad = window.getComputedStyle(interactive).borderRadius;

        setSnapStyles({
          width: rect.width + 8,
          height: rect.height + 8,
          borderRadius: borderRad || '4px',
        });
      } else {
        setIsSnapping(false);
        setSnapStyles({
          width: 28,
          height: 28,
          borderRadius: '50%',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [bgMouseX, bgMouseY, ringMouseX, ringMouseY, isSnapping]);

  return (
    <>
      {/* 1. Large background glow spotlight */}
      <motion.div
        className="cursor-glow"
        style={{
          left: bgGlowX,
          top: bgGlowY,
        }}
      />

      {/* 2. Custom Snapping pointer ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          width: snapStyles.width,
          height: snapStyles.height,
          borderRadius: snapStyles.borderRadius,
          border: '1.5px solid var(--skin-color)',
          boxShadow: '0 0 10px var(--skin-glow)',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'screen',
        }}
        animate={{
          width: snapStyles.width,
          height: snapStyles.height,
          borderRadius: snapStyles.borderRadius,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 25 }}
      />

      {/* 3. Custom center pointer dot */}
      <div
        style={{
          position: 'fixed',
          left: dotPos.x - 3,
          top: dotPos.y - 3,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: 'var(--skin-color)',
          boxShadow: '0 0 8px var(--skin-color)',
          pointerEvents: 'none',
          zIndex: 100000,
          opacity: isSnapping ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}
      />
    </>
  );
}
