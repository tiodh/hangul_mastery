"use client";

import type { LevelNumber, StoredProgress } from "@/lib/storage";
import { LEVELS } from "@/lib/levels";

export default function LevelPicker({
  level,
  progress,
  onChangeLevel
}: {
  level: LevelNumber;
  progress: StoredProgress;
  onChangeLevel: (level: LevelNumber) => void;
}) {
  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 800, marginBottom: 4 }}>Levels</div>
          <div className="small">Pick a level to practice (1–4 characters)</div>
        </div>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        {LEVELS.map((l) => {
          const isActive = l.level === level;
          const per = progress.perLevel[l.level];
          const rate = per.attempts ? Math.round((per.correct / per.attempts) * 100) : 0;

          return (
            <button
              key={l.level}
              className={`btn ${isActive ? "btnPrimary" : ""}`}
              onClick={() => onChangeLevel(l.level)}
              type="button"
              title={`${per.correct}/${per.attempts} correct (${rate}%)`}
            >
              {l.level}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 14 }}>
        <div className="row">
          <span className="tag">
            <span style={{ fontWeight: 800 }}>Total</span>
            <span>
              {progress.totalCorrect}/{progress.totalAttempts}
            </span>
          </span>
          <span className="tag">
            <span style={{ fontWeight: 800 }}>Best streak</span>
            <span>{progress.bestStreak}</span>
          </span>
        </div>
        <div className="small" style={{ marginTop: 10 }}>
          Saved in <code>localStorage</code> on this device.
        </div>
      </div>
    </div>
  );
}

