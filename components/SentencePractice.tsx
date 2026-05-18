"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getSentencePattern,
  pickRandomQuestion,
  type QuizQuestion,
  type SentencePatternId
} from "@/lib/sentences";
import { isSpeechSupported, primeVoices, speakKorean, stopSpeaking } from "@/lib/tts";
import { UI, useLanguage } from "@/lib/i18n";
import ExampleList from "@/components/ExampleList";

type View = "lesson" | "quiz";

type Feedback =
  | { kind: "idle" }
  | { kind: "answered"; chosen: string; correct: boolean };

export default function SentencePractice({ pattern: patternId }: { pattern: SentencePatternId }) {
  const lang = useLanguage();
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
    <section className="card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div className="row">
          <span className="tag">
            <span style={{ fontWeight: 800 }}>{pattern.emoji}</span>
            <span>{pattern.label[lang]}</span>
          </span>
          {view === "quiz" ? (
            <>
              <span className="tag">
                <span style={{ fontWeight: 800 }}>{UI.accuracy[lang]}</span>
                <span>{accuracy}%</span>
              </span>
              <span className="tag">
                <span style={{ fontWeight: 800 }}>{UI.correct[lang]}</span>
                <span>{stats.correct}/{stats.attempts}</span>
              </span>
            </>
          ) : null}
        </div>
        <div className="row">
          <button
            type="button"
            className={`btn ${view === "lesson" ? "btnPrimary" : ""}`}
            onClick={() => setView("lesson")}
          >
            {UI.explanation[lang]}
          </button>
          <button
            type="button"
            className={`btn ${view === "quiz" ? "btnPrimary" : ""}`}
            onClick={() => setView("quiz")}
          >
            {UI.practice[lang]}
          </button>
        </div>
      </div>

      <div className="small" style={{ marginTop: 10 }}>{pattern.description[lang]}</div>

      {view === "lesson" ? (
        <>
          <div className="feedback" style={{ marginTop: 14 }}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>{UI.purposeTitle[lang]}</div>
            <div style={{ lineHeight: 1.6 }}>{pattern.purpose[lang]}</div>
          </div>

          {pattern.mechanic ? (
            <div className="feedback" style={{ marginTop: 10 }}>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>{UI.howToUseTitle[lang]}</div>
              <div className="small" style={{ lineHeight: 1.6 }}>{pattern.mechanic[lang]}</div>
            </div>
          ) : null}

          <div style={{ fontWeight: 800, marginTop: 16, marginBottom: 8 }}>
            {UI.rulesExamplesTitle[lang]}
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {pattern.variants.map((v, i) => (
              <div key={i} className={`variantCard variantCard-${v.tone}`}>
                <div className="row" style={{ justifyContent: "space-between", marginBottom: 8 }}>
                  <span className={`variantBadge variantBadge-${v.tone}`}>{v.badge[lang]}</span>
                  <span className="variantRule">{v.rule[lang]}</span>
                </div>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>{v.title[lang]}</div>
                <div style={{ display: "grid", gap: 6 }}>
                  {v.examples.map((ex, j) => (
                    <div key={j} className="variantExample">
                      <div className="row" style={{ justifyContent: "space-between" }}>
                        <div>
                          <span className="variantWord">{ex.word}</span>
                          <span className="romanInline"> [{ex.wordRoman}]</span>
                          <span className="small"> ({ex.meaning[lang]}) — {ex.detail[lang]}</span>
                        </div>
                        <div className="row" style={{ gap: 6 }}>
                          <div style={{ textAlign: "right" }}>
                            <div className="variantResult">{ex.result}</div>
                            <div className="romanLine">[{ex.resultRoman}]</div>
                          </div>
                          <button
                            type="button"
                            className="btn btnSpeak btnSpeakMini"
                            onClick={() => speakKorean(ex.result)}
                            disabled={!ttsSupported}
                            aria-label={`${UI.listen[lang]}: ${ex.result}`}
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

          <div style={{ marginTop: 16 }}>
            <ExampleList examples={pattern.examples} ttsSupported={ttsSupported} title={UI.exampleSentencesTitle[lang]} />
          </div>
        </>
      ) : (
        <>
          <p className="hint" style={{ marginTop: 14 }}>{UI.quizPromptCopy[lang]}</p>

          <div className="quizPrompt">
            <div className="hangul" style={{ fontSize: 48, margin: 0 }}>{question.prompt}</div>
            {question.promptRoman ? (
              <div className="romanLine" style={{ fontSize: 14 }}>[{question.promptRoman}]</div>
            ) : null}
            <div className="small">{UI.meaningPrefix[lang]}: <b>{question.promptMeaning[lang]}</b></div>
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
                {feedback.correct ? UI.correctExcl[lang] : UI.notYet[lang]}
              </div>
              <div className="small" style={{ marginTop: 6 }}>{question.explanation[lang]}</div>
              <div style={{ marginTop: 10 }} className="row">
                <div>
                  <div className="exampleKorean" style={{ fontSize: 22 }}>{question.fullSentence}</div>
                  <div className="romanLine">[{question.fullSentenceRoman}]</div>
                </div>
                <button
                  type="button"
                  className="btn btnSpeak"
                  onClick={() => speakKorean(question.fullSentence)}
                  disabled={!ttsSupported}
                >
                  🔊
                </button>
              </div>
              <div className="small" style={{ marginTop: 4 }}>{question.fullMeaning[lang]}</div>
              <div className="row" style={{ marginTop: 12 }}>
                <button type="button" className="btn btnPrimary" onClick={nextQuestion}>
                  {UI.nextQuestion[lang]}
                </button>
              </div>
            </div>
          ) : null}
        </>
      )}

      {!ttsSupported ? (
        <div className="small" style={{ marginTop: 12 }}>{UI.ttsWarning[lang]}</div>
      ) : null}

      <div className="tipsInline">{UI.tipsSentence[lang]}</div>
    </section>
  );
}
