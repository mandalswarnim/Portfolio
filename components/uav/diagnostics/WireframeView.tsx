"use client";
import { Suspense } from "react";
import SceneEnv from "@/components/uav/three/SceneEnv";
import UAVModel from "@/components/uav/three/UAVModel";
import { Html } from "@react-three/drei";
import type { Asset } from "@/lib/uav/assets";
import { palette } from "@/lib/uav/palette";

export default function WireframeView({ asset }: { asset: Asset }) {
  return (
    <SceneEnv cameraPos={[0, 1.5, 6]}>
      <Suspense fallback={null}>
        {/* Solid base */}
        <UAVModel asset={asset} spin={false} highlightComponent={asset.anomaly?.component ?? null} scale={1} />
        {/* Wireframe ghost overlay */}
        <UAVModel
          asset={asset}
          spin={false}
          wireframe
          highlightComponent={asset.anomaly?.component ?? null}
          scale={1.02}
        />
        {asset.anomaly && (
          <Html position={[1.6, 1.2, -0.6]} distanceFactor={6} style={{ pointerEvents: "none" }}>
            <div className="rounded-lg border border-status-critical/40 bg-background/95 px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-wider text-status-critical shadow-sm">
              ⚠ {asset.anomaly.component}
              <div className="text-[9px] opacity-80">Severity {(asset.anomaly.severity * 100).toFixed(0)}%</div>
            </div>
          </Html>
        )}
        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
          <planeGeometry args={[20, 20, 20, 20]} />
          <meshBasicMaterial color={palette.subtle} wireframe transparent opacity={0.18} />
        </mesh>
      </Suspense>
    </SceneEnv>
  );
}
