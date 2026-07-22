'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import Image from 'next/image';

export default function ProfileCard3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  // Spring-smoothed rotation values
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 22 });

  // Floating animation state
  const floatY = useMotionValue(0);
  const springFloat = useSpring(floatY, { stiffness: 60, damping: 14 });

  useEffect(() => {
    // Gentle float loop
    let frame: number;
    let t = 0;
    const animate = () => {
      t += 0.018;
      floatY.set(Math.sin(t) * 7);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [floatY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    // Tilt ±14°
    rotateY.set(dx * 14);
    rotateX.set(-dy * 14);

    // Glare follows mouse
    const gx = ((e.clientX - rect.left) / rect.width) * 100;
    const gy = ((e.clientY - rect.top) / rect.height) * 100;
    setGlare({ x: gx, y: gy, opacity: 0.25 });
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        y: springFloat,
        transformStyle: 'preserve-3d',
        perspective: 800,
        cursor: 'default',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Card shell */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(6,182,212,0.30)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.9), 0 0 30px rgba(6,182,212,0.12)',
          background: 'linear-gradient(160deg, rgba(10,10,28,0.95) 0%, rgba(6,6,18,0.98) 100%)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Profile image */}
        <Image
          src="/images/hero.jpg"
          alt="Priyatam – Software Engineer"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          priority
        />

        {/* Gradient overlay at bottom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(2,2,10,0.92) 0%, rgba(2,2,10,0.3) 50%, transparent 100%)',
            zIndex: 2,
          }}
        />

        {/* Neon corner brackets */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          width: 24, height: 24,
          borderTop: '2px solid var(--skin-color)',
          borderLeft: '2px solid var(--skin-color)',
          zIndex: 4,
          opacity: 0.8,
        }} />
        <div style={{
          position: 'absolute', top: 12, right: 12,
          width: 24, height: 24,
          borderTop: '2px solid var(--skin-color)',
          borderRight: '2px solid var(--skin-color)',
          zIndex: 4,
          opacity: 0.8,
        }} />
        <div style={{
          position: 'absolute', bottom: 12, left: 12,
          width: 24, height: 24,
          borderBottom: '2px solid var(--skin-color)',
          borderLeft: '2px solid var(--skin-color)',
          zIndex: 4,
          opacity: 0.8,
        }} />
        <div style={{
          position: 'absolute', bottom: 12, right: 12,
          width: 24, height: 24,
          borderBottom: '2px solid var(--skin-color)',
          borderRight: '2px solid var(--skin-color)',
          zIndex: 4,
          opacity: 0.8,
        }} />

        {/* Animated scan line sweep */}
        <motion.div
          animate={{ y: ['0%', '100%'] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--skin-color), transparent)',
            opacity: 0.4,
            zIndex: 5,
            top: 0,
          }}
        />

        {/* Name badge at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '16px 18px',
            zIndex: 6,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.72rem',
              color: 'var(--skin-color)',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              margin: 0,
              marginBottom: 2,
            }}
          >
            &gt; Priyatam
          </p>
          <p
            style={{
              fontSize: '0.78rem',
              color: 'rgba(200,210,225,0.7)',
              margin: 0,
              fontFamily: 'var(--font-mono), monospace',
              letterSpacing: '1px',
            }}
          >
            Full-Stack Software Engineer
          </p>
        </div>

        {/* Dynamic glare highlight */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)`,
            transition: 'opacity 0.3s ease',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />
      </div>
    </motion.div>
  );
}
