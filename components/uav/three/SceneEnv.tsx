"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ReactNode } from "react";
import { palette } from "@/lib/uav/palette";

interface Props {
  children: ReactNode;
  cameraPos?: [number, number, number];
  controls?: boolean;
  autoRotate?: boolean;
}

export default function SceneEnv({ children, cameraPos = [4, 2.5, 6], controls = true, autoRotate = false }: Props) {
  return (
    <Canvas camera={{ position: cameraPos, fov: 45 }} dpr={[1, 2]}>
      <color attach="background" args={[palette.surface]} />
      <fog attach="fog" args={[palette.surface, 10, 32]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 8, 4]} intensity={1.6} />
      <directionalLight position={[-6, -2, -4]} intensity={0.4} />
      {children}
      {controls && <OrbitControls enablePan={false} enableZoom autoRotate={autoRotate} autoRotateSpeed={0.6} />}
    </Canvas>
  );
}
