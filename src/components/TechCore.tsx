"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

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
          color="#0ea5e9"
          speed={3}
          distort={0.4}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Main Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 15]} />
        <MeshWobbleMaterial
          color="#f97316" // Orange
          speed={2}
          factor={0.6}
          roughness={0}
          metalness={1}
        />
      </mesh>

      {/* Floating Rings */}
      {[1.8, 2.2, 2.6].map((radius, i) => (
        <mesh key={i} rotation={[Math.random(), Math.random(), 0]}>
          <torusGeometry args={[radius, 0.01, 16, 100]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} />
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
    <div ref={containerRef} className="relative w-full aspect-square max-w-[500px] mx-auto group opacity-0">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-orange-500/10 blur-[100px] rounded-full group-hover:bg-orange-500/20 transition-colors duration-1000" />
      
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#0ea5e9" />
        <pointLight position={[10, 10, 10]} intensity={2} color="#f97316" />
        
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <CoreGeometry />
        </Float>
      </Canvas>
      
      {/* Overlay labels/HUD-style elements for premium feel */}
      <div className="absolute top-0 left-0 p-4 border-l border-t border-orange-500/30 rounded-tl-xl pointer-events-none">
        <p className="text-[10px] text-orange-500/50 font-mono tracking-tighter uppercase">AI_CORE_ACTIVE</p>
      </div>
      <div className="absolute bottom-0 right-0 p-4 border-r border-b border-cyan-500/30 rounded-br-xl pointer-events-none">
        <p className="text-[10px] text-cyan-500/50 font-mono tracking-tighter uppercase">LLM_ENGINE_SYNCED</p>
      </div>
    </div>
  );
}
