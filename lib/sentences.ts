import type { Loc } from "@/lib/i18n";

export type SentencePatternId =
  | "iyeyo"
  | "ayoeoyo"
  | "eunneun"
  | "iga"
  | "eulreul"
  | "posisi"
  | "eseo";

export type ExampleKind = "statement" | "question" | "positive" | "negative";

export type SentenceExample = {
  korean: string;
  roman: string;
  meaning: Loc;
  kind: ExampleKind;
  note?: Loc;
};

export const EXAMPLE_KIND_LABEL: Record<ExampleKind, { label: Loc; emoji: string }> = {
  statement: { label: { id: "Kalimat Biasa", en: "Statement", hi: "कथन" }, emoji: "💬" },
  question: { label: { id: "Kalimat Tanya", en: "Question", hi: "प्रश्न" }, emoji: "❓" },
  positive: { label: { id: "Jawaban Positif", en: "Positive Answer", hi: "सकारात्मक उत्तर" }, emoji: "✅" },
  negative: { label: { id: "Jawaban Negatif", en: "Negative Answer", hi: "नकारात्मक उत्तर" }, emoji: "❌" }
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
  en: "Every Hangul syllable has an initial consonant + vowel, and sometimes a final consonant called 받침 (batchim). To pick the right ending, look at the last syllable of the word and check whether it has a 받침 (a bottom consonant) or not.",
  hi: "हर हंगुल अक्षर में आरंभिक व्यंजन + स्वर होता है, और कभी-कभी अंतिम व्यंजन जिसे 받침 (batchim) कहते हैं। सही अंत चुनने के लिए शब्द के अंतिम अक्षर को देखें: क्या उसमें 받침 (नीचे का व्यंजन) है या नहीं।"
};

const BADGE_CONSONANT: Loc = { id: "Konsonan", en: "Consonant", hi: "व्यंजन" };
const BADGE_VOWEL: Loc = { id: "Vokal", en: "Vowel", hi: "स्वर" };
const CONS_TITLE: Loc = { id: "Kata benda berakhir KONSONAN (ada 받침)", en: "Noun ends in a CONSONANT (has 받침)", hi: "संज्ञा व्यंजन पर खत्म होती है (받침 है)" };
const VOWEL_TITLE: Loc = { id: "Kata benda berakhir VOKAL (tanpa 받침)", en: "Noun ends in a VOWEL (no 받침)", hi: "संज्ञा स्वर पर खत्म होती है (받침 नहीं)" };
const BATCHIM_LABEL = (consonant: string): Loc => ({
  id: `받침: ${consonant}`,
  en: `final consonant: ${consonant}`,
  hi: `अंतिम व्यंजन: ${consonant}`
});
const VOWEL_END_LABEL = (vowel: string): Loc => ({
  id: `huruf akhir: vokal ${vowel}`,
  en: `final letter: vowel ${vowel}`,
  hi: `अंतिम अक्षर: स्वर ${vowel}`
});

