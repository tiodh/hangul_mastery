"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  onstart: ((this: SpeechRecognitionLike, ev: Event) => unknown) | null;
  onresult: ((this: SpeechRecognitionLike, ev: SpeechRecognitionEvent) => unknown) | null;
  onerror: ((this: SpeechRecognitionLike, ev: SpeechRecognitionErrorEvent) => unknown) | null;
  onend: ((this: SpeechRecognitionLike, ev: Event) => unknown) | null;
  start(): void;
  stop(): void;
  abort(): void;
};

type SpeechRecognitionEvent = Event & {
  results: ArrayLike<ArrayLike<{ transcript: string; confidence: number }>>;
  resultIndex: number;
};

type SpeechRecognitionErrorEvent = Event & {
  error: string;
  message?: string;
};

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function getRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function isRecognitionSupported(): boolean {
  return getRecognitionCtor() !== null;
}

export type RecognitionState = "idle" | "listening" | "result" | "error";

export type SpeechRecognitionHook = {
  state: RecognitionState;
  transcript: string;
  confidence: number;
  error: string | null;
  supported: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
};

export function useSpeechRecognition(opts?: { lang?: string }): SpeechRecognitionHook {
  const lang = opts?.lang ?? "ko-KR";
  const [state, setState] = useState<RecognitionState>("idle");
  const [transcript, setTranscript] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(false);
  const recRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    setSupported(isRecognitionSupported());
    return () => {
      if (recRef.current) {
        try {
          recRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const start = useCallback(() => {
    const Ctor = getRecognitionCtor();
    if (!Ctor) {
      setError("Speech recognition not supported");
      setState("error");
      return;
    }
    if (recRef.current) {
      try {
        recRef.current.abort();
      } catch {
        // ignore
      }
    }
    const rec = new Ctor();
    rec.lang = lang;
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.continuous = false;

    rec.onstart = () => {
      setState("listening");
      setTranscript("");
      setError(null);
    };
    rec.onresult = (event: SpeechRecognitionEvent) => {
      const first = event.results[0]?.[0];
      if (first) {
        setTranscript(first.transcript);
        setConfidence(first.confidence ?? 0);
        setState("result");
      }
    };
    rec.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError(event.error || "Recognition error");
      setState("error");
    };
    rec.onend = () => {
      setState((prev) => (prev === "listening" ? "idle" : prev));
    };

    recRef.current = rec;
    try {
      rec.start();
    } catch (e) {
      setError((e as Error).message || "Failed to start");
      setState("error");
    }
  }, [lang]);

  const stop = useCallback(() => {
    if (recRef.current) {
      try {
        recRef.current.stop();
      } catch {
        // ignore
      }
    }
  }, []);

  const reset = useCallback(() => {
    if (recRef.current) {
      try {
        recRef.current.abort();
      } catch {
        // ignore
      }
    }
    setState("idle");
    setTranscript("");
    setConfidence(0);
    setError(null);
  }, []);

  return { state, transcript, confidence, error, supported, start, stop, reset };
}

export function normalizeForCompare(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[\s.,!?;:'"()\[\]]/g, "");
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[] = new Array(n + 1);
  for (let j = 0; j <= n; j++) dp[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = dp[0]!;
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j]!;
      if (a[i - 1] === b[j - 1]) {
        dp[j] = prev;
      } else {
        dp[j] = 1 + Math.min(dp[j]!, dp[j - 1]!, prev);
      }
      prev = tmp;
    }
  }
  return dp[n]!;
}

export type PronunciationVerdict = "match" | "close" | "miss";

export type PronunciationResult = {
  score: number;
  verdict: PronunciationVerdict;
  normalizedSpoken: string;
  normalizedTarget: string;
};

export function comparePronunciation(spoken: string, target: string): PronunciationResult {
  const a = normalizeForCompare(spoken);
  const b = normalizeForCompare(target);
  if (!a || !b) {
    return { score: 0, verdict: "miss", normalizedSpoken: a, normalizedTarget: b };
  }
  if (a === b) {
    return { score: 1, verdict: "match", normalizedSpoken: a, normalizedTarget: b };
  }
  const distance = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  const score = Math.max(0, 1 - distance / maxLen);
  const verdict: PronunciationVerdict = score >= 0.85 ? "match" : score >= 0.55 ? "close" : "miss";
  return { score, verdict, normalizedSpoken: a, normalizedTarget: b };
}
