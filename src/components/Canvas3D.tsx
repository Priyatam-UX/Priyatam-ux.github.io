'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  color: string;
}

function ConstellationNet({ color }: SceneProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const count = 90; // Number of floating nodes
  const maxDistance = 2.4; // Max distance to draw links

  // Generate random starting coordinates and velocities
  const [particles, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      // Distributed in 3D box
      pos[i] = (Math.random() - 0.5) * 16;     // X [-8, 8]
      pos[i + 1] = (Math.random() - 0.5) * 10; // Y [-5, 5]
      pos[i + 2] = (Math.random() - 0.5) * 5;  // Z [-2.5, 2.5]

      // Very slow drift speed
      vel[i] = (Math.random() - 0.5) * 0.015;
      vel[i + 1] = (Math.random() - 0.5) * 0.015;
      vel[i + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [pos, vel];
  }, []);

  // Pre-allocate a large line segments buffer
  const linePositions = useMemo(() => new Float32Array(count * 18 * 2 * 3), []);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const pointer = state.pointer; // Mouse pointer [-1, 1]
    
    // Scale pointer to 3D dimensions
    const mouseX = pointer.x * 8;
    const mouseY = pointer.y * 5;
    const mouseZ = 0;

    const ptsGeom = pointsRef.current.geometry;
    const ptsArr = ptsGeom.attributes.position.array as Float32Array;

    const linesGeom = linesRef.current.geometry;
    const linesArr = linesGeom.attributes.position.array as Float32Array;

    let lineIndex = 0;

    // 1. Move particles
    for (let i = 0; i < count * 3; i += 3) {
      ptsArr[i] += velocities[i];
      ptsArr[i + 1] += velocities[i + 1];
      ptsArr[i + 2] += velocities[i + 2];

      // Box boundaries bounce check
      if (Math.abs(ptsArr[i]) > 10) velocities[i] *= -1;
      if (Math.abs(ptsArr[i + 1]) > 6) velocities[i + 1] *= -1;
      if (Math.abs(ptsArr[i + 2]) > 4) velocities[i + 2] *= -1;

      // Mouse magnet: pull nodes slightly if close to mouse coordinates
      const dx = mouseX - ptsArr[i];
      const dy = mouseY - ptsArr[i + 1];
      const distToMouse = Math.sqrt(dx * dx + dy * dy);
      if (distToMouse < 2.5) {
        ptsArr[i] += dx * 0.006;
        ptsArr[i + 1] += dy * 0.006;
      }
    }
    ptsGeom.attributes.position.needsUpdate = true;

    // 2. Draw connections
    for (let i = 0; i < count; i++) {
      const ix = ptsArr[i * 3];
      const iy = ptsArr[i * 3 + 1];
      const iz = ptsArr[i * 3 + 2];

      // Check distance to other nodes
      for (let j = i + 1; j < count; j++) {
        const jx = ptsArr[j * 3];
        const jy = ptsArr[j * 3 + 1];
        const jz = ptsArr[j * 3 + 2];

        const dist = Math.sqrt((ix - jx) ** 2 + (iy - jy) ** 2 + (iz - jz) ** 2);
        
        if (dist < maxDistance && lineIndex < linePositions.length - 6) {
          linesArr[lineIndex] = ix;
          linesArr[lineIndex + 1] = iy;
          linesArr[lineIndex + 2] = iz;
          
          linesArr[lineIndex + 3] = jx;
          linesArr[lineIndex + 4] = jy;
          linesArr[lineIndex + 5] = jz;

          lineIndex += 6;
        }
      }

      // Check distance to mouse pointer and connect
      const distToMouse = Math.sqrt((ix - mouseX) ** 2 + (iy - mouseY) ** 2 + (iz - mouseZ) ** 2);
      if (distToMouse < 3.2 && lineIndex < linePositions.length - 6) {
        linesArr[lineIndex] = ix;
        linesArr[lineIndex + 1] = iy;
        linesArr[lineIndex + 2] = iz;
        
        linesArr[lineIndex + 3] = mouseX;
        linesArr[lineIndex + 4] = mouseY;
        linesArr[lineIndex + 5] = mouseZ;

        lineIndex += 6;
      }
    }

    // Set remaining buffer values to 0
    for (let k = lineIndex; k < linesArr.length; k++) {
      linesArr[k] = 0;
    }

    linesGeom.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      {/* Node points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.11}
          color={color}
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Network web lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function FloatingShape({ color }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { width } = useThree().viewport;
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setScrollOffset(scrollPercent || 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMobile = width < 8;
  // Position shape slightly more to the right, floating off center
  const position: [number, number, number] = isMobile ? [0, -1.8, 0] : [2.6, 0.2, 0];
  const scale = isMobile ? 0.9 : 1.3;

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      meshRef.current.rotation.x = Math.sin(time / 4) * 0.15 + scrollOffset * 2.0;
      meshRef.current.rotation.y = time / 5 + scrollOffset * 1.5;
      meshRef.current.rotation.z = Math.cos(time / 4) * 0.15;

      const pointer = state.pointer;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, position[0] + pointer.x * 0.4, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1] + pointer.y * 0.4, 0.05);
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.15}
          metalness={0.6}
          distort={0.4}
          speed={2.8}
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
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color={color} />
        {/* Floating Constellation Net */}
        <ConstellationNet color={color} />
        {/* Floating Glass Geometry */}
        <FloatingShape color={color} />
      </Canvas>
    </div>
  );
}
