'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function ParticleVortex() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 3000;
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const radius = 2 + Math.random() * 6;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 12;
      
      // Swirl shape
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      
      // Cyan to deep blue/purple gradient based on radius
      color.setHSL(0.5 + (radius / 15) * 0.4, 0.9, 0.6);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.06} 
        vertexColors 
        transparent 
        opacity={0.8} 
        sizeAttenuation 
        blending={THREE.AdditiveBlending} 
      />
    </points>
  );
}

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  const loadingTexts = [
    'INITIALIZING SYSTEM...',
    'ESTABLISHING CONNECTION...',
    'LOADING NEURAL NETWORK...',
    'RENDERING 3D ENVIRONMENT...',
    'ACCESS GRANTED.'
  ];

  useEffect(() => {
    // Progress bar simulation over 4 seconds
    const duration = 4000;
    const intervalTime = 40; // update every 40ms
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = (currentStep / totalSteps) * 100;
      setProgress(currentProgress > 100 ? 100 : currentProgress);
      
      // Update text based on progress
      if (currentProgress < 20) setTextIndex(0);
      else if (currentProgress < 45) setTextIndex(1);
      else if (currentProgress < 70) setTextIndex(2);
      else if (currentProgress < 95) setTextIndex(3);
      else setTextIndex(4);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
          // Trigger onComplete immediately so the main UI smooth-slides in WHILE the preloader fades out, creating a perfect crossfade
          onComplete?.();
        }, 600); // Wait a tiny bit at 100% before fading out
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#020208',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'var(--skin-color)',
            fontFamily: 'var(--font-mono), monospace',
            overflow: 'hidden',
          }}
        >
          {/* Genuine 3D WebGL Background for Preloader */}
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            opacity: 0.6
          }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <ParticleVortex />
            </Canvas>
          </div>

          {/* Cyberpunk Scanner Box */}
          <div style={{
            position: 'relative',
            width: '300px',
            zIndex: 10,
            height: '240px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}>
            {/* Corner brackets */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderTop: '2px solid var(--skin-color)', borderLeft: '2px solid var(--skin-color)' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: 20, height: 20, borderTop: '2px solid var(--skin-color)', borderRight: '2px solid var(--skin-color)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 20, height: 20, borderBottom: '2px solid var(--skin-color)', borderLeft: '2px solid var(--skin-color)' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderBottom: '2px solid var(--skin-color)', borderRight: '2px solid var(--skin-color)' }} />
            
            {/* Percentage */}
            <motion.div
              style={{
                fontSize: '4rem',
                fontWeight: 800,
                color: '#fff',
                textShadow: '0 0 20px var(--skin-color)',
                marginBottom: '10px'
              }}
            >
              {Math.floor(progress)}<span style={{ fontSize: '2rem', color: 'var(--skin-color)' }}>%</span>
            </motion.div>

            {/* Loading text with scan glitch */}
            <motion.div
              key={textIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontSize: '0.75rem',
                letterSpacing: '2px',
                textAlign: 'center',
                height: '20px'
              }}
            >
              {loadingTexts[textIndex]}
            </motion.div>

            {/* Progress bar container */}
            <div style={{
              position: 'absolute',
              bottom: 40,
              width: '80%',
              height: '4px',
              backgroundColor: 'rgba(6,182,212,0.1)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              {/* Progress bar fill */}
              <motion.div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: 'var(--skin-color)',
                  boxShadow: '0 0 10px var(--skin-color)',
                }}
              />
            </div>
            
            {/* Decorative data lines */}
            <div style={{ position: 'absolute', bottom: -30, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', opacity: 0.5 }}>
              <span style={{ fontSize: '0.55rem' }}>SYS.BOOT_SEQ</span>
              <span style={{ fontSize: '0.55rem' }}>OVR.RIDE_000</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
