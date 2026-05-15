export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

let cachedKoreanVoice: SpeechSynthesisVoice | null = null;

function pickKoreanVoice(): SpeechSynthesisVoice | null {
  if (!isSpeechSupported()) return null;
  if (cachedKoreanVoice) return cachedKoreanVoice;
  const voices = window.speechSynthesis.getVoices();
  const korean =
    voices.find((v) => v.lang === "ko-KR") ??
    voices.find((v) => v.lang.toLowerCase().startsWith("ko"));
  cachedKoreanVoice = korean ?? null;
  return cachedKoreanVoice;
}

export function primeVoices(): void {
  if (!isSpeechSupported()) return;
  const synth = window.speechSynthesis;
  if (synth.getVoices().length > 0) {
    pickKoreanVoice();
    return;
  }
  const handler = () => {
    pickKoreanVoice();
    synth.removeEventListener("voiceschanged", handler);
  };
  synth.addEventListener("voiceschanged", handler);
}

export function speakKorean(text: string, opts?: { rate?: number }): void {
  if (!isSpeechSupported() || !text) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ko-KR";
  utter.rate = opts?.rate ?? 0.9;
  utter.pitch = 1;
  const voice = pickKoreanVoice();
  if (voice) utter.voice = voice;
  synth.speak(utter);
}

export function stopSpeaking(): void {
  if (!isSpeechSupported()) return;
  window.speechSynthesis.cancel();
}
