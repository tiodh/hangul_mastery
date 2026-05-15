"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getSentencePattern,
  pickRandomQuestion,
  type QuizQuestion,
  type SentencePatternId
} from "@/lib/sentences";
import { isSpeechSupported, primeVoices, speakKorean, stopSpeaking } from "@/lib/tts";

type View = "lesson" | "quiz";

type Feedback =
  | { kind: "idle" }
  | { kind: "answered"; chosen: string; correct: boolean };

export default function SentencePractice({ pattern: patternId }: { pattern: SentencePatternId }) {
  const pattern = useMemo(() => getSentencePattern(patternId), [patternId]);

  const [view, setView] = useState<View>("lesson");
  const [question, setQuestion] = useState<QuizQuestion>(() => pattern.quiz[0]!);
  const [feedback, setFeedback] = useState<Feedback>({ kind: "idle" });
  const [stats, setStats] = useState({ correct: 0, attempts: 0 });
  const [ttsSupported, setTtsSupported] = useState(true);

  useEffect(() => {
    setTtsSupported(isSpeechSupported());
    primeVoices();
    return () => stopSpeaking();
  }, []);

  useEffect(() => {
    setView("lesson");
    setQuestion(pattern.quiz[0]!);
    setFeedback({ kind: "idle" });
    setStats({ correct: 0, attempts: 0 });
  }, [patternId, pattern]);

  function nextQuestion() {
    setQuestion((prev) => pickRandomQuestion(pattern, prev.prompt));
    setFeedback({ kind: "idle" });
  }

  function choose(option: string) {
    if (feedback.kind !== "idle") return;
    const correct = option === question.correct;
    setFeedback({ kind: "answered", chosen: option, correct });
    setStats((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      attempts: s.attempts + 1
    }));
  }

  const accuracy = stats.attempts ? Math.round((stats.correct / stats.attempts) * 100) : 0;

  return (
    <div className="grid">
      <section className="card">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="row">
            <span className="tag">
              <span style={{ fontWeight: 800 }}>{pattern.emoji}</span>
              <span>{pattern.label}</span>
            </span>
            {view === "quiz" ? (
              <span className="tag">
                <span style={{ fontWeight: 800 }}>Akurasi</span>
                <span>{accuracy}%</span>
              </span>
            ) : null}
          </div>
          <div className="row">
            <button
              type="button"
              className={`btn ${view === "lesson" ? "btnPrimary" : ""}`}
              onClick={() => setView("lesson")}
            >
              Penjelasan
            </button>
            <button
              type="button"
              className={`btn ${view === "quiz" ? "btnPrimary" : ""}`}
              onClick={() => setView("quiz")}
            >
              Latihan
            </button>
          </div>
        </div>

        <div className="small" style={{ marginTop: 10 }}>{pattern.description}</div>

        {view === "lesson" ? (
          <>
            <div className="feedback" style={{ marginTop: 14 }}>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>📌 Maksudnya</div>
              <div style={{ lineHeight: 1.6 }}>{pattern.purpose}</div>
            </div>

            {pattern.mechanic ? (
              <div className="feedback" style={{ marginTop: 10 }}>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>🧭 Cara Pakai</div>
                <div className="small" style={{ lineHeight: 1.6 }}>{pattern.mechanic}</div>
              </div>
            ) : null}

            <div style={{ fontWeight: 800, marginTop: 16, marginBottom: 8 }}>
              Aturan & Contoh Konkret
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {pattern.variants.map((v, i) => (
                <div key={i} className={`variantCard variantCard-${v.tone}`}>
                  <div className="row" style={{ justifyContent: "space-between", marginBottom: 8 }}>
                    <span className={`variantBadge variantBadge-${v.tone}`}>{v.badge}</span>
                    <span className="variantRule">{v.rule}</span>
                  </div>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>{v.title}</div>
                  <div style={{ display: "grid", gap: 6 }}>
                    {v.examples.map((ex, j) => (
                      <div key={j} className="variantExample">
                        <div className="row" style={{ justifyContent: "space-between" }}>
                          <div>
                            <span className="variantWord">{ex.word}</span>
                            <span className="small"> ({ex.meaning}) — {ex.detail}</span>
                          </div>
                          <div className="row" style={{ gap: 6 }}>
                            <span className="variantResult">{ex.result}</span>
                            <button
                              type="button"
                              className="btn btnSpeak btnSpeakMini"
                              onClick={() => speakKorean(ex.result)}
                              disabled={!ttsSupported}
                              aria-label={`Dengarkan: ${ex.result}`}
                            >
                              🔊
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontWeight: 800, marginTop: 16, marginBottom: 8 }}>Contoh Kalimat</div>
            <div style={{ display: "grid", gap: 10 }}>
              {pattern.examples.map((ex, i) => (
                <div key={i} className="exampleCard">
                  <div className="row" style={{ justifyContent: "space-between" }}>
                    <div className="exampleKorean">{ex.korean}</div>
                    <button
                      type="button"
                      className="btn btnSpeak"
                      onClick={() => speakKorean(ex.korean)}
                      disabled={!ttsSupported}
                      aria-label={`Dengarkan: ${ex.korean}`}
                    >
                      🔊
                    </button>
                  </div>
                  <div className="small" style={{ marginTop: 4 }}>{ex.indonesian}</div>
                  {ex.note ? (
                    <div className="small" style={{ marginTop: 4, fontStyle: "italic", opacity: 0.85 }}>
                      💡 {ex.note}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="hint" style={{ marginTop: 14 }}>
              Pilih akhiran yang tepat untuk kata di bawah ini.
            </p>

            <div className="quizPrompt">
              <div className="hangul" style={{ fontSize: 48, margin: 0 }}>{question.prompt}</div>
              <div className="small">arti: <b>{question.promptMeaning}</b></div>
            </div>

            <div className="row" style={{ marginTop: 14, gap: 10 }}>
              {question.options.map((opt) => {
                const isChosen = feedback.kind === "answered" && feedback.chosen === opt;
                const isCorrect = feedback.kind === "answered" && opt === question.correct;
                let extra = "";
                if (feedback.kind === "answered") {
                  if (isCorrect) extra = "btnGood";
                  else if (isChosen) extra = "btnDanger";
                }
                return (
                  <button
                    key={opt}
                    type="button"
                    className={`btn quizOption ${extra}`}
                    onClick={() => choose(opt)}
                    disabled={feedback.kind !== "idle"}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {feedback.kind === "answered" ? (
              <div className="feedback" role="status" aria-live="polite">
                <div className={feedback.correct ? "good" : "bad"} style={{ fontWeight: 800 }}>
                  {feedback.correct ? "Benar! 🎉" : "Belum tepat."}
                </div>
                <div className="small" style={{ marginTop: 6 }}>{question.explanation}</div>
                <div style={{ marginTop: 10 }} className="row">
                  <div className="exampleKorean" style={{ fontSize: 22 }}>{question.fullSentence}</div>
                  <button
                    type="button"
                    className="btn btnSpeak"
                    onClick={() => speakKorean(question.fullSentence)}
                    disabled={!ttsSupported}
                  >
                    🔊
                  </button>
                </div>
                <div className="small" style={{ marginTop: 4 }}>{question.fullMeaning}</div>
                <div className="row" style={{ marginTop: 12 }}>
                  <button type="button" className="btn btnPrimary" onClick={nextQuestion}>
                    Soal berikutnya →
                  </button>
                </div>
              </div>
            ) : null}
          </>
        )}

        {!ttsSupported ? (
          <div className="small" style={{ marginTop: 12 }}>
            ⚠️ Browser tidak mendukung TTS. Gunakan Chrome, Edge, atau Safari terbaru.
          </div>
        ) : null}
      </section>

      <aside style={{ display: "grid", gap: 14 }}>
        <div className="card">
          <div style={{ fontWeight: 800, marginBottom: 6 }}>Cara Belajar</div>
          <ol className="small" style={{ paddingLeft: 18, margin: 0, lineHeight: 1.6 }}>
            <li>Baca <b>Penjelasan</b> untuk pahami aturan & 받침 (konsonan akhir).</li>
            <li>Klik 🔊 di tiap contoh untuk dengar pelafalannya.</li>
            <li>Pindah ke <b>Latihan</b> dan pilih akhiran yang tepat.</li>
            <li>Setelah jawab, dengarkan kalimat lengkap untuk merekat ingatan.</li>
          </ol>
        </div>

        {view === "quiz" ? (
          <div className="card">
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Statistik Sesi</div>
            <div className="row">
              <span className="tag">
                <span style={{ fontWeight: 800 }}>Benar</span>
                <span>{stats.correct}</span>
              </span>
              <span className="tag">
                <span style={{ fontWeight: 800 }}>Percobaan</span>
                <span>{stats.attempts}</span>
              </span>
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
