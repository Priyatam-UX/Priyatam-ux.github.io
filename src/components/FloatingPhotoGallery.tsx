'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Photo3DCardProps {
  src: string;
  alt: string;
  label: string;
  sublabel: string;
  index: number;
  style?: React.CSSProperties;
}

function Photo3DCard({ src, alt, label, sublabel, index, style }: Photo3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 160, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 160, damping: 20 });

  const floatY = useMotionValue(0);
  const springFloat = useSpring(floatY, { stiffness: 50, damping: 12 });

  useEffect(() => {
    let frame: number;
    let t = index * 1.5; // offset phase per card
    const animate = () => {
      t += 0.015;
      floatY.set(Math.sin(t) * 9);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [floatY, index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    rotateY.set(dx * 16);
    rotateX.set(-dy * 16);
    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 0.3,
    });
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
        perspective: 900,
        ...style,
      }}
      initial={{ opacity: 0, scale: 0.7, y: 60 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.7, y: 40 }}
      transition={{ delay: index * 0.18, type: 'spring', stiffness: 100, damping: 20 }}
      whileHover={{ scale: 1.04, zIndex: 100 }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '14px',
          overflow: 'hidden',
          border: '1px solid rgba(6,182,212,0.28)',
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.04),
            0 24px 70px rgba(0,0,0,0.92),
            0 0 40px rgba(6,182,212,0.10)
          `,
          background: 'rgba(6,6,18,0.97)',
          transformStyle: 'preserve-3d',
          cursor: 'default',
        }}
      >
        {/* Photo */}
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          priority={index === 0}
        />

        {/* Bottom gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(2,2,12,0.94) 0%, rgba(2,2,12,0.35) 45%, transparent 100%)',
          zIndex: 2,
        }} />

        {/* Top gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(2,2,12,0.5) 0%, transparent 30%)',
          zIndex: 2,
        }} />

        {/* Neon corner brackets */}
        {[
          { top: 10, left: 10, borderTop: true, borderLeft: true },
          { top: 10, right: 10, borderTop: true, borderRight: true },
          { bottom: 10, left: 10, borderBottom: true, borderLeft: true },
          { bottom: 10, right: 10, borderBottom: true, borderRight: true },
        ].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 20, height: 20,
            zIndex: 5,
            opacity: 0.75,
            ...Object.fromEntries(
              Object.entries(pos)
                .filter(([k]) => ['top','bottom','left','right'].includes(k))
                .map(([k,v]) => [k, v])
            ),
            borderTop: pos.borderTop ? '2px solid var(--skin-color)' : undefined,
            borderBottom: pos.borderBottom ? '2px solid var(--skin-color)' : undefined,
            borderLeft: pos.borderLeft ? '2px solid var(--skin-color)' : undefined,
            borderRight: pos.borderRight ? '2px solid var(--skin-color)' : undefined,
            borderTopLeftRadius: pos.top !== undefined && pos.left !== undefined ? 4 : undefined,
            borderTopRightRadius: pos.top !== undefined && pos.right !== undefined ? 4 : undefined,
            borderBottomLeftRadius: pos.bottom !== undefined && pos.left !== undefined ? 4 : undefined,
            borderBottomRightRadius: pos.bottom !== undefined && pos.right !== undefined ? 4 : undefined,
          }} />
        ))}

        {/* Scan-line sweep animation */}
        <motion.div
          animate={{ y: ['0%', '100%'] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
          style={{
            position: 'absolute', left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--skin-color), transparent)',
            opacity: 0.35, zIndex: 6, top: 0,
          }}
        />

        {/* Label badge */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '14px 16px', zIndex: 7,
        }}>
          <p style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '0.68rem', color: 'var(--skin-color)',
            letterSpacing: '3px', textTransform: 'uppercase',
            margin: 0, marginBottom: 2,
          }}>
            {'>'} {label}
          </p>
          <p style={{
            fontSize: '0.72rem', color: 'rgba(200,210,225,0.65)',
            margin: 0, fontFamily: 'var(--font-mono), monospace',
            letterSpacing: '1px',
          }}>
            {sublabel}
          </p>
        </div>

        {/* Dynamic glare */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)`,
          transition: 'opacity 0.2s ease',
          zIndex: 8, pointerEvents: 'none',
        }} />
      </div>
    </motion.div>
  );
}

const PHOTOS = [
  {
    src: '/images/speaking.jpg',
    alt: 'Priyatam speaking at BrowserStack StackConnect',
    label: 'Speaker',
    sublabel: 'BrowserStack StackConnect · Bengaluru',
  },
  {
    src: '/images/convocation.jpg',
    alt: 'Priyatam receiving degree at LPU Convocation',
    label: 'Priyatam',
    sublabel: 'LPU Convocation Ceremony',
  },
];

export default function FloatingPhotoGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 340,
        height: 420,
        zIndex: 15,
        pointerEvents: 'auto',
      }}
    >
      {PHOTOS.map((photo, i) => {
        const isActive = i === activeIndex;
        return (
          <motion.div
            key={i}
            onClick={() => setActiveIndex(i)}
            animate={{
              top: isActive ? 0 : 55,
              left: isActive ? 0 : 55,
              width: isActive ? 290 : 260,
              height: isActive ? 360 : 320,
              rotate: isActive ? -3 : 6,
              zIndex: isActive ? 2 : 1,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            style={{ 
              position: 'absolute', 
              cursor: isActive ? 'default' : 'pointer',
              transformOrigin: 'center center'
            }}
          >
            <Photo3DCard {...photo} index={i} style={{ width: '100%', height: '100%' }} />
          </motion.div>
        );
      })}
    </div>
  );
}
