'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  color: string;
}

function ParticleField({ color }: SceneProps) {
  const ref = useRef<THREE.Points>(null);
  
  // Create 200 random points distributed in a sphere
  const sphere = useMemo(() => {
    const arr = new Float32Array(600); // 200 points * 3 coordinates
    for (let i = 0; i < 600; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 6 + Math.random() * 6; // Radius between 6 and 12
      arr[i] = r * Math.sin(phi) * Math.cos(theta);
      arr[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Rotation effect
      ref.current.rotation.x -= delta * 0.03;
      ref.current.rotation.y -= delta * 0.05;
      
      // Pull slightly toward mouse pointer
      const pointer = state.pointer;
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, pointer.x * 1.2, 0.03);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, pointer.y * 1.2, 0.03);
    }
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

function FloatingShape({ color }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { width } = useThree().viewport;
  
  // Detect mobile sizing from Three's viewport dimensions
  const isMobile = width < 8;
  const position: [number, number, number] = isMobile ? [0, -1.8, 0] : [2.2, 0, 0];
  const scale = isMobile ? 0.9 : 1.3;

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.sin(time / 4) * 0.15;
      meshRef.current.rotation.y = time / 5;
      meshRef.current.rotation.z = Math.cos(time / 4) * 0.15;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.5}
          distort={0.4}
          speed={2.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function Canvas3D({ color }: SceneProps) {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color={color} />
        <ParticleField color={color} />
        <FloatingShape color={color} />
      </Canvas>
    </div>
  );
}
