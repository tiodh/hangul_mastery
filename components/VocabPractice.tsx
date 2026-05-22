"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  getCategoryConfig,
  getVocabList,
  isCorrectMeaning,
  pickRandomItem,
  type VocabCategory,
  type VocabItem
} from "@/lib/vocabulary";
import { isSpeechSupported, primeVoices, speakKorean, stopSpeaking } from "@/lib/tts";
import { comparePronunciation, useSpeechRecognition } from "@/lib/stt";
import { UI, useLanguage } from "@/lib/i18n";
import ExampleList from "@/components/ExampleList";

type Mode = "flashcard" | "quiz" | "speak";

type Feedback =
  | { kind: "idle" }
  | { kind: "correct"; expected: string }
  | { kind: "wrong"; expected: string };

export default function VocabPractice({ category }: { category: VocabCategory }) {
  const lang = useLanguage();
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
  const stt = useSpeechRecognition({ lang: "ko-KR" });

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
    stt.reset();
  }

  function handleSpeak() {
    speakKorean(item.hangul);
  }

  function handleCheck() {
    const correct = isCorrectMeaning(answer, item, lang);
    const expected = item.meaning[lang];
    setFeedback(correct ? { kind: "correct", expected } : { kind: "wrong", expected });
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
            <span>{cfg.label[lang]}</span>
          </span>
          <span className="tag">
            <span style={{ fontWeight: 800 }}>{UI.totalWords[lang]}</span>
            <span>{list.length}</span>
          </span>
          {mode === "quiz" ? (
            <span className="tag">
              <span style={{ fontWeight: 800 }}>{UI.accuracy[lang]}</span>
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
            {UI.cards[lang]}
          </button>
          <button
            type="button"
            className={`btn ${mode === "quiz" ? "btnPrimary" : ""}`}
            onClick={() => setMode("quiz")}
          >
            {UI.quiz[lang]}
          </button>
          <button
            type="button"
            className={`btn ${mode === "speak" ? "btnPrimary" : ""}`}
            onClick={() => setMode("speak")}
            disabled={!stt.supported}
            title={stt.supported ? "" : UI.sttUnsupported[lang]}
          >
            🎤 {UI.speak[lang]}
          </button>
        </div>
      </div>

      <div className="small" style={{ marginTop: 10 }}>{cfg.description[lang]}</div>

      <div className="hangul" aria-label="kata korea">
        {item.hangul}
      </div>

      <div className="row" style={{ marginBottom: 8 }}>
        <button
          type="button"
          className="btn btnSpeak"
          onClick={handleSpeak}
          disabled={!ttsSupported}
          title={ttsSupported ? UI.listenTitle[lang] : UI.ttsUnsupported[lang]}
        >
          {UI.listen[lang]}
        </button>
        <span className="small">{UI.reading[lang]}: <b>{item.roman}</b></span>
      </div>

      {mode === "flashcard" ? (
        <div className="feedback">
          {revealed ? (
            <div>
              <div className="small">{UI.meaning[lang]}:</div>
              <div style={{ marginTop: 4, fontWeight: 800, fontSize: 20 }}>{item.meaning[lang]}</div>
            </div>
          ) : (
            <div className="small">
              {lang === "id" ? (
                <>Tebak dulu artinya, lalu klik <b>{UI.showMeaning.id}</b>.</>
              ) : lang === "hi" ? (
                <>पहले अर्थ का अनुमान लगाएं, फिर <b>{UI.showMeaning.hi}</b> पर क्लिक करें।</>
              ) : (
                <>Try to guess the meaning, then click <b>{UI.showMeaning.en}</b>.</>
              )}
            </div>
          )}
          <div className="row" style={{ marginTop: 12 }}>
            <button
              type="button"
              className="btn btnPrimary"
              onClick={() => setRevealed((r) => !r)}
            >
              {revealed ? UI.hideMeaning[lang] : UI.showMeaning[lang]}
            </button>
            <button type="button" className="btn btnGood" onClick={nextItem}>
              {UI.nextWord[lang]}
            </button>
          </div>
        </div>
      ) : mode === "speak" ? (
        <SpeakMode
          item={item}
          stt={stt}
          lang={lang}
          onNext={nextItem}
        />
      ) : (
        <>
          <p className="hint">{UI.vocabQuizPrompt[lang]}</p>
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
              placeholder={UI.typeMeaning[lang]}
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
                {UI.check[lang]}
              </button>
            ) : (
              <button type="button" className="btn btnGood" onClick={nextItem}>
                {UI.next[lang]}
              </button>
            )}
            <button type="button" className="btn" onClick={() => setRevealed((r) => !r)}>
              {revealed ? UI.hideAnswerMeaning[lang] : UI.seeMeaning[lang]}
            </button>
          </div>

          {revealed ? (
            <div className="feedback">
              <div className="small">{UI.meaning[lang]}:</div>
              <div style={{ marginTop: 4, fontWeight: 800 }}>{item.meaning[lang]}</div>
            </div>
          ) : null}

          {feedback.kind !== "idle" ? (
            <div className="feedback" role="status" aria-live="polite">
              {feedback.kind === "correct" ? (
                <div className="good">
                  {UI.correctExcl[lang]} <span className="small">({UI.answerLabel[lang]}: {feedback.expected})</span>
                </div>
              ) : (
                <div className="bad">
                  {UI.notYet[lang]} <span className="small">({UI.answerLabel[lang]}: {feedback.expected})</span>
                </div>
              )}
            </div>
          ) : null}
        </>
      )}

      {!ttsSupported ? (
        <div className="small" style={{ marginTop: 12 }}>{UI.ttsWarning[lang]}</div>
      ) : null}

      <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
        <ExampleList examples={cfg.usageExamples} ttsSupported={ttsSupported} title={UI.usageExamplesTitle[lang]} />
      </div>

      {mode === "quiz" ? (
        <div className="tipsInline">
          <b>{UI.sessionPrefix[lang]}</b> {stats.correct}/{stats.attempts} ({accuracy}%) — {UI.statsHint[lang]}
        </div>
      ) : mode === "speak" ? (
        <div className="tipsInline">{UI.speakTip[lang]}</div>
      ) : (
        <div className="tipsInline">{UI.tipsVocab[lang]}</div>
      )}
    </section>
  );
}

