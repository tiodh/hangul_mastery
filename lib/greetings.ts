import type { SentenceExample } from "@/lib/sentences";

export const HANGUL_GREETINGS: readonly SentenceExample[] = [
  { kind: "statement", korean: "안녕하세요.", roman: "annyeonghaseyo.", indonesian: "Halo / Selamat (siang/pagi/sore).", note: "Sapaan paling umum, dipakai kapan saja." },
  { kind: "statement", korean: "저는 학생이에요.", roman: "jeoneun haksaeng-ieyo.", indonesian: "Saya seorang siswa." },
  { kind: "question", korean: "이름이 뭐예요?", roman: "ireumi mwoyeyo?", indonesian: "Siapa nama Anda?", note: "이름 = nama, 뭐 = apa" },
  { kind: "question", korean: "한국 사람이에요?", roman: "hanguk saram-ieyo?", indonesian: "Apakah Anda orang Korea?" },
  { kind: "positive", korean: "네, 만나서 반갑습니다.", roman: "ne, mannaseo bangapseumnida.", indonesian: "Ya, senang bertemu.", note: "네 = ya" },
  { kind: "positive", korean: "네, 한국 사람이에요.", roman: "ne, hanguk saram-ieyo.", indonesian: "Ya, saya orang Korea." },
  { kind: "negative", korean: "아니요, 잘 몰라요.", roman: "aniyo, jal mollayo.", indonesian: "Tidak, saya kurang paham.", note: "아니요 = tidak" },
  { kind: "negative", korean: "아니요, 한국 사람이 아니에요.", roman: "aniyo, hanguk sarami anieyo.", indonesian: "Tidak, saya bukan orang Korea." }
] as const;
