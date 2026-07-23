'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  color: string;
  activeSection: string;
}

// 1. Deep Space Star Dust Constellation Web
function ConstellationNet({ color }: { color: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 100;

  const [particles, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 35;
      pos[i + 1] = (Math.random() - 0.5) * 35;
      pos[i + 2] = (Math.random() - 0.5) * 15 - 5;

      vel[i] = (Math.random() - 0.5) * 0.01;
      vel[i + 1] = (Math.random() - 0.5) * 0.01;
      vel[i + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const ptsGeom = pointsRef.current.geometry;
    const ptsArr = ptsGeom.attributes.position.array as Float32Array;

    for (let i = 0; i < count * 3; i += 3) {
      ptsArr[i] += velocities[i];
      ptsArr[i + 1] += velocities[i + 1];
      ptsArr[i + 2] += velocities[i + 2];

      if (Math.abs(ptsArr[i]) > 20) velocities[i] *= -1;
      if (Math.abs(ptsArr[i + 1]) > 20) velocities[i + 1] *= -1;
      if (Math.abs(ptsArr[i + 2]) > 10) velocities[i + 2] *= -1;
    }
    ptsGeom.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={color}
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// 2. Planet Hero: The Wobbly Sun Mesh
function PlanetHero({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y = time * 0.15;
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }
  });
  return (
    <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[0, 0, 0]} scale={1.4}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.15}
          metalness={0.65}
          distort={0.45}
          speed={2.6}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
    </Float>
  );
}

// 3. Planet About: Torus Knot with particle rings
function PlanetAbout({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.25;
      meshRef.current.rotation.x = time * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -time * 0.1;
    }
  });

  const ringGeometry = useMemo(() => {
    const pts = [];
    const count = 80;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      pts.push(Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, (Math.random() - 0.5) * 0.15);
    }
    return new Float32Array(pts);
  }, []);

  return (
    <group position={[-6, 2, -2]}>
      <mesh ref={meshRef} scale={0.75}>
        <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} wireframe />
      </mesh>
      
      <points ref={ringRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[ringGeometry, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.07} color="#ffffff" transparent opacity={0.7} />
      </points>
    </group>
  );
}

// 4. Planet Achievements: Double Orb satellite system
function PlanetAchievements({ color }: { color: string }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const satelliteRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.3;
    }
    if (satelliteRef.current) {
      // Orbit path calculation
      satelliteRef.current.position.x = Math.cos(time * 1.5) * 1.5;
      satelliteRef.current.position.z = Math.sin(time * 1.5) * 1.5;
      satelliteRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <group position={[6, -3.5, -2]}>
      {/* Core Orb */}
      <mesh ref={coreRef} scale={0.8}>
        <octahedronGeometry args={[1, 2]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.1}
          metalness={0.5}
          transmission={0.6}
          thickness={1}
        />
      </mesh>
      
      {/* Revolving Satelite */}
      <mesh ref={satelliteRef} scale={0.22}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
}

// 5. Planet Portfolio: Gravity Particle Vortex
function PlanetPortfolio({ color }: { color: string }) {
  const vortexRef = useRef<THREE.Points>(null);
  const count = 400;

  const [particles, angles, radii] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ang = new Float32Array(count);
    const rad = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 1.6 + 0.3;
      const theta = Math.random() * Math.PI * 2;
      rad[i] = r;
      ang[i] = theta;

      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      pos[i * 3 + 2] = Math.sin(theta) * r;
    }
    return [pos, ang, rad];
  }, []);

  useFrame((state) => {
    if (!vortexRef.current) return;
    const time = state.clock.getElapsedTime();
    const ptsGeom = vortexRef.current.geometry;
    const ptsArr = ptsGeom.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Swirl physics: speed increases as radius decreases (Keplerian-like)
      angles[i] += 0.02 / Math.sqrt(radii[i]);
      ptsArr[i * 3] = Math.cos(angles[i]) * radii[i];
      ptsArr[i * 3 + 2] = Math.sin(angles[i]) * radii[i];
      
      // Volumetric wave height
      ptsArr[i * 3 + 1] = Math.sin(time + radii[i] * 4) * 0.1;
    }
    ptsGeom.attributes.position.needsUpdate = true;
    vortexRef.current.rotation.y = time * 0.05;
  });

  return (
    <group position={[0, -8.5, -2]}>
      {/* Vortex Core */}
      <mesh scale={0.4}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      <points ref={vortexRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} usage={THREE.DynamicDrawUsage} />
        </bufferGeometry>
        <pointsMaterial size={0.065} color={color} transparent opacity={0.8} />
      </points>
    </group>
  );
}

// 6. Planet Contact: Geodesic Dome Satellite
function PlanetContact({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group position={[5.5, 4.5, -2]}>
      <mesh ref={meshRef} scale={0.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} wireframe />
      </mesh>
    </group>
  );
}

// 7. Interactive Cinematic Camera Manager
function CameraManager({ activeSection }: { activeSection: string }) {
  const { camera } = useThree();
  
  // Vector templates
  const targetPos = useMemo(() => new THREE.Vector3(0, 0, 8), []);
  const targetLookAt = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // Determine target coordinates based on active section
    switch (activeSection) {
      case 'home':
        // HUD is on the left. Frame Sun planet on the right.
        targetPos.set(-2.2, 0.2, 5.8);
        targetLookAt.set(0.8, 0, 0);
        break;
      case 'about':
        // HUD is on the left. Frame torus planet on the right.
        targetPos.set(-8.2, 2.2, 4.0);
        targetLookAt.set(-5.2, 2.0, -2.0);
        break;
      case 'achievements':
        // HUD is on the left. Frame cyber orb planet on the right.
        targetPos.set(3.2, -3.2, 4.0);
        targetLookAt.set(6.2, -3.5, -2.0);
        break;
      case 'portfolio':
        // HUD is on the left. Frame gravity vortex on the right.
        targetPos.set(-2.2, -8.2, 4.5);
        targetLookAt.set(0.8, -8.5, -2.0);
        break;
      case 'contact':
        // HUD is on the right. Frame geodesic dome planet on the left.
        targetPos.set(7.7, 4.8, 4.0);
        targetLookAt.set(4.7, 4.5, -2.0);
        break;
    }

    // Smooth lerp camera position
    camera.position.lerp(targetPos, 0.04);

    // Smooth lerp camera focus (look-at target coordinate)
    currentLookAt.current.lerp(targetLookAt, 0.04);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

export default function Canvas3D({ color, activeSection }: SceneProps) {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color={color} />
        <pointLight position={[6, -3.5, -2]} intensity={1.5} color={color} />
        <pointLight position={[-6, 2, -2]} intensity={1.5} color="#ffffff" />
        
        {/* Camera Flight Manager */}
        <CameraManager activeSection={activeSection} />

        {/* Space Constellation Web */}
        <ConstellationNet color={color} />

        {/* The 5 Cosmos Planet Sections */}
        <PlanetHero color={color} />
        <PlanetAbout color={color} />
        <PlanetAchievements color={color} />
        <PlanetPortfolio color={color} />
        <PlanetContact color={color} />
      </Canvas>
    </div>
  );
}
