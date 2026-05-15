"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  getCategoryConfig,
  getVocabList,
  isCorrectIndonesian,
  pickRandomItem,
  type VocabCategory,
  type VocabItem
} from "@/lib/vocabulary";
import { isSpeechSupported, primeVoices, speakKorean, stopSpeaking } from "@/lib/tts";
import ExampleList from "@/components/ExampleList";

type Mode = "flashcard" | "quiz";

type Feedback =
  | { kind: "idle" }
  | { kind: "correct"; expected: string }
  | { kind: "wrong"; expected: string };

export default function VocabPractice({ category }: { category: VocabCategory }) {
  const cfg = useMemo(() => getCategoryConfig(category), [category]);
  const list = useMemo(() => getVocabList(category), [category]);

  const [item, setItem] = useState<VocabItem>(() => list[0]!);
  const [mode, setMode] = useState<Mode>("flashcard");
  const [revealed, setRevealed] = useState(false);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback>({ kind: "idle" });
  const [stats, setStats] = useState({ correct: 0, attempts: 0 });
  const [ttsSupported, setTtsSupported] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTtsSupported(isSpeechSupported());
    primeVoices();
    return () => stopSpeaking();
  }, []);

  useEffect(() => {
    setItem(list[0]!);
    setRevealed(false);
    setAnswer("");
    setFeedback({ kind: "idle" });
    setStats({ correct: 0, attempts: 0 });
  }, [category, list]);

  useEffect(() => {
    if (mode === "quiz") {
      queueMicrotask(() => inputRef.current?.focus());
    }
  }, [mode, item]);

  function nextItem() {
    setItem((prev) => pickRandomItem(list, prev.hangul));
    setRevealed(false);
    setAnswer("");
    setFeedback({ kind: "idle" });
  }

  function handleSpeak() {
    speakKorean(item.hangul);
  }

  function handleCheck() {
    const correct = isCorrectIndonesian(answer, item);
    setFeedback(correct ? { kind: "correct", expected: item.indonesian } : { kind: "wrong", expected: item.indonesian });
    setStats((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      attempts: s.attempts + 1
    }));
  }

  const accuracy = stats.attempts ? Math.round((stats.correct / stats.attempts) * 100) : 0;

  return (
    <section className="card">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="row">
            <span className="tag">
              <span style={{ fontWeight: 800 }}>{cfg.emoji}</span>
              <span>{cfg.label}</span>
            </span>
            <span className="tag">
              <span style={{ fontWeight: 800 }}>Total kata</span>
              <span>{list.length}</span>
            </span>
            {mode === "quiz" ? (
              <span className="tag">
                <span style={{ fontWeight: 800 }}>Akurasi</span>
                <span>{accuracy}%</span>
              </span>
            ) : null}
          </div>
          <div className="row">
            <button
              type="button"
              className={`btn ${mode === "flashcard" ? "btnPrimary" : ""}`}
              onClick={() => setMode("flashcard")}
            >
              Kartu
            </button>
            <button
              type="button"
              className={`btn ${mode === "quiz" ? "btnPrimary" : ""}`}
              onClick={() => setMode("quiz")}
            >
              Kuis
            </button>
          </div>
        </div>

        <div className="small" style={{ marginTop: 10 }}>{cfg.description}</div>

        <div className="hangul" aria-label="kata korea">
          {item.hangul}
        </div>

        <div className="row" style={{ marginBottom: 8 }}>
          <button
            type="button"
            className="btn btnSpeak"
            onClick={handleSpeak}
            disabled={!ttsSupported}
            title={ttsSupported ? "Dengarkan pelafalan" : "TTS tidak didukung di browser ini"}
          >
            🔊 Dengarkan
          </button>
          <span className="small">Romanisasi: <b>{item.roman}</b></span>
        </div>

        {mode === "flashcard" ? (
          <div className="feedback">
            {revealed ? (
              <div>
                <div className="small">Arti (Bahasa Indonesia):</div>
                <div style={{ marginTop: 4, fontWeight: 800, fontSize: 20 }}>{item.indonesian}</div>
              </div>
            ) : (
              <div className="small">Tebak dulu artinya, lalu klik <b>Tampilkan arti</b>.</div>
            )}
            <div className="row" style={{ marginTop: 12 }}>
              <button
                type="button"
                className="btn btnPrimary"
                onClick={() => setRevealed((r) => !r)}
              >
                {revealed ? "Sembunyikan" : "Tampilkan arti"}
              </button>
              <button type="button" className="btn btnGood" onClick={nextItem}>
                Kata berikutnya →
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="hint">Ketik arti kata Korea di atas dalam Bahasa Indonesia.</p>
            <div className="row">
              <input
                ref={inputRef}
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (feedback.kind === "idle") handleCheck();
                    else nextItem();
                  }
                }}
                placeholder="Ketik arti dalam Bahasa Indonesia…"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>

            <div className="row" style={{ marginTop: 10 }}>
              {feedback.kind === "idle" ? (
                <button
                  type="button"
                  className="btn btnPrimary"
                  onClick={handleCheck}
                  disabled={!answer.trim()}
                >
                  Periksa
                </button>
              ) : (
                <button type="button" className="btn btnGood" onClick={nextItem}>
                  Lanjut →
                </button>
              )}
              <button type="button" className="btn" onClick={() => setRevealed((r) => !r)}>
                {revealed ? "Sembunyikan arti" : "Lihat arti"}
              </button>
            </div>

            {revealed ? (
              <div className="feedback">
                <div className="small">Arti:</div>
                <div style={{ marginTop: 4, fontWeight: 800 }}>{item.indonesian}</div>
              </div>
            ) : null}

            {feedback.kind !== "idle" ? (
              <div className="feedback" role="status" aria-live="polite">
                {feedback.kind === "correct" ? (
                  <div className="good">
                    Benar! <span className="small">(jawaban: {feedback.expected})</span>
                  </div>
                ) : (
                  <div className="bad">
                    Belum tepat. <span className="small">(jawaban: {feedback.expected})</span>
                  </div>
                )}
              </div>
            ) : null}
          </>
        )}

        {!ttsSupported ? (
          <div className="small" style={{ marginTop: 12 }}>
            ⚠️ Browser Anda tidak mendukung text-to-speech. Coba gunakan Chrome, Edge, atau Safari terbaru.
          </div>
        ) : null}

        <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
          <ExampleList examples={cfg.usageExamples} ttsSupported={ttsSupported} title="Contoh Kalimat Penggunaan" />
        </div>

        {mode === "quiz" ? (
          <div className="tipsInline">
            <b>📊 Sesi:</b> {stats.correct}/{stats.attempts} benar ({accuracy}%) — statistik tidak disimpan antar sesi.
          </div>
        ) : (
          <div className="tipsInline">
            <b>💡 Tips:</b> Klik 🔊 sambil mengucap ulang. Mode <b>Kartu</b> untuk tebak arti, mode <b>Kuis</b> untuk ketik arti dalam Bahasa Indonesia (Enter = cek).
          </div>
        )}
      </section>
  );
}
