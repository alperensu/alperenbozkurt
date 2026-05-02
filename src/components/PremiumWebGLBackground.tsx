"use client";

import { Preload } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

type MouseState = {
  x: number;
  y: number;
};

type QualityProfile = {
  nodes: number;
  radius: number;
  dpr: [number, number];
  lineOpacity: number;
};

type GraphNode = {
  position: THREE.Vector3;
  size: number;
  phase: number;
  color: THREE.Color;
};

type DataGraph = {
  nodes: GraphNode[];
  connections: Float32Array;
  connectionColors: Float32Array;
};

const PALETTE = ["#67e8f9", "#22d3ee", "#a78bfa", "#f0abfc", "#ffffff"];
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

function getQualityProfile(width: number): QualityProfile {
  if (width < 640) {
    return { nodes: 150, radius: 4.6, dpr: [1, 1.15], lineOpacity: 0.2 };
  }

  if (width < 1024) {
    return { nodes: 260, radius: 5.8, dpr: [1, 1.35], lineOpacity: 0.24 };
  }

  return { nodes: 480, radius: 7.2, dpr: [1, 1.65], lineOpacity: 0.28 };
}

function seededRandom(seed: number) {
  let value = seed;

  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

function createDataGraph(count: number, radius: number): DataGraph {
  const random = seededRandom(count * 991 + Math.floor(radius * 100));
  const nodes: GraphNode[] = [];

  for (let i = 0; i < count; i += 1) {
    const t = i / count;
    const angle = i * GOLDEN_ANGLE;
    const shell = radius * (0.36 + random() * 0.64);
    const ribbon = Math.sin(t * Math.PI * 8) * 0.42;

    // A structured spiral cloud reads as designed data, not random dust.
    const x = Math.cos(angle) * (shell + ribbon);
    const y = (random() - 0.5) * radius * 1.35 + Math.sin(angle * 1.35) * 0.38;
    const z =
      Math.sin(angle) * shell * 0.62 +
      Math.cos(t * Math.PI * 5) * radius * 0.18;

    const color = new THREE.Color(
      PALETTE[Math.floor(random() * PALETTE.length)]
    );

    nodes.push({
      position: new THREE.Vector3(x, y, z),
      size: 0.7 + random() * 1.85,
      phase: random() * Math.PI * 2,
      color,
    });
  }

  const segments: number[] = [];
  const lineColors: number[] = [];
  const maxDistance = radius * 0.34;
  const maxSegments = count * 3;
  const seen = new Set<string>();

  for (let i = 0; i < nodes.length && segments.length / 6 < maxSegments; i += 1) {
    const nearest: { index: number; distance: number }[] = [];

    for (let j = i + 1; j < nodes.length; j += 1) {
      const distance = nodes[i].position.distanceTo(nodes[j].position);

      if (distance < maxDistance) {
        nearest.push({ index: j, distance });
      }
    }

    nearest
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3)
      .forEach(({ index }) => {
        const key = `${i}-${index}`;

        if (seen.has(key)) return;

        seen.add(key);
        segments.push(
          nodes[i].position.x,
          nodes[i].position.y,
          nodes[i].position.z,
          nodes[index].position.x,
          nodes[index].position.y,
          nodes[index].position.z
        );
        lineColors.push(
          nodes[i].color.r,
          nodes[i].color.g,
          nodes[i].color.b,
          nodes[index].color.r,
          nodes[index].color.g,
          nodes[index].color.b
        );
      });
  }

  return {
    nodes,
    connections: new Float32Array(segments),
    connectionColors: new Float32Array(lineColors),
  };
}

function useResponsiveQuality() {
  const [quality, setQuality] = useState<QualityProfile>(() =>
    getQualityProfile(1280)
  );

  useEffect(() => {
    const updateQuality = () => {
      setQuality(getQualityProfile(window.innerWidth));
    };

    updateQuality();
    window.addEventListener("resize", updateQuality);

    return () => window.removeEventListener("resize", updateQuality);
  }, []);

  return quality;
}

