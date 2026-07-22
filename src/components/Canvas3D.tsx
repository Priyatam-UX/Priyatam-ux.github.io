'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  color: string;
}

function WaveGrid({ color }: SceneProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 3600; // 60x60 grid

  // Generate static X/Z grid positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const space = 0.35;
    let i = 0;
    for (let x = -30; x < 30; x++) {
      for (let z = -30; z < 30; z++) {
        pos[i] = x * space;      // X
        pos[i + 1] = 0;          // Y (modified dynamically)
        pos[i + 2] = z * space;  // Z
        i += 3;
      }
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const pointer = state.pointer; // Pointer coordinates [-1, 1]
    const geom = pointsRef.current.geometry;
    const positionAttr = geom.attributes.position;
    const arr = positionAttr.array as Float32Array;

    let i = 0;
    for (let x = -30; x < 30; x++) {
      for (let z = -30; z < 30; z++) {
        const posX = arr[i];
        const posZ = arr[i + 2];

        // Ripple/distort height based on distance from mouse coordinates
        // Scale mouse pointer to 3D coordinate space coordinates (approx)
        const targetX = pointer.x * 12;
        const targetZ = pointer.y * 8;
        const dist = Math.sqrt((posX - targetX) ** 2 + (posZ - targetZ) ** 2);

        // Sine wave calculations
        const wave1 = Math.sin(posX * 0.2 + time * 1.2) * 0.4;
        const wave2 = Math.cos(posZ * 0.25 + time * 0.9) * 0.3;
        
        // Ripple push-down or pull-up from mouse hover
        const mouseInfluence = Math.sin(dist - time * 3) * Math.max(0, 2 - dist * 0.2) * 0.25;

        arr[i + 1] = wave1 + wave2 + mouseInfluence;
        i += 3;
      }
    }
    positionAttr.needsUpdate = true;

    // Slow rotation
    pointsRef.current.rotation.y = Math.sin(time * 0.04) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={color}
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function FloatingShape({ color }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { width } = useThree().viewport;
  const [scrollOffset, setScrollOffset] = useState(0);

  // Monitor scroll for interactive 3D rotation offsets
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setScrollOffset(scrollPercent);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMobile = width < 8;
  const position: [number, number, number] = isMobile ? [0, -1.8, 0] : [2.5, 0, 0];
  const scale = isMobile ? 0.95 : 1.35;

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Combine normal time rotation with scroll-based rotation
      meshRef.current.rotation.x = Math.sin(time / 4) * 0.15 + scrollOffset * 2.0;
      meshRef.current.rotation.y = time / 5 + scrollOffset * 1.5;
      meshRef.current.rotation.z = Math.cos(time / 4) * 0.15;

      // Mouse drag reactions
      const pointer = state.pointer;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, position[0] + pointer.x * 0.5, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1] + pointer.y * 0.5, 0.05);
    }
  });

  return (
    <Float speed={2.0} rotationIntensity={1.4} floatIntensity={1.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.15}
          metalness={0.55}
          distort={0.45}
          speed={3.0}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
    </Float>
  );
}

export default function Canvas3D({ color }: SceneProps) {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 6, 9], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color={color} />
        {/* Full screen background grid wave */}
        <WaveGrid color={color} />
        {/* Floating primary interactive geometry */}
        <FloatingShape color={color} />
      </Canvas>
    </div>
  );
}
