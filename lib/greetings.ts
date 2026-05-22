import type { SentenceExample } from "@/lib/sentences";

export const HANGUL_GREETINGS: readonly SentenceExample[] = [
  { kind: "statement", korean: "안녕하세요.", roman: "annyeonghaseyo.", meaning: { id: "Halo / Selamat (siang/pagi/sore).", en: "Hello / Good day.", hi: "नमस्ते।" }, note: { id: "Sapaan paling umum, dipakai kapan saja.", en: "The most common greeting, used any time of day.", hi: "सबसे आम अभिवादन, किसी भी समय इस्तेमाल किया जाता है।" } },
  { kind: "statement", korean: "저는 학생이에요.", roman: "jeoneun haksaeng-ieyo.", meaning: { id: "Saya seorang siswa.", en: "I am a student.", hi: "मैं एक छात्र हूँ।" } },
  { kind: "question", korean: "이름이 뭐예요?", roman: "ireumi mwoyeyo?", meaning: { id: "Siapa nama Anda?", en: "What is your name?", hi: "आपका नाम क्या है?" }, note: { id: "이름 = nama, 뭐 = apa", en: "이름 = name, 뭐 = what", hi: "이름 = नाम, 뭐 = क्या" } },
  { kind: "question", korean: "한국 사람이에요?", roman: "hanguk saram-ieyo?", meaning: { id: "Apakah Anda orang Korea?", en: "Are you Korean?", hi: "क्या आप कोरियाई हैं?" } },
  { kind: "positive", korean: "네, 만나서 반갑습니다.", roman: "ne, mannaseo bangapseumnida.", meaning: { id: "Ya, senang bertemu.", en: "Yes, nice to meet you.", hi: "हाँ, आपसे मिलकर ख़ुशी हुई।" }, note: { id: "네 = ya", en: "네 = yes", hi: "네 = हाँ" } },
  { kind: "positive", korean: "네, 한국 사람이에요.", roman: "ne, hanguk saram-ieyo.", meaning: { id: "Ya, saya orang Korea.", en: "Yes, I am Korean.", hi: "हाँ, मैं कोरियाई हूँ।" } },
  { kind: "negative", korean: "아니요, 잘 몰라요.", roman: "aniyo, jal mollayo.", meaning: { id: "Tidak, saya kurang paham.", en: "No, I don't really know.", hi: "नहीं, मुझे ठीक से नहीं पता।" }, note: { id: "아니요 = tidak", en: "아니요 = no", hi: "아니요 = नहीं" } },
  { kind: "negative", korean: "아니요, 한국 사람이 아니에요.", roman: "aniyo, hanguk sarami anieyo.", meaning: { id: "Tidak, saya bukan orang Korea.", en: "No, I am not Korean.", hi: "नहीं, मैं कोरियाई नहीं हूँ।" } }
] as const;
