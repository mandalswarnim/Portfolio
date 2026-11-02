"use client";
import { useEffect, useState } from "react";
import { fetchResults, type ResultRow } from "@/lib/uav/api";
import ResultsTable from "@/components/uav/lab/ResultsTable";
import TrainingCurves from "@/components/uav/lab/TrainingCurves";
import PerAssetOverlay from "@/components/uav/lab/PerAssetOverlay";

export default function LabPage() {
  const [rows, setRows] = useState<ResultRow[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetchResults()
      .then(setRows)
      .catch((e) => setErr(e.message));
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-8">
      <div className="rounded-2xl border border-divider bg-surface px-6 py-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary">Model Lab</div>
        <h1 className="mt-1 font-serif text-3xl font-bold text-foreground">Architecture Comparison</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          LSTM, Transformer, and 1D-CNN trained on the NASA C-MAPSS turbofan benchmark (FD001–FD004) and on a
          synthesized multirotor UAV fleet (200 flights, 3 fault modes). Metrics and training histories below are baked
          from the PyTorch training pipeline.
        </p>
      </div>

      {err && (
        <div className="rounded-2xl border border-status-critical/30 bg-status-critical/5 p-4 text-sm text-status-critical">
          Failed to load results: {err}
        </div>
      )}

      {!rows && !err && (
        <div className="rounded-2xl border border-divider bg-surface p-4 text-sm text-subtle">Loading…</div>
      )}

      {rows && (
        <>
          <section className="rounded-2xl border border-divider bg-surface p-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
              Test Metrics · ★ = best RMSE per dataset
            </div>
            <ResultsTable rows={rows} />
            <p className="mt-3 text-[11px] leading-relaxed text-subtle">
              C-MAPSS = NASA turbofan engine degradation, RMSE on piecewise-linear RUL (clip 125). Score = PHM 2008
              asymmetric scoring function (lower is better). UAV = synthesized multirotor flights, RMSE on normalized
              health-index RUL (clip 100).
            </p>
          </section>

          <section>
            <TrainingCurves rows={rows} />
          </section>

          <section>
            <PerAssetOverlay />
          </section>
        </>
      )}
    </div>
  );
}
