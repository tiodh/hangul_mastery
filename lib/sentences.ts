export type SentencePatternId =
  | "iyeyo"
  | "ayoeoyo"
  | "eunneun"
  | "iga"
  | "eulreul";

export type SentenceExample = {
  korean: string;
  indonesian: string;
  note?: string;
};

export type QuizQuestion = {
  prompt: string;
  promptMeaning: string;
  options: string[];
  correct: string;
  fullSentence: string;
  fullMeaning: string;
  explanation: string;
};

export type SentencePattern = {
  id: SentencePatternId;
  label: string;
  emoji: string;
  description: string;
  rule: string[];
  examples: SentenceExample[];
  quiz: QuizQuestion[];
};

export const SENTENCE_PATTERNS: readonly SentencePattern[] = [
  {
    id: "iyeyo",
    label: "이에요 / 예요",
    emoji: "✨",
    description: 'Kata benda + "adalah" (bentuk sopan kasual)',
    rule: [
      "Akhiran ini dipakai setelah kata benda untuk berarti 'adalah / merupakan'.",
      "Jika kata benda berakhir KONSONAN (받침) → pakai 이에요.",
      "Jika kata benda berakhir VOKAL → pakai 예요."
    ],
    examples: [
      { korean: "저는 학생이에요.", indonesian: "Saya seorang siswa.", note: "학생 berakhir konsonan ㅇ" },
      { korean: "저는 의사예요.", indonesian: "Saya seorang dokter.", note: "의사 berakhir vokal ㅏ" },
      { korean: "한국 사람이에요.", indonesian: "Saya orang Korea.", note: "사람 berakhir konsonan ㅁ" },
      { korean: "친구예요.", indonesian: "(Dia) teman saya.", note: "친구 berakhir vokal ㅜ" },
      { korean: "이름은 민지예요.", indonesian: "Nama saya Minji.", note: "민지 berakhir vokal ㅣ" }
    ],
    quiz: [
      {
        prompt: "학생",
        promptMeaning: "siswa",
        options: ["이에요", "예요"],
        correct: "이에요",
        fullSentence: "학생이에요.",
        fullMeaning: "(Saya) seorang siswa.",
        explanation: "학생 berakhir konsonan ㅇ → 이에요"
      },
      {
        prompt: "의사",
        promptMeaning: "dokter",
        options: ["이에요", "예요"],
        correct: "예요",
        fullSentence: "의사예요.",
        fullMeaning: "(Saya) seorang dokter.",
        explanation: "의사 berakhir vokal ㅏ → 예요"
      },
      {
        prompt: "선생님",
        promptMeaning: "guru",
        options: ["이에요", "예요"],
        correct: "이에요",
        fullSentence: "선생님이에요.",
        fullMeaning: "(Saya) seorang guru.",
        explanation: "선생님 berakhir konsonan ㅁ → 이에요"
      },
      {
        prompt: "가수",
        promptMeaning: "penyanyi",
        options: ["이에요", "예요"],
        correct: "예요",
        fullSentence: "가수예요.",
        fullMeaning: "(Dia) penyanyi.",
        explanation: "가수 berakhir vokal ㅜ → 예요"
      },
      {
        prompt: "한국 사람",
        promptMeaning: "orang Korea",
        options: ["이에요", "예요"],
        correct: "이에요",
        fullSentence: "한국 사람이에요.",
        fullMeaning: "(Saya) orang Korea.",
        explanation: "사람 berakhir konsonan ㅁ → 이에요"
      },
      {
        prompt: "친구",
        promptMeaning: "teman",
        options: ["이에요", "예요"],
        correct: "예요",
        fullSentence: "친구예요.",
        fullMeaning: "(Dia) teman saya.",
        explanation: "친구 berakhir vokal ㅜ → 예요"
      },
      {
        prompt: "회사원",
        promptMeaning: "karyawan",
        options: ["이에요", "예요"],
        correct: "이에요",
        fullSentence: "회사원이에요.",
        fullMeaning: "(Saya) karyawan kantor.",
        explanation: "회사원 berakhir konsonan ㄴ → 이에요"
      },
      {
        prompt: "엄마",
        promptMeaning: "ibu",
        options: ["이에요", "예요"],
        correct: "예요",
        fullSentence: "엄마예요.",
        fullMeaning: "(Dia) ibu saya.",
        explanation: "엄마 berakhir vokal ㅏ → 예요"
      }
    ]
  },
  {
    id: "ayoeoyo",
    label: "아요 / 어요 / 해요",
    emoji: "🗣️",
    description: "Akhiran kata kerja & kata sifat bentuk sopan kasual",
    rule: [
      "Hapus 다 dari kamus, lalu lihat vokal terakhir di akar (어간).",
      "Jika vokalnya ㅏ atau ㅗ → tambah 아요.",
      "Jika vokal lain (ㅓ, ㅜ, ㅣ, ㅡ, dll.) → tambah 어요.",
      "Kata kerja 하다 → berubah jadi 해요."
    ],
    examples: [
      { korean: "저는 학교에 가요.", indonesian: "Saya pergi ke sekolah.", note: "가다 → 가요 (vokal ㅏ)" },
      { korean: "밥을 먹어요.", indonesian: "Saya makan nasi.", note: "먹다 → 먹어요 (vokal ㅓ)" },
      { korean: "한국어를 공부해요.", indonesian: "Saya belajar bahasa Korea.", note: "공부하다 → 공부해요" },
      { korean: "친구를 만나요.", indonesian: "Saya bertemu teman.", note: "만나다 → 만나요 (ㅏ+아요 disingkat)" },
      { korean: "물을 마셔요.", indonesian: "Saya minum air.", note: "마시다 → 마셔요 (ㅣ+어요)" }
    ],
    quiz: [
      {
        prompt: "가다",
        promptMeaning: "pergi",
        options: ["가요", "가어요", "거요"],
        correct: "가요",
        fullSentence: "학교에 가요.",
        fullMeaning: "(Saya) pergi ke sekolah.",
        explanation: "가 + 아요 → 가요 (vokal ㅏ sama, digabung)"
      },
      {
        prompt: "먹다",
        promptMeaning: "makan",
        options: ["먹아요", "먹어요", "머거요"],
        correct: "먹어요",
        fullSentence: "밥을 먹어요.",
        fullMeaning: "(Saya) makan nasi.",
        explanation: "먹 berisi vokal ㅓ → tambah 어요"
      },
      {
        prompt: "오다",
        promptMeaning: "datang",
        options: ["오아요", "오어요", "와요"],
        correct: "와요",
        fullSentence: "친구가 와요.",
        fullMeaning: "Teman datang.",
        explanation: "오 + 아요 → 와요 (ㅗ+ㅏ digabung)"
      },
      {
        prompt: "보다",
        promptMeaning: "melihat",
        options: ["봐요", "보아요", "보어요"],
        correct: "봐요",
        fullSentence: "영화를 봐요.",
        fullMeaning: "(Saya) menonton film.",
        explanation: "보 + 아요 → 봐요 (ㅗ+ㅏ digabung)"
      },
      {
        prompt: "마시다",
        promptMeaning: "minum",
        options: ["마시아요", "마셔요", "마시요"],
        correct: "마셔요",
        fullSentence: "물을 마셔요.",
        fullMeaning: "(Saya) minum air.",
        explanation: "마시 + 어요 → 마셔요 (ㅣ+ㅓ digabung)"
      },
      {
        prompt: "공부하다",
        promptMeaning: "belajar",
        options: ["공부하요", "공부해요", "공부어요"],
        correct: "공부해요",
        fullSentence: "한국어를 공부해요.",
        fullMeaning: "(Saya) belajar bahasa Korea.",
        explanation: "하다 → 해요 (aturan khusus)"
      },
      {
        prompt: "읽다",
        promptMeaning: "membaca",
        options: ["읽아요", "읽어요", "일거요"],
        correct: "읽어요",
        fullSentence: "책을 읽어요.",
        fullMeaning: "(Saya) membaca buku.",
        explanation: "읽 berisi vokal ㅣ → tambah 어요"
      },
      {
        prompt: "만나다",
        promptMeaning: "bertemu",
        options: ["만나요", "만나아요", "만너요"],
        correct: "만나요",
        fullSentence: "친구를 만나요.",
        fullMeaning: "(Saya) bertemu teman.",
        explanation: "만나 + 아요 → 만나요 (ㅏ+ㅏ disingkat)"
      },
      {
        prompt: "일하다",
        promptMeaning: "bekerja",
        options: ["일하요", "일해요", "일아요"],
        correct: "일해요",
        fullSentence: "회사에서 일해요.",
        fullMeaning: "(Saya) bekerja di kantor.",
        explanation: "하다 → 해요"
      }
    ]
  },
  {
    id: "eunneun",
    label: "은 / 는 (Topik)",
    emoji: "🏷️",
    description: "Penanda topik kalimat — menekankan apa yang sedang dibicarakan",
    rule: [
      "Dipasang setelah kata benda yang jadi topik kalimat.",
      "Kata benda berakhir KONSONAN → 은.",
      "Kata benda berakhir VOKAL → 는."
    ],
    examples: [
      { korean: "저는 학생이에요.", indonesian: "Saya (kalau soal saya) seorang siswa.", note: "저 berakhir vokal → 는" },
      { korean: "이름은 민지예요.", indonesian: "Nama (saya) Minji.", note: "이름 berakhir konsonan ㅁ → 은" },
      { korean: "한국어는 재미있어요.", indonesian: "Bahasa Korea itu menyenangkan.", note: "한국어 berakhir vokal → 는" },
      { korean: "오늘은 월요일이에요.", indonesian: "Hari ini hari Senin.", note: "오늘 berakhir konsonan ㄹ → 은" }
    ],
    quiz: [
      {
        prompt: "저",
        promptMeaning: "saya",
        options: ["은", "는"],
        correct: "는",
        fullSentence: "저는 학생이에요.",
        fullMeaning: "Saya seorang siswa.",
        explanation: "저 berakhir vokal ㅓ → 는"
      },
      {
        prompt: "이름",
        promptMeaning: "nama",
        options: ["은", "는"],
        correct: "은",
        fullSentence: "이름은 민지예요.",
        fullMeaning: "Nama saya Minji.",
        explanation: "이름 berakhir konsonan ㅁ → 은"
      },
      {
        prompt: "한국어",
        promptMeaning: "bahasa Korea",
        options: ["은", "는"],
        correct: "는",
        fullSentence: "한국어는 재미있어요.",
        fullMeaning: "Bahasa Korea menyenangkan.",
        explanation: "한국어 berakhir vokal ㅓ → 는"
      },
      {
        prompt: "오늘",
        promptMeaning: "hari ini",
        options: ["은", "는"],
        correct: "은",
        fullSentence: "오늘은 월요일이에요.",
        fullMeaning: "Hari ini hari Senin.",
        explanation: "오늘 berakhir konsonan ㄹ → 은"
      },
      {
        prompt: "친구",
        promptMeaning: "teman",
        options: ["은", "는"],
        correct: "는",
        fullSentence: "친구는 학교에 가요.",
        fullMeaning: "Teman (saya) pergi ke sekolah.",
        explanation: "친구 berakhir vokal ㅜ → 는"
      },
      {
        prompt: "선생님",
        promptMeaning: "guru",
        options: ["은", "는"],
        correct: "은",
        fullSentence: "선생님은 한국 사람이에요.",
        fullMeaning: "Guru (saya) orang Korea.",
        explanation: "선생님 berakhir konsonan ㅁ → 은"
      }
    ]
  },
  {
    id: "iga",
    label: "이 / 가 (Subjek)",
    emoji: "🎯",
    description: "Penanda subjek — kata benda yang melakukan aksi atau memiliki sifat",
    rule: [
      "Menandai subjek kalimat (pelaku perbuatan).",
      "Kata benda berakhir KONSONAN → 이.",
      "Kata benda berakhir VOKAL → 가.",
      "Sering dipakai untuk memperkenalkan informasi baru atau menjawab pertanyaan."
    ],
    examples: [
      { korean: "친구가 와요.", indonesian: "Teman (saya) datang.", note: "친구 + 가" },
      { korean: "책이 있어요.", indonesian: "Ada buku.", note: "책 + 이" },
      { korean: "선생님이 한국 사람이에요.", indonesian: "Guru itu orang Korea.", note: "선생님 + 이" },
      { korean: "비가 와요.", indonesian: "Hujan turun.", note: "비 + 가" }
    ],
    quiz: [
      {
        prompt: "친구",
        promptMeaning: "teman",
        options: ["이", "가"],
        correct: "가",
        fullSentence: "친구가 와요.",
        fullMeaning: "Teman datang.",
        explanation: "친구 berakhir vokal ㅜ → 가"
      },
      {
        prompt: "책",
        promptMeaning: "buku",
        options: ["이", "가"],
        correct: "이",
        fullSentence: "책이 있어요.",
        fullMeaning: "Ada buku.",
        explanation: "책 berakhir konsonan ㄱ → 이"
      },
      {
        prompt: "비",
        promptMeaning: "hujan",
        options: ["이", "가"],
        correct: "가",
        fullSentence: "비가 와요.",
        fullMeaning: "Hujan turun.",
        explanation: "비 berakhir vokal ㅣ → 가"
      },
      {
        prompt: "동생",
        promptMeaning: "adik",
        options: ["이", "가"],
        correct: "이",
        fullSentence: "동생이 자요.",
        fullMeaning: "Adik (sedang) tidur.",
        explanation: "동생 berakhir konsonan ㅇ → 이"
      },
      {
        prompt: "엄마",
        promptMeaning: "ibu",
        options: ["이", "가"],
        correct: "가",
        fullSentence: "엄마가 음식을 만들어요.",
        fullMeaning: "Ibu memasak makanan.",
        explanation: "엄마 berakhir vokal ㅏ → 가"
      },
      {
        prompt: "선생님",
        promptMeaning: "guru",
        options: ["이", "가"],
        correct: "이",
        fullSentence: "선생님이 와요.",
        fullMeaning: "Guru datang.",
        explanation: "선생님 berakhir konsonan ㅁ → 이"
      }
    ]
  },
  {
    id: "eulreul",
    label: "을 / 를 (Objek)",
    emoji: "🎁",
    description: "Penanda objek — kata benda yang menerima aksi",
    rule: [
      "Menandai objek langsung dari kata kerja (apa yang di-...).",
      "Kata benda berakhir KONSONAN → 을.",
      "Kata benda berakhir VOKAL → 를."
    ],
    examples: [
      { korean: "밥을 먹어요.", indonesian: "Saya makan nasi.", note: "밥 + 을" },
      { korean: "물을 마셔요.", indonesian: "Saya minum air.", note: "물 + 을" },
      { korean: "친구를 만나요.", indonesian: "Saya bertemu teman.", note: "친구 + 를" },
      { korean: "책을 읽어요.", indonesian: "Saya membaca buku.", note: "책 + 을" },
      { korean: "영화를 봐요.", indonesian: "Saya menonton film.", note: "영화 + 를" }
    ],
    quiz: [
      {
        prompt: "밥",
        promptMeaning: "nasi",
        options: ["을", "를"],
        correct: "을",
        fullSentence: "밥을 먹어요.",
        fullMeaning: "(Saya) makan nasi.",
        explanation: "밥 berakhir konsonan ㅂ → 을"
      },
      {
        prompt: "물",
        promptMeaning: "air",
        options: ["을", "를"],
        correct: "을",
        fullSentence: "물을 마셔요.",
        fullMeaning: "(Saya) minum air.",
        explanation: "물 berakhir konsonan ㄹ → 을"
      },
      {
        prompt: "친구",
        promptMeaning: "teman",
        options: ["을", "를"],
        correct: "를",
        fullSentence: "친구를 만나요.",
        fullMeaning: "(Saya) bertemu teman.",
        explanation: "친구 berakhir vokal ㅜ → 를"
      },
      {
        prompt: "책",
        promptMeaning: "buku",
        options: ["을", "를"],
        correct: "을",
        fullSentence: "책을 읽어요.",
        fullMeaning: "(Saya) membaca buku.",
        explanation: "책 berakhir konsonan ㄱ → 을"
      },
      {
        prompt: "영화",
        promptMeaning: "film",
        options: ["을", "를"],
        correct: "를",
        fullSentence: "영화를 봐요.",
        fullMeaning: "(Saya) menonton film.",
        explanation: "영화 berakhir vokal ㅘ → 를"
      },
      {
        prompt: "한국어",
        promptMeaning: "bahasa Korea",
        options: ["을", "를"],
        correct: "를",
        fullSentence: "한국어를 공부해요.",
        fullMeaning: "(Saya) belajar bahasa Korea.",
        explanation: "한국어 berakhir vokal ㅓ → 를"
      },
      {
        prompt: "음악",
        promptMeaning: "musik",
        options: ["을", "를"],
        correct: "을",
        fullSentence: "음악을 들어요.",
        fullMeaning: "(Saya) mendengarkan musik.",
        explanation: "음악 berakhir konsonan ㄱ → 을"
      }
    ]
  }
] as const;

export function getSentencePattern(id: SentencePatternId): SentencePattern {
  const found = SENTENCE_PATTERNS.find((p) => p.id === id);
  if (!found) throw new Error(`Unknown pattern: ${id}`);
  return found;
}

export function pickRandomQuestion(
  pattern: SentencePattern,
  excludePrompt?: string,
  rng: () => number = Math.random
): QuizQuestion {
  const pool = excludePrompt
    ? pattern.quiz.filter((q) => q.prompt !== excludePrompt)
    : pattern.quiz;
  const list = pool.length > 0 ? pool : pattern.quiz;
  return list[Math.floor(rng() * list.length)]!;
}
