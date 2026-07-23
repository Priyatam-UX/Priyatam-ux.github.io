'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Octahedron, Icosahedron, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  type: string;
  color: string;
}

// JobPilot AI - Neural Node
function JobPilotNode({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Icosahedron ref={meshRef} args={[1.5, 1]} position={[2, 0, -2]}>
        <meshStandardMaterial color={color} wireframe transparent opacity={0.6} />
      </Icosahedron>
      {/* Inner solid core */}
      <Sphere args={[0.8, 16, 16]} position={[2, 0, -2]}>
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </Sphere>
    </Float>
  );
}

// StadiumPilot AI - Stadium Radar
function StadiumRadar({ color }: { color: string }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef} position={[2, 0, -2]} rotation={[Math.PI / 3, 0, 0]}>
        {/* Stadium outer ring */}
        <Torus args={[1.5, 0.1, 16, 64]}>
          <meshStandardMaterial color={color} wireframe transparent opacity={0.8} />
        </Torus>
        {/* Inner pitch area */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.05, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

// MonsoonShield AI - Crystal Shield
function MonsoonShieldNode({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Octahedron ref={meshRef} args={[1.5, 0]} position={[2, 0, -2]}>
        <meshStandardMaterial color={color} wireframe={false} transparent opacity={0.7} emissive={color} emissiveIntensity={0.4} />
      </Octahedron>
    </Float>
  );
}

// Cooking Planner - Distorted Organic Shape
function CookingOrganicNode({ color }: { color: string }) {
  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={2}>
      <Sphere args={[1.4, 64, 64]} position={[2, 0, -2]}>
        <MeshDistortMaterial color={color} distort={0.5} speed={2} transparent opacity={0.6} />
      </Sphere>
    </Float>
  );
}

export default function Portfolio3DCanvas({ type, color }: Props) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, borderRadius: '6px', overflow: 'hidden', background: '#020208' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color={color} />
        
        {/* Common subtle stars for cyberpunk theme */}
        <Stars radius={10} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

        {type === 'jobpilot' && <JobPilotNode color={color} />}
        {type === 'stadiumpilot' && <StadiumRadar color={color} />}
        {type === 'monsoonshield' && <MonsoonShieldNode color={color} />}
        {type === 'cookingplanner' && <CookingOrganicNode color={color} />}
      </Canvas>
      
      {/* Fallback glow to blend with the scene */}
      <div 
        style={{ 
          position: 'absolute', inset: 0, 
          background: `radial-gradient(circle at right center, ${color}22 0%, transparent 60%)`,
          pointerEvents: 'none'
        }} 
      />
    </div>
  );
}
