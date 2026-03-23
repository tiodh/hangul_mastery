"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Prompt } from "@/lib/levels";
import { createPrompt, formatRomanHint, getLevelConfig, isCorrectAnswer } from "@/lib/levels";
import type { LevelNumber, StoredProgress } from "@/lib/storage";
import { clearProgress, defaultProgress, loadProgress, saveProgress } from "@/lib/storage";
import LevelPicker from "@/components/LevelPicker";

type Feedback =
  | { kind: "idle" }
  | { kind: "correct"; expected: string }
  | { kind: "wrong"; expected: string };

function clampLevel(level: number): LevelNumber {
  if (level <= 1) return 1;
  if (level === 2) return 2;
  if (level === 3) return 3;
  return 4;
}

export default function Game() {
  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState<StoredProgress>(() => defaultProgress(1));
  const [level, setLevel] = useState<LevelNumber>(1);
  const [prompt, setPrompt] = useState<Prompt>(() => createPrompt(1));
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback>({ kind: "idle" });
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const stored = loadProgress();
    if (stored) {
      setProgress(stored);
      setLevel(stored.level);
      setPrompt(createPrompt(stored.level));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveProgress(progress);
  }, [hydrated, progress]);

  useEffect(() => {
    if (!hydrated) return;
    setProgress((p) => ({ ...p, level, updatedAtIso: new Date().toISOString() }));
    setPrompt(createPrompt(level));
    setAnswer("");
    setFeedback({ kind: "idle" });
    setShowHint(false);
    queueMicrotask(() => inputRef.current?.focus());
  }, [hydrated, level]);

  const cfg = useMemo(() => getLevelConfig(level), [level]);

  function nextQuestion() {
    setPrompt(createPrompt(level));
    setAnswer("");
    setFeedback({ kind: "idle" });
    setShowHint(false);
    queueMicrotask(() => inputRef.current?.focus());
  }

  function submit() {
    const expected = formatRomanHint(prompt);
    const correct = isCorrectAnswer(answer, prompt);

    setFeedback(correct ? { kind: "correct", expected } : { kind: "wrong", expected });

    setProgress((p) => {
      const current = p.perLevel[level];
      const nextAttempts = current.attempts + 1;
      const nextCorrect = current.correct + (correct ? 1 : 0);
      const nextStreak = correct ? p.streak + 1 : 0;

      const next: StoredProgress = {
        ...p,
        totalAttempts: p.totalAttempts + 1,
        totalCorrect: p.totalCorrect + (correct ? 1 : 0),
        streak: nextStreak,
        bestStreak: Math.max(p.bestStreak, nextStreak),
        perLevel: {
          ...p.perLevel,
          [level]: { attempts: nextAttempts, correct: nextCorrect }
        },
        updatedAtIso: new Date().toISOString()
      };
      return next;
    });
  }

  function resetAll() {
    clearProgress();
    const fresh = defaultProgress(1);
    setProgress(fresh);
    setLevel(1);
    setPrompt(createPrompt(1));
    setAnswer("");
    setFeedback({ kind: "idle" });
    setShowHint(false);
    queueMicrotask(() => inputRef.current?.focus());
  }

  const correctRate = progress.totalAttempts
    ? Math.round((progress.totalCorrect / progress.totalAttempts) * 100)
    : 0;

  const progressPct = Math.min(100, correctRate);

  return (
    <div className="grid">
      <section className="card">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="row">
            <span className="tag">
              <span style={{ fontWeight: 800 }}>Level</span> <span>{level}</span>
            </span>
            <span className="tag">
              <span style={{ fontWeight: 800 }}>Streak</span> <span>{progress.streak}</span>
            </span>
            <span className="tag">
              <span style={{ fontWeight: 800 }}>Accuracy</span> <span>{correctRate}%</span>
            </span>
          </div>
          <button className="btn btnDanger" type="button" onClick={resetAll}>
            Reset
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          <div className="progressTrack" aria-label="accuracy progress">
            <div className="progressFill" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="small" style={{ marginTop: 8 }}>
            {cfg.label}: type the romanization (spaces/hyphens are OK).
          </div>
        </div>

        <div className="hangul" aria-label="hangul prompt">
          {prompt.hangul}
        </div>

        <p className="hint">
          Tip: If you are not sure, click <b>Hint</b> to see syllable-by-syllable romanization.
        </p>

        <div className="row">
          <input
            ref={inputRef}
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (feedback.kind === "idle") submit();
                else nextQuestion();
              }
            }}
            placeholder="Type pronunciation (romanization)…"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            inputMode="text"
          />
        </div>

        <div className="row" style={{ marginTop: 10 }}>
          {feedback.kind === "idle" ? (
            <button className="btn btnPrimary" type="button" onClick={submit} disabled={!answer.trim()}>
              Check
            </button>
          ) : (
            <button className="btn btnGood" type="button" onClick={nextQuestion}>
              Next
            </button>
          )}

          <button className="btn" type="button" onClick={() => setShowHint((s) => !s)}>
            {showHint ? "Hide hint" : "Hint"}
          </button>

          {level < 4 ? (
            <button className="btn" type="button" onClick={() => setLevel(clampLevel(level + 1))}>
              Next level →
            </button>
          ) : null}
        </div>

        {showHint ? (
          <div className="feedback">
            <div className="small">Hint (syllables):</div>
            <div style={{ marginTop: 4, fontWeight: 800 }}>{formatRomanHint(prompt)}</div>
          </div>
        ) : null}

        {feedback.kind !== "idle" ? (
          <div className="feedback" role="status" aria-live="polite">
            {feedback.kind === "correct" ? (
              <div className="good">
                Correct! <span className="small">(expected: {feedback.expected})</span>
              </div>
            ) : (
              <div className="bad">
                Not yet. <span className="small">(expected: {feedback.expected})</span>
              </div>
            )}
          </div>
        ) : null}
      </section>

      <aside style={{ display: "grid", gap: 14 }}>
        <LevelPicker
          level={level}
          progress={progress}
          onChangeLevel={(next) => setLevel(next)}
        />

        <div className="card">
          <div style={{ fontWeight: 800, marginBottom: 6 }}>How scoring works</div>
          <div className="small">
            Each time you click <b>Check</b>, it counts as 1 attempt. A correct answer increases your streak and
            saves progress to your browser.
          </div>
          <div className="small" style={{ marginTop: 10 }}>
            Want real vocabulary instead of random syllables? Tell me your target grade and language (EN/ID/etc),
            and I can replace the prompts with curated words per level.
          </div>
        </div>
      </aside>
    </div>
  );
}
