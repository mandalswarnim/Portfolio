"use client";
import { Suspense, useState } from "react";
import SceneEnv from "@/components/uav/three/SceneEnv";
import UAVModel from "@/components/uav/three/UAVModel";
import { useDash } from "@/lib/uav/store";
import type { Asset } from "@/lib/uav/assets";
import { palette } from "@/lib/uav/palette";
import { Html } from "@react-three/drei";

export default function AssetCarousel() {
  const { assets, selectedId, select } = useDash();
  const radius = 6;
  const [hoverId, setHoverId] = useState<string | null>(null);

  return (
    <SceneEnv cameraPos={[0, 4, 12]} autoRotate>
      <Suspense fallback={null}>
        {/* Display platform */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]}>
          <ringGeometry args={[radius - 0.6, radius + 0.6, 64]} />
          <meshBasicMaterial color={palette.primary} transparent opacity={0.12} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.31, 0]}>
          <ringGeometry args={[radius + 0.6, radius + 0.7, 64]} />
          <meshBasicMaterial color={palette.primary} transparent opacity={0.5} />
        </mesh>

        {assets.map((a, i) => {
          const angle = (i / assets.length) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const isSel = a.id === selectedId;
          return (
            <group key={a.id} position={[x, 0, z]}>
              <group
                onClick={(e) => {
                  e.stopPropagation();
                  select(a.id);
                }}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  setHoverId(a.id);
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                  setHoverId(null);
                  document.body.style.cursor = "auto";
                }}
              >
                <UAVModel asset={a} spin scale={isSel ? 0.95 : 0.7} />
              </group>
              {/* Ground ring flags critical assets */}
              {a.status === "CRITICAL" && (
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]}>
                  <ringGeometry args={[1.2, 1.5, 32]} />
                  <meshBasicMaterial color={palette.status.CRITICAL} transparent opacity={0.45} />
                </mesh>
              )}
              {(hoverId === a.id || isSel) && (
                <Html position={[0, 1.6, 0]} center distanceFactor={8} style={{ pointerEvents: "none" }}>
                  <Tooltip a={a} selected={isSel} />
                </Html>
              )}
            </group>
          );
        })}
      </Suspense>
    </SceneEnv>
  );
}

function Tooltip({ a, selected }: { a: Asset; selected: boolean }) {
  const color = palette.status[a.status];
  return (
    <div className="min-w-[160px] rounded-lg border border-divider bg-background px-3 py-2 text-[11px] shadow-md">
      <div className="font-semibold text-foreground">{a.name}</div>
      <div className="text-[10px] text-subtle">
        {a.id} · {a.class}
      </div>
      <div className="mt-1 text-muted">
        Health:{" "}
        <span className="font-semibold" style={{ color }}>
          {a.rul.toFixed(0)}%
        </span>
      </div>
      <div className="text-[10px] text-subtle">{a.data_source}</div>
      {selected && <div className="mt-1 text-[10px] font-medium text-primary">Selected</div>}
    </div>
  );
}
