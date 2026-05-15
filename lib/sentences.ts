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

export type VariantExample = {
  word: string;
  meaning: string;
  detail: string;
  result: string;
};

export type RuleVariant = {
  badge: string;
  title: string;
  rule: string;
  tone: "konsonan" | "vokal" | "khusus";
  examples: VariantExample[];
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
  purpose: string;
  mechanic?: string;
  variants: RuleVariant[];
  examples: SentenceExample[];
  quiz: QuizQuestion[];
};

const BATCHIM_TIP =
  "Setiap suku kata Hangul punya konsonan awal + vokal, dan kadang konsonan akhir yang disebut 받침 (batchim). Untuk menentukan akhiran yang benar, lihat suku kata terakhir dari kata: apakah ia punya 받침 (huruf di bawah) atau tidak.";

export const SENTENCE_PATTERNS: readonly SentencePattern[] = [
  {
    id: "iyeyo",
    label: "Adalah (이에요/예요)",
    emoji: "✨",
    description: "Kata benda + 'adalah' dalam bentuk sopan kasual",
    purpose:
      "Akhiran 이에요/예요 berarti 'adalah / merupakan'. Dipasang di belakang kata benda untuk menyatakan identitas atau profesi, misal 'saya adalah ___' atau 'dia adalah ___'.",
    mechanic: BATCHIM_TIP,
    variants: [
      {
        badge: "Konsonan",
        title: "Kata benda berakhir KONSONAN (ada 받침)",
        rule: "→ tambahkan 이에요",
        tone: "konsonan",
        examples: [
          { word: "학생", meaning: "siswa", detail: "받침: ㅇ", result: "학생이에요" },
          { word: "선생님", meaning: "guru", detail: "받침: ㅁ", result: "선생님이에요" },
          { word: "회사원", meaning: "karyawan", detail: "받침: ㄴ", result: "회사원이에요" },
          { word: "한국 사람", meaning: "orang Korea", detail: "받침: ㅁ", result: "한국 사람이에요" }
        ]
      },
      {
        badge: "Vokal",
        title: "Kata benda berakhir VOKAL (tanpa 받침)",
        rule: "→ tambahkan 예요",
        tone: "vokal",
        examples: [
          { word: "의사", meaning: "dokter", detail: "huruf akhir: vokal ㅏ", result: "의사예요" },
          { word: "친구", meaning: "teman", detail: "huruf akhir: vokal ㅜ", result: "친구예요" },
          { word: "엄마", meaning: "ibu", detail: "huruf akhir: vokal ㅏ", result: "엄마예요" },
          { word: "가수", meaning: "penyanyi", detail: "huruf akhir: vokal ㅜ", result: "가수예요" }
        ]
      }
    ],
    examples: [
      { korean: "저는 학생이에요.", indonesian: "Saya seorang siswa.", note: "학생 berakhir 받침 ㅇ → 이에요" },
      { korean: "저는 의사예요.", indonesian: "Saya seorang dokter.", note: "의사 berakhir vokal ㅏ → 예요" },
      { korean: "한국 사람이에요.", indonesian: "Saya orang Korea.", note: "사람 berakhir 받침 ㅁ → 이에요" },
      { korean: "이름은 민지예요.", indonesian: "Nama saya Minji.", note: "민지 berakhir vokal ㅣ → 예요" }
    ],
    quiz: [
      {
        prompt: "학생",
        promptMeaning: "siswa",
        options: ["이에요", "예요"],
        correct: "이에요",
        fullSentence: "학생이에요.",
        fullMeaning: "(Saya) seorang siswa.",
        explanation: "학생 berakhir 받침 ㅇ → 이에요"
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
        explanation: "선생님 berakhir 받침 ㅁ → 이에요"
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
        explanation: "사람 berakhir 받침 ㅁ → 이에요"
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
        explanation: "회사원 berakhir 받침 ㄴ → 이에요"
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
    label: "Akhiran Kerja Sopan (아요/어요)",
    emoji: "🗣️",
    description: "Akhiran kata kerja & kata sifat dalam percakapan sopan kasual",
    purpose:
      "Akhiran 아요/어요/해요 dipakai di akhir kata kerja atau kata sifat agar kalimat terdengar sopan tapi santai (informal polite). Ini bentuk yang paling sering dipakai dalam percakapan sehari-hari.",
    mechanic:
      "Cara pakai: (1) Hapus 다 dari bentuk kamus → dapat akar kata (어간). (2) Lihat vokal pada suku kata terakhir akar. (3) Pilih akhiran sesuai aturan di bawah.",
    variants: [
      {
        badge: "ㅏ / ㅗ",
        title: "Akar berakhir vokal ㅏ atau ㅗ",
        rule: "→ tambahkan 아요",
        tone: "konsonan",
        examples: [
          { word: "가다", meaning: "pergi", detail: "akar 가 = vokal ㅏ", result: "가요 (ㅏ+ㅏ disingkat)" },
          { word: "오다", meaning: "datang", detail: "akar 오 = vokal ㅗ", result: "와요 (ㅗ+ㅏ→ㅘ)" },
          { word: "보다", meaning: "melihat", detail: "akar 보 = vokal ㅗ", result: "봐요 (ㅗ+ㅏ→ㅘ)" },
          { word: "만나다", meaning: "bertemu", detail: "akar 만나 = vokal ㅏ", result: "만나요" }
        ]
      },
      {
        badge: "Vokal lain",
        title: "Akar berakhir vokal lain (ㅓ, ㅜ, ㅣ, ㅡ, dll.)",
        rule: "→ tambahkan 어요",
        tone: "vokal",
        examples: [
          { word: "먹다", meaning: "makan", detail: "akar 먹 = vokal ㅓ", result: "먹어요" },
          { word: "읽다", meaning: "membaca", detail: "akar 읽 = vokal ㅣ", result: "읽어요" },
          { word: "마시다", meaning: "minum", detail: "akar 마시 = vokal ㅣ", result: "마셔요 (ㅣ+ㅓ→ㅕ)" },
          { word: "주다", meaning: "memberi", detail: "akar 주 = vokal ㅜ", result: "줘요 (ㅜ+ㅓ→ㅝ)" }
        ]
      },
      {
        badge: "하다",
        title: "Kata kerja yang diakhiri 하다",
        rule: "→ berubah jadi 해요",
        tone: "khusus",
        examples: [
          { word: "공부하다", meaning: "belajar", detail: "diakhiri 하다", result: "공부해요" },
          { word: "일하다", meaning: "bekerja", detail: "diakhiri 하다", result: "일해요" },
          { word: "사랑하다", meaning: "mencintai", detail: "diakhiri 하다", result: "사랑해요" }
        ]
      }
    ],
    examples: [
      { korean: "저는 학교에 가요.", indonesian: "Saya pergi ke sekolah.", note: "가다 → 가요 (vokal ㅏ)" },
      { korean: "밥을 먹어요.", indonesian: "Saya makan nasi.", note: "먹다 → 먹어요 (vokal ㅓ)" },
      { korean: "한국어를 공부해요.", indonesian: "Saya belajar bahasa Korea.", note: "공부하다 → 공부해요" },
      { korean: "친구를 만나요.", indonesian: "Saya bertemu teman.", note: "만나다 → 만나요" },
      { korean: "물을 마셔요.", indonesian: "Saya minum air.", note: "마시다 → 마셔요" }
    ],
    quiz: [
      {
        prompt: "가다",
        promptMeaning: "pergi",
        options: ["가요", "가어요", "거요"],
        correct: "가요",
        fullSentence: "학교에 가요.",
        fullMeaning: "(Saya) pergi ke sekolah.",
        explanation: "Akar 가 berisi vokal ㅏ → tambah 아요, lalu ㅏ+ㅏ disingkat jadi 가요"
      },
      {
        prompt: "먹다",
        promptMeaning: "makan",
        options: ["먹아요", "먹어요", "머거요"],
        correct: "먹어요",
        fullSentence: "밥을 먹어요.",
        fullMeaning: "(Saya) makan nasi.",
        explanation: "Akar 먹 berisi vokal ㅓ → tambah 어요"
      },
      {
        prompt: "오다",
        promptMeaning: "datang",
        options: ["오아요", "오어요", "와요"],
        correct: "와요",
        fullSentence: "친구가 와요.",
        fullMeaning: "Teman datang.",
        explanation: "Akar 오 (vokal ㅗ) + 아요 → ㅗ+ㅏ digabung jadi 와요"
      },
      {
        prompt: "보다",
        promptMeaning: "melihat",
        options: ["봐요", "보아요", "보어요"],
        correct: "봐요",
        fullSentence: "영화를 봐요.",
        fullMeaning: "(Saya) menonton film.",
        explanation: "Akar 보 (vokal ㅗ) + 아요 → ㅗ+ㅏ digabung jadi 봐요"
      },
      {
        prompt: "마시다",
        promptMeaning: "minum",
        options: ["마시아요", "마셔요", "마시요"],
        correct: "마셔요",
        fullSentence: "물을 마셔요.",
        fullMeaning: "(Saya) minum air.",
        explanation: "Akar 마시 (vokal ㅣ) + 어요 → ㅣ+ㅓ digabung jadi 셔"
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
        explanation: "Akar 읽 berisi vokal ㅣ → tambah 어요"
      },
      {
        prompt: "만나다",
        promptMeaning: "bertemu",
        options: ["만나요", "만나아요", "만너요"],
        correct: "만나요",
        fullSentence: "친구를 만나요.",
        fullMeaning: "(Saya) bertemu teman.",
        explanation: "Akar 만나 (vokal ㅏ) + 아요 → ㅏ+ㅏ disingkat jadi 만나요"
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
    label: "Penanda Topik (은/는)",
    emoji: "🏷️",
    description: "Menandai topik kalimat — kata benda yang sedang dibicarakan",
    purpose:
      "Penanda 은/는 dipasang setelah kata benda untuk menyatakan, 'kalau soal __ ini'. Sering dipakai untuk memperkenalkan topik baru atau membandingkan dua hal.",
    mechanic: BATCHIM_TIP,
    variants: [
      {
        badge: "Konsonan",
        title: "Kata benda berakhir KONSONAN (ada 받침)",
        rule: "→ tambahkan 은",
        tone: "konsonan",
        examples: [
          { word: "이름", meaning: "nama", detail: "받침: ㅁ", result: "이름은" },
          { word: "오늘", meaning: "hari ini", detail: "받침: ㄹ", result: "오늘은" },
          { word: "선생님", meaning: "guru", detail: "받침: ㅁ", result: "선생님은" },
          { word: "한국 사람", meaning: "orang Korea", detail: "받침: ㅁ", result: "한국 사람은" }
        ]
      },
      {
        badge: "Vokal",
        title: "Kata benda berakhir VOKAL (tanpa 받침)",
        rule: "→ tambahkan 는",
        tone: "vokal",
        examples: [
          { word: "저", meaning: "saya", detail: "huruf akhir: vokal ㅓ", result: "저는" },
          { word: "친구", meaning: "teman", detail: "huruf akhir: vokal ㅜ", result: "친구는" },
          { word: "한국어", meaning: "bahasa Korea", detail: "huruf akhir: vokal ㅓ", result: "한국어는" },
          { word: "어머니", meaning: "ibu", detail: "huruf akhir: vokal ㅣ", result: "어머니는" }
        ]
      }
    ],
    examples: [
      { korean: "저는 학생이에요.", indonesian: "Saya seorang siswa.", note: "저 berakhir vokal → 는" },
      { korean: "이름은 민지예요.", indonesian: "Nama saya Minji.", note: "이름 받침 ㅁ → 은" },
      { korean: "한국어는 재미있어요.", indonesian: "Bahasa Korea itu menyenangkan.", note: "한국어 berakhir vokal → 는" },
      { korean: "오늘은 월요일이에요.", indonesian: "Hari ini hari Senin.", note: "오늘 받침 ㄹ → 은" }
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
        explanation: "이름 berakhir 받침 ㅁ → 은"
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
        explanation: "오늘 berakhir 받침 ㄹ → 은"
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
        explanation: "선생님 berakhir 받침 ㅁ → 은"
      }
    ]
  },
  {
    id: "iga",
    label: "Penanda Subjek (이/가)",
    emoji: "🎯",
    description: "Menandai subjek — pelaku perbuatan atau pemilik kondisi",
    purpose:
      "Penanda 이/가 dipasang setelah kata benda yang menjadi subjek kalimat (pelaku aksi). Sering dipakai untuk memperkenalkan informasi baru atau menjawab pertanyaan 'Siapa yang...?'.",
    mechanic: BATCHIM_TIP,
    variants: [
      {
        badge: "Konsonan",
        title: "Kata benda berakhir KONSONAN (ada 받침)",
        rule: "→ tambahkan 이",
        tone: "konsonan",
        examples: [
          { word: "책", meaning: "buku", detail: "받침: ㄱ", result: "책이" },
          { word: "동생", meaning: "adik", detail: "받침: ㅇ", result: "동생이" },
          { word: "선생님", meaning: "guru", detail: "받침: ㅁ", result: "선생님이" },
          { word: "사람", meaning: "orang", detail: "받침: ㅁ", result: "사람이" }
        ]
      },
      {
        badge: "Vokal",
        title: "Kata benda berakhir VOKAL (tanpa 받침)",
        rule: "→ tambahkan 가",
        tone: "vokal",
        examples: [
          { word: "친구", meaning: "teman", detail: "huruf akhir: vokal ㅜ", result: "친구가" },
          { word: "비", meaning: "hujan", detail: "huruf akhir: vokal ㅣ", result: "비가" },
          { word: "엄마", meaning: "ibu", detail: "huruf akhir: vokal ㅏ", result: "엄마가" },
          { word: "아이", meaning: "anak", detail: "huruf akhir: vokal ㅣ", result: "아이가" }
        ]
      }
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
        explanation: "책 berakhir 받침 ㄱ → 이"
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
        explanation: "동생 berakhir 받침 ㅇ → 이"
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
        explanation: "선생님 berakhir 받침 ㅁ → 이"
      }
    ]
  },
  {
    id: "eulreul",
    label: "Penanda Objek (을/를)",
    emoji: "🎁",
    description: "Menandai objek langsung — apa yang menerima aksi",
    purpose:
      "Penanda 을/를 dipasang setelah kata benda yang menjadi objek dari kata kerja. Untuk menunjukkan: makan APA, baca APA, lihat APA, dll.",
    mechanic: BATCHIM_TIP,
    variants: [
      {
        badge: "Konsonan",
        title: "Kata benda berakhir KONSONAN (ada 받침)",
        rule: "→ tambahkan 을",
        tone: "konsonan",
        examples: [
          { word: "밥", meaning: "nasi", detail: "받침: ㅂ", result: "밥을" },
          { word: "물", meaning: "air", detail: "받침: ㄹ", result: "물을" },
          { word: "책", meaning: "buku", detail: "받침: ㄱ", result: "책을" },
          { word: "음악", meaning: "musik", detail: "받침: ㄱ", result: "음악을" }
        ]
      },
      {
        badge: "Vokal",
        title: "Kata benda berakhir VOKAL (tanpa 받침)",
        rule: "→ tambahkan 를",
        tone: "vokal",
        examples: [
          { word: "친구", meaning: "teman", detail: "huruf akhir: vokal ㅜ", result: "친구를" },
          { word: "영화", meaning: "film", detail: "huruf akhir: vokal ㅘ", result: "영화를" },
          { word: "한국어", meaning: "bahasa Korea", detail: "huruf akhir: vokal ㅓ", result: "한국어를" },
          { word: "커피", meaning: "kopi", detail: "huruf akhir: vokal ㅣ", result: "커피를" }
        ]
      }
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
        explanation: "밥 berakhir 받침 ㅂ → 을"
      },
      {
        prompt: "물",
        promptMeaning: "air",
        options: ["을", "를"],
        correct: "을",
        fullSentence: "물을 마셔요.",
        fullMeaning: "(Saya) minum air.",
        explanation: "물 berakhir 받침 ㄹ → 을"
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
        explanation: "책 berakhir 받침 ㄱ → 을"
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
        explanation: "음악 berakhir 받침 ㄱ → 을"
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
