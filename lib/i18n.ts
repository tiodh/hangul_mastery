"use client";

import { useEffect, useState } from "react";

export type Language = "id" | "en" | "hi";

export type Loc = { id: string; en: string; hi: string };

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
    if (stored === "id" || stored === "en" || stored === "hi") return stored;
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
      if (detail === "id" || detail === "en" || detail === "hi") setLang(detail);
    };
    window.addEventListener(LANG_EVENT, handler as EventListener);
    return () => window.removeEventListener(LANG_EVENT, handler as EventListener);
  }, []);

  return lang;
}

export const UI = {
  basics: { id: "Kata Dasar", en: "Basics", hi: "मूल बातें" },
  sentences: { id: "Bentuk Kalimat", en: "Sentence Patterns", hi: "वाक्य पैटर्न" },

  cards: { id: "Kartu", en: "Cards", hi: "कार्ड" },
  quiz: { id: "Kuis", en: "Quiz", hi: "क्विज़" },
  explanation: { id: "Penjelasan", en: "Explanation", hi: "व्याख्या" },
  practice: { id: "Latihan", en: "Practice", hi: "अभ्यास" },

  totalWords: { id: "Total kata", en: "Total words", hi: "कुल शब्द" },
  accuracy: { id: "Akurasi", en: "Accuracy", hi: "सटीकता" },
  correct: { id: "Benar", en: "Correct", hi: "सही" },
  attempts: { id: "Percobaan", en: "Attempts", hi: "कोशिशें" },
  meaning: { id: "Arti", en: "Meaning", hi: "अर्थ" },
  meaningPrefix: { id: "arti", en: "meaning", hi: "अर्थ" },
  reading: { id: "Romanisasi", en: "Reading", hi: "उच्चारण" },

  listen: { id: "🔊 Dengarkan", en: "🔊 Listen", hi: "🔊 सुनें" },
  listenTitle: { id: "Dengarkan pelafalan", en: "Listen to pronunciation", hi: "उच्चारण सुनें" },
  ttsUnsupported: { id: "TTS tidak didukung di browser ini", en: "TTS not supported in this browser", hi: "इस ब्राउज़र में TTS समर्थित नहीं" },
  showMeaning: { id: "Tampilkan arti", en: "Show meaning", hi: "अर्थ दिखाएं" },
  hideMeaning: { id: "Sembunyikan", en: "Hide", hi: "छिपाएं" },
  nextWord: { id: "Kata berikutnya →", en: "Next word →", hi: "अगला शब्द →" },
  check: { id: "Periksa", en: "Check", hi: "जांचें" },
  next: { id: "Lanjut →", en: "Next →", hi: "आगे →" },
  seeMeaning: { id: "Lihat arti", en: "See meaning", hi: "अर्थ देखें" },
  hideAnswerMeaning: { id: "Sembunyikan arti", en: "Hide meaning", hi: "अर्थ छिपाएं" },

  correctExcl: { id: "Benar! 🎉", en: "Correct! 🎉", hi: "सही! 🎉" },
  notYet: { id: "Belum tepat.", en: "Not quite.", hi: "बिल्कुल सही नहीं।" },
  notYetShort: { id: "Belum tepat.", en: "Not yet.", hi: "अभी नहीं।" },
  nextQuestion: { id: "Soal berikutnya →", en: "Next question →", hi: "अगला सवाल →" },
  answerLabel: { id: "jawaban", en: "answer", hi: "उत्तर" },
  expectedLabel: { id: "expected", en: "expected", hi: "अपेक्षित" },

  purposeTitle: { id: "📌 Maksudnya", en: "📌 Meaning", hi: "📌 अर्थ" },
  howToUseTitle: { id: "🧭 Cara Pakai", en: "🧭 How to Use", hi: "🧭 कैसे उपयोग करें" },
  rulesExamplesTitle: { id: "Aturan & Contoh Konkret", en: "Rules & Concrete Examples", hi: "नियम और ठोस उदाहरण" },
  exampleSentencesTitle: { id: "Contoh Kalimat", en: "Example Sentences", hi: "उदाहरण वाक्य" },
  usageExamplesTitle: { id: "Contoh Kalimat Penggunaan", en: "Usage Examples", hi: "उपयोग के उदाहरण" },
  greetingsTitle: { id: "Sapaan & Perkenalan Dasar", en: "Basic Greetings & Introductions", hi: "अभिवादन और परिचय" },

  kindStatement: { id: "Kalimat Biasa", en: "Statement", hi: "कथन" },
  kindQuestion: { id: "Kalimat Tanya", en: "Question", hi: "प्रश्न" },
  kindPositive: { id: "Jawaban Positif", en: "Positive Answer", hi: "सकारात्मक उत्तर" },
  kindNegative: { id: "Jawaban Negatif", en: "Negative Answer", hi: "नकारात्मक उत्तर" },

  quizPromptCopy: {
    id: "Pilih akhiran yang tepat untuk kata di bawah ini.",
    en: "Choose the correct particle/ending for the word below.",
    hi: "नीचे दिए गए शब्द के लिए सही कण/प्रत्यय चुनें।"
  },

  tipsSentence: {
    id: "💡 Tips: Baca Penjelasan & klik 🔊 di tiap contoh untuk mendengar pelafalan, lalu coba Latihan.",
    en: "💡 Tip: Read the Explanation and tap 🔊 on each example to hear the pronunciation, then try the Practice.",
    hi: "💡 सुझाव: व्याख्या पढ़ें और प्रत्येक उदाहरण पर 🔊 दबाकर उच्चारण सुनें, फिर अभ्यास आज़माएं।"
  },
  tipsVocab: {
    id: "💡 Tips: Klik 🔊 sambil mengucap ulang. Mode Kartu untuk tebak arti, mode Kuis untuk ketik arti (Enter = cek).",
    en: "💡 Tip: Tap 🔊 while saying the word aloud. Cards mode is for self-quizzing, Quiz mode lets you type the meaning (Enter = check).",
    hi: "💡 सुझाव: 🔊 दबाते समय शब्द को ज़ोर से दोहराएं। कार्ड मोड स्वयं-परीक्षण के लिए है, क्विज़ मोड में अर्थ टाइप करें (Enter = जांचें)।"
  },
  sessionPrefix: { id: "📊 Sesi:", en: "📊 Session:", hi: "📊 सत्र:" },
  statsHint: {
    id: "benar — statistik tidak disimpan antar sesi.",
    en: "correct — stats are not saved across sessions.",
    hi: "सही — आंकड़े सत्रों के बीच सहेजे नहीं जाते।"
  },
  ttsWarning: {
    id: "⚠️ Browser Anda tidak mendukung text-to-speech. Coba gunakan Chrome, Edge, atau Safari terbaru.",
    en: "⚠️ Your browser doesn't support text-to-speech. Try a recent Chrome, Edge, or Safari.",
    hi: "⚠️ आपका ब्राउज़र टेक्स्ट-टू-स्पीच का समर्थन नहीं करता। हाल के Chrome, Edge, या Safari का उपयोग करें।"
  },

  typeMeaning: {
    id: "Ketik arti dalam Bahasa Indonesia…",
    en: "Type the meaning in English…",
    hi: "हिंदी में अर्थ टाइप करें…"
  },
  vocabQuizPrompt: {
    id: "Ketik arti kata Korea di atas dalam Bahasa Indonesia.",
    en: "Type the meaning of the Korean word above in English.",
    hi: "ऊपर दिए गए कोरियाई शब्द का अर्थ हिंदी में टाइप करें।"
  },
  noteHint: { id: "Catatan:", en: "Note:", hi: "नोट:" },

  langToggleAria: { id: "Pilih bahasa", en: "Choose language", hi: "भाषा चुनें" },

  level: { id: "Level", en: "Level", hi: "स्तर" },
  streak: { id: "Streak", en: "Streak", hi: "लगातार" },
  reset: { id: "Reset", en: "Reset", hi: "रीसेट" },
  resetConfirm: { id: "Hapus semua progres?", en: "Clear all progress?", hi: "सारी प्रगति साफ़ करें?" },
  hint: { id: "Hint", en: "Hint", hi: "संकेत" },
  hideHint: { id: "Sembunyikan hint", en: "Hide hint", hi: "संकेत छिपाएं" },
  nextLevel: { id: "Level berikutnya →", en: "Next level →", hi: "अगला स्तर →" },
  scoringTitle: { id: "Cara penilaian", en: "Scoring", hi: "स्कोरिंग" },
  scoringDesc: {
    id: "Setiap klik Check dihitung 1 percobaan. Jawaban benar menambah streak dan progres tersimpan otomatis di browser.",
    en: "Each Check counts as 1 attempt. Correct answers add to your streak, and progress is saved automatically in your browser.",
    hi: "प्रत्येक Check 1 कोशिश के रूप में गिनी जाती है। सही उत्तर लगातार बढ़ाते हैं, और प्रगति ब्राउज़र में स्वतः सहेजी जाती है।"
  },
  pronunciationPrompt: {
    id: "Ketik pelafalan (romanisasi)…",
    en: "Type the pronunciation (romanization)…",
    hi: "उच्चारण (रोमनकरण) टाइप करें…"
  },
  typePronunciation: {
    id: ": ketik romanisasi (spasi/tanda hubung OK).",
    en: ": type the romanization (spaces/hyphens OK).",
    hi: ": रोमनकरण टाइप करें (स्पेस/हाइफ़न ठीक है)।"
  },
  hintTip: {
    id: "Tip: Tidak yakin? Klik Hint untuk lihat romanisasi per suku kata.",
    en: "Tip: Not sure? Click Hint to see the syllable-by-syllable romanization.",
    hi: "सुझाव: अनिश्चित हैं? Hint पर क्लिक करें और प्रत्येक शब्दांश का रोमनकरण देखें।"
  },
  hintLabel: { id: "Hint (per suku kata):", en: "Hint (syllables):", hi: "संकेत (शब्दांश):" },

  appTitle: { id: "Hangul Mastery", en: "Hangul Mastery", hi: "Hangul Mastery" },
  appSubtitle: {
    id: "Latihan membaca Hangul dan menghafal kosakata Korea–Indonesia (nama tempat, angka, kata kerja) — lengkap dengan pelafalan suara.",
    en: "Practice reading Hangul and memorizing Korean–English vocabulary (places, numbers, verbs) — complete with text-to-speech pronunciation.",
    hi: "हंगुल पढ़ने और कोरियाई शब्दावली (स्थान, संख्या, क्रिया) याद रखने का अभ्यास — पूर्ण ऑडियो उच्चारण के साथ।"
  },

  hangulLabel: { id: "Hangul Dasar", en: "Hangul Basics", hi: "हंगुल मूल" },
  hangulDesc: {
    id: "Latihan membaca aksara Hangul (romanisasi)",
    en: "Practice reading Hangul characters (romanization)",
    hi: "हंगुल अक्षर पढ़ने का अभ्यास (रोमनकरण)"
  },

  speak: { id: "Bicara", en: "Speak", hi: "बोलें" },
  speakStart: { id: "🎤 Bicara", en: "🎤 Speak", hi: "🎤 बोलें" },
  speakListening: { id: "🔴 Mendengarkan…", en: "🔴 Listening…", hi: "🔴 सुन रहा हूं…" },
  speakStop: { id: "Berhenti", en: "Stop", hi: "रोकें" },
  speakAgain: { id: "🎤 Coba lagi", en: "🎤 Try again", hi: "🎤 फिर से कोशिश करें" },
  youSaid: { id: "Anda ucapkan:", en: "You said:", hi: "आपने कहा:" },
  scoreLabel: { id: "Skor", en: "Score", hi: "स्कोर" },
  verdictMatch: {
    id: "🎉 Sempurna! Pelafalan tepat.",
    en: "🎉 Perfect! Pronunciation matches.",
    hi: "🎉 बिल्कुल सही! उच्चारण मेल खाता है।"
  },
  verdictClose: {
    id: "🤔 Hampir mirip — coba sekali lagi.",
    en: "🤔 Close — try once more.",
    hi: "🤔 करीब है — एक बार और कोशिश करें।"
  },
  verdictMiss: {
    id: "❌ Belum sama. Dengarkan & coba lagi.",
    en: "❌ Not yet. Listen and try again.",
    hi: "❌ अभी नहीं। सुनें और फिर से कोशिश करें।"
  },
  sttUnsupported: {
    id: "⚠️ Browser tidak mendukung Speech Recognition. Gunakan Chrome, Edge, atau Safari terbaru.",
    en: "⚠️ Your browser doesn't support Speech Recognition. Try a recent Chrome, Edge, or Safari.",
    hi: "⚠️ ब्राउज़र Speech Recognition का समर्थन नहीं करता। हाल के Chrome, Edge, या Safari का उपयोग करें।"
  },
  sttPrivacy: {
    id: "Audio diproses oleh server browser (Chrome/Safari) untuk dikenali — koneksi internet diperlukan.",
    en: "Audio is sent to the browser's recognition service (Chrome/Safari) — needs an internet connection.",
    hi: "ऑडियो को पहचानने के लिए ब्राउज़र के recognition service (Chrome/Safari) पर भेजा जाता है — इंटरनेट कनेक्शन आवश्यक है।"
  },
  sttPermissionError: {
    id: "Tidak bisa mengakses mikrofon. Pastikan izin diberikan.",
    en: "Couldn't access the microphone. Please allow permission.",
    hi: "माइक्रोफ़ोन तक पहुंच नहीं हो सकी। कृपया अनुमति दें।"
  },
  speakPrompt: {
    id: "Klik 🎤 lalu ucapkan kata Korea di atas dengan jelas.",
    en: "Click 🎤 then speak the Korean word above clearly.",
    hi: "🎤 पर क्लिक करें और ऊपर दिए गए कोरियाई शब्द को स्पष्ट रूप से बोलें।"
  },
  speakTip: {
    id: "💡 Tips: Klik 🔊 dulu untuk dengar pelafalan yang benar, lalu klik 🎤 dan tirukan. Skor 100% = pelafalan persis cocok.",
    en: "💡 Tip: Tap 🔊 first to hear the correct pronunciation, then tap 🎤 and repeat. A score of 100% means a perfect match.",
    hi: "💡 सुझाव: पहले 🔊 दबाएं ताकि सही उच्चारण सुनें, फिर 🎤 दबाएं और दोहराएं। 100% स्कोर = सटीक मेल।"
  }
} as const;

export type UIKey = keyof typeof UI;
