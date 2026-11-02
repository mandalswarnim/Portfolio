"use client";
import { create } from "zustand";
import type { Asset } from "./assets";
import { fetchManifest, fetchAsset, type AssetDetail } from "./api";

export interface TelemetryFrame {
  t: number;
  speed: number; // knots
  altitude: number; // ft
  thermal: number; // °C
  power: number; // amps
  vibration: number; // g
  rul: number; // 0..100
}

interface DashState {
  // Fleet roster (loaded from /uav/data/manifest.json on boot)
  assets: Asset[];
  fleetLoaded: boolean;
  fleetError: string | null;
  loadFleet: () => Promise<void>;

  // Selection
  selectedId: string | null;
  select: (id: string | null) => void;

  // Per-asset detail cache
  details: Record<string, AssetDetail>;
  loadDetail: (id: string) => Promise<AssetDetail | null>;

  // Mission simulation (procedural — see useTelemetryStream)
  missionRunning: boolean;
  startMission: () => void;
  stopMission: () => void;
  resetMission: () => void;

  history: TelemetryFrame[];
  current: TelemetryFrame | null;
  pushFrame: (f: TelemetryFrame) => void;
}

const initialFrame: TelemetryFrame = {
  t: 0,
  speed: 0,
  altitude: 0,
  thermal: 18,
  power: 4,
  vibration: 0.1,
  rul: 100,
};

export const useDash = create<DashState>((set, get) => ({
  assets: [],
  fleetLoaded: false,
  fleetError: null,
  loadFleet: async () => {
    if (get().fleetLoaded) return;
    try {
      const m = await fetchManifest();
      const assets: Asset[] = m.assets.map((a) => ({ ...a }));
      set({
        assets,
        fleetLoaded: true,
        selectedId: get().selectedId ?? assets[0]?.id ?? null,
      });
    } catch (e) {
      set({ fleetError: (e as Error).message, fleetLoaded: true });
    }
  },

  selectedId: null,
  select: (id) => set({ selectedId: id }),

  details: {},
  loadDetail: async (id) => {
    const cached = get().details[id];
    if (cached) return cached;
    try {
      const d = await fetchAsset(id);
      set((s) => ({ details: { ...s.details, [id]: d } }));
      return d;
    } catch {
      return null;
    }
  },

  missionRunning: false,
  startMission: () => set({ missionRunning: true }),
  stopMission: () => set({ missionRunning: false }),
  resetMission: () => set({ history: [], current: null, missionRunning: false }),

  history: [],
  current: null,
  pushFrame: (f) =>
    set((s) => ({
      current: f,
      history: [...s.history.slice(-179), f],
    })),
}));

export { initialFrame };
