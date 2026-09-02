// File: apps/landing-page/src/_features/stage/ui/StageJourney3D.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Line, Edges, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { MONO, STAGES } from '../lib';
import { STAGE_GEOMETRY } from './stageGeometries';
import type { StageDefinition } from '../lib';

interface Tokens {
  bg: string;
  text: string;
  textMute: string;
  border: string;
}

interface StageJourney3DProps {
  activeStageId: string;
  hoveredStageId: string | null;
  T: Tokens;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  height?: number;
}

function StageGeometry({ stage }: { stage: StageDefinition }) {
  const spec = STAGE_GEOMETRY[stage.id];
  switch (spec.kind) {
    case 'tetrahedron':
      return <tetrahedronGeometry args={spec.args as [number, number]} />;
    case 'box':
      return <boxGeometry args={spec.args as [number, number, number]} />;
    case 'octahedron':
      return <octahedronGeometry args={spec.args as [number, number]} />;
    case 'dodecahedron':
      return <dodecahedronGeometry args={spec.args as [number, number]} />;
    case 'icosahedron':
      return <icosahedronGeometry args={spec.args as [number, number]} />;
    case 'torusKnot':
      return <torusKnotGeometry args={spec.args as [number, number, number, number]} />;
  }
}

function StageNode({
  position,
  stage,
  active,
  reducedMotion,
  onSelect,
  onHover,
}: {
  position: THREE.Vector3;
  stage: StageDefinition;
  active: boolean;
  reducedMotion: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const target = active ? 1.5 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(target, target, target), 0.15);
    if (!reducedMotion) {
      meshRef.current.rotation.x += delta * 0.18;
      meshRef.current.rotation.y += delta * 0.26;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(stage.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(stage.id);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = 'auto';
        }}
      >
        <StageGeometry stage={stage} />
        <meshStandardMaterial color={stage.color} emissive={stage.color} emissiveIntensity={active ? 0.85 : 0.15} roughness={0.22} metalness={0.3} flatShading />
        <Edges scale={1.001} threshold={15} color={active ? '#FFFFFF' : stage.color} />
      </mesh>
      <Text position={[0, -0.62, 0]} fontSize={0.15} color={active ? stage.color : '#8891A6'} anchorX="center" anchorY="middle">
        {stage.number}
      </Text>
    </group>
  );
}

function TechOrbit({ stage, center, spin }: { stage: StageDefinition; center: THREE.Vector3; spin: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!spin || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.25;
  });

  const items = stage.techs.slice(0, 6);

  return (
    <group ref={groupRef} position={center}>
      {items.map((tech, i) => {
        const angle = (i / items.length) * Math.PI * 2;
        const radius = 1.15;
        return (
          <Text
            key={tech}
            position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
            fontSize={0.1}
            color={stage.color}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.004}
            outlineColor="#000000"
          >
            {tech}
          </Text>
        );
      })}
    </group>
  );
}

function CameraRig({ target }: { target: THREE.Vector3 }) {
  useFrame(({ camera }) => {
    const desired = target.clone().add(new THREE.Vector3(0, 1.1, 4.4));
    camera.position.lerp(desired, 0.045);
    camera.lookAt(target);
  });
  return null;
}

function Scene({
  activeStageId,
  hoveredStageId,
  onSelect,
  onHover,
  T,
  reducedMotion,
}: {
  activeStageId: string;
  hoveredStageId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  T: Tokens;
  reducedMotion: boolean;
}) {
  const curve = useMemo(() => {
    const points = STAGES.map((_, i) => new THREE.Vector3(i * 2.1 - (STAGES.length - 1) * 1.05, i * 0.8 - 1.2, Math.sin(i * 0.8) * 1.1));
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.4);
  }, []);

  const linePoints = useMemo(() => curve.getPoints(90), [curve]);
  const activeIndex = Math.max(0, STAGES.findIndex((s) => s.id === activeStageId));
  const activePoint = curve.getPointAt(activeIndex / (STAGES.length - 1));
  const displayedStageId = hoveredStageId ?? activeStageId;
  const displayedStage = STAGES.find((s) => s.id === displayedStageId) ?? STAGES[0];
  const displayedPoint = curve.getPointAt(Math.max(0, STAGES.findIndex((s) => s.id === displayedStageId)) / (STAGES.length - 1));

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 5]} intensity={1.1} />
      <directionalLight position={[-4, -2, -3]} intensity={0.3} />
      <Environment preset="city" background={false} />
      <Line points={linePoints} color={T.border} lineWidth={1} transparent opacity={0.6} />
      {STAGES.map((stage, i) => (
        <StageNode
          key={stage.id}
          position={curve.getPointAt(i / (STAGES.length - 1))}
          stage={stage}
          active={stage.id === activeStageId}
          reducedMotion={reducedMotion}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
      <TechOrbit stage={displayedStage} center={displayedPoint} spin={!reducedMotion} />
      <CameraRig target={activePoint} />
    </>
  );
}

export function StageJourney3D({ activeStageId, hoveredStageId, T, onSelect, onHover, height = 380 }: StageJourney3DProps) {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [maxDpr, setMaxDpr] = useState(2);

  useEffect(() => {
    setMounted(true);
    setReducedMotion(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (typeof window !== 'undefined') {
      setMaxDpr(Math.min(3, window.devicePixelRatio || 1));
    }
  }, []);

  return (
    <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'relative', width: '100%', height, mb: 3, borderRadius: '16px', overflow: 'hidden', bgcolor: T.bg }}>
      {!mounted ? (
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.75rem', color: T.textMute }}>Cargando…</Typography>
        </Box>
      ) : (
        <Canvas
          camera={{ position: [0, 1, 9], fov: 45 }}
          dpr={[1, maxDpr]}
          gl={{
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
          }}
        >
          <Scene activeStageId={activeStageId} hoveredStageId={hoveredStageId} onSelect={onSelect} onHover={onHover} T={T} reducedMotion={reducedMotion} />
          <EffectComposer>
            <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} intensity={0.55} mipmapBlur />
          </EffectComposer>
        </Canvas>
      )}
    </Box>
  );
}