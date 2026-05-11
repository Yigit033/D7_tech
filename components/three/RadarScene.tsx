'use client';

import { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function RadarSweep() {
  const sweepRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);

  const ringMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#0ea5e9'),
        transparent: true,
        opacity: 0.12,
      }),
    []
  );

  const crossMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: '#0ea5e9',
        transparent: true,
        opacity: 0.06,
      }),
    []
  );

  const rings = useMemo(() => {
    return [0.8, 1.6, 2.4, 3.2].map((r) => {
      const points = [];
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(angle) * r, 0, Math.sin(angle) * r));
      }
      return new THREE.BufferGeometry().setFromPoints(points);
    });
  }, []);

  const crossLines = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(Math.cos(angle) * 3.5, 0, Math.sin(angle) * 3.5),
      ];
      lines.push(new THREE.BufferGeometry().setFromPoints(points));
    }
    return lines;
  }, []);

  const dots = useMemo(() => {
    const positions: { x: number; z: number; opacity: number }[] = [];
    const configs = [
      [1.2, 0.4], [2.1, 1.8], [0.8, 2.3], [2.8, 0.7], [1.5, 3.0], [3.1, 2.2],
    ];
    configs.forEach(([r, a]) => {
      positions.push({
        x: Math.cos(a) * r,
        z: Math.sin(a) * r,
        opacity: Math.random() * 0.5 + 0.3,
      });
    });
    return positions;
  }, []);

  const sweepGeometry = useMemo(() => {
    return new THREE.ConeGeometry(3.5, 0.01, 64, 1, true, 0, Math.PI * 0.25);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (sweepRef.current) {
      sweepRef.current.rotation.y = t * 0.5;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.04;
    }
  });

  return (
    <group ref={groupRef} rotation={[-0.2, 0, 0]}>
      {/* Rings */}
      {rings.map((geo, i) => (
        <lineLoop key={`ring-${i}`} geometry={geo} material={ringMaterial} />
      ))}

      {/* Cross lines */}
      {crossLines.map((geo, i) => (
        <lineSegments key={`cross-${i}`} geometry={geo} material={crossMaterial} />
      ))}

      {/* Sweep cone */}
      <group ref={sweepRef} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={sweepGeometry}>
          <meshBasicMaterial
            color="#0ea5e9"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Dot echoes */}
      {dots.map((dot, i) => (
        <mesh key={`dot-${i}`} position={[dot.x, 0, dot.z]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#0ea5e9" transparent opacity={dot.opacity} />
        </mesh>
      ))}

      {/* Center */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#0ea5e9" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.04} />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c = new THREE.Color('#0ea5e9');
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      const brightness = 0.3 + Math.random() * 0.7;
      col[i * 3] = c.r * brightness;
      col[i * 3 + 1] = c.g * brightness;
      col[i * 3 + 2] = c.b * brightness;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} vertexColors transparent opacity={0.4} />
    </points>
  );
}

function SceneContent() {
  const { gl } = useThree();

  useEffect(() => {
    const handleContextLost = (e: Event) => {
      e.preventDefault();
    };
    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', handleContextLost);
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
    };
  }, [gl]);

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 5, 0]} color="#0ea5e9" intensity={0.4} />
      <RadarSweep />
      <ParticleField />
      <fog attach="fog" args={['#020409', 8, 20]} />
    </>
  );
}

export default function RadarScene() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }

  return (
    <Canvas
      camera={{ position: [0, 4, 6], fov: 50 }}
      style={{ background: 'transparent' }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: true,
      }}
      dpr={[1, 1.5]}
      onError={() => setHasError(true)}
    >
      <SceneContent />
    </Canvas>
  );
}