export const SENTENCE_PATTERNS: readonly SentencePattern[] = [
  {
    id: "iyeyo",
    label: { id: "Adalah (이에요/예요)", en: "To Be (이에요/예요)", hi: "होना (이에요/예요)" },
    emoji: "✨",
    description: {
      id: "Kata benda + 'adalah' dalam bentuk sopan kasual",
      en: "Noun + 'is/am/are' in polite-casual form",
      hi: "संज्ञा + 'है' विनम्र-सहज रूप में"
    },
    purpose: {
      id: "Akhiran 이에요/예요 berarti 'adalah / merupakan'. Dipasang di belakang kata benda untuk menyatakan identitas atau profesi, misal 'saya adalah ___' atau 'dia adalah ___'.",
      en: "The endings 이에요/예요 mean 'is / am / are'. Attached after a noun to state identity or occupation, e.g. 'I am ___' or 'he/she is ___'.",
      hi: "이에요/예요 का अर्थ 'है' होता है। संज्ञा के बाद लगाकर पहचान या पेशा बताया जाता है, जैसे 'मैं ___ हूँ' या 'वह ___ है'।"
    },
    mechanic: BATCHIM_TIP,
    variants: [
      {
        badge: BADGE_CONSONANT,
        title: CONS_TITLE,
        rule: { id: "→ tambahkan 이에요", en: "→ add 이에요", hi: "→ 이에요 जोड़ें" },
        tone: "konsonan",
        examples: [
          { word: "학생", wordRoman: "haksaeng", meaning: { id: "siswa", en: "student", hi: "छात्र" }, detail: BATCHIM_LABEL("ㅇ"), result: "학생이에요", resultRoman: "haksaeng-ieyo" },
          { word: "선생님", wordRoman: "seonsaengnim", meaning: { id: "guru", en: "teacher", hi: "शिक्षक" }, detail: BATCHIM_LABEL("ㅁ"), result: "선생님이에요", resultRoman: "seonsaengnim-ieyo" },
          { word: "회사원", wordRoman: "hoesawon", meaning: { id: "karyawan", en: "office worker", hi: "कर्मचारी" }, detail: BATCHIM_LABEL("ㄴ"), result: "회사원이에요", resultRoman: "hoesawon-ieyo" },
          { word: "한국 사람", wordRoman: "hanguk saram", meaning: { id: "orang Korea", en: "Korean person", hi: "कोरियाई व्यक्ति" }, detail: BATCHIM_LABEL("ㅁ"), result: "한국 사람이에요", resultRoman: "hanguk saram-ieyo" }
        ]
      },
      {
        badge: BADGE_VOWEL,
        title: VOWEL_TITLE,
        rule: { id: "→ tambahkan 예요", en: "→ add 예요", hi: "→ 예요 जोड़ें" },
        tone: "vokal",
        examples: [
          { word: "의사", wordRoman: "uisa", meaning: { id: "dokter", en: "doctor", hi: "डॉक्टर" }, detail: VOWEL_END_LABEL("ㅏ"), result: "의사예요", resultRoman: "uisayeyo" },
          { word: "친구", wordRoman: "chingu", meaning: { id: "teman", en: "friend", hi: "दोस्त" }, detail: VOWEL_END_LABEL("ㅜ"), result: "친구예요", resultRoman: "chinguyeyo" },
          { word: "엄마", wordRoman: "eomma", meaning: { id: "ibu", en: "mom", hi: "माँ" }, detail: VOWEL_END_LABEL("ㅏ"), result: "엄마예요", resultRoman: "eommayeyo" },
          { word: "가수", wordRoman: "gasu", meaning: { id: "penyanyi", en: "singer", hi: "गायक" }, detail: VOWEL_END_LABEL("ㅜ"), result: "가수예요", resultRoman: "gasuyeyo" }
        ]
      }
    ],
    examples: [
      { kind: "statement", korean: "저는 학생이에요.", roman: "jeoneun haksaeng-ieyo.", meaning: { id: "Saya seorang siswa.", en: "I am a student.", hi: "मैं एक छात्र हूँ।" } },
      { kind: "statement", korean: "이분은 의사예요.", roman: "ibuneun uisayeyo.", meaning: { id: "Orang ini seorang dokter.", en: "This person is a doctor.", hi: "यह व्यक्ति डॉक्टर है।" } },
      { kind: "question", korean: "학생이에요?", roman: "haksaeng-ieyo?", meaning: { id: "Apakah (kamu) seorang siswa?", en: "Are (you) a student?", hi: "क्या (तुम) छात्र हो?" } },
      { kind: "question", korean: "이름이 뭐예요?", roman: "ireumi mwoyeyo?", meaning: { id: "Apa nama (Anda)?", en: "What is (your) name?", hi: "(आपका) नाम क्या है?" } },
      { kind: "positive", korean: "네, 학생이에요.", roman: "ne, haksaeng-ieyo.", meaning: { id: "Ya, (saya) seorang siswa.", en: "Yes, (I) am a student.", hi: "हाँ, (मैं) छात्र हूँ।" } },
      { kind: "positive", korean: "네, 한국 사람이에요.", roman: "ne, hanguk saram-ieyo.", meaning: { id: "Ya, (saya) orang Korea.", en: "Yes, (I) am Korean.", hi: "हाँ, (मैं) कोरियाई हूँ।" } },
      { kind: "negative", korean: "아니요, 학생이 아니에요.", roman: "aniyo, haksaengi anieyo.", meaning: { id: "Bukan, (saya) bukan seorang siswa.", en: "No, (I) am not a student.", hi: "नहीं, (मैं) छात्र नहीं हूँ।" }, note: { id: "Bentuk negatif: 이/가 아니에요", en: "Negative form: 이/가 아니에요", hi: "नकारात्मक रूप: 이/가 아니에요" } },
      { kind: "negative", korean: "아니요, 의사가 아니에요.", roman: "aniyo, uisaga anieyo.", meaning: { id: "Bukan, (saya) bukan dokter.", en: "No, (I) am not a doctor.", hi: "नहीं, (मैं) डॉक्टर नहीं हूँ।" } }
    ],
    quiz: [
      { prompt: "학생", promptRoman: "haksaeng", promptMeaning: { id: "siswa", en: "student", hi: "छात्र" }, options: ["이에요", "예요"], correct: "이에요", fullSentence: "학생이에요.", fullSentenceRoman: "haksaeng-ieyo.", fullMeaning: { id: "(Saya) seorang siswa.", en: "(I) am a student.", hi: "(मैं) छात्र हूँ।" }, explanation: { id: "학생 berakhir 받침 ㅇ → 이에요", en: "학생 ends in 받침 ㅇ → 이에요", hi: "학생 받침 ㅇ पर खत्म → 이에요" } },
      { prompt: "의사", promptRoman: "uisa", promptMeaning: { id: "dokter", en: "doctor", hi: "डॉक्टर" }, options: ["이에요", "예요"], correct: "예요", fullSentence: "의사예요.", fullSentenceRoman: "uisayeyo.", fullMeaning: { id: "(Saya) seorang dokter.", en: "(I) am a doctor.", hi: "(मैं) डॉक्टर हूँ।" }, explanation: { id: "의사 berakhir vokal ㅏ → 예요", en: "의사 ends in vowel ㅏ → 예요", hi: "의사 स्वर ㅏ पर खत्म → 예요" } },
      { prompt: "선생님", promptRoman: "seonsaengnim", promptMeaning: { id: "guru", en: "teacher", hi: "शिक्षक" }, options: ["이에요", "예요"], correct: "이에요", fullSentence: "선생님이에요.", fullSentenceRoman: "seonsaengnim-ieyo.", fullMeaning: { id: "(Saya) seorang guru.", en: "(I) am a teacher.", hi: "(मैं) शिक्षक हूँ।" }, explanation: { id: "선생님 berakhir 받침 ㅁ → 이에요", en: "선생님 ends in 받침 ㅁ → 이에요", hi: "선생님 받침 ㅁ पर खत्म → 이에요" } },
      { prompt: "가수", promptRoman: "gasu", promptMeaning: { id: "penyanyi", en: "singer", hi: "गायक" }, options: ["이에요", "예요"], correct: "예요", fullSentence: "가수예요.", fullSentenceRoman: "gasuyeyo.", fullMeaning: { id: "(Dia) penyanyi.", en: "(He/she) is a singer.", hi: "(वह) गायक है।" }, explanation: { id: "가수 berakhir vokal ㅜ → 예요", en: "가수 ends in vowel ㅜ → 예요", hi: "가수 स्वर ㅜ पर खत्म → 예요" } },
      { prompt: "한국 사람", promptRoman: "hanguk saram", promptMeaning: { id: "orang Korea", en: "Korean person", hi: "कोरियाई व्यक्ति" }, options: ["이에요", "예요"], correct: "이에요", fullSentence: "한국 사람이에요.", fullSentenceRoman: "hanguk saram-ieyo.", fullMeaning: { id: "(Saya) orang Korea.", en: "(I) am Korean.", hi: "(मैं) कोरियाई हूँ।" }, explanation: { id: "사람 berakhir 받침 ㅁ → 이에요", en: "사람 ends in 받침 ㅁ → 이에요", hi: "사람 받침 ㅁ पर खत्म → 이에요" } },
      { prompt: "친구", promptRoman: "chingu", promptMeaning: { id: "teman", en: "friend", hi: "दोस्त" }, options: ["이에요", "예요"], correct: "예요", fullSentence: "친구예요.", fullSentenceRoman: "chinguyeyo.", fullMeaning: { id: "(Dia) teman saya.", en: "(He/she) is my friend.", hi: "(वह) मेरा दोस्त है।" }, explanation: { id: "친구 berakhir vokal ㅜ → 예요", en: "친구 ends in vowel ㅜ → 예요", hi: "친구 स्वर ㅜ पर खत्म → 예요" } },
      { prompt: "회사원", promptRoman: "hoesawon", promptMeaning: { id: "karyawan", en: "office worker", hi: "कर्मचारी" }, options: ["이에요", "예요"], correct: "이에요", fullSentence: "회사원이에요.", fullSentenceRoman: "hoesawon-ieyo.", fullMeaning: { id: "(Saya) karyawan kantor.", en: "(I) am an office worker.", hi: "(मैं) कार्यालय कर्मचारी हूँ।" }, explanation: { id: "회사원 berakhir 받침 ㄴ → 이에요", en: "회사원 ends in 받침 ㄴ → 이에요", hi: "회사원 받침 ㄴ पर खत्म → 이에요" } },
      { prompt: "엄마", promptRoman: "eomma", promptMeaning: { id: "ibu", en: "mom", hi: "माँ" }, options: ["이에요", "예요"], correct: "예요", fullSentence: "엄마예요.", fullSentenceRoman: "eommayeyo.", fullMeaning: { id: "(Dia) ibu saya.", en: "(She) is my mom.", hi: "(वह) मेरी माँ हैं।" }, explanation: { id: "엄마 berakhir vokal ㅏ → 예요", en: "엄마 ends in vowel ㅏ → 예요", hi: "엄마 स्वर ㅏ पर खत्म → 예요" } }
    ]
  },
  {
    id: "ayoeoyo",
    label: { id: "Akhiran Kerja Sopan (아요/어요)", en: "Polite Verb Ending (아요/어요)", hi: "विनम्र क्रिया अंत (아요/어요)" },
    emoji: "🗣️",
    description: {
      id: "Akhiran kata kerja & kata sifat dalam percakapan sopan kasual",
      en: "Polite-casual verb and adjective ending used in everyday speech",
      hi: "रोज़मर्रा की बातचीत में विनम्र-सहज क्रिया/विशेषण अंत"
    },
    purpose: {
      id: "Akhiran 아요/어요/해요 dipakai di akhir kata kerja atau kata sifat agar kalimat terdengar sopan tapi santai (informal polite). Ini bentuk yang paling sering dipakai dalam percakapan sehari-hari.",
      en: "The endings 아요/어요/해요 attach to verbs and adjectives to make the sentence informal-polite. This is the most common style for everyday conversation.",
      hi: "아요/어요/해요 अंत क्रिया या विशेषण के बाद लगाया जाता है ताकि वाक्य विनम्र पर सहज लगे। यह रोज़मर्रा की बातचीत में सबसे आम शैली है।"
    },
    mechanic: {
      id: "Cara pakai: (1) Hapus 다 dari bentuk kamus → dapat akar kata (어간). (2) Lihat vokal pada suku kata terakhir akar. (3) Pilih akhiran sesuai aturan di bawah. Untuk negatif: tambah 안 di depan kata kerja.",
      en: "How: (1) Drop 다 from the dictionary form to get the stem (어간). (2) Check the vowel in the last syllable of the stem. (3) Pick the ending below. For negation: put 안 in front of the verb.",
      hi: "कैसे: (1) शब्दकोश रूप से 다 हटाएं → धातु (어간) मिलती है। (2) धातु के अंतिम अक्षर का स्वर देखें। (3) नीचे का नियम लागू करें। नकारात्मक के लिए: क्रिया के आगे 안 लगाएं।"
    },
    variants: [
      {
        badge: { id: "ㅏ / ㅗ", en: "ㅏ / ㅗ", hi: "ㅏ / ㅗ" },
        title: { id: "Akar berakhir vokal ㅏ atau ㅗ", en: "Stem vowel is ㅏ or ㅗ", hi: "धातु का स्वर ㅏ या ㅗ" },
        rule: { id: "→ tambahkan 아요", en: "→ add 아요", hi: "→ 아요 जोड़ें" },
        tone: "konsonan",
        examples: [
          { word: "가다", wordRoman: "gada", meaning: { id: "pergi", en: "to go", hi: "जाना" }, detail: { id: "akar 가 = vokal ㅏ", en: "stem 가 = vowel ㅏ", hi: "धातु 가 = स्वर ㅏ" }, result: "가요", resultRoman: "gayo" },
          { word: "오다", wordRoman: "oda", meaning: { id: "datang", en: "to come", hi: "आना" }, detail: { id: "akar 오 = vokal ㅗ", en: "stem 오 = vowel ㅗ", hi: "धातु 오 = स्वर ㅗ" }, result: "와요", resultRoman: "wayo" },
          { word: "보다", wordRoman: "boda", meaning: { id: "melihat", en: "to see", hi: "देखना" }, detail: { id: "akar 보 = vokal ㅗ", en: "stem 보 = vowel ㅗ", hi: "धातु 보 = स्वर ㅗ" }, result: "봐요", resultRoman: "bwayo" },
          { word: "만나다", wordRoman: "mannada", meaning: { id: "bertemu", en: "to meet", hi: "मिलना" }, detail: { id: "akar 만나 = vokal ㅏ", en: "stem 만나 = vowel ㅏ", hi: "धातु 만나 = स्वर ㅏ" }, result: "만나요", resultRoman: "mannayo" }
        ]
      },
      {
        badge: { id: "Vokal lain", en: "Other vowels", hi: "अन्य स्वर" },
        title: { id: "Akar berakhir vokal lain (ㅓ, ㅜ, ㅣ, ㅡ, dll.)", en: "Stem ends in any other vowel (ㅓ, ㅜ, ㅣ, ㅡ, etc.)", hi: "धातु अन्य स्वर पर खत्म (ㅓ, ㅜ, ㅣ, ㅡ, आदि)" },
        rule: { id: "→ tambahkan 어요", en: "→ add 어요", hi: "→ 어요 जोड़ें" },
        tone: "vokal",
        examples: [
          { word: "먹다", wordRoman: "meokda", meaning: { id: "makan", en: "to eat", hi: "खाना" }, detail: { id: "akar 먹 = vokal ㅓ", en: "stem 먹 = vowel ㅓ", hi: "धातु 먹 = स्वर ㅓ" }, result: "먹어요", resultRoman: "meogeoyo" },
          { word: "읽다", wordRoman: "ikda", meaning: { id: "membaca", en: "to read", hi: "पढ़ना" }, detail: { id: "akar 읽 = vokal ㅣ", en: "stem 읽 = vowel ㅣ", hi: "धातु 읽 = स्वर ㅣ" }, result: "읽어요", resultRoman: "ilgeoyo" },
          { word: "마시다", wordRoman: "masida", meaning: { id: "minum", en: "to drink", hi: "पीना" }, detail: { id: "akar 마시 = vokal ㅣ", en: "stem 마시 = vowel ㅣ", hi: "धातु 마시 = स्वर ㅣ" }, result: "마셔요", resultRoman: "masyeoyo" },
          { word: "주다", wordRoman: "juda", meaning: { id: "memberi", en: "to give", hi: "देना" }, detail: { id: "akar 주 = vokal ㅜ", en: "stem 주 = vowel ㅜ", hi: "धातु 주 = स्वर ㅜ" }, result: "줘요", resultRoman: "jwoyo" }
        ]
      },
      {
        badge: { id: "하다", en: "하다", hi: "하다" },
        title: { id: "Kata kerja yang diakhiri 하다", en: "Verbs ending in 하다", hi: "하다 पर खत्म होने वाली क्रियाएँ" },
        rule: { id: "→ berubah jadi 해요", en: "→ becomes 해요", hi: "→ 해요 बन जाता है" },
        tone: "khusus",
        examples: [
          { word: "공부하다", wordRoman: "gongbuhada", meaning: { id: "belajar", en: "to study", hi: "पढ़ाई करना" }, detail: { id: "diakhiri 하다", en: "ends in 하다", hi: "하다 पर खत्म" }, result: "공부해요", resultRoman: "gongbuhaeyo" },
          { word: "일하다", wordRoman: "ilhada", meaning: { id: "bekerja", en: "to work", hi: "काम करना" }, detail: { id: "diakhiri 하다", en: "ends in 하다", hi: "하다 पर खत्म" }, result: "일해요", resultRoman: "ilhaeyo" },
          { word: "사랑하다", wordRoman: "saranghada", meaning: { id: "mencintai", en: "to love", hi: "प्यार करना" }, detail: { id: "diakhiri 하다", en: "ends in 하다", hi: "하다 पर खत्म" }, result: "사랑해요", resultRoman: "saranghaeyo" }
        ]
      }
    ],
    examples: [
      { kind: "statement", korean: "저는 학교에 가요.", roman: "jeoneun hakgyoe gayo.", meaning: { id: "Saya pergi ke sekolah.", en: "I go to school.", hi: "मैं स्कूल जाता हूँ।" } },
      { kind: "statement", korean: "한국어를 공부해요.", roman: "hangugeoreul gongbuhaeyo.", meaning: { id: "Saya belajar bahasa Korea.", en: "I study Korean.", hi: "मैं कोरियाई पढ़ता हूँ।" } },
      { kind: "question", korean: "어디에 가요?", roman: "eodie gayo?", meaning: { id: "Pergi ke mana?", en: "Where are (you) going?", hi: "(आप) कहाँ जा रहे हैं?" } },
      { kind: "question", korean: "뭐 해요?", roman: "mwo haeyo?", meaning: { id: "Sedang apa?", en: "What are (you) doing?", hi: "(आप) क्या कर रहे हैं?" } },
      { kind: "positive", korean: "네, 학교에 가요.", roman: "ne, hakgyoe gayo.", meaning: { id: "Ya, (saya) pergi ke sekolah.", en: "Yes, (I'm) going to school.", hi: "हाँ, (मैं) स्कूल जा रहा हूँ।" } },
      { kind: "positive", korean: "네, 한국어를 공부해요.", roman: "ne, hangugeoreul gongbuhaeyo.", meaning: { id: "Ya, (saya) sedang belajar bahasa Korea.", en: "Yes, (I'm) studying Korean.", hi: "हाँ, (मैं) कोरियाई पढ़ रहा हूँ।" } },
      { kind: "negative", korean: "아니요, 학교에 안 가요.", roman: "aniyo, hakgyoe an gayo.", meaning: { id: "Tidak, (saya) tidak pergi ke sekolah.", en: "No, (I'm) not going to school.", hi: "नहीं, (मैं) स्कूल नहीं जा रहा।" }, note: { id: "Negatif: tambah 안 sebelum kerja", en: "Negative: add 안 before the verb", hi: "नकारात्मक: क्रिया से पहले 안 जोड़ें" } },
      { kind: "negative", korean: "아니요, 안 먹어요.", roman: "aniyo, an meogeoyo.", meaning: { id: "Tidak, (saya) tidak makan.", en: "No, (I'm) not eating.", hi: "नहीं, (मैं) नहीं खा रहा।" } }
    ],
    quiz: [
      { prompt: "가다", promptRoman: "gada", promptMeaning: { id: "pergi", en: "to go", hi: "जाना" }, options: ["가요", "가어요", "거요"], correct: "가요", fullSentence: "학교에 가요.", fullSentenceRoman: "hakgyoe gayo.", fullMeaning: { id: "(Saya) pergi ke sekolah.", en: "(I) go to school.", hi: "(मैं) स्कूल जाता हूँ।" }, explanation: { id: "Akar 가 berisi vokal ㅏ → tambah 아요, lalu ㅏ+ㅏ disingkat jadi 가요", en: "Stem 가 has vowel ㅏ → add 아요, then ㅏ+ㅏ contracts to 가요", hi: "धातु 가 में स्वर ㅏ → 아요 जोड़ें, फिर ㅏ+ㅏ संक्षिप्त होकर 가요" } },
      { prompt: "먹다", promptRoman: "meokda", promptMeaning: { id: "makan", en: "to eat", hi: "खाना" }, options: ["먹아요", "먹어요", "머거요"], correct: "먹어요", fullSentence: "밥을 먹어요.", fullSentenceRoman: "babeul meogeoyo.", fullMeaning: { id: "(Saya) makan nasi.", en: "(I) eat rice.", hi: "(मैं) चावल खाता हूँ।" }, explanation: { id: "Akar 먹 berisi vokal ㅓ → tambah 어요", en: "Stem 먹 has vowel ㅓ → add 어요", hi: "धातु 먹 में स्वर ㅓ → 어요 जोड़ें" } },
      { prompt: "오다", promptRoman: "oda", promptMeaning: { id: "datang", en: "to come", hi: "आना" }, options: ["오아요", "오어요", "와요"], correct: "와요", fullSentence: "친구가 와요.", fullSentenceRoman: "chinguga wayo.", fullMeaning: { id: "Teman datang.", en: "A friend is coming.", hi: "दोस्त आ रहा है।" }, explanation: { id: "Akar 오 (vokal ㅗ) + 아요 → ㅗ+ㅏ digabung jadi 와요", en: "Stem 오 (vowel ㅗ) + 아요 → ㅗ+ㅏ merges into 와요", hi: "धातु 오 (स्वर ㅗ) + 아요 → ㅗ+ㅏ मिलकर 와요" } },
      { prompt: "보다", promptRoman: "boda", promptMeaning: { id: "melihat", en: "to see", hi: "देखना" }, options: ["봐요", "보아요", "보어요"], correct: "봐요", fullSentence: "영화를 봐요.", fullSentenceRoman: "yeonghwareul bwayo.", fullMeaning: { id: "(Saya) menonton film.", en: "(I) watch a movie.", hi: "(मैं) फ़िल्म देखता हूँ।" }, explanation: { id: "Akar 보 (vokal ㅗ) + 아요 → ㅗ+ㅏ digabung jadi 봐요", en: "Stem 보 (vowel ㅗ) + 아요 → ㅗ+ㅏ merges into 봐요", hi: "धातु 보 (स्वर ㅗ) + 아요 → ㅗ+ㅏ मिलकर 봐요" } },
      { prompt: "마시다", promptRoman: "masida", promptMeaning: { id: "minum", en: "to drink", hi: "पीना" }, options: ["마시아요", "마셔요", "마시요"], correct: "마셔요", fullSentence: "물을 마셔요.", fullSentenceRoman: "mureul masyeoyo.", fullMeaning: { id: "(Saya) minum air.", en: "(I) drink water.", hi: "(मैं) पानी पीता हूँ।" }, explanation: { id: "Akar 마시 (vokal ㅣ) + 어요 → ㅣ+ㅓ digabung jadi 셔", en: "Stem 마시 (vowel ㅣ) + 어요 → ㅣ+ㅓ merges into 셔", hi: "धातु 마시 (स्वर ㅣ) + 어요 → ㅣ+ㅓ मिलकर 셔" } },
      { prompt: "공부하다", promptRoman: "gongbuhada", promptMeaning: { id: "belajar", en: "to study", hi: "पढ़ाई करना" }, options: ["공부하요", "공부해요", "공부어요"], correct: "공부해요", fullSentence: "한국어를 공부해요.", fullSentenceRoman: "hangugeoreul gongbuhaeyo.", fullMeaning: { id: "(Saya) belajar bahasa Korea.", en: "(I) study Korean.", hi: "(मैं) कोरियाई पढ़ता हूँ।" }, explanation: { id: "하다 → 해요 (aturan khusus)", en: "하다 → 해요 (special rule)", hi: "하다 → 해요 (विशेष नियम)" } },
      { prompt: "읽다", promptRoman: "ikda", promptMeaning: { id: "membaca", en: "to read", hi: "पढ़ना" }, options: ["읽아요", "읽어요", "일거요"], correct: "읽어요", fullSentence: "책을 읽어요.", fullSentenceRoman: "chaegeul ilgeoyo.", fullMeaning: { id: "(Saya) membaca buku.", en: "(I) read a book.", hi: "(मैं) किताब पढ़ता हूँ।" }, explanation: { id: "Akar 읽 berisi vokal ㅣ → tambah 어요", en: "Stem 읽 has vowel ㅣ → add 어요", hi: "धातु 읽 में स्वर ㅣ → 어요 जोड़ें" } },
      { prompt: "만나다", promptRoman: "mannada", promptMeaning: { id: "bertemu", en: "to meet", hi: "मिलना" }, options: ["만나요", "만나아요", "만너요"], correct: "만나요", fullSentence: "친구를 만나요.", fullSentenceRoman: "chingureul mannayo.", fullMeaning: { id: "(Saya) bertemu teman.", en: "(I) meet a friend.", hi: "(मैं) दोस्त से मिलता हूँ।" }, explanation: { id: "Akar 만나 (vokal ㅏ) + 아요 → ㅏ+ㅏ disingkat jadi 만나요", en: "Stem 만나 (vowel ㅏ) + 아요 → ㅏ+ㅏ contracts to 만나요", hi: "धातु 만나 (स्वर ㅏ) + 아요 → ㅏ+ㅏ संक्षिप्त 만나요" } },
      { prompt: "일하다", promptRoman: "ilhada", promptMeaning: { id: "bekerja", en: "to work", hi: "काम करना" }, options: ["일하요", "일해요", "일아요"], correct: "일해요", fullSentence: "회사에서 일해요.", fullSentenceRoman: "hoesaeseo ilhaeyo.", fullMeaning: { id: "(Saya) bekerja di kantor.", en: "(I) work at the office.", hi: "(मैं) कार्यालय में काम करता हूँ।" }, explanation: { id: "하다 → 해요", en: "하다 → 해요", hi: "하다 → 해요" } }
    ]
  },
  {
    id: "eunneun",
    label: { id: "Penanda Topik (은/는)", en: "Topic Marker (은/는)", hi: "विषय चिह्न (은/는)" },
    emoji: "🏷️",
    description: {
      id: "Menandai topik kalimat — kata benda yang sedang dibicarakan",
      en: "Marks the sentence topic — the noun the sentence is about",
      hi: "वाक्य का विषय चिह्नित करता है — जिस संज्ञा के बारे में बात है"
    },
    purpose: {
      id: "Penanda 은/는 dipasang setelah kata benda untuk menyatakan, 'kalau soal __ ini'. Sering dipakai untuk memperkenalkan topik baru atau membandingkan dua hal.",
      en: "은/는 attaches after a noun to express 'as for ___'. Used to introduce a new topic or to contrast two things.",
      hi: "은/는 संज्ञा के बाद लगता है ताकि 'जहाँ तक ___ की बात है' व्यक्त किया जा सके। नया विषय पेश करने या दो चीज़ों की तुलना के लिए।"
    },
    mechanic: BATCHIM_TIP,
    variants: [
      {
        badge: BADGE_CONSONANT,
        title: CONS_TITLE,
        rule: { id: "→ tambahkan 은", en: "→ add 은", hi: "→ 은 जोड़ें" },
        tone: "konsonan",
        examples: [
          { word: "이름", wordRoman: "ireum", meaning: { id: "nama", en: "name", hi: "नाम" }, detail: BATCHIM_LABEL("ㅁ"), result: "이름은", resultRoman: "ireumeun" },
          { word: "오늘", wordRoman: "oneul", meaning: { id: "hari ini", en: "today", hi: "आज" }, detail: BATCHIM_LABEL("ㄹ"), result: "오늘은", resultRoman: "oneureun" },
          { word: "선생님", wordRoman: "seonsaengnim", meaning: { id: "guru", en: "teacher", hi: "शिक्षक" }, detail: BATCHIM_LABEL("ㅁ"), result: "선생님은", resultRoman: "seonsaengnimeun" },
          { word: "한국 사람", wordRoman: "hanguk saram", meaning: { id: "orang Korea", en: "Korean person", hi: "कोरियाई व्यक्ति" }, detail: BATCHIM_LABEL("ㅁ"), result: "한국 사람은", resultRoman: "hanguk sarameun" }
        ]
      },
      {
        badge: BADGE_VOWEL,
        title: VOWEL_TITLE,
        rule: { id: "→ tambahkan 는", en: "→ add 는", hi: "→ 는 जोड़ें" },
        tone: "vokal",
        examples: [
          { word: "저", wordRoman: "jeo", meaning: { id: "saya", en: "I (humble)", hi: "मैं (विनम्र)" }, detail: VOWEL_END_LABEL("ㅓ"), result: "저는", resultRoman: "jeoneun" },
          { word: "친구", wordRoman: "chingu", meaning: { id: "teman", en: "friend", hi: "दोस्त" }, detail: VOWEL_END_LABEL("ㅜ"), result: "친구는", resultRoman: "chinguneun" },
          { word: "한국어", wordRoman: "hangugeo", meaning: { id: "bahasa Korea", en: "Korean (language)", hi: "कोरियाई भाषा" }, detail: VOWEL_END_LABEL("ㅓ"), result: "한국어는", resultRoman: "hangugeoneun" },
          { word: "어머니", wordRoman: "eomeoni", meaning: { id: "ibu", en: "mother", hi: "माँ" }, detail: VOWEL_END_LABEL("ㅣ"), result: "어머니는", resultRoman: "eomeonineun" }
        ]
      }
    ],
    examples: [
      { kind: "statement", korean: "저는 학생이에요.", roman: "jeoneun haksaeng-ieyo.", meaning: { id: "Saya seorang siswa.", en: "I am a student.", hi: "मैं एक छात्र हूँ।" } },
      { kind: "statement", korean: "한국어는 재미있어요.", roman: "hangugeoneun jaemiisseoyo.", meaning: { id: "Bahasa Korea itu menyenangkan.", en: "Korean is fun.", hi: "कोरियाई मज़ेदार है।" } },
      { kind: "question", korean: "이름은 뭐예요?", roman: "ireumeun mwoyeyo?", meaning: { id: "Apa nama (Anda)?", en: "What is (your) name?", hi: "(आपका) नाम क्या है?" } },
      { kind: "question", korean: "한국어는 어때요?", roman: "hangugeoneun eottaeyo?", meaning: { id: "Bagaimana bahasa Korea?", en: "How is Korean (for you)?", hi: "कोरियाई आपको कैसी लगती है?" } },
      { kind: "positive", korean: "네, 저는 학생이에요.", roman: "ne, jeoneun haksaeng-ieyo.", meaning: { id: "Ya, saya seorang siswa.", en: "Yes, I am a student.", hi: "हाँ, मैं छात्र हूँ।" } },
      { kind: "positive", korean: "네, 한국어는 재미있어요.", roman: "ne, hangugeoneun jaemiisseoyo.", meaning: { id: "Ya, bahasa Korea menyenangkan.", en: "Yes, Korean is fun.", hi: "हाँ, कोरियाई मज़ेदार है।" } },
      { kind: "negative", korean: "아니요, 저는 학생이 아니에요.", roman: "aniyo, jeoneun haksaengi anieyo.", meaning: { id: "Tidak, saya bukan seorang siswa.", en: "No, I am not a student.", hi: "नहीं, मैं छात्र नहीं हूँ।" } },
      { kind: "negative", korean: "아니요, 한국어는 어렵지 않아요.", roman: "aniyo, hangugeoneun eoryeopji anayo.", meaning: { id: "Tidak, bahasa Korea tidak sulit.", en: "No, Korean isn't difficult.", hi: "नहीं, कोरियाई कठिन नहीं है।" } }
    ],
    quiz: [
      { prompt: "저", promptRoman: "jeo", promptMeaning: { id: "saya", en: "I", hi: "मैं" }, options: ["은", "는"], correct: "는", fullSentence: "저는 학생이에요.", fullSentenceRoman: "jeoneun haksaeng-ieyo.", fullMeaning: { id: "Saya seorang siswa.", en: "I am a student.", hi: "मैं छात्र हूँ।" }, explanation: { id: "저 berakhir vokal ㅓ → 는", en: "저 ends in vowel ㅓ → 는", hi: "저 स्वर ㅓ पर खत्म → 는" } },
      { prompt: "이름", promptRoman: "ireum", promptMeaning: { id: "nama", en: "name", hi: "नाम" }, options: ["은", "는"], correct: "은", fullSentence: "이름은 민지예요.", fullSentenceRoman: "ireumeun minjiyeyo.", fullMeaning: { id: "Nama saya Minji.", en: "(My) name is Minji.", hi: "(मेरा) नाम मिनजी है।" }, explanation: { id: "이름 berakhir 받침 ㅁ → 은", en: "이름 ends in 받침 ㅁ → 은", hi: "이름 받침 ㅁ पर खत्म → 은" } },
      { prompt: "한국어", promptRoman: "hangugeo", promptMeaning: { id: "bahasa Korea", en: "Korean (language)", hi: "कोरियाई भाषा" }, options: ["은", "는"], correct: "는", fullSentence: "한국어는 재미있어요.", fullSentenceRoman: "hangugeoneun jaemiisseoyo.", fullMeaning: { id: "Bahasa Korea menyenangkan.", en: "Korean is fun.", hi: "कोरियाई मज़ेदार है।" }, explanation: { id: "한국어 berakhir vokal ㅓ → 는", en: "한국어 ends in vowel ㅓ → 는", hi: "한국어 स्वर ㅓ पर खत्म → 는" } },
      { prompt: "오늘", promptRoman: "oneul", promptMeaning: { id: "hari ini", en: "today", hi: "आज" }, options: ["은", "는"], correct: "은", fullSentence: "오늘은 월요일이에요.", fullSentenceRoman: "oneureun woryoiri-eyo.", fullMeaning: { id: "Hari ini hari Senin.", en: "Today is Monday.", hi: "आज सोमवार है।" }, explanation: { id: "오늘 berakhir 받침 ㄹ → 은", en: "오늘 ends in 받침 ㄹ → 은", hi: "오늘 받침 ㄹ पर खत्म → 은" } },
      { prompt: "친구", promptRoman: "chingu", promptMeaning: { id: "teman", en: "friend", hi: "दोस्त" }, options: ["은", "는"], correct: "는", fullSentence: "친구는 학교에 가요.", fullSentenceRoman: "chinguneun hakgyoe gayo.", fullMeaning: { id: "Teman (saya) pergi ke sekolah.", en: "(My) friend is going to school.", hi: "(मेरा) दोस्त स्कूल जा रहा है।" }, explanation: { id: "친구 berakhir vokal ㅜ → 는", en: "친구 ends in vowel ㅜ → 는", hi: "친구 स्वर ㅜ पर खत्म → 는" } },
      { prompt: "선생님", promptRoman: "seonsaengnim", promptMeaning: { id: "guru", en: "teacher", hi: "शिक्षक" }, options: ["은", "는"], correct: "은", fullSentence: "선생님은 한국 사람이에요.", fullSentenceRoman: "seonsaengnimeun hanguk saram-ieyo.", fullMeaning: { id: "Guru (saya) orang Korea.", en: "(The) teacher is Korean.", hi: "(हमारे) शिक्षक कोरियाई हैं।" }, explanation: { id: "선생님 berakhir 받침 ㅁ → 은", en: "선생님 ends in 받침 ㅁ → 은", hi: "선생님 받침 ㅁ पर खत्म → 은" } }
    ]
  },
  {
    id: "iga",
    label: { id: "Penanda Subjek (이/가)", en: "Subject Marker (이/가)", hi: "कर्ता चिह्न (이/가)" },
    emoji: "🎯",
    description: {
      id: "Menandai subjek — pelaku perbuatan atau pemilik kondisi",
      en: "Marks the subject — the doer of the action or holder of the state",
      hi: "कर्ता चिह्नित करता है — क्रिया करने वाला या स्थिति का धारक"
    },
    purpose: {
      id: "Penanda 이/가 dipasang setelah kata benda yang menjadi subjek kalimat (pelaku aksi). Sering dipakai untuk memperkenalkan informasi baru atau menjawab pertanyaan 'Siapa yang...?'.",
      en: "이/가 attaches after the noun that is the sentence's subject (the doer). Often used to introduce new information or to answer 'Who...?'.",
      hi: "이/가 उस संज्ञा के बाद लगता है जो वाक्य का कर्ता है। नई जानकारी देने या 'कौन...?' का उत्तर देने के लिए।"
    },
    mechanic: BATCHIM_TIP,
    variants: [
      {
        badge: BADGE_CONSONANT,
        title: CONS_TITLE,
        rule: { id: "→ tambahkan 이", en: "→ add 이", hi: "→ 이 जोड़ें" },
        tone: "konsonan",
        examples: [
          { word: "책", wordRoman: "chaek", meaning: { id: "buku", en: "book", hi: "किताब" }, detail: BATCHIM_LABEL("ㄱ"), result: "책이", resultRoman: "chaegi" },
          { word: "동생", wordRoman: "dongsaeng", meaning: { id: "adik", en: "younger sibling", hi: "छोटा भाई/बहन" }, detail: BATCHIM_LABEL("ㅇ"), result: "동생이", resultRoman: "dongsaengi" },
          { word: "선생님", wordRoman: "seonsaengnim", meaning: { id: "guru", en: "teacher", hi: "शिक्षक" }, detail: BATCHIM_LABEL("ㅁ"), result: "선생님이", resultRoman: "seonsaengnimi" },
          { word: "사람", wordRoman: "saram", meaning: { id: "orang", en: "person", hi: "व्यक्ति" }, detail: BATCHIM_LABEL("ㅁ"), result: "사람이", resultRoman: "sarami" }
        ]
      },
      {
        badge: BADGE_VOWEL,
        title: VOWEL_TITLE,
        rule: { id: "→ tambahkan 가", en: "→ add 가", hi: "→ 가 जोड़ें" },
        tone: "vokal",
        examples: [
          { word: "친구", wordRoman: "chingu", meaning: { id: "teman", en: "friend", hi: "दोस्त" }, detail: VOWEL_END_LABEL("ㅜ"), result: "친구가", resultRoman: "chinguga" },
          { word: "비", wordRoman: "bi", meaning: { id: "hujan", en: "rain", hi: "बारिश" }, detail: VOWEL_END_LABEL("ㅣ"), result: "비가", resultRoman: "biga" },
          { word: "엄마", wordRoman: "eomma", meaning: { id: "ibu", en: "mom", hi: "माँ" }, detail: VOWEL_END_LABEL("ㅏ"), result: "엄마가", resultRoman: "eommaga" },
          { word: "아이", wordRoman: "ai", meaning: { id: "anak", en: "child", hi: "बच्चा" }, detail: VOWEL_END_LABEL("ㅣ"), result: "아이가", resultRoman: "aiga" }
        ]
      }
    ],
    examples: [
      { kind: "statement", korean: "친구가 와요.", roman: "chinguga wayo.", meaning: { id: "Teman datang.", en: "A friend is coming.", hi: "एक दोस्त आ रहा है।" } },
      { kind: "statement", korean: "책이 있어요.", roman: "chaegi isseoyo.", meaning: { id: "Ada buku.", en: "There is a book.", hi: "एक किताब है।" } },
      { kind: "question", korean: "누가 와요?", roman: "nuga wayo?", meaning: { id: "Siapa yang datang?", en: "Who is coming?", hi: "कौन आ रहा है?" } },
      { kind: "question", korean: "뭐가 있어요?", roman: "mwoga isseoyo?", meaning: { id: "Apa yang ada?", en: "What's there?", hi: "वहाँ क्या है?" } },
      { kind: "positive", korean: "네, 친구가 와요.", roman: "ne, chinguga wayo.", meaning: { id: "Ya, teman datang.", en: "Yes, a friend is coming.", hi: "हाँ, दोस्त आ रहा है।" } },
      { kind: "positive", korean: "네, 책이 있어요.", roman: "ne, chaegi isseoyo.", meaning: { id: "Ya, ada buku.", en: "Yes, there is a book.", hi: "हाँ, किताब है।" } },
      { kind: "negative", korean: "아니요, 친구가 안 와요.", roman: "aniyo, chinguga an wayo.", meaning: { id: "Tidak, teman tidak datang.", en: "No, my friend isn't coming.", hi: "नहीं, मेरा दोस्त नहीं आ रहा।" } },
      { kind: "negative", korean: "아니요, 책이 없어요.", roman: "aniyo, chaegi eopseoyo.", meaning: { id: "Tidak, tidak ada buku.", en: "No, there is no book.", hi: "नहीं, कोई किताब नहीं है।" }, note: { id: "있어요 → 없어요", en: "있어요 → 없어요 (there is → there isn't)", hi: "있어요 → 없어요 (है → नहीं है)" } }
    ],
    quiz: [
      { prompt: "친구", promptRoman: "chingu", promptMeaning: { id: "teman", en: "friend", hi: "दोस्त" }, options: ["이", "가"], correct: "가", fullSentence: "친구가 와요.", fullSentenceRoman: "chinguga wayo.", fullMeaning: { id: "Teman datang.", en: "A friend is coming.", hi: "एक दोस्त आ रहा है।" }, explanation: { id: "친구 berakhir vokal ㅜ → 가", en: "친구 ends in vowel ㅜ → 가", hi: "친구 स्वर ㅜ पर खत्म → 가" } },
      { prompt: "책", promptRoman: "chaek", promptMeaning: { id: "buku", en: "book", hi: "किताब" }, options: ["이", "가"], correct: "이", fullSentence: "책이 있어요.", fullSentenceRoman: "chaegi isseoyo.", fullMeaning: { id: "Ada buku.", en: "There is a book.", hi: "एक किताब है।" }, explanation: { id: "책 berakhir 받침 ㄱ → 이", en: "책 ends in 받침 ㄱ → 이", hi: "책 받침 ㄱ पर खत्म → 이" } },
      { prompt: "비", promptRoman: "bi", promptMeaning: { id: "hujan", en: "rain", hi: "बारिश" }, options: ["이", "가"], correct: "가", fullSentence: "비가 와요.", fullSentenceRoman: "biga wayo.", fullMeaning: { id: "Hujan turun.", en: "It's raining.", hi: "बारिश हो रही है।" }, explanation: { id: "비 berakhir vokal ㅣ → 가", en: "비 ends in vowel ㅣ → 가", hi: "비 स्वर ㅣ पर खत्म → 가" } },
      { prompt: "동생", promptRoman: "dongsaeng", promptMeaning: { id: "adik", en: "younger sibling", hi: "छोटा भाई/बहन" }, options: ["이", "가"], correct: "이", fullSentence: "동생이 자요.", fullSentenceRoman: "dongsaengi jayo.", fullMeaning: { id: "Adik (sedang) tidur.", en: "(My) younger sibling is sleeping.", hi: "(मेरा) छोटा भाई सो रहा है।" }, explanation: { id: "동생 berakhir 받침 ㅇ → 이", en: "동생 ends in 받침 ㅇ → 이", hi: "동생 받침 ㅇ पर खत्म → 이" } },
      { prompt: "엄마", promptRoman: "eomma", promptMeaning: { id: "ibu", en: "mom", hi: "माँ" }, options: ["이", "가"], correct: "가", fullSentence: "엄마가 음식을 만들어요.", fullSentenceRoman: "eommaga eumsigeul mandeureoyo.", fullMeaning: { id: "Ibu memasak makanan.", en: "Mom is making food.", hi: "माँ खाना बना रही हैं।" }, explanation: { id: "엄마 berakhir vokal ㅏ → 가", en: "엄마 ends in vowel ㅏ → 가", hi: "엄마 स्वर ㅏ पर खत्म → 가" } },
      { prompt: "선생님", promptRoman: "seonsaengnim", promptMeaning: { id: "guru", en: "teacher", hi: "शिक्षक" }, options: ["이", "가"], correct: "이", fullSentence: "선생님이 와요.", fullSentenceRoman: "seonsaengnimi wayo.", fullMeaning: { id: "Guru datang.", en: "(The) teacher is coming.", hi: "शिक्षक आ रहे हैं।" }, explanation: { id: "선생님 berakhir 받침 ㅁ → 이", en: "선생님 ends in 받침 ㅁ → 이", hi: "선생님 받침 ㅁ पर खत्म → 이" } }
    ]
  },
  {
    id: "eulreul",
    label: { id: "Penanda Objek (을/를)", en: "Object Marker (을/를)", hi: "कर्म चिह्न (을/를)" },
    emoji: "🎁",
    description: {
      id: "Menandai objek langsung — apa yang menerima aksi",
      en: "Marks the direct object — what receives the action",
      hi: "प्रत्यक्ष कर्म चिह्नित करता है — जो क्रिया प्राप्त करता है"
    },
    purpose: {
      id: "Penanda 을/를 dipasang setelah kata benda yang menjadi objek dari kata kerja. Untuk menunjukkan: makan APA, baca APA, lihat APA, dll.",
      en: "을/를 attaches after the noun that is the direct object of the verb. Used to express: eat WHAT, read WHAT, see WHAT, etc.",
      hi: "을/를 उस संज्ञा के बाद लगता है जो क्रिया का प्रत्यक्ष कर्म है। बताता है: क्या खाना, क्या पढ़ना, क्या देखना आदि।"
    },
    mechanic: BATCHIM_TIP,
    variants: [
      {
        badge: BADGE_CONSONANT,
        title: CONS_TITLE,
        rule: { id: "→ tambahkan 을", en: "→ add 을", hi: "→ 을 जोड़ें" },
        tone: "konsonan",
        examples: [
          { word: "밥", wordRoman: "bap", meaning: { id: "nasi", en: "rice / meal", hi: "चावल / भोजन" }, detail: BATCHIM_LABEL("ㅂ"), result: "밥을", resultRoman: "babeul" },
          { word: "물", wordRoman: "mul", meaning: { id: "air", en: "water", hi: "पानी" }, detail: BATCHIM_LABEL("ㄹ"), result: "물을", resultRoman: "mureul" },
          { word: "책", wordRoman: "chaek", meaning: { id: "buku", en: "book", hi: "किताब" }, detail: BATCHIM_LABEL("ㄱ"), result: "책을", resultRoman: "chaegeul" },
          { word: "음악", wordRoman: "eumak", meaning: { id: "musik", en: "music", hi: "संगीत" }, detail: BATCHIM_LABEL("ㄱ"), result: "음악을", resultRoman: "eumageul" }
        ]
      },
      {
        badge: BADGE_VOWEL,
        title: VOWEL_TITLE,
        rule: { id: "→ tambahkan 를", en: "→ add 를", hi: "→ 를 जोड़ें" },
        tone: "vokal",
        examples: [
          { word: "친구", wordRoman: "chingu", meaning: { id: "teman", en: "friend", hi: "दोस्त" }, detail: VOWEL_END_LABEL("ㅜ"), result: "친구를", resultRoman: "chingureul" },
          { word: "영화", wordRoman: "yeonghwa", meaning: { id: "film", en: "movie", hi: "फ़िल्म" }, detail: VOWEL_END_LABEL("ㅘ"), result: "영화를", resultRoman: "yeonghwareul" },
          { word: "한국어", wordRoman: "hangugeo", meaning: { id: "bahasa Korea", en: "Korean (language)", hi: "कोरियाई भाषा" }, detail: VOWEL_END_LABEL("ㅓ"), result: "한국어를", resultRoman: "hangugeoreul" },
          { word: "커피", wordRoman: "keopi", meaning: { id: "kopi", en: "coffee", hi: "कॉफ़ी" }, detail: VOWEL_END_LABEL("ㅣ"), result: "커피를", resultRoman: "keopireul" }
        ]
      }
    ],
    examples: [
      { kind: "statement", korean: "밥을 먹어요.", roman: "babeul meogeoyo.", meaning: { id: "(Saya) makan nasi.", en: "(I) eat rice.", hi: "(मैं) चावल खाता हूँ।" } },
      { kind: "statement", korean: "영화를 봐요.", roman: "yeonghwareul bwayo.", meaning: { id: "(Saya) menonton film.", en: "(I) watch a movie.", hi: "(मैं) फ़िल्म देखता हूँ।" } },
      { kind: "question", korean: "뭐를 먹어요?", roman: "mworeul meogeoyo?", meaning: { id: "Makan apa?", en: "What do (you) eat?", hi: "(आप) क्या खाते हैं?" } },
      { kind: "question", korean: "뭐를 봐요?", roman: "mworeul bwayo?", meaning: { id: "Menonton apa?", en: "What do (you) watch?", hi: "(आप) क्या देखते हैं?" } },
      { kind: "positive", korean: "네, 밥을 먹어요.", roman: "ne, babeul meogeoyo.", meaning: { id: "Ya, (saya) makan nasi.", en: "Yes, (I) eat rice.", hi: "हाँ, (मैं) चावल खाता हूँ।" } },
      { kind: "positive", korean: "네, 영화를 봐요.", roman: "ne, yeonghwareul bwayo.", meaning: { id: "Ya, (saya) menonton film.", en: "Yes, (I) watch a movie.", hi: "हाँ, (मैं) फ़िल्म देखता हूँ।" } },
      { kind: "negative", korean: "아니요, 밥을 안 먹어요.", roman: "aniyo, babeul an meogeoyo.", meaning: { id: "Tidak, (saya) tidak makan nasi.", en: "No, (I) don't eat rice.", hi: "नहीं, (मैं) चावल नहीं खाता।" } },
      { kind: "negative", korean: "아니요, 영화를 안 봐요.", roman: "aniyo, yeonghwareul an bwayo.", meaning: { id: "Tidak, (saya) tidak menonton film.", en: "No, (I) don't watch movies.", hi: "नहीं, (मैं) फ़िल्म नहीं देखता।" } }
    ],
    quiz: [
      { prompt: "밥", promptRoman: "bap", promptMeaning: { id: "nasi", en: "rice", hi: "चावल" }, options: ["을", "를"], correct: "을", fullSentence: "밥을 먹어요.", fullSentenceRoman: "babeul meogeoyo.", fullMeaning: { id: "(Saya) makan nasi.", en: "(I) eat rice.", hi: "(मैं) चावल खाता हूँ।" }, explanation: { id: "밥 berakhir 받침 ㅂ → 을", en: "밥 ends in 받침 ㅂ → 을", hi: "밥 받침 ㅂ पर खत्म → 을" } },
      { prompt: "물", promptRoman: "mul", promptMeaning: { id: "air", en: "water", hi: "पानी" }, options: ["을", "를"], correct: "을", fullSentence: "물을 마셔요.", fullSentenceRoman: "mureul masyeoyo.", fullMeaning: { id: "(Saya) minum air.", en: "(I) drink water.", hi: "(मैं) पानी पीता हूँ।" }, explanation: { id: "물 berakhir 받침 ㄹ → 을", en: "물 ends in 받침 ㄹ → 을", hi: "물 받침 ㄹ पर खत्म → 을" } },
      { prompt: "친구", promptRoman: "chingu", promptMeaning: { id: "teman", en: "friend", hi: "दोस्त" }, options: ["을", "를"], correct: "를", fullSentence: "친구를 만나요.", fullSentenceRoman: "chingureul mannayo.", fullMeaning: { id: "(Saya) bertemu teman.", en: "(I) meet a friend.", hi: "(मैं) दोस्त से मिलता हूँ।" }, explanation: { id: "친구 berakhir vokal ㅜ → 를", en: "친구 ends in vowel ㅜ → 를", hi: "친구 स्वर ㅜ पर खत्म → 를" } },
      { prompt: "책", promptRoman: "chaek", promptMeaning: { id: "buku", en: "book", hi: "किताब" }, options: ["을", "를"], correct: "을", fullSentence: "책을 읽어요.", fullSentenceRoman: "chaegeul ilgeoyo.", fullMeaning: { id: "(Saya) membaca buku.", en: "(I) read a book.", hi: "(मैं) किताब पढ़ता हूँ।" }, explanation: { id: "책 berakhir 받침 ㄱ → 을", en: "책 ends in 받침 ㄱ → 을", hi: "책 받침 ㄱ पर खत्म → 을" } },
      { prompt: "영화", promptRoman: "yeonghwa", promptMeaning: { id: "film", en: "movie", hi: "फ़िल्म" }, options: ["을", "를"], correct: "를", fullSentence: "영화를 봐요.", fullSentenceRoman: "yeonghwareul bwayo.", fullMeaning: { id: "(Saya) menonton film.", en: "(I) watch a movie.", hi: "(मैं) फ़िल्म देखता हूँ।" }, explanation: { id: "영화 berakhir vokal ㅘ → 를", en: "영화 ends in vowel ㅘ → 를", hi: "영화 स्वर ㅘ पर खत्म → 를" } },
      { prompt: "한국어", promptRoman: "hangugeo", promptMeaning: { id: "bahasa Korea", en: "Korean", hi: "कोरियाई" }, options: ["을", "를"], correct: "를", fullSentence: "한국어를 공부해요.", fullSentenceRoman: "hangugeoreul gongbuhaeyo.", fullMeaning: { id: "(Saya) belajar bahasa Korea.", en: "(I) study Korean.", hi: "(मैं) कोरियाई पढ़ता हूँ।" }, explanation: { id: "한국어 berakhir vokal ㅓ → 를", en: "한국어 ends in vowel ㅓ → 를", hi: "한국어 स्वर ㅓ पर खत्म → 를" } },
      { prompt: "음악", promptRoman: "eumak", promptMeaning: { id: "musik", en: "music", hi: "संगीत" }, options: ["을", "를"], correct: "을", fullSentence: "음악을 들어요.", fullSentenceRoman: "eumageul deureoyo.", fullMeaning: { id: "(Saya) mendengarkan musik.", en: "(I) listen to music.", hi: "(मैं) संगीत सुनता हूँ।" }, explanation: { id: "음악 berakhir 받침 ㄱ → 을", en: "음악 ends in 받침 ㄱ → 을", hi: "음악 받침 ㄱ पर खत्म → 을" } }
    ]
  },
  {
    id: "posisi",
    label: { id: "Kata Posisi (앞/뒤/안/위)", en: "Position Words (앞/뒤/안/위)", hi: "स्थान शब्द (앞/뒤/안/위)" },
    emoji: "🧭",
    description: {
      id: "Kata posisi: depan, belakang, samping, dalam, atas, bawah, dll.",
      en: "Position words: front, back, side, inside, above, below, and more",
      hi: "स्थान शब्द: आगे, पीछे, बगल, अंदर, ऊपर, नीचे आदि"
    },
    purpose: {
      id: "Kata posisi dipakai untuk menjelaskan letak sebuah benda atau orang relatif terhadap benda lain. Misal 'di atas meja', 'di dalam tas', 'di depan rumah'. Sangat berguna untuk percakapan sehari-hari dan deskripsi.",
      en: "Position words describe where an object or person is relative to something else. For example 'on top of the table', 'inside the bag', 'in front of the house'. Very useful for everyday descriptions.",
      hi: "स्थान शब्द किसी वस्तु या व्यक्ति की दूसरी वस्तु के सापेक्ष स्थिति बताते हैं। जैसे 'मेज़ के ऊपर', 'बैग के अंदर', 'घर के सामने'। रोज़मर्रा के विवरणों के लिए बहुत उपयोगी।"
    },
    mechanic: {
      id: "Struktur dasar: [Benda A] + 이/가 + [Benda B] + [Posisi] + 에 + 있어요/없어요. Artinya: 'Benda A ada/tidak ada di [posisi] dari Benda B'. Partikel 에 selalu menempel pada kata posisi.",
      en: "Basic pattern: [Thing A] + 이/가 + [Thing B] + [Position] + 에 + 있어요/없어요. Meaning: 'Thing A is/isn't located at [position] of Thing B'. The particle 에 always attaches to the position word.",
      hi: "मूल पैटर्न: [वस्तु A] + 이/가 + [वस्तु B] + [स्थान] + 에 + 있어요/없어요। अर्थ: 'वस्तु A, वस्तु B के [स्थान] पर है/नहीं है'। कण 에 हमेशा स्थान शब्द से लगता है।"
    },
    variants: [
      {
        badge: { id: "Datar", en: "Flat", hi: "क्षैतिज" },
        title: { id: "Posisi horizontal: depan, belakang, samping", en: "Horizontal positions: front, back, side", hi: "क्षैतिज स्थिति: आगे, पीछे, बगल" },
        rule: { id: "→ relatif arah", en: "→ relative direction", hi: "→ सापेक्ष दिशा" },
        tone: "konsonan",
        examples: [
          { word: "앞", wordRoman: "ap", meaning: { id: "depan", en: "front", hi: "आगे" }, detail: { id: "baca: ap", en: "read as: ap", hi: "उच्चारण: ap" }, result: "집 앞에", resultRoman: "jip ape" },
          { word: "뒤", wordRoman: "dwi", meaning: { id: "belakang", en: "behind / back", hi: "पीछे" }, detail: { id: "baca: dwi", en: "read as: dwi", hi: "उच्चारण: dwi" }, result: "집 뒤에", resultRoman: "jip dwie" },
          { word: "옆", wordRoman: "yeop", meaning: { id: "samping", en: "next to / beside", hi: "बगल / पास" }, detail: { id: "baca: yeop", en: "read as: yeop", hi: "उच्चारण: yeop" }, result: "집 옆에", resultRoman: "jip yeope" }
        ]
      },
      {
        badge: { id: "Vertikal", en: "Vertical", hi: "ऊर्ध्वाधर" },
        title: { id: "Posisi atas-bawah", en: "Above and below", hi: "ऊपर और नीचे" },
        rule: { id: "→ relatif tinggi", en: "→ relative height", hi: "→ सापेक्ष ऊँचाई" },
        tone: "vokal",
        examples: [
          { word: "위", wordRoman: "wi", meaning: { id: "atas", en: "on / above", hi: "ऊपर" }, detail: { id: "baca: wi", en: "read as: wi", hi: "उच्चारण: wi" }, result: "책상 위에", resultRoman: "chaeksang wie" },
          { word: "아래", wordRoman: "arae", meaning: { id: "bawah", en: "below", hi: "नीचे" }, detail: { id: "baca: arae", en: "read as: arae", hi: "उच्चारण: arae" }, result: "책상 아래에", resultRoman: "chaeksang araee" },
          { word: "밑", wordRoman: "mit", meaning: { id: "bawah (persis)", en: "underneath", hi: "ठीक नीचे" }, detail: { id: "baca: mit", en: "read as: mit", hi: "उच्चारण: mit" }, result: "책상 밑에", resultRoman: "chaeksang mite" }
        ]
      },
      {
        badge: { id: "Ruang", en: "Space", hi: "स्थान/दूरी" },
        title: { id: "Dalam / Luar / Antara / Dekat", en: "Inside / Outside / Between / Near", hi: "अंदर / बाहर / बीच / पास" },
        rule: { id: "→ relatif ruang & jarak", en: "→ relative space & proximity", hi: "→ सापेक्ष स्थान और दूरी" },
        tone: "khusus",
        examples: [
          { word: "안", wordRoman: "an", meaning: { id: "dalam", en: "inside", hi: "अंदर" }, detail: { id: "baca: an", en: "read as: an", hi: "उच्चारण: an" }, result: "가방 안에", resultRoman: "gabang ane" },
          { word: "밖", wordRoman: "bakk", meaning: { id: "luar", en: "outside", hi: "बाहर" }, detail: { id: "baca: bakk", en: "read as: bakk", hi: "उच्चारण: bakk" }, result: "집 밖에", resultRoman: "jip bakke" },
          { word: "사이", wordRoman: "sai", meaning: { id: "antara", en: "between", hi: "बीच में" }, detail: { id: "baca: sai", en: "read as: sai", hi: "उच्चारण: sai" }, result: "A와 B 사이에", resultRoman: "A-wa B saie" },
          { word: "근처", wordRoman: "geuncheo", meaning: { id: "dekat/sekitar", en: "nearby", hi: "पास / आसपास" }, detail: { id: "baca: geuncheo", en: "read as: geuncheo", hi: "उच्चारण: geuncheo" }, result: "학교 근처에", resultRoman: "hakgyo geuncheoe" }
        ]
      }
    ],
    examples: [
      { kind: "statement", korean: "책이 책상 위에 있어요.", roman: "chaegi chaeksang wie isseoyo.", meaning: { id: "Buku ada di atas meja.", en: "The book is on the table.", hi: "किताब मेज़ पर है।" } },
      { kind: "statement", korean: "고양이가 의자 밑에 있어요.", roman: "goyangiga uija mite isseoyo.", meaning: { id: "Kucing ada di bawah kursi.", en: "The cat is under the chair.", hi: "बिल्ली कुर्सी के नीचे है।" } },
      { kind: "question", korean: "책이 어디에 있어요?", roman: "chaegi eodie isseoyo?", meaning: { id: "Di mana bukunya?", en: "Where is the book?", hi: "किताब कहाँ है?" }, note: { id: "어디에 = di mana", en: "어디에 = where", hi: "어디에 = कहाँ" } },
      { kind: "question", korean: "화장실이 어디에 있어요?", roman: "hwajangsiri eodie isseoyo?", meaning: { id: "Di mana toiletnya?", en: "Where is the restroom?", hi: "शौचालय कहाँ है?" } },
      { kind: "positive", korean: "네, 책상 위에 있어요.", roman: "ne, chaeksang wie isseoyo.", meaning: { id: "Ya, ada di atas meja.", en: "Yes, it's on the table.", hi: "हाँ, यह मेज़ पर है।" } },
      { kind: "positive", korean: "네, 학교 근처에 있어요.", roman: "ne, hakgyo geuncheoe isseoyo.", meaning: { id: "Ya, ada di dekat sekolah.", en: "Yes, it's near the school.", hi: "हाँ, यह स्कूल के पास है।" } },
      { kind: "negative", korean: "아니요, 책상 위에 없어요.", roman: "aniyo, chaeksang wie eopseoyo.", meaning: { id: "Tidak, tidak ada di atas meja.", en: "No, it's not on the table.", hi: "नहीं, यह मेज़ पर नहीं है।" }, note: { id: "있어요 → 없어요", en: "있어요 → 없어요 (is → isn't)", hi: "있어요 → 없어요 (है → नहीं है)" } },
      { kind: "negative", korean: "아니요, 가방 안에 없어요.", roman: "aniyo, gabang ane eopseoyo.", meaning: { id: "Tidak, tidak ada di dalam tas.", en: "No, it's not in the bag.", hi: "नहीं, यह बैग के अंदर नहीं है।" } }
    ],
    quiz: [
      { prompt: "buku ada di atas meja", promptMeaning: { id: "책이 책상 ___에 있어요", en: "책이 책상 ___에 있어요 (the book is ___ the table)", hi: "책이 책상 ___에 있어요 (किताब मेज़ ___ है)" }, options: ["위", "아래", "안"], correct: "위", fullSentence: "책이 책상 위에 있어요.", fullSentenceRoman: "chaegi chaeksang wie isseoyo.", fullMeaning: { id: "Buku ada di atas meja.", en: "The book is on the table.", hi: "किताब मेज़ पर है।" }, explanation: { id: "위 = atas. 책상 위에 = di atas meja", en: "위 = on. 책상 위에 = on the table", hi: "위 = ऊपर। 책상 위에 = मेज़ पर" } },
      { prompt: "kucing di bawah kursi", promptMeaning: { id: "고양이가 의자 ___에 있어요", en: "고양이가 의자 ___에 있어요 (the cat is ___ the chair)", hi: "고양이가 의자 ___에 있어요 (बिल्ली कुर्सी ___ है)" }, options: ["위", "밑", "옆"], correct: "밑", fullSentence: "고양이가 의자 밑에 있어요.", fullSentenceRoman: "goyangiga uija mite isseoyo.", fullMeaning: { id: "Kucing ada di bawah kursi.", en: "The cat is under the chair.", hi: "बिल्ली कुर्सी के नीचे है।" }, explanation: { id: "밑 = persis di bawah (lebih spesifik dari 아래)", en: "밑 = directly underneath (more specific than 아래)", hi: "밑 = ठीक नीचे (아래 से अधिक विशिष्ट)" } },
      { prompt: "di dalam tas", promptMeaning: { id: "가방 ___에", en: "가방 ___에 (___ the bag)", hi: "가방 ___에 (बैग के ___)" }, options: ["안", "밖", "위"], correct: "안", fullSentence: "가방 안에 책이 있어요.", fullSentenceRoman: "gabang ane chaegi isseoyo.", fullMeaning: { id: "Di dalam tas ada buku.", en: "Inside the bag there is a book.", hi: "बैग के अंदर एक किताब है।" }, explanation: { id: "안 = dalam (interior)", en: "안 = inside", hi: "안 = अंदर" } },
      { prompt: "di depan rumah", promptMeaning: { id: "집 ___에", en: "집 ___에 (___ the house)", hi: "집 ___에 (घर के ___)" }, options: ["앞", "뒤", "옆"], correct: "앞", fullSentence: "집 앞에 차가 있어요.", fullSentenceRoman: "jip ape chaga isseoyo.", fullMeaning: { id: "Di depan rumah ada mobil.", en: "There is a car in front of the house.", hi: "घर के सामने एक कार है।" }, explanation: { id: "앞 = depan", en: "앞 = front", hi: "앞 = सामने" } },
      { prompt: "di belakang sekolah", promptMeaning: { id: "학교 ___에", en: "학교 ___에 (___ the school)", hi: "학교 ___에 (स्कूल के ___)" }, options: ["앞", "뒤", "안"], correct: "뒤", fullSentence: "학교 뒤에 공원이 있어요.", fullSentenceRoman: "hakgyo dwie gongwoni isseoyo.", fullMeaning: { id: "Di belakang sekolah ada taman.", en: "There is a park behind the school.", hi: "स्कूल के पीछे एक पार्क है।" }, explanation: { id: "뒤 = belakang", en: "뒤 = behind", hi: "뒤 = पीछे" } },
      { prompt: "di samping bank", promptMeaning: { id: "은행 ___에", en: "은행 ___에 (___ the bank)", hi: "은행 ___에 (बैंक के ___)" }, options: ["위", "옆", "근처"], correct: "옆", fullSentence: "은행 옆에 카페가 있어요.", fullSentenceRoman: "eunhaeng yeope kapega isseoyo.", fullMeaning: { id: "Di samping bank ada kafe.", en: "There is a café next to the bank.", hi: "बैंक के बगल में एक कैफ़े है।" }, explanation: { id: "옆 = samping (langsung berdampingan)", en: "옆 = right next to", hi: "옆 = ठीक बगल में" } },
      { prompt: "di dekat sekolah", promptMeaning: { id: "학교 ___에", en: "학교 ___에 (___ the school)", hi: "학교 ___에 (स्कूल के ___)" }, options: ["옆", "근처", "안"], correct: "근처", fullSentence: "학교 근처에 식당이 있어요.", fullSentenceRoman: "hakgyo geuncheoe sikdangi isseoyo.", fullMeaning: { id: "Di dekat sekolah ada restoran.", en: "There is a restaurant near the school.", hi: "स्कूल के पास एक रेस्तरां है।" }, explanation: { id: "근처 = sekitar/dekat (area umum, tidak harus berdampingan)", en: "근처 = nearby (general area, not necessarily adjacent)", hi: "근처 = पास/आसपास (सामान्य क्षेत्र, ठीक बगल नहीं)" } },
      { prompt: "antara A dan B", promptMeaning: { id: "A와 B ___에", en: "A와 B ___에 (___ A and B)", hi: "A와 B ___에 (A और B के ___)" }, options: ["사이", "안", "옆"], correct: "사이", fullSentence: "은행과 카페 사이에 있어요.", fullSentenceRoman: "eunhaenggwa kape saie isseoyo.", fullMeaning: { id: "Ada di antara bank dan kafe.", en: "It's between the bank and the café.", hi: "यह बैंक और कैफ़े के बीच में है।" }, explanation: { id: "사이 = antara (perlu dua acuan, dihubungkan dengan 와/과)", en: "사이 = between (needs two reference points joined by 와/과)", hi: "사이 = बीच (दो संदर्भ चाहिए, 와/과 से जुड़े)" } }
    ]
  },
  {
    id: "eseo",
    label: { id: "Penanda Tempat (에/에서)", en: "Location Particles (에/에서)", hi: "स्थान कण (에/에서)" },
    emoji: "📍",
    description: {
      id: "Menandai lokasi: tujuan/keberadaan (에) vs tempat aksi berlangsung (에서)",
      en: "Marks location: destination/existence (에) vs the place an action happens (에서)",
      hi: "स्थान चिह्न: गंतव्य/अस्तित्व (에) बनाम क्रिया का स्थल (에서)"
    },
    purpose: {
      id: "Bahasa Korea punya dua partikel untuk menandai tempat — 에 dan 에서. Pemilihan tergantung apakah kalimatnya tentang TUJUAN/KEBERADAAN, atau tentang AKSI yang dilakukan DI tempat itu. Salah memilih akan terdengar tidak natural meskipun masih bisa dipahami.",
      en: "Korean has two location particles — 에 and 에서. Which one to pick depends on whether the sentence is about a DESTINATION/EXISTENCE or about an ACTION happening AT that place. Picking the wrong one sounds unnatural even if it remains understandable.",
      hi: "कोरियाई में स्थान के लिए दो कण हैं — 에 और 에서। चुनाव इस पर निर्भर करता है कि वाक्य गंतव्य/अस्तित्व के बारे में है या उस स्थान पर हो रही क्रिया के बारे में। ग़लत चुनना अप्राकृतिक लगता है हालाँकि समझ में आता है।"
    },
    mechanic: {
      id: "Aturan cepat: lihat kata kerjanya. Verba gerakan/keberadaan (가다 pergi, 오다 datang, 있다 ada, 없다 tidak ada, 살다 tinggal) → pakai 에. Verba aksi (먹다 makan, 공부하다 belajar, 만나다 bertemu, 일하다 bekerja, 보다 menonton) → pakai 에서.",
      en: "Quick rule: look at the verb. Motion/existence verbs (가다 to go, 오다 to come, 있다 to be, 없다 to not be, 살다 to live) → use 에. Action verbs (먹다 to eat, 공부하다 to study, 만나다 to meet, 일하다 to work, 보다 to watch) → use 에서.",
      hi: "त्वरित नियम: क्रिया देखें। गति/अस्तित्व क्रियाएँ (가다 जाना, 오다 आना, 있다 होना, 없다 न होना, 살다 रहना) → 에। क्रिया क्रियाएँ (먹다 खाना, 공부하다 पढ़ना, 만나다 मिलना, 일하다 काम करना, 보다 देखना) → 에서।"
    },
    variants: [
      {
        badge: { id: "에", en: "에", hi: "에" },
        title: { id: "Tujuan, arah, atau keberadaan statis", en: "Destination, direction, or static existence", hi: "गंतव्य, दिशा, या स्थिर अस्तित्व" },
        rule: { id: "→ tambahkan 에 (kata kerja gerak / 있다)", en: "→ add 에 (with motion verb / 있다)", hi: "→ 에 जोड़ें (गति क्रिया / 있다 के साथ)" },
        tone: "konsonan",
        examples: [
          { word: "학교", wordRoman: "hakgyo", meaning: { id: "sekolah", en: "school", hi: "स्कूल" }, detail: { id: "dengan 가다 (pergi)", en: "with 가다 (to go)", hi: "가다 (जाना) के साथ" }, result: "학교에", resultRoman: "hakgyoe" },
          { word: "집", wordRoman: "jip", meaning: { id: "rumah", en: "home", hi: "घर" }, detail: { id: "dengan 있다 (berada/ada)", en: "with 있다 (to be at)", hi: "있다 (होना) के साथ" }, result: "집에", resultRoman: "jibe" },
          { word: "회사", wordRoman: "hoesa", meaning: { id: "kantor", en: "office", hi: "कार्यालय" }, detail: { id: "dengan 가다 (pergi)", en: "with 가다 (to go)", hi: "가다 (जाना) के साथ" }, result: "회사에", resultRoman: "hoesae" },
          { word: "한국", wordRoman: "hanguk", meaning: { id: "Korea", en: "Korea", hi: "कोरिया" }, detail: { id: "dengan 오다 (datang)", en: "with 오다 (to come)", hi: "오다 (आना) के साथ" }, result: "한국에", resultRoman: "hanguge" }
        ]
      },
      {
        badge: { id: "에서", en: "에서", hi: "에서" },
        title: { id: "Tempat aksi berlangsung", en: "Where an action takes place", hi: "जहाँ क्रिया होती है" },
        rule: { id: "→ tambahkan 에서 (kata kerja aksi)", en: "→ add 에서 (with action verb)", hi: "→ 에서 जोड़ें (क्रिया क्रिया के साथ)" },
        tone: "vokal",
        examples: [
          { word: "학교", wordRoman: "hakgyo", meaning: { id: "sekolah", en: "school", hi: "स्कूल" }, detail: { id: "dengan 공부하다 (belajar)", en: "with 공부하다 (to study)", hi: "공부하다 (पढ़ाई करना) के साथ" }, result: "학교에서", resultRoman: "hakgyoeseo" },
          { word: "집", wordRoman: "jip", meaning: { id: "rumah", en: "home", hi: "घर" }, detail: { id: "dengan 일하다 (bekerja)", en: "with 일하다 (to work)", hi: "일하다 (काम करना) के साथ" }, result: "집에서", resultRoman: "jibeseo" },
          { word: "카페", wordRoman: "kape", meaning: { id: "kafe", en: "café", hi: "कैफ़े" }, detail: { id: "dengan 만나다 (bertemu)", en: "with 만나다 (to meet)", hi: "만나다 (मिलना) के साथ" }, result: "카페에서", resultRoman: "kapeeseo" },
          { word: "식당", wordRoman: "sikdang", meaning: { id: "restoran", en: "restaurant", hi: "रेस्तरां" }, detail: { id: "dengan 먹다 (makan)", en: "with 먹다 (to eat)", hi: "먹다 (खाना) के साथ" }, result: "식당에서", resultRoman: "sikdangeseo" }
        ]
      }
    ],
    examples: [
      { kind: "statement", korean: "저는 학교에 가요.", roman: "jeoneun hakgyoe gayo.", meaning: { id: "Saya pergi ke sekolah.", en: "I go to school.", hi: "मैं स्कूल जाता हूँ।" }, note: { id: "가다 = gerak, jadi 에 (tujuan).", en: "가다 = motion, so 에 (destination).", hi: "가다 = गति, इसलिए 에 (गंतव्य)।" } },
      { kind: "statement", korean: "친구를 카페에서 만나요.", roman: "chingureul kapeeseo mannayo.", meaning: { id: "Saya bertemu teman di kafe.", en: "I meet a friend at the café.", hi: "मैं दोस्त से कैफ़े में मिलता हूँ।" }, note: { id: "만나다 = aksi, jadi 에서 (tempat aksi).", en: "만나다 = action, so 에서 (action location).", hi: "만나다 = क्रिया, इसलिए 에서 (क्रिया स्थल)।" } },
      { kind: "question", korean: "어디에 가요?", roman: "eodie gayo?", meaning: { id: "Pergi ke mana?", en: "Where are (you) going?", hi: "(आप) कहाँ जा रहे हैं?" }, note: { id: "Tujuan → 에.", en: "Destination → 에.", hi: "गंतव्य → 에।" } },
      { kind: "question", korean: "어디에서 일해요?", roman: "eodieseo ilhaeyo?", meaning: { id: "Kerja di mana?", en: "Where do (you) work?", hi: "(आप) कहाँ काम करते हैं?" }, note: { id: "Tempat aksi → 에서.", en: "Action location → 에서.", hi: "क्रिया स्थल → 에서।" } },
      { kind: "positive", korean: "네, 집에 있어요.", roman: "ne, jibe isseoyo.", meaning: { id: "Ya, saya di rumah.", en: "Yes, I'm at home.", hi: "हाँ, मैं घर पर हूँ।" }, note: { id: "있다 → 에.", en: "있다 → 에.", hi: "있다 → 에।" } },
      { kind: "positive", korean: "네, 도서관에서 공부해요.", roman: "ne, doseogwaneseo gongbuhaeyo.", meaning: { id: "Ya, saya belajar di perpustakaan.", en: "Yes, I study at the library.", hi: "हाँ, मैं पुस्तकालय में पढ़ाई करता हूँ।" } },
      { kind: "negative", korean: "아니요, 회사에 안 가요.", roman: "aniyo, hoesae an gayo.", meaning: { id: "Tidak, saya tidak pergi ke kantor.", en: "No, I'm not going to the office.", hi: "नहीं, मैं कार्यालय नहीं जा रहा।" } },
      { kind: "negative", korean: "아니요, 식당에서 안 먹어요.", roman: "aniyo, sikdangeseo an meogeoyo.", meaning: { id: "Tidak, saya tidak makan di restoran.", en: "No, I don't eat at the restaurant.", hi: "नहीं, मैं रेस्तरां में नहीं खाता।" } }
    ],
    quiz: [
      { prompt: "pergi ke sekolah", promptMeaning: { id: "학교 ___ 가요 (pergi ___ sekolah)", en: "학교 ___ 가요 (going ___ school)", hi: "학교 ___ 가요 (स्कूल ___ जाना)" }, options: ["에", "에서"], correct: "에", fullSentence: "학교에 가요.", fullSentenceRoman: "hakgyoe gayo.", fullMeaning: { id: "(Saya) pergi ke sekolah.", en: "(I) go to school.", hi: "(मैं) स्कूल जाता हूँ।" }, explanation: { id: "가다 (pergi) = verba gerak → tempat sebagai tujuan → 에.", en: "가다 (to go) = motion verb → location is destination → 에.", hi: "가다 (जाना) = गति क्रिया → स्थान गंतव्य → 에।" } },
      { prompt: "belajar di sekolah", promptMeaning: { id: "학교 ___ 공부해요", en: "학교 ___ 공부해요 (study ___ school)", hi: "학교 ___ 공부해요 (स्कूल ___ पढ़ाई)" }, options: ["에", "에서"], correct: "에서", fullSentence: "학교에서 공부해요.", fullSentenceRoman: "hakgyoeseo gongbuhaeyo.", fullMeaning: { id: "(Saya) belajar di sekolah.", en: "(I) study at school.", hi: "(मैं) स्कूल में पढ़ाई करता हूँ।" }, explanation: { id: "공부하다 (belajar) = aksi → tempat aksi → 에서.", en: "공부하다 (to study) = action → action location → 에서.", hi: "공부하다 (पढ़ाई) = क्रिया → क्रिया स्थल → 에서।" } },
      { prompt: "ada di rumah", promptMeaning: { id: "집 ___ 있어요", en: "집 ___ 있어요 (be ___ home)", hi: "집 ___ 있어요 (घर ___ होना)" }, options: ["에", "에서"], correct: "에", fullSentence: "집에 있어요.", fullSentenceRoman: "jibe isseoyo.", fullMeaning: { id: "(Saya) di rumah.", en: "(I) am at home.", hi: "(मैं) घर पर हूँ।" }, explanation: { id: "있다 (ada/berada) = keberadaan → 에.", en: "있다 (to be) = existence → 에.", hi: "있다 (होना) = अस्तित्व → 에।" } },
      { prompt: "bekerja di rumah", promptMeaning: { id: "집 ___ 일해요", en: "집 ___ 일해요 (work ___ home)", hi: "집 ___ 일해요 (घर ___ काम)" }, options: ["에", "에서"], correct: "에서", fullSentence: "집에서 일해요.", fullSentenceRoman: "jibeseo ilhaeyo.", fullMeaning: { id: "(Saya) bekerja di rumah.", en: "(I) work at home.", hi: "(मैं) घर से काम करता हूँ।" }, explanation: { id: "일하다 (bekerja) = aksi → 에서.", en: "일하다 (to work) = action → 에서.", hi: "일하다 (काम करना) = क्रिया → 에서।" } },
      { prompt: "pergi ke kantor", promptMeaning: { id: "회사 ___ 가요", en: "회사 ___ 가요", hi: "회사 ___ 가요" }, options: ["에", "에서"], correct: "에", fullSentence: "회사에 가요.", fullSentenceRoman: "hoesae gayo.", fullMeaning: { id: "(Saya) pergi ke kantor.", en: "(I) go to the office.", hi: "(मैं) कार्यालय जाता हूँ।" }, explanation: { id: "가다 → 에.", en: "가다 → 에.", hi: "가다 → 에।" } },
      { prompt: "bertemu teman di kafe", promptMeaning: { id: "카페 ___ 친구를 만나요", en: "카페 ___ 친구를 만나요", hi: "카페 ___ 친구를 만나요" }, options: ["에", "에서"], correct: "에서", fullSentence: "카페에서 친구를 만나요.", fullSentenceRoman: "kapeeseo chingureul mannayo.", fullMeaning: { id: "(Saya) bertemu teman di kafe.", en: "(I) meet a friend at the café.", hi: "(मैं) कैफ़े में दोस्त से मिलता हूँ।" }, explanation: { id: "만나다 (bertemu) = aksi → 에서.", en: "만나다 (to meet) = action → 에서.", hi: "만나다 (मिलना) = क्रिया → 에서।" } },
      { prompt: "makan di restoran", promptMeaning: { id: "식당 ___ 먹어요", en: "식당 ___ 먹어요", hi: "식당 ___ 먹어요" }, options: ["에", "에서"], correct: "에서", fullSentence: "식당에서 먹어요.", fullSentenceRoman: "sikdangeseo meogeoyo.", fullMeaning: { id: "(Saya) makan di restoran.", en: "(I) eat at the restaurant.", hi: "(मैं) रेस्तरां में खाता हूँ।" }, explanation: { id: "먹다 (makan) = aksi → 에서.", en: "먹다 (to eat) = action → 에서.", hi: "먹다 (खाना) = क्रिया → 에서।" } },
      { prompt: "datang ke Korea", promptMeaning: { id: "한국 ___ 와요", en: "한국 ___ 와요", hi: "한국 ___ 와요" }, options: ["에", "에서"], correct: "에", fullSentence: "한국에 와요.", fullSentenceRoman: "hanguge wayo.", fullMeaning: { id: "(Saya) datang ke Korea.", en: "(I) come to Korea.", hi: "(मैं) कोरिया आता हूँ।" }, explanation: { id: "오다 (datang) = gerak → tujuan → 에.", en: "오다 (to come) = motion → destination → 에.", hi: "오다 (आना) = गति → गंतव्य → 에।" } }
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
