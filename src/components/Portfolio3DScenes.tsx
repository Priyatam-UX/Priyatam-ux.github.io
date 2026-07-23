'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, TorusKnot, Sphere, Icosahedron, Stars, Cylinder, Ring, Torus } from '@react-three/drei';
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

// 2. StadiumPilot AI: Glowing Radar / Command Center Stadium
function StadiumPilotScene() {
  const radarRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (radarRef.current) {
      radarRef.current.rotation.y = state.clock.elapsedTime * 2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * -0.5;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group position={[0, -0.5, 0]}>
        {/* Stadium Bowl */}
        <Cylinder args={[1.8, 1.2, 0.5, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#3b0764" wireframe opacity={0.5} transparent />
        </Cylinder>
        <Cylinder args={[1.7, 1.3, 0.4, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#581c87" emissive="#4c1d95" opacity={0.8} transparent />
        </Cylinder>
        {/* Radar Sweep */}
        <Ring ref={radarRef} args={[0, 1.5, 32]} position={[0, 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#a855f7" transparent opacity={0.6} side={THREE.DoubleSide} />
        </Ring>
        {/* Outer Orbit */}
        <Torus ref={ringRef} args={[2.2, 0.02, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#d8b4fe" />
        </Torus>
      </group>
    </Float>
  );
}

// 3. MonsoonShield AI: Raining Matrix / Storm Droplets
function MonsoonShieldScene() {
  // We'll create a stylized droplet floating over ripples
  const dropRef = useRef<THREE.Mesh>(null);
  const rippleRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (dropRef.current) {
      dropRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 0.5;
      dropRef.current.rotation.y = state.clock.elapsedTime;
    }
    if (rippleRef.current) {
      const scale = (state.clock.elapsedTime * 1.5) % 2;
      rippleRef.current.scale.set(scale, scale, scale);
      (rippleRef.current.material as THREE.MeshBasicMaterial).opacity = 1 - (scale / 2);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={[0, 0, 0]}>
        {/* Droplet (Cone + Sphere combined implicitly via distorted sphere) */}
        <Sphere ref={dropRef} args={[0.8, 32, 32]}>
          <MeshDistortMaterial color="#10b981" distort={0.4} speed={4} roughness={0.1} metalness={0.8} emissive="#047857" />
        </Sphere>
        {/* Ripple */}
        <Ring ref={rippleRef} args={[1, 1.2, 32]} position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#34d399" transparent opacity={0.8} side={THREE.DoubleSide} />
        </Ring>
        {/* Ambient storm spheres */}
        <Sphere args={[0.1, 16, 16]} position={[-1.5, 1, 0]}><meshBasicMaterial color="#6ee7b7" /></Sphere>
        <Sphere args={[0.05, 16, 16]} position={[1.5, -0.5, 0]}><meshBasicMaterial color="#6ee7b7" /></Sphere>
        <Sphere args={[0.08, 16, 16]} position={[1, 1.5, 0]}><meshBasicMaterial color="#6ee7b7" /></Sphere>
      </group>
    </Float>
  );
}

// 4. Cooking Planner: Abstract Plate and Floating Ingredients
function CookingPlannerScene() {
  const plateRef = useRef<THREE.Mesh>(null);
  const ingredientGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (plateRef.current) {
      plateRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
    if (ingredientGroup.current) {
      ingredientGroup.current.rotation.y = state.clock.elapsedTime * -0.5;
      // Make them bob slightly
      ingredientGroup.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group position={[0, -0.2, 0]}>
        {/* The Plate */}
        <Torus ref={plateRef} args={[1.5, 0.4, 32, 64]} rotation={[Math.PI / 2.5, 0, 0]}>
          <meshStandardMaterial color="#fb923c" roughness={0.2} metalness={0.6} />
        </Torus>
        
        {/* Floating ingredients (Tomato, Basil, Cheese) */}
        <group ref={ingredientGroup}>
          <Sphere args={[0.4, 32, 32]} position={[-0.8, 0.8, 0]}>
            <MeshWobbleMaterial color="#ef4444" factor={0.5} speed={2} roughness={0.2} metalness={0.5} />
          </Sphere>
          <Icosahedron args={[0.4, 0]} position={[0.6, 1.2, 0.5]}>
            <meshStandardMaterial color="#22c55e" roughness={0.6} metalness={0.1} />
          </Icosahedron>
          <Sphere args={[0.3, 16, 16]} position={[0.4, 0.6, -0.8]}>
            <meshStandardMaterial color="#fef08a" roughness={0.3} metalness={0.2} emissive="#facc15" emissiveIntensity={0.2} />
          </Sphere>
        </group>
      </group>
    </Float>
  );
}

export default function Portfolio3DScenes({ type, index = 0 }: { type: string, index?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Stagger the mounting of each WebGL scene by 400ms per index
    // This prevents 4 WebGL contexts from compiling shaders at the exact same millisecond
    const timer = setTimeout(() => {
      setMounted(true);
    }, index * 400);
    return () => clearTimeout(timer);
  }, [index]);

  if (!mounted) return <div style={{ position: 'absolute', inset: 0, zIndex: 0, borderRadius: '15px', backgroundColor: 'var(--skin-color)', opacity: 0.02 }} />;

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
