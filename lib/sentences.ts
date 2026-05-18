import type { Loc } from "@/lib/i18n";

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
  roman: string;
  meaning: Loc;
  kind: ExampleKind;
  note?: Loc;
};

export const EXAMPLE_KIND_LABEL: Record<ExampleKind, { label: Loc; emoji: string }> = {
  statement: { label: { id: "Kalimat Biasa", en: "Statement" }, emoji: "💬" },
  question: { label: { id: "Kalimat Tanya", en: "Question" }, emoji: "❓" },
  positive: { label: { id: "Jawaban Positif", en: "Positive Answer" }, emoji: "✅" },
  negative: { label: { id: "Jawaban Negatif", en: "Negative Answer" }, emoji: "❌" }
};

export type VariantExample = {
  word: string;
  wordRoman: string;
  meaning: Loc;
  detail: Loc;
  result: string;
  resultRoman: string;
};

export type RuleVariant = {
  badge: Loc;
  title: Loc;
  rule: Loc;
  tone: "konsonan" | "vokal" | "khusus";
  examples: VariantExample[];
};

export type QuizQuestion = {
  prompt: string;
  promptRoman?: string;
  promptMeaning: Loc;
  options: string[];
  correct: string;
  fullSentence: string;
  fullSentenceRoman: string;
  fullMeaning: Loc;
  explanation: Loc;
};

export type SentencePattern = {
  id: SentencePatternId;
  label: Loc;
  emoji: string;
  description: Loc;
  purpose: Loc;
  mechanic?: Loc;
  variants: RuleVariant[];
  examples: SentenceExample[];
  quiz: QuizQuestion[];
};

const BATCHIM_TIP: Loc = {
  id: "Setiap suku kata Hangul punya konsonan awal + vokal, dan kadang konsonan akhir yang disebut 받침 (batchim). Untuk menentukan akhiran yang benar, lihat suku kata terakhir dari kata: apakah ia punya 받침 (huruf di bawah) atau tidak.",
  en: "Every Hangul syllable has an initial consonant + vowel, and sometimes a final consonant called 받침 (batchim). To pick the right ending, look at the last syllable of the word and check whether it has a 받침 (a bottom consonant) or not."
};

const BADGE_CONSONANT: Loc = { id: "Konsonan", en: "Consonant" };
const BADGE_VOWEL: Loc = { id: "Vokal", en: "Vowel" };

