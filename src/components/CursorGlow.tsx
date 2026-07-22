'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  // Large background cursor glow coordinates only (ring removed – too intrusive)
  const bgMouseX = useMotionValue(-1000);
  const bgMouseY = useMotionValue(-1000);
  const bgSpringConfig = { damping: 60, stiffness: 90, mass: 1.2 };
  const bgGlowX = useSpring(bgMouseX, bgSpringConfig);
  const bgGlowY = useSpring(bgMouseY, bgSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      bgMouseX.set(e.clientX);
      bgMouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [bgMouseX, bgMouseY]);

  return (
    /* Subtle ambient glow that follows the mouse – no cursor override */
    <motion.div
      className="cursor-glow"
      style={{ left: bgGlowX, top: bgGlowY }}
    />
  );
}
