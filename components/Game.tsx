"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Prompt } from "@/lib/levels";
import { createPrompt, formatRomanHint, getLevelConfig, isCorrectAnswer } from "@/lib/levels";
import type { LevelNumber, StoredProgress } from "@/lib/storage";
import { clearProgress, defaultProgress, loadProgress, saveProgress } from "@/lib/storage";
import { isSpeechSupported, primeVoices, speakKorean, stopSpeaking } from "@/lib/tts";
import { HANGUL_GREETINGS } from "@/lib/greetings";
import { UI, useLanguage } from "@/lib/i18n";
import LevelPicker from "@/components/LevelPicker";
import ExampleList from "@/components/ExampleList";

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
  const lang = useLanguage();
  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState<StoredProgress>(() => defaultProgress(1));
  const [level, setLevel] = useState<LevelNumber>(1);
  const [prompt, setPrompt] = useState<Prompt>(() => createPrompt(1));
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback>({ kind: "idle" });
  const [showHint, setShowHint] = useState(false);
  const [ttsSupported, setTtsSupported] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const stored = loadProgress();
    if (stored) {
      setProgress(stored);
      setLevel(stored.level);
      setPrompt(createPrompt(stored.level));
    }
    setHydrated(true);
    setTtsSupported(isSpeechSupported());
    primeVoices();
    return () => stopSpeaking();
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
              <span style={{ fontWeight: 800 }}>{UI.level[lang]}</span> <span>{level}</span>
            </span>
            <span className="tag">
              <span style={{ fontWeight: 800 }}>{UI.streak[lang]}</span> <span>{progress.streak}</span>
            </span>
            <span className="tag">
              <span style={{ fontWeight: 800 }}>{UI.accuracy[lang]}</span> <span>{correctRate}%</span>
            </span>
          </div>
          <button className="btn btnDanger" type="button" onClick={resetAll}>
            {UI.reset[lang]}
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          <div className="progressTrack" aria-label="accuracy progress">
            <div className="progressFill" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="small" style={{ marginTop: 8 }}>
            {cfg.label}{UI.typePronunciation[lang]}
          </div>
        </div>

        <div className="hangul" aria-label="hangul prompt">
          {prompt.hangul}
        </div>

        <p className="hint">{UI.hintTip[lang]}</p>

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
            placeholder={UI.pronunciationPrompt[lang]}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            inputMode="text"
          />
        </div>

        <div className="row" style={{ marginTop: 10 }}>
          {feedback.kind === "idle" ? (
            <button className="btn btnPrimary" type="button" onClick={submit} disabled={!answer.trim()}>
              {UI.check[lang]}
            </button>
          ) : (
            <button className="btn btnGood" type="button" onClick={nextQuestion}>
              {UI.next[lang]}
            </button>
          )}

          <button className="btn" type="button" onClick={() => setShowHint((s) => !s)}>
            {showHint ? UI.hideHint[lang] : UI.hint[lang]}
          </button>

          <button
            className="btn btnSpeak"
            type="button"
            onClick={() => speakKorean(prompt.hangul)}
            disabled={!ttsSupported}
            title={ttsSupported ? UI.listenTitle[lang] : UI.ttsUnsupported[lang]}
          >
            {UI.listen[lang]}
          </button>

          {level < 4 ? (
            <button className="btn" type="button" onClick={() => setLevel(clampLevel(level + 1))}>
              {UI.nextLevel[lang]}
            </button>
          ) : null}
        </div>

        {showHint ? (
          <div className="feedback">
            <div className="small">{UI.hintLabel[lang]}</div>
            <div style={{ marginTop: 4, fontWeight: 800 }}>{formatRomanHint(prompt)}</div>
          </div>
        ) : null}

        {feedback.kind !== "idle" ? (
          <div className="feedback" role="status" aria-live="polite">
            {feedback.kind === "correct" ? (
              <div className="good">
                {UI.correctExcl[lang]} <span className="small">({UI.expectedLabel[lang]}: {feedback.expected})</span>
              </div>
            ) : (
              <div className="bad">
                {UI.notYetShort[lang]} <span className="small">({UI.expectedLabel[lang]}: {feedback.expected})</span>
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
          <div style={{ fontWeight: 800, marginBottom: 6 }}>{UI.scoringTitle[lang]}</div>
          <div className="small">{UI.scoringDesc[lang]}</div>
        </div>

        <div className="card">
          <ExampleList
            examples={HANGUL_GREETINGS}
            ttsSupported={ttsSupported}
            title={UI.greetingsTitle[lang]}
          />
        </div>
      </aside>
    </div>
  );
}
