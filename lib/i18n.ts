"use client";

import { useEffect, useState } from "react";

export type Language = "id" | "en";

export type Loc = { id: string; en: string };

const STORAGE_KEY = "hangul-lang";
const LANG_EVENT = "hangul-lang-change";

export function pick(loc: Loc, lang: Language): string {
  return loc[lang];
}

export function pickOptional(loc: Loc | undefined, lang: Language): string | undefined {
  return loc ? loc[lang] : undefined;
}

export function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "id";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "id" || stored === "en") return stored;
  } catch {
    // ignore
  }
  return "id";
}

export function setLanguage(lang: Language): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent<Language>(LANG_EVENT, { detail: lang }));
}

export function useLanguage(): Language {
  const [lang, setLang] = useState<Language>("id");

  useEffect(() => {
    setLang(getInitialLanguage());
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Language>).detail;
      if (detail === "id" || detail === "en") setLang(detail);
    };
    window.addEventListener(LANG_EVENT, handler as EventListener);
    return () => window.removeEventListener(LANG_EVENT, handler as EventListener);
  }, []);

  return lang;
}

export const UI = {
  // Section tabs
  basics: { id: "Kata Dasar", en: "Basics" },
  sentences: { id: "Bentuk Kalimat", en: "Sentence Patterns" },

  // Mode tabs
  cards: { id: "Kartu", en: "Cards" },
  quiz: { id: "Kuis", en: "Quiz" },
  explanation: { id: "Penjelasan", en: "Explanation" },
  practice: { id: "Latihan", en: "Practice" },

  // Stats tags
  totalWords: { id: "Total kata", en: "Total words" },
  accuracy: { id: "Akurasi", en: "Accuracy" },
  correct: { id: "Benar", en: "Correct" },
  attempts: { id: "Percobaan", en: "Attempts" },
  meaning: { id: "Arti", en: "Meaning" },
  meaningPrefix: { id: "arti", en: "meaning" },
  reading: { id: "Romanisasi", en: "Reading" },

  // Actions
  listen: { id: "🔊 Dengarkan", en: "🔊 Listen" },
  listenTitle: { id: "Dengarkan pelafalan", en: "Listen to pronunciation" },
  ttsUnsupported: { id: "TTS tidak didukung di browser ini", en: "TTS not supported in this browser" },
  showMeaning: { id: "Tampilkan arti", en: "Show meaning" },
  hideMeaning: { id: "Sembunyikan", en: "Hide" },
  nextWord: { id: "Kata berikutnya →", en: "Next word →" },
  check: { id: "Periksa", en: "Check" },
  next: { id: "Lanjut →", en: "Next →" },
  seeMeaning: { id: "Lihat arti", en: "See meaning" },
  hideAnswerMeaning: { id: "Sembunyikan arti", en: "Hide meaning" },

  // Quiz feedback
  correctExcl: { id: "Benar! 🎉", en: "Correct! 🎉" },
  notYet: { id: "Belum tepat.", en: "Not quite." },
  notYetShort: { id: "Belum tepat.", en: "Not yet." },
  nextQuestion: { id: "Soal berikutnya →", en: "Next question →" },
  answerLabel: { id: "jawaban", en: "answer" },
  expectedLabel: { id: "expected", en: "expected" },

  // Lesson section titles
  purposeTitle: { id: "📌 Maksudnya", en: "📌 Meaning" },
  howToUseTitle: { id: "🧭 Cara Pakai", en: "🧭 How to Use" },
  rulesExamplesTitle: { id: "Aturan & Contoh Konkret", en: "Rules & Concrete Examples" },
  exampleSentencesTitle: { id: "Contoh Kalimat", en: "Example Sentences" },
  usageExamplesTitle: { id: "Contoh Kalimat Penggunaan", en: "Usage Examples" },
  greetingsTitle: { id: "Sapaan & Perkenalan Dasar", en: "Basic Greetings & Introductions" },

  // Example kinds
  kindStatement: { id: "Kalimat Biasa", en: "Statement" },
  kindQuestion: { id: "Kalimat Tanya", en: "Question" },
  kindPositive: { id: "Jawaban Positif", en: "Positive Answer" },
  kindNegative: { id: "Jawaban Negatif", en: "Negative Answer" },

  // Quiz prompt copy
  quizPromptCopy: {
    id: "Pilih akhiran yang tepat untuk kata di bawah ini.",
    en: "Choose the correct particle/ending for the word below."
  },

  // Tips
  tipsSentence: {
    id: "💡 Tips: Baca Penjelasan & klik 🔊 di tiap contoh untuk mendengar pelafalan, lalu coba Latihan.",
    en: "💡 Tip: Read the Explanation and tap 🔊 on each example to hear the pronunciation, then try the Practice."
  },
  tipsVocab: {
    id: "💡 Tips: Klik 🔊 sambil mengucap ulang. Mode Kartu untuk tebak arti, mode Kuis untuk ketik arti (Enter = cek).",
    en: "💡 Tip: Tap 🔊 while saying the word aloud. Cards mode is for self-quizzing, Quiz mode lets you type the meaning (Enter = check)."
  },
  sessionPrefix: { id: "📊 Sesi:", en: "📊 Session:" },
  statsHint: {
    id: "benar — statistik tidak disimpan antar sesi.",
    en: "correct — stats are not saved across sessions."
  },
  ttsWarning: {
    id: "⚠️ Browser Anda tidak mendukung text-to-speech. Coba gunakan Chrome, Edge, atau Safari terbaru.",
    en: "⚠️ Your browser doesn't support text-to-speech. Try a recent Chrome, Edge, or Safari."
  },

  // Vocab quiz placeholder
  typeMeaning: {
    id: "Ketik arti dalam Bahasa Indonesia…",
    en: "Type the meaning in English…"
  },
  vocabQuizPrompt: {
    id: "Ketik arti kata Korea di atas dalam Bahasa Indonesia.",
    en: "Type the meaning of the Korean word above in English."
  },
  noteHint: { id: "Catatan:", en: "Note:" },

  // Toggle aria
  langToggleAria: { id: "Pilih bahasa", en: "Choose language" },

  // Hangul Dasar
  level: { id: "Level", en: "Level" },
  streak: { id: "Streak", en: "Streak" },
  reset: { id: "Reset", en: "Reset" },
  resetConfirm: { id: "Hapus semua progres?", en: "Clear all progress?" },
  hint: { id: "Hint", en: "Hint" },
  hideHint: { id: "Sembunyikan hint", en: "Hide hint" },
  nextLevel: { id: "Level berikutnya →", en: "Next level →" },
  scoringTitle: { id: "Cara penilaian", en: "Scoring" },
  scoringDesc: {
    id: "Setiap klik Check dihitung 1 percobaan. Jawaban benar menambah streak dan progres tersimpan otomatis di browser.",
    en: "Each Check counts as 1 attempt. Correct answers add to your streak, and progress is saved automatically in your browser."
  },
  pronunciationPrompt: {
    id: "Ketik pelafalan (romanisasi)…",
    en: "Type the pronunciation (romanization)…"
  },
  typePronunciation: {
    id: ": ketik romanisasi (spasi/tanda hubung OK).",
    en: ": type the romanization (spaces/hyphens OK)."
  },
  hintTip: {
    id: "Tip: Tidak yakin? Klik Hint untuk lihat romanisasi per suku kata.",
    en: "Tip: Not sure? Click Hint to see the syllable-by-syllable romanization."
  },
  hintLabel: { id: "Hint (per suku kata):", en: "Hint (syllables):" },

  // Page header
  appTitle: { id: "Hangul Mastery", en: "Hangul Mastery" },
  appSubtitle: {
    id: "Latihan membaca Hangul dan menghafal kosakata Korea–Indonesia (nama tempat, angka, kata kerja) — lengkap dengan pelafalan suara.",
    en: "Practice reading Hangul and memorizing Korean–English vocabulary (places, numbers, verbs) — complete with text-to-speech pronunciation."
  },

  // Hangul basics labels (used in BASICS_MENU)
  hangulLabel: { id: "Hangul Dasar", en: "Hangul Basics" },
  hangulDesc: {
    id: "Latihan membaca aksara Hangul (romanisasi)",
    en: "Practice reading Hangul characters (romanization)"
  }
} as const;

export type UIKey = keyof typeof UI;
