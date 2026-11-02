"use client";
import { useEffect } from "react";
import { useDash } from "@/lib/uav/store";

/** Hydrates the fleet roster on first render. Mounted once in the /uav layout. */
export default function AppBootstrap() {
  const loadFleet = useDash((s) => s.loadFleet);
  useEffect(() => {
    loadFleet();
  }, [loadFleet]);
  return null;
}