export const SENTENCE_PATTERNS: readonly SentencePattern[] = [
  {
    id: "iyeyo",
    label: { id: "Adalah (이에요/예요)", en: "To Be (이에요/예요)" },
    emoji: "✨",
    description: {
      id: "Kata benda + 'adalah' dalam bentuk sopan kasual",
      en: "Noun + 'is/am/are' in polite-casual form"
    },
    purpose: {
      id: "Akhiran 이에요/예요 berarti 'adalah / merupakan'. Dipasang di belakang kata benda untuk menyatakan identitas atau profesi, misal 'saya adalah ___' atau 'dia adalah ___'.",
      en: "The endings 이에요/예요 mean 'is / am / are'. Attached after a noun to state identity or occupation, e.g. 'I am ___' or 'he/she is ___'."
    },
    mechanic: BATCHIM_TIP,
    variants: [
      {
        badge: BADGE_CONSONANT,
        title: { id: "Kata benda berakhir KONSONAN (ada 받침)", en: "Noun ends in a CONSONANT (has 받침)" },
        rule: { id: "→ tambahkan 이에요", en: "→ add 이에요" },
        tone: "konsonan",
        examples: [
          { word: "학생", wordRoman: "haksaeng", meaning: { id: "siswa", en: "student" }, detail: { id: "받침: ㅇ", en: "final consonant: ㅇ" }, result: "학생이에요", resultRoman: "haksaeng-ieyo" },
          { word: "선생님", wordRoman: "seonsaengnim", meaning: { id: "guru", en: "teacher" }, detail: { id: "받침: ㅁ", en: "final consonant: ㅁ" }, result: "선생님이에요", resultRoman: "seonsaengnim-ieyo" },
          { word: "회사원", wordRoman: "hoesawon", meaning: { id: "karyawan", en: "office worker" }, detail: { id: "받침: ㄴ", en: "final consonant: ㄴ" }, result: "회사원이에요", resultRoman: "hoesawon-ieyo" },
          { word: "한국 사람", wordRoman: "hanguk saram", meaning: { id: "orang Korea", en: "Korean person" }, detail: { id: "받침: ㅁ", en: "final consonant: ㅁ" }, result: "한국 사람이에요", resultRoman: "hanguk saram-ieyo" }
        ]
      },
      {
        badge: BADGE_VOWEL,
        title: { id: "Kata benda berakhir VOKAL (tanpa 받침)", en: "Noun ends in a VOWEL (no 받침)" },
        rule: { id: "→ tambahkan 예요", en: "→ add 예요" },
        tone: "vokal",
        examples: [
          { word: "의사", wordRoman: "uisa", meaning: { id: "dokter", en: "doctor" }, detail: { id: "huruf akhir: vokal ㅏ", en: "final letter: vowel ㅏ" }, result: "의사예요", resultRoman: "uisayeyo" },
          { word: "친구", wordRoman: "chingu", meaning: { id: "teman", en: "friend" }, detail: { id: "huruf akhir: vokal ㅜ", en: "final letter: vowel ㅜ" }, result: "친구예요", resultRoman: "chinguyeyo" },
          { word: "엄마", wordRoman: "eomma", meaning: { id: "ibu", en: "mom" }, detail: { id: "huruf akhir: vokal ㅏ", en: "final letter: vowel ㅏ" }, result: "엄마예요", resultRoman: "eommayeyo" },
          { word: "가수", wordRoman: "gasu", meaning: { id: "penyanyi", en: "singer" }, detail: { id: "huruf akhir: vokal ㅜ", en: "final letter: vowel ㅜ" }, result: "가수예요", resultRoman: "gasuyeyo" }
        ]
      }
    ],
    examples: [
      { kind: "statement", korean: "저는 학생이에요.", roman: "jeoneun haksaeng-ieyo.", meaning: { id: "Saya seorang siswa.", en: "I am a student." } },
      { kind: "statement", korean: "이분은 의사예요.", roman: "ibuneun uisayeyo.", meaning: { id: "Orang ini seorang dokter.", en: "This person is a doctor." } },
      { kind: "question", korean: "학생이에요?", roman: "haksaeng-ieyo?", meaning: { id: "Apakah (kamu) seorang siswa?", en: "Are (you) a student?" } },
      { kind: "question", korean: "이름이 뭐예요?", roman: "ireumi mwoyeyo?", meaning: { id: "Apa nama (Anda)?", en: "What is (your) name?" } },
      { kind: "positive", korean: "네, 학생이에요.", roman: "ne, haksaeng-ieyo.", meaning: { id: "Ya, (saya) seorang siswa.", en: "Yes, (I) am a student." } },
      { kind: "positive", korean: "네, 한국 사람이에요.", roman: "ne, hanguk saram-ieyo.", meaning: { id: "Ya, (saya) orang Korea.", en: "Yes, (I) am Korean." } },
      { kind: "negative", korean: "아니요, 학생이 아니에요.", roman: "aniyo, haksaengi anieyo.", meaning: { id: "Bukan, (saya) bukan seorang siswa.", en: "No, (I) am not a student." }, note: { id: "Bentuk negatif: 이/가 아니에요", en: "Negative form: 이/가 아니에요" } },
      { kind: "negative", korean: "아니요, 의사가 아니에요.", roman: "aniyo, uisaga anieyo.", meaning: { id: "Bukan, (saya) bukan dokter.", en: "No, (I) am not a doctor." } }
    ],
    quiz: [
      { prompt: "학생", promptRoman: "haksaeng", promptMeaning: { id: "siswa", en: "student" }, options: ["이에요", "예요"], correct: "이에요", fullSentence: "학생이에요.", fullSentenceRoman: "haksaeng-ieyo.", fullMeaning: { id: "(Saya) seorang siswa.", en: "(I) am a student." }, explanation: { id: "학생 berakhir 받침 ㅇ → 이에요", en: "학생 ends in 받침 ㅇ → 이에요" } },
      { prompt: "의사", promptRoman: "uisa", promptMeaning: { id: "dokter", en: "doctor" }, options: ["이에요", "예요"], correct: "예요", fullSentence: "의사예요.", fullSentenceRoman: "uisayeyo.", fullMeaning: { id: "(Saya) seorang dokter.", en: "(I) am a doctor." }, explanation: { id: "의사 berakhir vokal ㅏ → 예요", en: "의사 ends in vowel ㅏ → 예요" } },
      { prompt: "선생님", promptRoman: "seonsaengnim", promptMeaning: { id: "guru", en: "teacher" }, options: ["이에요", "예요"], correct: "이에요", fullSentence: "선생님이에요.", fullSentenceRoman: "seonsaengnim-ieyo.", fullMeaning: { id: "(Saya) seorang guru.", en: "(I) am a teacher." }, explanation: { id: "선생님 berakhir 받침 ㅁ → 이에요", en: "선생님 ends in 받침 ㅁ → 이에요" } },
      { prompt: "가수", promptRoman: "gasu", promptMeaning: { id: "penyanyi", en: "singer" }, options: ["이에요", "예요"], correct: "예요", fullSentence: "가수예요.", fullSentenceRoman: "gasuyeyo.", fullMeaning: { id: "(Dia) penyanyi.", en: "(He/she) is a singer." }, explanation: { id: "가수 berakhir vokal ㅜ → 예요", en: "가수 ends in vowel ㅜ → 예요" } },
      { prompt: "한국 사람", promptRoman: "hanguk saram", promptMeaning: { id: "orang Korea", en: "Korean person" }, options: ["이에요", "예요"], correct: "이에요", fullSentence: "한국 사람이에요.", fullSentenceRoman: "hanguk saram-ieyo.", fullMeaning: { id: "(Saya) orang Korea.", en: "(I) am Korean." }, explanation: { id: "사람 berakhir 받침 ㅁ → 이에요", en: "사람 ends in 받침 ㅁ → 이에요" } },
      { prompt: "친구", promptRoman: "chingu", promptMeaning: { id: "teman", en: "friend" }, options: ["이에요", "예요"], correct: "예요", fullSentence: "친구예요.", fullSentenceRoman: "chinguyeyo.", fullMeaning: { id: "(Dia) teman saya.", en: "(He/she) is my friend." }, explanation: { id: "친구 berakhir vokal ㅜ → 예요", en: "친구 ends in vowel ㅜ → 예요" } },
      { prompt: "회사원", promptRoman: "hoesawon", promptMeaning: { id: "karyawan", en: "office worker" }, options: ["이에요", "예요"], correct: "이에요", fullSentence: "회사원이에요.", fullSentenceRoman: "hoesawon-ieyo.", fullMeaning: { id: "(Saya) karyawan kantor.", en: "(I) am an office worker." }, explanation: { id: "회사원 berakhir 받침 ㄴ → 이에요", en: "회사원 ends in 받침 ㄴ → 이에요" } },
      { prompt: "엄마", promptRoman: "eomma", promptMeaning: { id: "ibu", en: "mom" }, options: ["이에요", "예요"], correct: "예요", fullSentence: "엄마예요.", fullSentenceRoman: "eommayeyo.", fullMeaning: { id: "(Dia) ibu saya.", en: "(She) is my mom." }, explanation: { id: "엄마 berakhir vokal ㅏ → 예요", en: "엄마 ends in vowel ㅏ → 예요" } }
    ]
  },
  {
    id: "ayoeoyo",
    label: { id: "Akhiran Kerja Sopan (아요/어요)", en: "Polite Verb Ending (아요/어요)" },
    emoji: "🗣️",
    description: {
      id: "Akhiran kata kerja & kata sifat dalam percakapan sopan kasual",
      en: "Polite-casual verb and adjective ending used in everyday speech"
    },
    purpose: {
      id: "Akhiran 아요/어요/해요 dipakai di akhir kata kerja atau kata sifat agar kalimat terdengar sopan tapi santai (informal polite). Ini bentuk yang paling sering dipakai dalam percakapan sehari-hari.",
      en: "The endings 아요/어요/해요 attach to verbs and adjectives to make the sentence informal-polite. This is the most common style for everyday conversation."
    },
    mechanic: {
      id: "Cara pakai: (1) Hapus 다 dari bentuk kamus → dapat akar kata (어간). (2) Lihat vokal pada suku kata terakhir akar. (3) Pilih akhiran sesuai aturan di bawah. Untuk negatif: tambah 안 di depan kata kerja.",
      en: "How: (1) Drop 다 from the dictionary form to get the stem (어간). (2) Check the vowel in the last syllable of the stem. (3) Pick the ending below. For negation: put 안 in front of the verb."
    },
    variants: [
      {
        badge: { id: "ㅏ / ㅗ", en: "ㅏ / ㅗ" },
        title: { id: "Akar berakhir vokal ㅏ atau ㅗ", en: "Stem vowel is ㅏ or ㅗ" },
        rule: { id: "→ tambahkan 아요", en: "→ add 아요" },
        tone: "konsonan",
        examples: [
          { word: "가다", wordRoman: "gada", meaning: { id: "pergi", en: "to go" }, detail: { id: "akar 가 = vokal ㅏ", en: "stem 가 = vowel ㅏ" }, result: "가요", resultRoman: "gayo" },
          { word: "오다", wordRoman: "oda", meaning: { id: "datang", en: "to come" }, detail: { id: "akar 오 = vokal ㅗ", en: "stem 오 = vowel ㅗ" }, result: "와요", resultRoman: "wayo" },
          { word: "보다", wordRoman: "boda", meaning: { id: "melihat", en: "to see" }, detail: { id: "akar 보 = vokal ㅗ", en: "stem 보 = vowel ㅗ" }, result: "봐요", resultRoman: "bwayo" },
          { word: "만나다", wordRoman: "mannada", meaning: { id: "bertemu", en: "to meet" }, detail: { id: "akar 만나 = vokal ㅏ", en: "stem 만나 = vowel ㅏ" }, result: "만나요", resultRoman: "mannayo" }
        ]
      },
      {
        badge: { id: "Vokal lain", en: "Other vowels" },
        title: { id: "Akar berakhir vokal lain (ㅓ, ㅜ, ㅣ, ㅡ, dll.)", en: "Stem ends in any other vowel (ㅓ, ㅜ, ㅣ, ㅡ, etc.)" },
        rule: { id: "→ tambahkan 어요", en: "→ add 어요" },
        tone: "vokal",
        examples: [
          { word: "먹다", wordRoman: "meokda", meaning: { id: "makan", en: "to eat" }, detail: { id: "akar 먹 = vokal ㅓ", en: "stem 먹 = vowel ㅓ" }, result: "먹어요", resultRoman: "meogeoyo" },
          { word: "읽다", wordRoman: "ikda", meaning: { id: "membaca", en: "to read" }, detail: { id: "akar 읽 = vokal ㅣ", en: "stem 읽 = vowel ㅣ" }, result: "읽어요", resultRoman: "ilgeoyo" },
          { word: "마시다", wordRoman: "masida", meaning: { id: "minum", en: "to drink" }, detail: { id: "akar 마시 = vokal ㅣ", en: "stem 마시 = vowel ㅣ" }, result: "마셔요", resultRoman: "masyeoyo" },
          { word: "주다", wordRoman: "juda", meaning: { id: "memberi", en: "to give" }, detail: { id: "akar 주 = vokal ㅜ", en: "stem 주 = vowel ㅜ" }, result: "줘요", resultRoman: "jwoyo" }
        ]
      },
      {
        badge: { id: "하다", en: "하다" },
        title: { id: "Kata kerja yang diakhiri 하다", en: "Verbs ending in 하다" },
        rule: { id: "→ berubah jadi 해요", en: "→ becomes 해요" },
        tone: "khusus",
        examples: [
          { word: "공부하다", wordRoman: "gongbuhada", meaning: { id: "belajar", en: "to study" }, detail: { id: "diakhiri 하다", en: "ends in 하다" }, result: "공부해요", resultRoman: "gongbuhaeyo" },
          { word: "일하다", wordRoman: "ilhada", meaning: { id: "bekerja", en: "to work" }, detail: { id: "diakhiri 하다", en: "ends in 하다" }, result: "일해요", resultRoman: "ilhaeyo" },
          { word: "사랑하다", wordRoman: "saranghada", meaning: { id: "mencintai", en: "to love" }, detail: { id: "diakhiri 하다", en: "ends in 하다" }, result: "사랑해요", resultRoman: "saranghaeyo" }
        ]
      }
    ],
    examples: [
      { kind: "statement", korean: "저는 학교에 가요.", roman: "jeoneun hakgyoe gayo.", meaning: { id: "Saya pergi ke sekolah.", en: "I go to school." } },
      { kind: "statement", korean: "한국어를 공부해요.", roman: "hangugeoreul gongbuhaeyo.", meaning: { id: "Saya belajar bahasa Korea.", en: "I study Korean." } },
      { kind: "question", korean: "어디에 가요?", roman: "eodie gayo?", meaning: { id: "Pergi ke mana?", en: "Where are (you) going?" } },
      { kind: "question", korean: "뭐 해요?", roman: "mwo haeyo?", meaning: { id: "Sedang apa?", en: "What are (you) doing?" } },
      { kind: "positive", korean: "네, 학교에 가요.", roman: "ne, hakgyoe gayo.", meaning: { id: "Ya, (saya) pergi ke sekolah.", en: "Yes, (I'm) going to school." } },
      { kind: "positive", korean: "네, 한국어를 공부해요.", roman: "ne, hangugeoreul gongbuhaeyo.", meaning: { id: "Ya, (saya) sedang belajar bahasa Korea.", en: "Yes, (I'm) studying Korean." } },
      { kind: "negative", korean: "아니요, 학교에 안 가요.", roman: "aniyo, hakgyoe an gayo.", meaning: { id: "Tidak, (saya) tidak pergi ke sekolah.", en: "No, (I'm) not going to school." }, note: { id: "Negatif: tambah 안 sebelum kerja", en: "Negative: add 안 before the verb" } },
      { kind: "negative", korean: "아니요, 안 먹어요.", roman: "aniyo, an meogeoyo.", meaning: { id: "Tidak, (saya) tidak makan.", en: "No, (I'm) not eating." } }
    ],
    quiz: [
      { prompt: "가다", promptRoman: "gada", promptMeaning: { id: "pergi", en: "to go" }, options: ["가요", "가어요", "거요"], correct: "가요", fullSentence: "학교에 가요.", fullSentenceRoman: "hakgyoe gayo.", fullMeaning: { id: "(Saya) pergi ke sekolah.", en: "(I) go to school." }, explanation: { id: "Akar 가 berisi vokal ㅏ → tambah 아요, lalu ㅏ+ㅏ disingkat jadi 가요", en: "Stem 가 has vowel ㅏ → add 아요, then ㅏ+ㅏ contracts to 가요" } },
      { prompt: "먹다", promptRoman: "meokda", promptMeaning: { id: "makan", en: "to eat" }, options: ["먹아요", "먹어요", "머거요"], correct: "먹어요", fullSentence: "밥을 먹어요.", fullSentenceRoman: "babeul meogeoyo.", fullMeaning: { id: "(Saya) makan nasi.", en: "(I) eat rice." }, explanation: { id: "Akar 먹 berisi vokal ㅓ → tambah 어요", en: "Stem 먹 has vowel ㅓ → add 어요" } },
      { prompt: "오다", promptRoman: "oda", promptMeaning: { id: "datang", en: "to come" }, options: ["오아요", "오어요", "와요"], correct: "와요", fullSentence: "친구가 와요.", fullSentenceRoman: "chinguga wayo.", fullMeaning: { id: "Teman datang.", en: "A friend is coming." }, explanation: { id: "Akar 오 (vokal ㅗ) + 아요 → ㅗ+ㅏ digabung jadi 와요", en: "Stem 오 (vowel ㅗ) + 아요 → ㅗ+ㅏ merges into 와요" } },
      { prompt: "보다", promptRoman: "boda", promptMeaning: { id: "melihat", en: "to see" }, options: ["봐요", "보아요", "보어요"], correct: "봐요", fullSentence: "영화를 봐요.", fullSentenceRoman: "yeonghwareul bwayo.", fullMeaning: { id: "(Saya) menonton film.", en: "(I) watch a movie." }, explanation: { id: "Akar 보 (vokal ㅗ) + 아요 → ㅗ+ㅏ digabung jadi 봐요", en: "Stem 보 (vowel ㅗ) + 아요 → ㅗ+ㅏ merges into 봐요" } },
      { prompt: "마시다", promptRoman: "masida", promptMeaning: { id: "minum", en: "to drink" }, options: ["마시아요", "마셔요", "마시요"], correct: "마셔요", fullSentence: "물을 마셔요.", fullSentenceRoman: "mureul masyeoyo.", fullMeaning: { id: "(Saya) minum air.", en: "(I) drink water." }, explanation: { id: "Akar 마시 (vokal ㅣ) + 어요 → ㅣ+ㅓ digabung jadi 셔", en: "Stem 마시 (vowel ㅣ) + 어요 → ㅣ+ㅓ merges into 셔" } },
      { prompt: "공부하다", promptRoman: "gongbuhada", promptMeaning: { id: "belajar", en: "to study" }, options: ["공부하요", "공부해요", "공부어요"], correct: "공부해요", fullSentence: "한국어를 공부해요.", fullSentenceRoman: "hangugeoreul gongbuhaeyo.", fullMeaning: { id: "(Saya) belajar bahasa Korea.", en: "(I) study Korean." }, explanation: { id: "하다 → 해요 (aturan khusus)", en: "하다 → 해요 (special rule)" } },
      { prompt: "읽다", promptRoman: "ikda", promptMeaning: { id: "membaca", en: "to read" }, options: ["읽아요", "읽어요", "일거요"], correct: "읽어요", fullSentence: "책을 읽어요.", fullSentenceRoman: "chaegeul ilgeoyo.", fullMeaning: { id: "(Saya) membaca buku.", en: "(I) read a book." }, explanation: { id: "Akar 읽 berisi vokal ㅣ → tambah 어요", en: "Stem 읽 has vowel ㅣ → add 어요" } },
      { prompt: "만나다", promptRoman: "mannada", promptMeaning: { id: "bertemu", en: "to meet" }, options: ["만나요", "만나아요", "만너요"], correct: "만나요", fullSentence: "친구를 만나요.", fullSentenceRoman: "chingureul mannayo.", fullMeaning: { id: "(Saya) bertemu teman.", en: "(I) meet a friend." }, explanation: { id: "Akar 만나 (vokal ㅏ) + 아요 → ㅏ+ㅏ disingkat jadi 만나요", en: "Stem 만나 (vowel ㅏ) + 아요 → ㅏ+ㅏ contracts to 만나요" } },
      { prompt: "일하다", promptRoman: "ilhada", promptMeaning: { id: "bekerja", en: "to work" }, options: ["일하요", "일해요", "일아요"], correct: "일해요", fullSentence: "회사에서 일해요.", fullSentenceRoman: "hoesaeseo ilhaeyo.", fullMeaning: { id: "(Saya) bekerja di kantor.", en: "(I) work at the office." }, explanation: { id: "하다 → 해요", en: "하다 → 해요" } }
    ]
  },
  {
    id: "eunneun",
    label: { id: "Penanda Topik (은/는)", en: "Topic Marker (은/는)" },
    emoji: "🏷️",
    description: {
      id: "Menandai topik kalimat — kata benda yang sedang dibicarakan",
      en: "Marks the sentence topic — the noun the sentence is about"
    },
    purpose: {
      id: "Penanda 은/는 dipasang setelah kata benda untuk menyatakan, 'kalau soal __ ini'. Sering dipakai untuk memperkenalkan topik baru atau membandingkan dua hal.",
      en: "은/는 attaches after a noun to express 'as for ___'. Used to introduce a new topic or to contrast two things."
    },
    mechanic: BATCHIM_TIP,
    variants: [
      {
        badge: BADGE_CONSONANT,
        title: { id: "Kata benda berakhir KONSONAN (ada 받침)", en: "Noun ends in a CONSONANT (has 받침)" },
        rule: { id: "→ tambahkan 은", en: "→ add 은" },
        tone: "konsonan",
        examples: [
          { word: "이름", wordRoman: "ireum", meaning: { id: "nama", en: "name" }, detail: { id: "받침: ㅁ", en: "final consonant: ㅁ" }, result: "이름은", resultRoman: "ireumeun" },
          { word: "오늘", wordRoman: "oneul", meaning: { id: "hari ini", en: "today" }, detail: { id: "받침: ㄹ", en: "final consonant: ㄹ" }, result: "오늘은", resultRoman: "oneureun" },
          { word: "선생님", wordRoman: "seonsaengnim", meaning: { id: "guru", en: "teacher" }, detail: { id: "받침: ㅁ", en: "final consonant: ㅁ" }, result: "선생님은", resultRoman: "seonsaengnimeun" },
          { word: "한국 사람", wordRoman: "hanguk saram", meaning: { id: "orang Korea", en: "Korean person" }, detail: { id: "받침: ㅁ", en: "final consonant: ㅁ" }, result: "한국 사람은", resultRoman: "hanguk sarameun" }
        ]
      },
      {
        badge: BADGE_VOWEL,
        title: { id: "Kata benda berakhir VOKAL (tanpa 받침)", en: "Noun ends in a VOWEL (no 받침)" },
        rule: { id: "→ tambahkan 는", en: "→ add 는" },
        tone: "vokal",
        examples: [
          { word: "저", wordRoman: "jeo", meaning: { id: "saya", en: "I (humble)" }, detail: { id: "huruf akhir: vokal ㅓ", en: "final letter: vowel ㅓ" }, result: "저는", resultRoman: "jeoneun" },
          { word: "친구", wordRoman: "chingu", meaning: { id: "teman", en: "friend" }, detail: { id: "huruf akhir: vokal ㅜ", en: "final letter: vowel ㅜ" }, result: "친구는", resultRoman: "chinguneun" },
          { word: "한국어", wordRoman: "hangugeo", meaning: { id: "bahasa Korea", en: "Korean (language)" }, detail: { id: "huruf akhir: vokal ㅓ", en: "final letter: vowel ㅓ" }, result: "한국어는", resultRoman: "hangugeoneun" },
          { word: "어머니", wordRoman: "eomeoni", meaning: { id: "ibu", en: "mother" }, detail: { id: "huruf akhir: vokal ㅣ", en: "final letter: vowel ㅣ" }, result: "어머니는", resultRoman: "eomeonineun" }
        ]
      }
    ],
    examples: [
      { kind: "statement", korean: "저는 학생이에요.", roman: "jeoneun haksaeng-ieyo.", meaning: { id: "Saya seorang siswa.", en: "I am a student." } },
      { kind: "statement", korean: "한국어는 재미있어요.", roman: "hangugeoneun jaemiisseoyo.", meaning: { id: "Bahasa Korea itu menyenangkan.", en: "Korean is fun." } },
      { kind: "question", korean: "이름은 뭐예요?", roman: "ireumeun mwoyeyo?", meaning: { id: "Apa nama (Anda)?", en: "What is (your) name?" } },
      { kind: "question", korean: "한국어는 어때요?", roman: "hangugeoneun eottaeyo?", meaning: { id: "Bagaimana bahasa Korea?", en: "How is Korean (for you)?" } },
      { kind: "positive", korean: "네, 저는 학생이에요.", roman: "ne, jeoneun haksaeng-ieyo.", meaning: { id: "Ya, saya seorang siswa.", en: "Yes, I am a student." } },
      { kind: "positive", korean: "네, 한국어는 재미있어요.", roman: "ne, hangugeoneun jaemiisseoyo.", meaning: { id: "Ya, bahasa Korea menyenangkan.", en: "Yes, Korean is fun." } },
      { kind: "negative", korean: "아니요, 저는 학생이 아니에요.", roman: "aniyo, jeoneun haksaengi anieyo.", meaning: { id: "Tidak, saya bukan seorang siswa.", en: "No, I am not a student." } },
      { kind: "negative", korean: "아니요, 한국어는 어렵지 않아요.", roman: "aniyo, hangugeoneun eoryeopji anayo.", meaning: { id: "Tidak, bahasa Korea tidak sulit.", en: "No, Korean isn't difficult." } }
    ],
    quiz: [
      { prompt: "저", promptRoman: "jeo", promptMeaning: { id: "saya", en: "I" }, options: ["은", "는"], correct: "는", fullSentence: "저는 학생이에요.", fullSentenceRoman: "jeoneun haksaeng-ieyo.", fullMeaning: { id: "Saya seorang siswa.", en: "I am a student." }, explanation: { id: "저 berakhir vokal ㅓ → 는", en: "저 ends in vowel ㅓ → 는" } },
      { prompt: "이름", promptRoman: "ireum", promptMeaning: { id: "nama", en: "name" }, options: ["은", "는"], correct: "은", fullSentence: "이름은 민지예요.", fullSentenceRoman: "ireumeun minjiyeyo.", fullMeaning: { id: "Nama saya Minji.", en: "(My) name is Minji." }, explanation: { id: "이름 berakhir 받침 ㅁ → 은", en: "이름 ends in 받침 ㅁ → 은" } },
      { prompt: "한국어", promptRoman: "hangugeo", promptMeaning: { id: "bahasa Korea", en: "Korean (language)" }, options: ["은", "는"], correct: "는", fullSentence: "한국어는 재미있어요.", fullSentenceRoman: "hangugeoneun jaemiisseoyo.", fullMeaning: { id: "Bahasa Korea menyenangkan.", en: "Korean is fun." }, explanation: { id: "한국어 berakhir vokal ㅓ → 는", en: "한국어 ends in vowel ㅓ → 는" } },
      { prompt: "오늘", promptRoman: "oneul", promptMeaning: { id: "hari ini", en: "today" }, options: ["은", "는"], correct: "은", fullSentence: "오늘은 월요일이에요.", fullSentenceRoman: "oneureun woryoiri-eyo.", fullMeaning: { id: "Hari ini hari Senin.", en: "Today is Monday." }, explanation: { id: "오늘 berakhir 받침 ㄹ → 은", en: "오늘 ends in 받침 ㄹ → 은" } },
      { prompt: "친구", promptRoman: "chingu", promptMeaning: { id: "teman", en: "friend" }, options: ["은", "는"], correct: "는", fullSentence: "친구는 학교에 가요.", fullSentenceRoman: "chinguneun hakgyoe gayo.", fullMeaning: { id: "Teman (saya) pergi ke sekolah.", en: "(My) friend is going to school." }, explanation: { id: "친구 berakhir vokal ㅜ → 는", en: "친구 ends in vowel ㅜ → 는" } },
      { prompt: "선생님", promptRoman: "seonsaengnim", promptMeaning: { id: "guru", en: "teacher" }, options: ["은", "는"], correct: "은", fullSentence: "선생님은 한국 사람이에요.", fullSentenceRoman: "seonsaengnimeun hanguk saram-ieyo.", fullMeaning: { id: "Guru (saya) orang Korea.", en: "(The) teacher is Korean." }, explanation: { id: "선생님 berakhir 받침 ㅁ → 은", en: "선생님 ends in 받침 ㅁ → 은" } }
    ]
  },
  {
    id: "iga",
    label: { id: "Penanda Subjek (이/가)", en: "Subject Marker (이/가)" },
    emoji: "🎯",
    description: {
      id: "Menandai subjek — pelaku perbuatan atau pemilik kondisi",
      en: "Marks the subject — the doer of the action or holder of the state"
    },
    purpose: {
      id: "Penanda 이/가 dipasang setelah kata benda yang menjadi subjek kalimat (pelaku aksi). Sering dipakai untuk memperkenalkan informasi baru atau menjawab pertanyaan 'Siapa yang...?'.",
      en: "이/가 attaches after the noun that is the sentence's subject (the doer). Often used to introduce new information or to answer 'Who...?'."
    },
    mechanic: BATCHIM_TIP,
    variants: [
      {
        badge: BADGE_CONSONANT,
        title: { id: "Kata benda berakhir KONSONAN (ada 받침)", en: "Noun ends in a CONSONANT (has 받침)" },
        rule: { id: "→ tambahkan 이", en: "→ add 이" },
        tone: "konsonan",
        examples: [
          { word: "책", wordRoman: "chaek", meaning: { id: "buku", en: "book" }, detail: { id: "받침: ㄱ", en: "final consonant: ㄱ" }, result: "책이", resultRoman: "chaegi" },
          { word: "동생", wordRoman: "dongsaeng", meaning: { id: "adik", en: "younger sibling" }, detail: { id: "받침: ㅇ", en: "final consonant: ㅇ" }, result: "동생이", resultRoman: "dongsaengi" },
          { word: "선생님", wordRoman: "seonsaengnim", meaning: { id: "guru", en: "teacher" }, detail: { id: "받침: ㅁ", en: "final consonant: ㅁ" }, result: "선생님이", resultRoman: "seonsaengnimi" },
          { word: "사람", wordRoman: "saram", meaning: { id: "orang", en: "person" }, detail: { id: "받침: ㅁ", en: "final consonant: ㅁ" }, result: "사람이", resultRoman: "sarami" }
        ]
      },
      {
        badge: BADGE_VOWEL,
        title: { id: "Kata benda berakhir VOKAL (tanpa 받침)", en: "Noun ends in a VOWEL (no 받침)" },
        rule: { id: "→ tambahkan 가", en: "→ add 가" },
        tone: "vokal",
        examples: [
          { word: "친구", wordRoman: "chingu", meaning: { id: "teman", en: "friend" }, detail: { id: "huruf akhir: vokal ㅜ", en: "final letter: vowel ㅜ" }, result: "친구가", resultRoman: "chinguga" },
          { word: "비", wordRoman: "bi", meaning: { id: "hujan", en: "rain" }, detail: { id: "huruf akhir: vokal ㅣ", en: "final letter: vowel ㅣ" }, result: "비가", resultRoman: "biga" },
          { word: "엄마", wordRoman: "eomma", meaning: { id: "ibu", en: "mom" }, detail: { id: "huruf akhir: vokal ㅏ", en: "final letter: vowel ㅏ" }, result: "엄마가", resultRoman: "eommaga" },
          { word: "아이", wordRoman: "ai", meaning: { id: "anak", en: "child" }, detail: { id: "huruf akhir: vokal ㅣ", en: "final letter: vowel ㅣ" }, result: "아이가", resultRoman: "aiga" }
        ]
      }
    ],
    examples: [
      { kind: "statement", korean: "친구가 와요.", roman: "chinguga wayo.", meaning: { id: "Teman datang.", en: "A friend is coming." } },
      { kind: "statement", korean: "책이 있어요.", roman: "chaegi isseoyo.", meaning: { id: "Ada buku.", en: "There is a book." } },
      { kind: "question", korean: "누가 와요?", roman: "nuga wayo?", meaning: { id: "Siapa yang datang?", en: "Who is coming?" } },
      { kind: "question", korean: "뭐가 있어요?", roman: "mwoga isseoyo?", meaning: { id: "Apa yang ada?", en: "What's there?" } },
      { kind: "positive", korean: "네, 친구가 와요.", roman: "ne, chinguga wayo.", meaning: { id: "Ya, teman datang.", en: "Yes, a friend is coming." } },
      { kind: "positive", korean: "네, 책이 있어요.", roman: "ne, chaegi isseoyo.", meaning: { id: "Ya, ada buku.", en: "Yes, there is a book." } },
      { kind: "negative", korean: "아니요, 친구가 안 와요.", roman: "aniyo, chinguga an wayo.", meaning: { id: "Tidak, teman tidak datang.", en: "No, my friend isn't coming." } },
      { kind: "negative", korean: "아니요, 책이 없어요.", roman: "aniyo, chaegi eopseoyo.", meaning: { id: "Tidak, tidak ada buku.", en: "No, there is no book." }, note: { id: "있어요 → 없어요", en: "있어요 → 없어요 (there is → there isn't)" } }
    ],
    quiz: [
      { prompt: "친구", promptRoman: "chingu", promptMeaning: { id: "teman", en: "friend" }, options: ["이", "가"], correct: "가", fullSentence: "친구가 와요.", fullSentenceRoman: "chinguga wayo.", fullMeaning: { id: "Teman datang.", en: "A friend is coming." }, explanation: { id: "친구 berakhir vokal ㅜ → 가", en: "친구 ends in vowel ㅜ → 가" } },
      { prompt: "책", promptRoman: "chaek", promptMeaning: { id: "buku", en: "book" }, options: ["이", "가"], correct: "이", fullSentence: "책이 있어요.", fullSentenceRoman: "chaegi isseoyo.", fullMeaning: { id: "Ada buku.", en: "There is a book." }, explanation: { id: "책 berakhir 받침 ㄱ → 이", en: "책 ends in 받침 ㄱ → 이" } },
      { prompt: "비", promptRoman: "bi", promptMeaning: { id: "hujan", en: "rain" }, options: ["이", "가"], correct: "가", fullSentence: "비가 와요.", fullSentenceRoman: "biga wayo.", fullMeaning: { id: "Hujan turun.", en: "It's raining." }, explanation: { id: "비 berakhir vokal ㅣ → 가", en: "비 ends in vowel ㅣ → 가" } },
      { prompt: "동생", promptRoman: "dongsaeng", promptMeaning: { id: "adik", en: "younger sibling" }, options: ["이", "가"], correct: "이", fullSentence: "동생이 자요.", fullSentenceRoman: "dongsaengi jayo.", fullMeaning: { id: "Adik (sedang) tidur.", en: "(My) younger sibling is sleeping." }, explanation: { id: "동생 berakhir 받침 ㅇ → 이", en: "동생 ends in 받침 ㅇ → 이" } },
      { prompt: "엄마", promptRoman: "eomma", promptMeaning: { id: "ibu", en: "mom" }, options: ["이", "가"], correct: "가", fullSentence: "엄마가 음식을 만들어요.", fullSentenceRoman: "eommaga eumsigeul mandeureoyo.", fullMeaning: { id: "Ibu memasak makanan.", en: "Mom is making food." }, explanation: { id: "엄마 berakhir vokal ㅏ → 가", en: "엄마 ends in vowel ㅏ → 가" } },
      { prompt: "선생님", promptRoman: "seonsaengnim", promptMeaning: { id: "guru", en: "teacher" }, options: ["이", "가"], correct: "이", fullSentence: "선생님이 와요.", fullSentenceRoman: "seonsaengnimi wayo.", fullMeaning: { id: "Guru datang.", en: "(The) teacher is coming." }, explanation: { id: "선생님 berakhir 받침 ㅁ → 이", en: "선생님 ends in 받침 ㅁ → 이" } }
    ]
  },
  {
    id: "eulreul",
    label: { id: "Penanda Objek (을/를)", en: "Object Marker (을/를)" },
    emoji: "🎁",
    description: {
      id: "Menandai objek langsung — apa yang menerima aksi",
      en: "Marks the direct object — what receives the action"
    },
    purpose: {
      id: "Penanda 을/를 dipasang setelah kata benda yang menjadi objek dari kata kerja. Untuk menunjukkan: makan APA, baca APA, lihat APA, dll.",
      en: "을/를 attaches after the noun that is the direct object of the verb. Used to express: eat WHAT, read WHAT, see WHAT, etc."
    },
    mechanic: BATCHIM_TIP,
    variants: [
      {
        badge: BADGE_CONSONANT,
        title: { id: "Kata benda berakhir KONSONAN (ada 받침)", en: "Noun ends in a CONSONANT (has 받침)" },
        rule: { id: "→ tambahkan 을", en: "→ add 을" },
        tone: "konsonan",
        examples: [
          { word: "밥", wordRoman: "bap", meaning: { id: "nasi", en: "rice / meal" }, detail: { id: "받침: ㅂ", en: "final consonant: ㅂ" }, result: "밥을", resultRoman: "babeul" },
          { word: "물", wordRoman: "mul", meaning: { id: "air", en: "water" }, detail: { id: "받침: ㄹ", en: "final consonant: ㄹ" }, result: "물을", resultRoman: "mureul" },
          { word: "책", wordRoman: "chaek", meaning: { id: "buku", en: "book" }, detail: { id: "받침: ㄱ", en: "final consonant: ㄱ" }, result: "책을", resultRoman: "chaegeul" },
          { word: "음악", wordRoman: "eumak", meaning: { id: "musik", en: "music" }, detail: { id: "받침: ㄱ", en: "final consonant: ㄱ" }, result: "음악을", resultRoman: "eumageul" }
        ]
      },
      {
        badge: BADGE_VOWEL,
        title: { id: "Kata benda berakhir VOKAL (tanpa 받침)", en: "Noun ends in a VOWEL (no 받침)" },
        rule: { id: "→ tambahkan 를", en: "→ add 를" },
        tone: "vokal",
        examples: [
          { word: "친구", wordRoman: "chingu", meaning: { id: "teman", en: "friend" }, detail: { id: "huruf akhir: vokal ㅜ", en: "final letter: vowel ㅜ" }, result: "친구를", resultRoman: "chingureul" },
          { word: "영화", wordRoman: "yeonghwa", meaning: { id: "film", en: "movie" }, detail: { id: "huruf akhir: vokal ㅘ", en: "final letter: vowel ㅘ" }, result: "영화를", resultRoman: "yeonghwareul" },
          { word: "한국어", wordRoman: "hangugeo", meaning: { id: "bahasa Korea", en: "Korean (language)" }, detail: { id: "huruf akhir: vokal ㅓ", en: "final letter: vowel ㅓ" }, result: "한국어를", resultRoman: "hangugeoreul" },
          { word: "커피", wordRoman: "keopi", meaning: { id: "kopi", en: "coffee" }, detail: { id: "huruf akhir: vokal ㅣ", en: "final letter: vowel ㅣ" }, result: "커피를", resultRoman: "keopireul" }
        ]
      }
    ],
    examples: [
      { kind: "statement", korean: "밥을 먹어요.", roman: "babeul meogeoyo.", meaning: { id: "(Saya) makan nasi.", en: "(I) eat rice." } },
      { kind: "statement", korean: "영화를 봐요.", roman: "yeonghwareul bwayo.", meaning: { id: "(Saya) menonton film.", en: "(I) watch a movie." } },
      { kind: "question", korean: "뭐를 먹어요?", roman: "mworeul meogeoyo?", meaning: { id: "Makan apa?", en: "What do (you) eat?" } },
      { kind: "question", korean: "뭐를 봐요?", roman: "mworeul bwayo?", meaning: { id: "Menonton apa?", en: "What do (you) watch?" } },
      { kind: "positive", korean: "네, 밥을 먹어요.", roman: "ne, babeul meogeoyo.", meaning: { id: "Ya, (saya) makan nasi.", en: "Yes, (I) eat rice." } },
      { kind: "positive", korean: "네, 영화를 봐요.", roman: "ne, yeonghwareul bwayo.", meaning: { id: "Ya, (saya) menonton film.", en: "Yes, (I) watch a movie." } },
      { kind: "negative", korean: "아니요, 밥을 안 먹어요.", roman: "aniyo, babeul an meogeoyo.", meaning: { id: "Tidak, (saya) tidak makan nasi.", en: "No, (I) don't eat rice." } },
      { kind: "negative", korean: "아니요, 영화를 안 봐요.", roman: "aniyo, yeonghwareul an bwayo.", meaning: { id: "Tidak, (saya) tidak menonton film.", en: "No, (I) don't watch movies." } }
    ],
    quiz: [
      { prompt: "밥", promptRoman: "bap", promptMeaning: { id: "nasi", en: "rice" }, options: ["을", "를"], correct: "을", fullSentence: "밥을 먹어요.", fullSentenceRoman: "babeul meogeoyo.", fullMeaning: { id: "(Saya) makan nasi.", en: "(I) eat rice." }, explanation: { id: "밥 berakhir 받침 ㅂ → 을", en: "밥 ends in 받침 ㅂ → 을" } },
      { prompt: "물", promptRoman: "mul", promptMeaning: { id: "air", en: "water" }, options: ["을", "를"], correct: "을", fullSentence: "물을 마셔요.", fullSentenceRoman: "mureul masyeoyo.", fullMeaning: { id: "(Saya) minum air.", en: "(I) drink water." }, explanation: { id: "물 berakhir 받침 ㄹ → 을", en: "물 ends in 받침 ㄹ → 을" } },
      { prompt: "친구", promptRoman: "chingu", promptMeaning: { id: "teman", en: "friend" }, options: ["을", "를"], correct: "를", fullSentence: "친구를 만나요.", fullSentenceRoman: "chingureul mannayo.", fullMeaning: { id: "(Saya) bertemu teman.", en: "(I) meet a friend." }, explanation: { id: "친구 berakhir vokal ㅜ → 를", en: "친구 ends in vowel ㅜ → 를" } },
      { prompt: "책", promptRoman: "chaek", promptMeaning: { id: "buku", en: "book" }, options: ["을", "를"], correct: "을", fullSentence: "책을 읽어요.", fullSentenceRoman: "chaegeul ilgeoyo.", fullMeaning: { id: "(Saya) membaca buku.", en: "(I) read a book." }, explanation: { id: "책 berakhir 받침 ㄱ → 을", en: "책 ends in 받침 ㄱ → 을" } },
      { prompt: "영화", promptRoman: "yeonghwa", promptMeaning: { id: "film", en: "movie" }, options: ["을", "를"], correct: "를", fullSentence: "영화를 봐요.", fullSentenceRoman: "yeonghwareul bwayo.", fullMeaning: { id: "(Saya) menonton film.", en: "(I) watch a movie." }, explanation: { id: "영화 berakhir vokal ㅘ → 를", en: "영화 ends in vowel ㅘ → 를" } },
      { prompt: "한국어", promptRoman: "hangugeo", promptMeaning: { id: "bahasa Korea", en: "Korean" }, options: ["을", "를"], correct: "를", fullSentence: "한국어를 공부해요.", fullSentenceRoman: "hangugeoreul gongbuhaeyo.", fullMeaning: { id: "(Saya) belajar bahasa Korea.", en: "(I) study Korean." }, explanation: { id: "한국어 berakhir vokal ㅓ → 를", en: "한국어 ends in vowel ㅓ → 를" } },
      { prompt: "음악", promptRoman: "eumak", promptMeaning: { id: "musik", en: "music" }, options: ["을", "를"], correct: "을", fullSentence: "음악을 들어요.", fullSentenceRoman: "eumageul deureoyo.", fullMeaning: { id: "(Saya) mendengarkan musik.", en: "(I) listen to music." }, explanation: { id: "음악 berakhir 받침 ㄱ → 을", en: "음악 ends in 받침 ㄱ → 을" } }
    ]
  },
  {
    id: "posisi",
    label: { id: "Kata Posisi (앞/뒤/안/위)", en: "Position Words (앞/뒤/안/위)" },
    emoji: "🧭",
    description: {
      id: "Kata posisi: depan, belakang, samping, dalam, atas, bawah, dll.",
      en: "Position words: front, back, side, inside, above, below, and more"
    },
    purpose: {
      id: "Kata posisi dipakai untuk menjelaskan letak sebuah benda atau orang relatif terhadap benda lain. Misal 'di atas meja', 'di dalam tas', 'di depan rumah'. Sangat berguna untuk percakapan sehari-hari dan deskripsi.",
      en: "Position words describe where an object or person is relative to something else. For example 'on top of the table', 'inside the bag', 'in front of the house'. Very useful for everyday descriptions."
    },
    mechanic: {
      id: "Struktur dasar: [Benda A] + 이/가 + [Benda B] + [Posisi] + 에 + 있어요/없어요. Artinya: 'Benda A ada/tidak ada di [posisi] dari Benda B'. Partikel 에 selalu menempel pada kata posisi.",
      en: "Basic pattern: [Thing A] + 이/가 + [Thing B] + [Position] + 에 + 있어요/없어요. Meaning: 'Thing A is/isn't located at [position] of Thing B'. The particle 에 always attaches to the position word."
    },
    variants: [
      {
        badge: { id: "Datar", en: "Flat" },
        title: { id: "Posisi horizontal: depan, belakang, samping", en: "Horizontal positions: front, back, side" },
        rule: { id: "→ relatif arah", en: "→ relative direction" },
        tone: "konsonan",
        examples: [
          { word: "앞", wordRoman: "ap", meaning: { id: "depan", en: "front" }, detail: { id: "baca: ap", en: "read as: ap" }, result: "집 앞에", resultRoman: "jip ape" },
          { word: "뒤", wordRoman: "dwi", meaning: { id: "belakang", en: "behind / back" }, detail: { id: "baca: dwi", en: "read as: dwi" }, result: "집 뒤에", resultRoman: "jip dwie" },
          { word: "옆", wordRoman: "yeop", meaning: { id: "samping", en: "next to / beside" }, detail: { id: "baca: yeop", en: "read as: yeop" }, result: "집 옆에", resultRoman: "jip yeope" }
        ]
      },
      {
        badge: { id: "Vertikal", en: "Vertical" },
        title: { id: "Posisi atas-bawah", en: "Above and below" },
        rule: { id: "→ relatif tinggi", en: "→ relative height" },
        tone: "vokal",
        examples: [
          { word: "위", wordRoman: "wi", meaning: { id: "atas", en: "on / above" }, detail: { id: "baca: wi", en: "read as: wi" }, result: "책상 위에", resultRoman: "chaeksang wie" },
          { word: "아래", wordRoman: "arae", meaning: { id: "bawah", en: "below" }, detail: { id: "baca: arae", en: "read as: arae" }, result: "책상 아래에", resultRoman: "chaeksang araee" },
          { word: "밑", wordRoman: "mit", meaning: { id: "bawah (persis)", en: "underneath" }, detail: { id: "baca: mit", en: "read as: mit" }, result: "책상 밑에", resultRoman: "chaeksang mite" }
        ]
      },
      {
        badge: { id: "Ruang", en: "Space" },
        title: { id: "Dalam / Luar / Antara / Dekat", en: "Inside / Outside / Between / Near" },
        rule: { id: "→ relatif ruang & jarak", en: "→ relative space & proximity" },
        tone: "khusus",
        examples: [
          { word: "안", wordRoman: "an", meaning: { id: "dalam", en: "inside" }, detail: { id: "baca: an", en: "read as: an" }, result: "가방 안에", resultRoman: "gabang ane" },
          { word: "밖", wordRoman: "bakk", meaning: { id: "luar", en: "outside" }, detail: { id: "baca: bakk", en: "read as: bakk" }, result: "집 밖에", resultRoman: "jip bakke" },
          { word: "사이", wordRoman: "sai", meaning: { id: "antara", en: "between" }, detail: { id: "baca: sai", en: "read as: sai" }, result: "A와 B 사이에", resultRoman: "A-wa B saie" },
          { word: "근처", wordRoman: "geuncheo", meaning: { id: "dekat/sekitar", en: "nearby" }, detail: { id: "baca: geuncheo", en: "read as: geuncheo" }, result: "학교 근처에", resultRoman: "hakgyo geuncheoe" }
        ]
      }
    ],
    examples: [
      { kind: "statement", korean: "책이 책상 위에 있어요.", roman: "chaegi chaeksang wie isseoyo.", meaning: { id: "Buku ada di atas meja.", en: "The book is on the table." } },
      { kind: "statement", korean: "고양이가 의자 밑에 있어요.", roman: "goyangiga uija mite isseoyo.", meaning: { id: "Kucing ada di bawah kursi.", en: "The cat is under the chair." } },
      { kind: "question", korean: "책이 어디에 있어요?", roman: "chaegi eodie isseoyo?", meaning: { id: "Di mana bukunya?", en: "Where is the book?" }, note: { id: "어디에 = di mana", en: "어디에 = where" } },
      { kind: "question", korean: "화장실이 어디에 있어요?", roman: "hwajangsiri eodie isseoyo?", meaning: { id: "Di mana toiletnya?", en: "Where is the restroom?" } },
      { kind: "positive", korean: "네, 책상 위에 있어요.", roman: "ne, chaeksang wie isseoyo.", meaning: { id: "Ya, ada di atas meja.", en: "Yes, it's on the table." } },
      { kind: "positive", korean: "네, 학교 근처에 있어요.", roman: "ne, hakgyo geuncheoe isseoyo.", meaning: { id: "Ya, ada di dekat sekolah.", en: "Yes, it's near the school." } },
      { kind: "negative", korean: "아니요, 책상 위에 없어요.", roman: "aniyo, chaeksang wie eopseoyo.", meaning: { id: "Tidak, tidak ada di atas meja.", en: "No, it's not on the table." }, note: { id: "있어요 → 없어요", en: "있어요 → 없어요 (is → isn't)" } },
      { kind: "negative", korean: "아니요, 가방 안에 없어요.", roman: "aniyo, gabang ane eopseoyo.", meaning: { id: "Tidak, tidak ada di dalam tas.", en: "No, it's not in the bag." } }
    ],
    quiz: [
      { prompt: "buku ada di atas meja", promptMeaning: { id: "책이 책상 ___에 있어요", en: "책이 책상 ___에 있어요 (the book is ___ the table)" }, options: ["위", "아래", "안"], correct: "위", fullSentence: "책이 책상 위에 있어요.", fullSentenceRoman: "chaegi chaeksang wie isseoyo.", fullMeaning: { id: "Buku ada di atas meja.", en: "The book is on the table." }, explanation: { id: "위 = atas. 책상 위에 = di atas meja", en: "위 = on. 책상 위에 = on the table" } },
      { prompt: "kucing di bawah kursi", promptMeaning: { id: "고양이가 의자 ___에 있어요", en: "고양이가 의자 ___에 있어요 (the cat is ___ the chair)" }, options: ["위", "밑", "옆"], correct: "밑", fullSentence: "고양이가 의자 밑에 있어요.", fullSentenceRoman: "goyangiga uija mite isseoyo.", fullMeaning: { id: "Kucing ada di bawah kursi.", en: "The cat is under the chair." }, explanation: { id: "밑 = persis di bawah (lebih spesifik dari 아래)", en: "밑 = directly underneath (more specific than 아래)" } },
      { prompt: "di dalam tas", promptMeaning: { id: "가방 ___에", en: "가방 ___에 (___ the bag)" }, options: ["안", "밖", "위"], correct: "안", fullSentence: "가방 안에 책이 있어요.", fullSentenceRoman: "gabang ane chaegi isseoyo.", fullMeaning: { id: "Di dalam tas ada buku.", en: "Inside the bag there is a book." }, explanation: { id: "안 = dalam (interior)", en: "안 = inside" } },
      { prompt: "di depan rumah", promptMeaning: { id: "집 ___에", en: "집 ___에 (___ the house)" }, options: ["앞", "뒤", "옆"], correct: "앞", fullSentence: "집 앞에 차가 있어요.", fullSentenceRoman: "jip ape chaga isseoyo.", fullMeaning: { id: "Di depan rumah ada mobil.", en: "There is a car in front of the house." }, explanation: { id: "앞 = depan", en: "앞 = front" } },
      { prompt: "di belakang sekolah", promptMeaning: { id: "학교 ___에", en: "학교 ___에 (___ the school)" }, options: ["앞", "뒤", "안"], correct: "뒤", fullSentence: "학교 뒤에 공원이 있어요.", fullSentenceRoman: "hakgyo dwie gongwoni isseoyo.", fullMeaning: { id: "Di belakang sekolah ada taman.", en: "There is a park behind the school." }, explanation: { id: "뒤 = belakang", en: "뒤 = behind" } },
      { prompt: "di samping bank", promptMeaning: { id: "은행 ___에", en: "은행 ___에 (___ the bank)" }, options: ["위", "옆", "근처"], correct: "옆", fullSentence: "은행 옆에 카페가 있어요.", fullSentenceRoman: "eunhaeng yeope kapega isseoyo.", fullMeaning: { id: "Di samping bank ada kafe.", en: "There is a café next to the bank." }, explanation: { id: "옆 = samping (langsung berdampingan)", en: "옆 = right next to" } },
      { prompt: "di dekat sekolah", promptMeaning: { id: "학교 ___에", en: "학교 ___에 (___ the school)" }, options: ["옆", "근처", "안"], correct: "근처", fullSentence: "학교 근처에 식당이 있어요.", fullSentenceRoman: "hakgyo geuncheoe sikdangi isseoyo.", fullMeaning: { id: "Di dekat sekolah ada restoran.", en: "There is a restaurant near the school." }, explanation: { id: "근처 = sekitar/dekat (area umum, tidak harus berdampingan)", en: "근처 = nearby (general area, not necessarily adjacent)" } },
      { prompt: "antara A dan B", promptMeaning: { id: "A와 B ___에", en: "A와 B ___에 (___ A and B)" }, options: ["사이", "안", "옆"], correct: "사이", fullSentence: "은행과 카페 사이에 있어요.", fullSentenceRoman: "eunhaenggwa kape saie isseoyo.", fullMeaning: { id: "Ada di antara bank dan kafe.", en: "It's between the bank and the café." }, explanation: { id: "사이 = antara (perlu dua acuan, dihubungkan dengan 와/과)", en: "사이 = between (needs two reference points joined by 와/과)" } }
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
