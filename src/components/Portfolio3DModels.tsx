'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, Octahedron, Icosahedron, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Hyper-premium but lightweight material using Additive Blending and glowing basic materials
// This avoids lighting calculations completely while looking like glowing neon glass.
const FastNeonMaterial = ({ color }: { color: string }) => (
  <meshBasicMaterial 
    color={color} 
    transparent 
    opacity={0.3} 
    blending={THREE.AdditiveBlending}
    side={THREE.DoubleSide}
    depthWrite={false}
  />
);

const FastWireframe = ({ color }: { color: string }) => (
  <meshBasicMaterial 
    color={color} 
    wireframe 
    transparent 
    opacity={0.8}
    blending={THREE.AdditiveBlending}
  />
);

export function JobPilotModel({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[1.5, 1]}>
        <FastWireframe color={color} />
      </Icosahedron>
      <Icosahedron args={[1.2, 0]}>
        <FastNeonMaterial color={color} />
      </Icosahedron>
      <Sphere args={[0.5, 16, 16]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </Sphere>
    </Float>
  );
}

export function StadiumPilotModel({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} rotation={[Math.PI / 4, 0, 0]}>
        <Torus args={[1.5, 0.05, 16, 64]}>
          <meshBasicMaterial color={color} />
        </Torus>
        <Torus args={[1.5, 0.4, 16, 64]}>
          <FastWireframe color={color} />
        </Torus>
        <Torus args={[1.1, 0.02, 16, 64]}>
          <FastNeonMaterial color={color} />
        </Torus>
      </group>
    </Float>
  );
}

export function MonsoonShieldModel({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={2}>
      <Octahedron ref={meshRef} args={[1.5, 0]}>
        <FastNeonMaterial color={color} />
      </Octahedron>
      <Octahedron args={[1.6, 0]}>
        <FastWireframe color={color} />
      </Octahedron>
    </Float>
  );
}

export function CookingPlannerModel({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <group ref={groupRef}>
        <Sphere args={[1, 16, 16]} position={[-0.5, 0.5, 0]}>
          <FastNeonMaterial color={color} />
        </Sphere>
        <Sphere args={[0.8, 16, 16]} position={[0.8, -0.2, 0.5]}>
          <FastNeonMaterial color="#f59e0b" />
        </Sphere>
        <Sphere args={[0.5, 16, 16]} position={[-0.2, -0.8, -0.5]}>
          <FastNeonMaterial color="#ef4444" />
        </Sphere>
      </group>
    </Float>
  );
}
