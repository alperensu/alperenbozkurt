"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

const rings = [
  { radius: 1.8, rotation: [0.32, 1.05, 0] as [number, number, number] },
  { radius: 2.2, rotation: [1.15, 0.4, 0] as [number, number, number] },
  { radius: 2.6, rotation: [0.72, 1.75, 0] as [number, number, number] },
];

function CoreGeometry() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
  });

  return (
    <group>
      {/* Outer Glow Sphere */}
      <Sphere args={[1.5, 64, 64]} scale={1.2}>
        <MeshDistortMaterial
          color="#58d7ff"
          speed={3}
          distort={0.4}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Main Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 15]} />
        <MeshWobbleMaterial
          color="#ff6b2c"
          speed={2}
          factor={0.6}
          roughness={0}
          metalness={1}
        />
      </mesh>

      {/* Floating Rings */}
      {rings.map((ring, i) => (
        <mesh key={ring.radius} rotation={ring.rotation}>
          <torusGeometry args={[ring.radius, 0.01, 16, 100]} />
          <meshBasicMaterial color={i === 1 ? "#f6c65b" : "#58d7ff"} transparent opacity={0.32} />
        </mesh>
      ))}
    </group>
  );
}

export default function TechCore() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "expo.out", delay: 1.5 }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="relative mx-auto aspect-square w-full max-w-[330px] opacity-0 group">
      <div className="absolute inset-6 rounded-full bg-cyan-400/12 blur-[80px] transition-colors duration-1000 group-hover:bg-orange-400/16" />
      
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#58d7ff" />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ff6b2c" />
        
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <CoreGeometry />
        </Float>
      </Canvas>
      
      <div className="pointer-events-none absolute left-0 top-0 rounded-tl-lg border-l border-t border-orange-300/30 p-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-orange-200/[0.55]">AI_CORE_ACTIVE</p>
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 rounded-br-lg border-b border-r border-cyan-300/30 p-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-cyan-200/[0.55]">LLM_ENGINE_SYNCED</p>
      </div>
    </div>
  );
}
