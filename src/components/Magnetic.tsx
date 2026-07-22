'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticProps {
  children: React.ReactElement;
}

export default function Magnetic({ children }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate distance of cursor from the center of the element
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    // Damping factor: pull is capped for a natural snapping feel
    const cap = 20;
    const dragX = Math.max(-cap, Math.min(cap, x * 0.35));
    const dragY = Math.max(-cap, Math.min(cap, y * 0.35));

    setPosition({ x: dragX, y: dragY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 0.1 }}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
}
