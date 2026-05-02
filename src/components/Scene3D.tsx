"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float, useAspect } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

/**
 * High-performance Particle System Component
 * Uses buffer geometry and custom points for locked 60FPS
 */
function ParticleCloud({ count = 2500 }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const { mouse, viewport } = useThree();
  
  // Create static buffer data
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [count]);

  // Handle smooth mouse parallax
  const targetX = useRef(0);
  const targetY = useRef(0);

  useFrame((state) => {
    // Smooth lerp for mouse movement
    targetX.current = THREE.MathUtils.lerp(targetX.current, mouse.x * 0.4, 0.05);
    targetY.current = THREE.MathUtils.lerp(targetY.current, mouse.y * 0.4, 0.05);

    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.03 + targetY.current;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05 + targetX.current;
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#0ea5e9" // Cyan
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      {/* Secondary Magenta Cloud for Depth */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
        <Points positions={positions.slice(0, count * 1.5)} stride={3}>
          <PointMaterial
            transparent
            color="#d946ef" // Magenta
            size={0.012}
            sizeAttenuation={true}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </Points>
      </Float>
    </group>
  );
}

/**
 * Interconnected Nodes Component
 * Uses InstancedMesh for high performance
 */
function InterconnectedNodes({ nodeCount = 40 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const { mouse } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < nodeCount; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ),
        speed: Math.random() * 0.2 + 0.1,
        offset: Math.random() * 100,
      });
    }
    return temp;
  }, [nodeCount]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    nodes.forEach((node, i) => {
      const { position, speed, offset } = node;
      
      // Animate position
      const x = position.x + Math.sin(time * speed + offset) * 0.5;
      const y = position.y + Math.cos(time * speed + offset) * 0.5;
      const z = position.z + Math.sin(time * speed * 0.5 + offset) * 0.5;

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(0.05 + Math.sin(time + offset) * 0.02);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    
    // Parallax
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.1, 0.05);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouse.y * 0.1, 0.05);
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, nodeCount]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
    </instancedMesh>
  );
}

export default function Scene3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#020617] pointer-events-none">
      {/* Background Gradient for depth and readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)] z-1" />
      <div className="absolute inset-0 bg-linear-to-b from-[#020617] via-transparent to-[#020617] z-1" />

      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]} // Performance optimization for high-DPI screens
        gl={{ alpha: true, antialias: false }} // Disable antialias for more performance if needed
      >
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#0ea5e9" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#d946ef" />

        <React.Suspense fallback={null}>
          <ParticleCloud count={isMobile ? 1000 : 3000} />
          {!isMobile && <InterconnectedNodes nodeCount={60} />}
        </React.Suspense>
      </Canvas>
    </div>
  );
}