function SpeakMode({
  item,
  stt,
  lang,
  onNext
}: {
  item: VocabItem;
  stt: ReturnType<typeof useSpeechRecognition>;
  lang: "id" | "en" | "hi";
  onNext: () => void;
}) {
  const result =
    stt.state === "result" && stt.transcript
      ? comparePronunciation(stt.transcript, item.hangul)
      : null;

  const verdictText =
    result?.verdict === "match"
      ? UI.verdictMatch[lang]
      : result?.verdict === "close"
      ? UI.verdictClose[lang]
      : result
      ? UI.verdictMiss[lang]
      : "";

  const verdictClass =
    result?.verdict === "match"
      ? "good"
      : result?.verdict === "miss"
      ? "bad"
      : "";

  return (
    <div className="feedback">
      {!stt.supported ? (
        <div className="bad small">{UI.sttUnsupported[lang]}</div>
      ) : (
        <>
          <p className="hint" style={{ margin: 0 }}>{UI.speakPrompt[lang]}</p>

          <div className="row" style={{ marginTop: 12 }}>
            {stt.state === "listening" ? (
              <button type="button" className="btn btnDanger" onClick={stt.stop}>
                {UI.speakListening[lang]}
              </button>
            ) : (
              <button type="button" className="btn btnPrimary" onClick={stt.start}>
                {result ? UI.speakAgain[lang] : UI.speakStart[lang]}
              </button>
            )}
            <button type="button" className="btn btnGood" onClick={onNext}>
              {UI.nextWord[lang]}
            </button>
          </div>

          {stt.error ? (
            <div className="small bad" style={{ marginTop: 10 }}>
              {stt.error === "not-allowed" || stt.error === "service-not-allowed"
                ? UI.sttPermissionError[lang]
                : stt.error}
            </div>
          ) : null}

          {result ? (
            <div className="feedback" role="status" aria-live="polite">
              <div className="small">{UI.youSaid[lang]}</div>
              <div className="exampleKorean" style={{ marginTop: 4 }}>
                {stt.transcript}
              </div>
              <div className="row" style={{ marginTop: 8 }}>
                <span className="tag">
                  <span style={{ fontWeight: 800 }}>{UI.scoreLabel[lang]}</span>
                  <span>{Math.round(result.score * 100)}%</span>
                </span>
                {stt.confidence > 0 ? (
                  <span className="small" style={{ opacity: 0.7 }}>
                    (confidence {Math.round(stt.confidence * 100)}%)
                  </span>
                ) : null}
              </div>
              <div className={verdictClass} style={{ marginTop: 8, fontWeight: 700 }}>
                {verdictText}
              </div>
            </div>
          ) : null}

          <div className="small" style={{ marginTop: 10, opacity: 0.75 }}>
            {UI.sttPrivacy[lang]}
          </div>
        </>
      )}
    </div>
  );
}
