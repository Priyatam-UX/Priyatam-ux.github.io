'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function TiltCard({ children, className = '', style = {} }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  // Motion values for x/y mouse positions on card [0, 1]
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth out rotation with spring physics
  const rotateX = useSpring(useTransform(y, [0, 1], [12, -12]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-12, 12]), { damping: 20, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Relative position on the card
    const relativeX = (e.clientX - rect.left) / rect.width;
    const relativeY = (e.clientY - rect.top) / rect.height;

    x.set(relativeX);
    y.set(relativeY);

    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        position: 'relative',
        ...style,
      }}
      className={`glass ${className}`}
    >
      {/* Hover glow effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(250px circle at ${glowPos.x}px ${glowPos.y}px, var(--skin-glow) 0%, transparent 80%)`,
          opacity: isHovered ? 1 : 0,
          pointerEvents: 'none',
          borderRadius: 'inherit',
          zIndex: 1,
          transition: 'opacity 0.3s ease',
        }}
      />
      <div style={{ transform: 'translateZ(15px)', zIndex: 2, position: 'relative', width: '100%', height: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
}
