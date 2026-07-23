'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, TorusKnot, Sphere, Icosahedron, Stars } from '@react-three/drei';
import * as THREE from 'three';

// 1. JobPilot AI: High-tech neural network orb
function JobPilotScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <Icosahedron ref={meshRef} args={[1.6, 2]}>
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.4} />
      </Icosahedron>
      <Sphere args={[1.2, 32, 32]}>
        <MeshDistortMaterial color="#1e3a8a" distort={0.3} speed={2} roughness={0} metalness={1} />
      </Sphere>
    </Float>
  );
}

// 2. StadiumPilot AI: Intricate glossy torus knot (complex system representation)
function StadiumPilotScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1}>
      <TorusKnot ref={meshRef} args={[1, 0.3, 128, 32]}>
        <meshStandardMaterial color="#8b5cf6" roughness={0.1} metalness={0.8} emissive="#4c1d95" emissiveIntensity={0.5} />
      </TorusKnot>
    </Float>
  );
}

// 3. MonsoonShield AI: Pulsing fluid storm sphere
function MonsoonShieldScene() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1.5, 64, 64]}>
        <MeshDistortMaterial color="#10b981" distort={0.6} speed={3} roughness={0.2} metalness={0.8} />
      </Sphere>
    </Float>
  );
}

// 4. Cooking Planner: Morphing warm abstract shape
function CookingPlannerScene() {
  return (
    <Float speed={3} rotationIntensity={1.5} floatIntensity={1.5}>
      <Sphere args={[1.4, 64, 64]}>
        <MeshWobbleMaterial color="#f59e0b" factor={0.8} speed={2} roughness={0.1} metalness={0.5} emissive="#b45309" emissiveIntensity={0.2} />
      </Sphere>
    </Float>
  );
}

export default function Portfolio3DScenes({ type }: { type: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, borderRadius: '15px', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#ffffff" />
        
        <Stars radius={15} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

        {type === 'jobpilot' && <JobPilotScene />}
        {type === 'stadiumpilot' && <StadiumPilotScene />}
        {type === 'monsoonshield' && <MonsoonShieldScene />}
        {type === 'cookingplanner' && <CookingPlannerScene />}
      </Canvas>
    </div>
  );
}
