export type SentencePatternId =
  | "iyeyo"
  | "ayoeoyo"
  | "eunneun"
  | "iga"
  | "eulreul"
  | "posisi";

export type ExampleKind = "statement" | "question" | "positive" | "negative";

export type SentenceExample = {
  korean: string;
  indonesian: string;
  kind: ExampleKind;
  note?: string;
};

export const EXAMPLE_KIND_LABEL: Record<ExampleKind, { label: string; emoji: string }> = {
  statement: { label: "Kalimat Biasa", emoji: "💬" },
  question: { label: "Kalimat Tanya", emoji: "❓" },
  positive: { label: "Jawaban Positif", emoji: "✅" },
  negative: { label: "Jawaban Negatif", emoji: "❌" }
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
      { kind: "statement", korean: "저는 학생이에요.", indonesian: "Saya seorang siswa." },
      { kind: "statement", korean: "이분은 의사예요.", indonesian: "Orang ini seorang dokter." },
      { kind: "question", korean: "학생이에요?", indonesian: "Apakah (kamu) seorang siswa?" },
      { kind: "question", korean: "이름이 뭐예요?", indonesian: "Apa nama (Anda)?" },
      { kind: "positive", korean: "네, 학생이에요.", indonesian: "Ya, (saya) seorang siswa." },
      { kind: "positive", korean: "네, 한국 사람이에요.", indonesian: "Ya, (saya) orang Korea." },
      { kind: "negative", korean: "아니요, 학생이 아니에요.", indonesian: "Bukan, (saya) bukan seorang siswa.", note: "Bentuk negatif: 이/가 아니에요" },
      { kind: "negative", korean: "아니요, 의사가 아니에요.", indonesian: "Bukan, (saya) bukan dokter." }
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
      "Cara pakai: (1) Hapus 다 dari bentuk kamus → dapat akar kata (어간). (2) Lihat vokal pada suku kata terakhir akar. (3) Pilih akhiran sesuai aturan di bawah. Untuk negatif: tambah 안 di depan kata kerja.",
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
      { kind: "statement", korean: "저는 학교에 가요.", indonesian: "Saya pergi ke sekolah." },
      { kind: "statement", korean: "한국어를 공부해요.", indonesian: "Saya belajar bahasa Korea." },
      { kind: "question", korean: "어디에 가요?", indonesian: "Pergi ke mana?" },
      { kind: "question", korean: "뭐 해요?", indonesian: "Sedang apa?" },
      { kind: "positive", korean: "네, 학교에 가요.", indonesian: "Ya, (saya) pergi ke sekolah." },
      { kind: "positive", korean: "네, 한국어를 공부해요.", indonesian: "Ya, (saya) sedang belajar bahasa Korea." },
      { kind: "negative", korean: "아니요, 학교에 안 가요.", indonesian: "Tidak, (saya) tidak pergi ke sekolah.", note: "Negatif: tambah 안 sebelum kerja" },
      { kind: "negative", korean: "아니요, 안 먹어요.", indonesian: "Tidak, (saya) tidak makan." }
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
      { kind: "statement", korean: "저는 학생이에요.", indonesian: "Saya seorang siswa." },
      { kind: "statement", korean: "한국어는 재미있어요.", indonesian: "Bahasa Korea itu menyenangkan." },
      { kind: "question", korean: "이름은 뭐예요?", indonesian: "Apa nama (Anda)?" },
      { kind: "question", korean: "한국어는 어때요?", indonesian: "Bagaimana bahasa Korea?" },
      { kind: "positive", korean: "네, 저는 학생이에요.", indonesian: "Ya, saya seorang siswa." },
      { kind: "positive", korean: "네, 한국어는 재미있어요.", indonesian: "Ya, bahasa Korea menyenangkan." },
      { kind: "negative", korean: "아니요, 저는 학생이 아니에요.", indonesian: "Tidak, saya bukan seorang siswa." },
      { kind: "negative", korean: "아니요, 한국어는 어렵지 않아요.", indonesian: "Tidak, bahasa Korea tidak sulit." }
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
      { kind: "statement", korean: "친구가 와요.", indonesian: "Teman datang." },
      { kind: "statement", korean: "책이 있어요.", indonesian: "Ada buku." },
      { kind: "question", korean: "누가 와요?", indonesian: "Siapa yang datang?" },
      { kind: "question", korean: "뭐가 있어요?", indonesian: "Apa yang ada?" },
      { kind: "positive", korean: "네, 친구가 와요.", indonesian: "Ya, teman datang." },
      { kind: "positive", korean: "네, 책이 있어요.", indonesian: "Ya, ada buku." },
      { kind: "negative", korean: "아니요, 친구가 안 와요.", indonesian: "Tidak, teman tidak datang." },
      { kind: "negative", korean: "아니요, 책이 없어요.", indonesian: "Tidak, tidak ada buku.", note: "있어요 → 없어요" }
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
      { kind: "statement", korean: "밥을 먹어요.", indonesian: "(Saya) makan nasi." },
      { kind: "statement", korean: "영화를 봐요.", indonesian: "(Saya) menonton film." },
      { kind: "question", korean: "뭐를 먹어요?", indonesian: "Makan apa?" },
      { kind: "question", korean: "뭐를 봐요?", indonesian: "Menonton apa?" },
      { kind: "positive", korean: "네, 밥을 먹어요.", indonesian: "Ya, (saya) makan nasi." },
      { kind: "positive", korean: "네, 영화를 봐요.", indonesian: "Ya, (saya) menonton film." },
      { kind: "negative", korean: "아니요, 밥을 안 먹어요.", indonesian: "Tidak, (saya) tidak makan nasi." },
      { kind: "negative", korean: "아니요, 영화를 안 봐요.", indonesian: "Tidak, (saya) tidak menonton film." }
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
  },
  {
    id: "posisi",
    label: "Kata Posisi (앞/뒤/안/위)",
    emoji: "🧭",
    description: "Kata posisi: depan, belakang, samping, dalam, atas, bawah, dll.",
    purpose:
      "Kata posisi dipakai untuk menjelaskan letak sebuah benda atau orang relatif terhadap benda lain. Misal 'di atas meja', 'di dalam tas', 'di depan rumah'. Sangat berguna untuk percakapan sehari-hari dan deskripsi.",
    mechanic:
      "Struktur dasar: [Benda A] + 이/가 + [Benda B] + [Posisi] + 에 + 있어요/없어요. Artinya: 'Benda A ada/tidak ada di [posisi] dari Benda B'. Partikel 에 selalu menempel pada kata posisi.",
    variants: [
      {
        badge: "Datar",
        title: "Posisi horizontal: depan, belakang, samping",
        rule: "→ relatif arah",
        tone: "konsonan",
        examples: [
          { word: "앞", meaning: "depan", detail: "baca: ap", result: "집 앞에 (di depan rumah)" },
          { word: "뒤", meaning: "belakang", detail: "baca: dwi", result: "집 뒤에 (di belakang rumah)" },
          { word: "옆", meaning: "samping", detail: "baca: yeop", result: "집 옆에 (di samping rumah)" }
        ]
      },
      {
        badge: "Vertikal",
        title: "Posisi atas-bawah",
        rule: "→ relatif tinggi",
        tone: "vokal",
        examples: [
          { word: "위", meaning: "atas", detail: "baca: wi", result: "책상 위에 (di atas meja)" },
          { word: "아래", meaning: "bawah", detail: "baca: arae", result: "책상 아래에 (di bawah meja)" },
          { word: "밑", meaning: "bawah (persis)", detail: "baca: mit", result: "책상 밑에 (persis di bawah meja)" }
        ]
      },
      {
        badge: "Ruang",
        title: "Dalam / Luar / Antara / Dekat",
        rule: "→ relatif ruang & jarak",
        tone: "khusus",
        examples: [
          { word: "안", meaning: "dalam", detail: "baca: an", result: "가방 안에 (di dalam tas)" },
          { word: "밖", meaning: "luar", detail: "baca: bakk", result: "집 밖에 (di luar rumah)" },
          { word: "사이", meaning: "antara", detail: "baca: sai", result: "A와 B 사이에 (antara A dan B)" },
          { word: "근처", meaning: "dekat/sekitar", detail: "baca: geuncheo", result: "학교 근처에 (dekat sekolah)" }
        ]
      }
    ],
    examples: [
      { kind: "statement", korean: "책이 책상 위에 있어요.", indonesian: "Buku ada di atas meja." },
      { kind: "statement", korean: "고양이가 의자 밑에 있어요.", indonesian: "Kucing ada di bawah kursi." },
      { kind: "question", korean: "책이 어디에 있어요?", indonesian: "Di mana bukunya?", note: "어디에 = di mana" },
      { kind: "question", korean: "화장실이 어디에 있어요?", indonesian: "Di mana toiletnya?" },
      { kind: "positive", korean: "네, 책상 위에 있어요.", indonesian: "Ya, ada di atas meja." },
      { kind: "positive", korean: "네, 학교 근처에 있어요.", indonesian: "Ya, ada di dekat sekolah." },
      { kind: "negative", korean: "아니요, 책상 위에 없어요.", indonesian: "Tidak, tidak ada di atas meja.", note: "있어요 → 없어요" },
      { kind: "negative", korean: "아니요, 가방 안에 없어요.", indonesian: "Tidak, tidak ada di dalam tas." }
    ],
    quiz: [
      {
        prompt: "buku ada di atas meja",
        promptMeaning: "책이 책상 ___에 있어요",
        options: ["위", "아래", "안"],
        correct: "위",
        fullSentence: "책이 책상 위에 있어요.",
        fullMeaning: "Buku ada di atas meja.",
        explanation: "위 = atas. 책상 위에 = di atas meja"
      },
      {
        prompt: "kucing di bawah kursi",
        promptMeaning: "고양이가 의자 ___에 있어요",
        options: ["위", "밑", "옆"],
        correct: "밑",
        fullSentence: "고양이가 의자 밑에 있어요.",
        fullMeaning: "Kucing ada di bawah kursi.",
        explanation: "밑 = persis di bawah (lebih spesifik dari 아래)"
      },
      {
        prompt: "di dalam tas",
        promptMeaning: "가방 ___에",
        options: ["안", "밖", "위"],
        correct: "안",
        fullSentence: "가방 안에 책이 있어요.",
        fullMeaning: "Di dalam tas ada buku.",
        explanation: "안 = dalam (interior)"
      },
      {
        prompt: "di depan rumah",
        promptMeaning: "집 ___에",
        options: ["앞", "뒤", "옆"],
        correct: "앞",
        fullSentence: "집 앞에 차가 있어요.",
        fullMeaning: "Di depan rumah ada mobil.",
        explanation: "앞 = depan"
      },
      {
        prompt: "di belakang sekolah",
        promptMeaning: "학교 ___에",
        options: ["앞", "뒤", "안"],
        correct: "뒤",
        fullSentence: "학교 뒤에 공원이 있어요.",
        fullMeaning: "Di belakang sekolah ada taman.",
        explanation: "뒤 = belakang"
      },
      {
        prompt: "di samping bank",
        promptMeaning: "은행 ___에",
        options: ["위", "옆", "근처"],
        correct: "옆",
        fullSentence: "은행 옆에 카페가 있어요.",
        fullMeaning: "Di samping bank ada kafe.",
        explanation: "옆 = samping (langsung berdampingan)"
      },
      {
        prompt: "di dekat sekolah",
        promptMeaning: "학교 ___에",
        options: ["옆", "근처", "안"],
        correct: "근처",
        fullSentence: "학교 근처에 식당이 있어요.",
        fullMeaning: "Di dekat sekolah ada restoran.",
        explanation: "근처 = sekitar/dekat (area umum, tidak harus berdampingan)"
      },
      {
        prompt: "antara A dan B",
        promptMeaning: "A와 B ___에",
        options: ["사이", "안", "옆"],
        correct: "사이",
        fullSentence: "은행과 카페 사이에 있어요.",
        fullMeaning: "Ada di antara bank dan kafe.",
        explanation: "사이 = antara (perlu dua acuan, dihubungkan dengan 와/과)"
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