function DataConstellationScene({
  mouse,
  quality,
}: {
  mouse: React.MutableRefObject<MouseState>;
  quality: QualityProfile;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.InstancedMesh>(null);
  const glowRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const graph = useMemo(
    () => createDataGraph(quality.nodes, quality.radius),
    [quality.nodes, quality.radius]
  );

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(graph.connections, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(graph.connectionColors, 3)
    );
    geometry.computeBoundingSphere();
    return geometry;
  }, [graph.connectionColors, graph.connections]);

  useLayoutEffect(() => {
    const core = coreRef.current;
    const glow = glowRef.current;

    if (!core || !glow) return;

    graph.nodes.forEach((node, index) => {
      dummy.position.copy(node.position);
      dummy.rotation.set(node.phase * 0.4, node.phase * 0.2, node.phase);
      dummy.scale.setScalar(node.size);
      dummy.updateMatrix();
      core.setMatrixAt(index, dummy.matrix);
      core.setColorAt(index, node.color);

      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(node.size * 2.75);
      dummy.updateMatrix();
      glow.setMatrixAt(index, dummy.matrix);
      glow.setColorAt(index, node.color);
    });

    core.instanceMatrix.needsUpdate = true;
    glow.instanceMatrix.needsUpdate = true;

    if (core.instanceColor) core.instanceColor.needsUpdate = true;
    if (glow.instanceColor) glow.instanceColor.needsUpdate = true;
  }, [dummy, graph.nodes]);

  useEffect(() => {
    return () => lineGeometry.dispose();
  }, [lineGeometry]);

  useFrame(({ camera, clock }) => {
    const elapsed = clock.getElapsedTime();
    const group = groupRef.current;
    const core = coreRef.current;
    const glow = glowRef.current;

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.current.x * 0.85,
      0.035
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouse.current.y * -0.55,
      0.035
    );
    camera.lookAt(0, 0, 0);

    if (group) {
      group.rotation.x =
        Math.sin(elapsed * 0.12) * 0.08 + mouse.current.y * 0.12;
      group.rotation.y = elapsed * 0.035 + mouse.current.x * 0.18;
      group.rotation.z = Math.sin(elapsed * 0.08) * 0.045;
    }

    if (!core || !glow) return;

    // Only matrices change per frame; geometry/materials stay shared on the GPU.
    graph.nodes.forEach((node, index) => {
      const pulse = 1 + Math.sin(elapsed * 0.85 + node.phase) * 0.16;

      dummy.position.copy(node.position);
      dummy.rotation.set(
        node.phase * 0.4 + elapsed * 0.08,
        node.phase * 0.2 + elapsed * 0.05,
        node.phase
      );
      dummy.scale.setScalar(node.size * pulse);
      dummy.updateMatrix();
      core.setMatrixAt(index, dummy.matrix);

      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(node.size * (2.55 + pulse * 0.45));
      dummy.updateMatrix();
      glow.setMatrixAt(index, dummy.matrix);
    });

    core.instanceMatrix.needsUpdate = true;
    glow.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <fog attach="fog" args={["#02030a", 7, 17]} />
      <ambientLight intensity={0.18} />
      <pointLight position={[-4, 3, 5]} color="#22d3ee" intensity={2.4} />
      <pointLight position={[5, -2, -4]} color="#d946ef" intensity={1.8} />

      <group ref={groupRef}>
        <lineSegments geometry={lineGeometry} frustumCulled={false}>
          <lineBasicMaterial
            vertexColors
            transparent
            opacity={quality.lineOpacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>

        <instancedMesh
          ref={glowRef}
          args={[undefined, undefined, graph.nodes.length]}
          frustumCulled={false}
          renderOrder={1}
        >
          <circleGeometry args={[0.065, 20]} />
          <meshBasicMaterial
            vertexColors
            transparent
            opacity={0.14}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </instancedMesh>

        <instancedMesh
          ref={coreRef}
          args={[undefined, undefined, graph.nodes.length]}
          frustumCulled={false}
          renderOrder={2}
        >
          <icosahedronGeometry args={[0.035, 1]} />
          <meshStandardMaterial
            vertexColors
            color="#ffffff"
            emissive="#67e8f9"
            emissiveIntensity={0.7}
            roughness={0.35}
            metalness={0.15}
          />
        </instancedMesh>
      </group>
    </>
  );
}

export default function PremiumWebGLBackground() {
  const quality = useResponsiveQuality();
  const mouse = useRef<MouseState>({ x: 0, y: 0 });

  const handlePointerMove = useCallback((event: PointerEvent) => {
    const nextX = event.clientX / window.innerWidth - 0.5;
    const nextY = event.clientY / window.innerHeight - 0.5;

    gsap.to(mouse.current, {
      x: nextX,
      y: nextY,
      duration: 1.35,
      ease: "power3.out",
      overwrite: true,
    });
  }, []);

  useEffect(() => {
    const resetPointer = () => {
      gsap.to(mouse.current, {
        x: 0,
        y: 0,
        duration: 1.8,
        ease: "power3.out",
        overwrite: true,
      });
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerleave", resetPointer);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", resetPointer);
    };
  }, [handlePointerMove]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1, background: "#02030a" }}
    >
      <Canvas
        camera={{ position: [0, 0, 9.5], fov: 48, near: 0.1, far: 40 }}
        dpr={quality.dpr}
        gl={{
          alpha: true,
          antialias: false,
          depth: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
      >
        <color attach="background" args={["#02030a"]} />
        <DataConstellationScene mouse={mouse} quality={quality} />
        <Preload all />
      </Canvas>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(2, 6, 23, 0.05) 0%, rgba(2, 6, 23, 0.38) 48%, rgba(2, 6, 23, 0.88) 100%), linear-gradient(90deg, rgba(2, 6, 23, 0.82), rgba(2, 6, 23, 0.34) 42%, rgba(2, 6, 23, 0.76))",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, rgba(2, 6, 23, 0.96), rgba(2, 6, 23, 0))",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-56"
        style={{
          background:
            "linear-gradient(to top, rgba(2, 6, 23, 0.98), rgba(2, 6, 23, 0))",
        }}
      />
    </div>
  );
}
