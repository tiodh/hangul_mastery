import type { Loc } from "@/lib/i18n";
import type { SentenceExample } from "@/lib/sentences";

export type VocabCategory =
  | "expressions"
  | "days"
  | "time"
  | "places"
  | "numbers"
  | "verbs";

export type VocabItem = {
  hangul: string;
  roman: string;
  meaning: Loc;
};

export type VocabCategoryConfig = {
  id: VocabCategory;
  label: Loc;
  description: Loc;
  emoji: string;
  usageExamples: readonly SentenceExample[];
};

export const VOCAB_CATEGORIES: readonly VocabCategoryConfig[] = [
  {
    id: "expressions",
    label: { id: "Ungkapan Umum", en: "Common Expressions" },
    description: {
      id: "Frasa sehari-hari: terima kasih, maaf, permisi, sapaan, dll.",
      en: "Everyday phrases: thank you, sorry, excuse me, greetings, and more."
    },
    emoji: "🙏",
    usageExamples: [
      { kind: "statement", korean: "만나서 반갑습니다.", roman: "mannaseo bangapseumnida.", meaning: { id: "Senang bertemu Anda.", en: "Nice to meet you." } },
      { kind: "statement", korean: "잘 부탁드립니다.", roman: "jal butakdeurimnida.", meaning: { id: "Mohon bantuannya.", en: "I look forward to working with you." }, note: { id: "Sering diucapkan setelah perkenalan.", en: "Often said right after introducing yourself." } },
      { kind: "question", korean: "괜찮아요?", roman: "gwaenchanayo?", meaning: { id: "Kamu baik-baik saja?", en: "Are you okay?" }, note: { id: "Bisa dijawab dengan 네, 괜찮아요 atau 아니요.", en: "Can be answered with 네, 괜찮아요 or 아니요." } },
      { kind: "question", korean: "알겠어요?", roman: "algesseoyo?", meaning: { id: "Apakah Anda mengerti?", en: "Do you understand?" } },
      { kind: "positive", korean: "네, 알겠어요. 감사합니다.", roman: "ne, algesseoyo. gamsahamnida.", meaning: { id: "Ya, saya mengerti. Terima kasih.", en: "Yes, I understand. Thank you." } },
      { kind: "positive", korean: "네, 괜찮아요.", roman: "ne, gwaenchanayo.", meaning: { id: "Ya, tidak apa-apa.", en: "Yes, it's okay." } },
      { kind: "negative", korean: "아니요, 죄송합니다. 잘 몰라요.", roman: "aniyo, joesonghamnida. jal mollayo.", meaning: { id: "Tidak, maaf. Saya kurang tahu.", en: "No, sorry. I don't really know." } },
      { kind: "negative", korean: "아니요, 괜찮아요. 감사합니다.", roman: "aniyo, gwaenchanayo. gamsahamnida.", meaning: { id: "Tidak (perlu), tidak apa-apa. Terima kasih.", en: "No (thanks), I'm fine. Thank you." }, note: { id: "Bisa dipakai menolak tawaran dengan sopan.", en: "Use this to politely decline an offer." } }
    ]
  },
  {
    id: "days",
    label: { id: "Hari", en: "Days" },
    description: {
      id: "Nama hari, akhir pekan, dan kata waktu relatif (kemarin, hari ini, besok)",
      en: "Day names, weekend/weekday, and relative-day words (yesterday, today, tomorrow)"
    },
    emoji: "📅",
    usageExamples: [
      { kind: "statement", korean: "오늘은 월요일이에요.", roman: "oneureun woryoiri-eyo.", meaning: { id: "Hari ini hari Senin.", en: "Today is Monday." }, note: { id: "Memakai 오늘 (hari ini) + 월요일 (Senin).", en: "Uses 오늘 (today) + 월요일 (Monday)." } },
      { kind: "statement", korean: "내일 학교에 가요.", roman: "naeil hakgyoe gayo.", meaning: { id: "Besok (saya) pergi ke sekolah.", en: "(I) go to school tomorrow." }, note: { id: "내일 = besok", en: "내일 = tomorrow" } },
      { kind: "question", korean: "오늘이 무슨 요일이에요?", roman: "oneuri museun yoiri-eyo?", meaning: { id: "Hari ini hari apa?", en: "What day is today?" }, note: { id: "요일 = hari (dalam minggu)", en: "요일 = day of the week" } },
      { kind: "question", korean: "주말에 뭐 해요?", roman: "jumare mwo haeyo?", meaning: { id: "Akhir pekan ngapain?", en: "What are you doing on the weekend?" }, note: { id: "주말 = akhir pekan", en: "주말 = weekend" } },
      { kind: "positive", korean: "네, 어제 만났어요.", roman: "ne, eoje mannasseoyo.", meaning: { id: "Ya, (kami) bertemu kemarin.", en: "Yes, we met yesterday." }, note: { id: "어제 = kemarin", en: "어제 = yesterday" } },
      { kind: "positive", korean: "네, 매일 운동해요.", roman: "ne, maeil undonghaeyo.", meaning: { id: "Ya, (saya) berolahraga setiap hari.", en: "Yes, I exercise every day." }, note: { id: "매일 = setiap hari", en: "매일 = every day" } },
      { kind: "negative", korean: "아니요, 내일 안 가요.", roman: "aniyo, naeil an gayo.", meaning: { id: "Tidak, (saya) tidak pergi besok.", en: "No, I'm not going tomorrow." } },
      { kind: "negative", korean: "아니요, 토요일이 아니에요.", roman: "aniyo, toyoiri anieyo.", meaning: { id: "Bukan, hari ini bukan Sabtu.", en: "No, today is not Saturday." } }
    ]
  },
  {
    id: "time",
    label: { id: "Waktu", en: "Time" },
    description: {
      id: "Bagian hari, jam, dan kata pengatur waktu (sekarang, nanti, segera)",
      en: "Parts of day, clock units, and time markers (now, later, soon)"
    },
    emoji: "🕐",
    usageExamples: [
      { kind: "statement", korean: "지금 오후 두 시예요.", roman: "jigeum ohu du siyeyo.", meaning: { id: "Sekarang pukul 2 sore.", en: "It's 2 PM now." }, note: { id: "지금 (sekarang) + 오후 (sore) + 시 (jam)", en: "지금 (now) + 오후 (PM) + 시 (o'clock)" } },
      { kind: "statement", korean: "아침에 커피를 마셔요.", roman: "achime keopireul masyeoyo.", meaning: { id: "Pagi hari (saya) minum kopi.", en: "I drink coffee in the morning." }, note: { id: "아침 = pagi", en: "아침 = morning" } },
      { kind: "question", korean: "지금 몇 시예요?", roman: "jigeum myeot siyeyo?", meaning: { id: "Sekarang jam berapa?", en: "What time is it now?" }, note: { id: "몇 시 = jam berapa", en: "몇 시 = what time" } },
      { kind: "question", korean: "언제 시간이 있어요?", roman: "eonje sigani isseoyo?", meaning: { id: "Kapan ada waktu (luang)?", en: "When do you have free time?" }, note: { id: "시간 = waktu", en: "시간 = time" } },
      { kind: "positive", korean: "네, 빨리 갈게요.", roman: "ne, ppalli galgeyo.", meaning: { id: "Ya, (saya) akan segera pergi.", en: "Yes, I'll go quickly." }, note: { id: "빨리 = cepat", en: "빨리 = quickly" } },
      { kind: "positive", korean: "네, 저녁에 만나요.", roman: "ne, jeonyeoge mannayo.", meaning: { id: "Ya, mari bertemu di malam hari.", en: "Yes, let's meet in the evening." }, note: { id: "저녁 = malam/petang", en: "저녁 = evening" } },
      { kind: "negative", korean: "아니요, 시간이 없어요.", roman: "aniyo, sigani eopseoyo.", meaning: { id: "Tidak, (saya) tidak ada waktu.", en: "No, I don't have time." } },
      { kind: "negative", korean: "아니요, 천천히 가요.", roman: "aniyo, cheoncheonhi gayo.", meaning: { id: "Tidak (perlu buru-buru), (saya) jalan pelan saja.", en: "No, I'll go slowly." }, note: { id: "천천히 = perlahan", en: "천천히 = slowly" } }
    ]
  },
  {
    id: "places",
    label: { id: "Nama Tempat", en: "Places" },
    description: {
      id: "Kosakata tempat dan lokasi sehari-hari",
      en: "Common places and locations"
    },
    emoji: "🏛️",
    usageExamples: [
      { kind: "statement", korean: "저는 학교에 가요.", roman: "jeoneun hakgyoe gayo.", meaning: { id: "Saya pergi ke sekolah.", en: "I go to school." } },
      { kind: "statement", korean: "친구가 카페에 있어요.", roman: "chinguga kapee isseoyo.", meaning: { id: "Teman ada di kafe.", en: "My friend is at the café." } },
      { kind: "question", korean: "학교가 어디에 있어요?", roman: "hakgyoga eodie isseoyo?", meaning: { id: "Sekolah ada di mana?", en: "Where is the school?" }, note: { id: "어디 = di mana", en: "어디 = where" } },
      { kind: "question", korean: "병원이 어디에 있어요?", roman: "byeongwoni eodie isseoyo?", meaning: { id: "Di mana rumah sakitnya?", en: "Where is the hospital?" } },
      { kind: "positive", korean: "네, 시장에 가요.", roman: "ne, sijange gayo.", meaning: { id: "Ya, (saya) pergi ke pasar.", en: "Yes, I'm going to the market." } },
      { kind: "positive", korean: "네, 학교 근처에 있어요.", roman: "ne, hakgyo geuncheoe isseoyo.", meaning: { id: "Ya, ada di dekat sekolah.", en: "Yes, it's near the school." } },
      { kind: "negative", korean: "아니요, 병원에 안 가요.", roman: "aniyo, byeongwone an gayo.", meaning: { id: "Tidak, (saya) tidak pergi ke rumah sakit.", en: "No, I'm not going to the hospital." } },
      { kind: "negative", korean: "아니요, 카페에 없어요.", roman: "aniyo, kapee eopseoyo.", meaning: { id: "Tidak, tidak ada di kafe.", en: "No, (he/she) isn't at the café." } }
    ]
  },
  {
    id: "numbers",
    label: { id: "Angka", en: "Numbers" },
    description: {
      id: "Angka Sino-Korean (한자어) 1 sampai 100+",
      en: "Sino-Korean numbers (한자어) from 0 to 1,000,000"
    },
    emoji: "🔢",
    usageExamples: [
      { kind: "statement", korean: "사과가 천 원이에요.", roman: "sagwaga cheon woni-eyo.", meaning: { id: "Apel harganya 1.000 won.", en: "The apple is 1,000 won." }, note: { id: "Memakai 천 (1.000).", en: "Uses 천 (1,000)." } },
      { kind: "statement", korean: "가방이 십만 원이에요.", roman: "gabangi simman woni-eyo.", meaning: { id: "Tas harganya 100.000 won.", en: "The bag is 100,000 won." }, note: { id: "Memakai 십만 (100.000).", en: "Uses 십만 (100,000)." } },
      { kind: "question", korean: "백 원이에요?", roman: "baek woni-eyo?", meaning: { id: "Apakah 100 won?", en: "Is it 100 won?" }, note: { id: "Memakai 백 (100).", en: "Uses 백 (100)." } },
      { kind: "question", korean: "책이 만 원이에요?", roman: "chaegi man woni-eyo?", meaning: { id: "Apakah buku 10.000 won?", en: "Is the book 10,000 won?" } },
      { kind: "positive", korean: "네, 만 원이에요.", roman: "ne, man woni-eyo.", meaning: { id: "Ya, 10.000 won.", en: "Yes, it's 10,000 won." } },
      { kind: "positive", korean: "네, 천 원이에요.", roman: "ne, cheon woni-eyo.", meaning: { id: "Ya, 1.000 won.", en: "Yes, it's 1,000 won." } },
      { kind: "negative", korean: "아니요, 만 원이 아니에요.", roman: "aniyo, man woni anieyo.", meaning: { id: "Bukan, bukan 10.000 won.", en: "No, it's not 10,000 won." } },
      { kind: "negative", korean: "아니요, 백 원이 아니에요.", roman: "aniyo, baek woni anieyo.", meaning: { id: "Bukan, bukan 100 won.", en: "No, it's not 100 won." } }
    ]
  },
  {
    id: "verbs",
    label: { id: "Kata Kerja", en: "Verbs" },
    description: {
      id: "Kata kerja dasar dalam bentuk infinitif",
      en: "Basic verbs in dictionary (infinitive) form"
    },
    emoji: "🏃",
    usageExamples: [
      { kind: "statement", korean: "한국어를 공부해요.", roman: "hangugeoreul gongbuhaeyo.", meaning: { id: "(Saya) belajar bahasa Korea.", en: "(I) study Korean." } },
      { kind: "statement", korean: "친구를 만나요.", roman: "chingureul mannayo.", meaning: { id: "(Saya) bertemu teman.", en: "(I) meet a friend." } },
      { kind: "question", korean: "뭐 먹어요?", roman: "mwo meogeoyo?", meaning: { id: "Makan apa?", en: "What are (you) eating?" }, note: { id: "Memakai 먹다 (makan).", en: "Uses 먹다 (to eat)." } },
      { kind: "question", korean: "지금 어디에 가요?", roman: "jigeum eodie gayo?", meaning: { id: "Sekarang pergi ke mana?", en: "Where are (you) going now?" } },
      { kind: "positive", korean: "네, 공부해요.", roman: "ne, gongbuhaeyo.", meaning: { id: "Ya, (saya) sedang belajar.", en: "Yes, (I'm) studying." } },
      { kind: "positive", korean: "네, 한국어를 공부해요.", roman: "ne, hangugeoreul gongbuhaeyo.", meaning: { id: "Ya, (saya) belajar bahasa Korea.", en: "Yes, (I'm) studying Korean." } },
      { kind: "negative", korean: "아니요, 안 공부해요.", roman: "aniyo, an gongbuhaeyo.", meaning: { id: "Tidak, (saya) tidak belajar.", en: "No, (I'm) not studying." }, note: { id: "Negatif: 안 + kata kerja", en: "Negative: 안 + verb" } },
      { kind: "negative", korean: "아니요, 친구를 안 만나요.", roman: "aniyo, chingureul an mannayo.", meaning: { id: "Tidak, (saya) tidak bertemu teman.", en: "No, (I'm) not meeting any friend." } }
    ]
  }
] as const;

const EXPRESSIONS: readonly VocabItem[] = [
  { hangul: "안녕하세요", roman: "annyeonghaseyo", meaning: { id: "halo / selamat (pagi/siang/sore/malam)", en: "hello / good day" } },
  { hangul: "안녕히 가세요", roman: "annyeonghi gaseyo", meaning: { id: "selamat jalan", en: "goodbye (to someone leaving)" } },
  { hangul: "안녕히 계세요", roman: "annyeonghi gyeseyo", meaning: { id: "selamat tinggal", en: "goodbye (to someone staying)" } },
  { hangul: "만나서 반갑습니다", roman: "mannaseo bangapseumnida", meaning: { id: "senang bertemu", en: "nice to meet you" } },
  { hangul: "오랜만이에요", roman: "oraenmanieyo", meaning: { id: "lama tidak bertemu", en: "long time no see" } },
  { hangul: "감사합니다", roman: "gamsahamnida", meaning: { id: "terima kasih (formal)", en: "thank you (formal)" } },
  { hangul: "고맙습니다", roman: "gomapseumnida", meaning: { id: "terima kasih", en: "thank you" } },
  { hangul: "고마워요", roman: "gomawoyo", meaning: { id: "terima kasih (kasual)", en: "thanks (casual)" } },
  { hangul: "천만에요", roman: "cheonmaneyo", meaning: { id: "sama-sama", en: "you're welcome" } },
  { hangul: "죄송합니다", roman: "joesonghamnida", meaning: { id: "maaf (formal)", en: "I'm sorry (formal)" } },
  { hangul: "미안해요", roman: "mianhaeyo", meaning: { id: "maaf (kasual)", en: "sorry (casual)" } },
  { hangul: "실례합니다", roman: "sillyehamnida", meaning: { id: "permisi", en: "excuse me" } },
  { hangul: "잠시만요", roman: "jamsimanyo", meaning: { id: "sebentar / tunggu sebentar", en: "just a moment / wait a sec" } },
  { hangul: "네", roman: "ne", meaning: { id: "ya", en: "yes" } },
  { hangul: "아니요", roman: "aniyo", meaning: { id: "tidak", en: "no" } },
  { hangul: "괜찮아요", roman: "gwaenchanayo", meaning: { id: "tidak apa-apa / baik-baik saja", en: "it's okay / I'm fine" } },
  { hangul: "알겠어요", roman: "algesseoyo", meaning: { id: "saya mengerti", en: "I understand / got it" } },
  { hangul: "몰라요", roman: "mollayo", meaning: { id: "saya tidak tahu", en: "I don't know" } },
  { hangul: "도와주세요", roman: "dowajuseyo", meaning: { id: "tolong saya", en: "please help me" } },
  { hangul: "다시 한번 말해 주세요", roman: "dasi hanbeon malhae juseyo", meaning: { id: "tolong ulangi sekali lagi", en: "please say that again" } },
  { hangul: "천천히 말해 주세요", roman: "cheoncheonhi malhae juseyo", meaning: { id: "tolong bicara perlahan", en: "please speak slowly" } },
  { hangul: "잘 부탁드립니다", roman: "jal butakdeurimnida", meaning: { id: "mohon bantuannya", en: "I look forward to working with you" } },
  { hangul: "잘 먹겠습니다", roman: "jal meokgesseumnida", meaning: { id: "selamat makan (sebelum makan)", en: "thanks for the meal (before eating)" } },
  { hangul: "잘 먹었습니다", roman: "jal meogeosseumnida", meaning: { id: "terima kasih atas makanannya (sesudah makan)", en: "thanks for the meal (after eating)" } },
  { hangul: "잘 자요", roman: "jal jayo", meaning: { id: "selamat tidur", en: "good night" } },
  { hangul: "화이팅", roman: "hwaiting", meaning: { id: "semangat", en: "fighting / cheer up" } }
] as const;

const DAYS: readonly VocabItem[] = [
  { hangul: "월요일", roman: "woryoil", meaning: { id: "Senin", en: "Monday" } },
  { hangul: "화요일", roman: "hwayoil", meaning: { id: "Selasa", en: "Tuesday" } },
  { hangul: "수요일", roman: "suyoil", meaning: { id: "Rabu", en: "Wednesday" } },
  { hangul: "목요일", roman: "mogyoil", meaning: { id: "Kamis", en: "Thursday" } },
  { hangul: "금요일", roman: "geumyoil", meaning: { id: "Jumat", en: "Friday" } },
  { hangul: "토요일", roman: "toyoil", meaning: { id: "Sabtu", en: "Saturday" } },
  { hangul: "일요일", roman: "iryoil", meaning: { id: "Minggu", en: "Sunday" } },
  { hangul: "요일", roman: "yoil", meaning: { id: "hari (dalam minggu)", en: "day (of week)" } },
  { hangul: "주말", roman: "jumal", meaning: { id: "akhir pekan", en: "weekend" } },
  { hangul: "평일", roman: "pyeongil", meaning: { id: "hari kerja / hari biasa", en: "weekday" } },
  { hangul: "오늘", roman: "oneul", meaning: { id: "hari ini", en: "today" } },
  { hangul: "어제", roman: "eoje", meaning: { id: "kemarin", en: "yesterday" } },
  { hangul: "내일", roman: "naeil", meaning: { id: "besok", en: "tomorrow" } },
  { hangul: "모레", roman: "more", meaning: { id: "lusa", en: "day after tomorrow" } },
  { hangul: "그저께", roman: "geujeokke", meaning: { id: "kemarin lusa", en: "day before yesterday" } },
  { hangul: "매일", roman: "maeil", meaning: { id: "setiap hari", en: "every day" } },
  { hangul: "일주일", roman: "iljuil", meaning: { id: "satu minggu", en: "one week" } },
  { hangul: "이번 주", roman: "ibeon ju", meaning: { id: "minggu ini", en: "this week" } },
  { hangul: "지난 주", roman: "jinan ju", meaning: { id: "minggu lalu", en: "last week" } },
  { hangul: "다음 주", roman: "daeum ju", meaning: { id: "minggu depan", en: "next week" } },
  { hangul: "이번 달", roman: "ibeon dal", meaning: { id: "bulan ini", en: "this month" } },
  { hangul: "지난 달", roman: "jinan dal", meaning: { id: "bulan lalu", en: "last month" } },
  { hangul: "다음 달", roman: "daeum dal", meaning: { id: "bulan depan", en: "next month" } },
  { hangul: "올해", roman: "olhae", meaning: { id: "tahun ini", en: "this year" } },
  { hangul: "작년", roman: "jangnyeon", meaning: { id: "tahun lalu", en: "last year" } },
  { hangul: "내년", roman: "naenyeon", meaning: { id: "tahun depan", en: "next year" } }
] as const;

const TIMES: readonly VocabItem[] = [
  { hangul: "시간", roman: "sigan", meaning: { id: "waktu / jam (durasi)", en: "time / hour" } },
  { hangul: "시", roman: "si", meaning: { id: "jam (titik waktu)", en: "o'clock" } },
  { hangul: "분", roman: "bun", meaning: { id: "menit", en: "minute" } },
  { hangul: "초", roman: "cho", meaning: { id: "detik", en: "second" } },
  { hangul: "시계", roman: "sigye", meaning: { id: "jam (alat)", en: "clock / watch" } },
  { hangul: "오전", roman: "ojeon", meaning: { id: "pagi (AM, sebelum siang)", en: "morning (AM)" } },
  { hangul: "오후", roman: "ohu", meaning: { id: "siang/sore (PM)", en: "afternoon (PM)" } },
  { hangul: "아침", roman: "achim", meaning: { id: "pagi", en: "morning" } },
  { hangul: "점심", roman: "jeomsim", meaning: { id: "siang / makan siang", en: "lunch / noon" } },
  { hangul: "저녁", roman: "jeonyeok", meaning: { id: "petang / makan malam", en: "evening / dinner" } },
  { hangul: "밤", roman: "bam", meaning: { id: "malam", en: "night" } },
  { hangul: "새벽", roman: "saebyeok", meaning: { id: "dini hari / subuh", en: "dawn / early morning" } },
  { hangul: "정오", roman: "jeongo", meaning: { id: "tengah hari", en: "noon" } },
  { hangul: "자정", roman: "jajeong", meaning: { id: "tengah malam", en: "midnight" } },
  { hangul: "지금", roman: "jigeum", meaning: { id: "sekarang", en: "now" } },
  { hangul: "나중에", roman: "najunge", meaning: { id: "nanti", en: "later" } },
  { hangul: "방금", roman: "banggeum", meaning: { id: "baru saja / barusan", en: "just now" } },
  { hangul: "곧", roman: "got", meaning: { id: "segera", en: "soon" } },
  { hangul: "일찍", roman: "iljjik", meaning: { id: "awal / pagi-pagi", en: "early" } },
  { hangul: "늦게", roman: "neutge", meaning: { id: "terlambat / larut", en: "late" } },
  { hangul: "빨리", roman: "ppalli", meaning: { id: "cepat", en: "quickly / fast" } },
  { hangul: "천천히", roman: "cheoncheonhi", meaning: { id: "perlahan", en: "slowly" } },
  { hangul: "항상", roman: "hangsang", meaning: { id: "selalu", en: "always" } },
  { hangul: "자주", roman: "jaju", meaning: { id: "sering", en: "often" } },
  { hangul: "가끔", roman: "gakkeum", meaning: { id: "kadang-kadang", en: "sometimes" } }
] as const;

const PLACES: readonly VocabItem[] = [
  { hangul: "집", roman: "jip", meaning: { id: "rumah", en: "house / home" } },
  { hangul: "학교", roman: "hakgyo", meaning: { id: "sekolah", en: "school" } },
  { hangul: "회사", roman: "hoesa", meaning: { id: "kantor / perusahaan", en: "office / company" } },
  { hangul: "병원", roman: "byeongwon", meaning: { id: "rumah sakit", en: "hospital" } },
  { hangul: "약국", roman: "yakguk", meaning: { id: "apotek", en: "pharmacy" } },
  { hangul: "은행", roman: "eunhaeng", meaning: { id: "bank", en: "bank" } },
  { hangul: "시장", roman: "sijang", meaning: { id: "pasar", en: "market" } },
  { hangul: "백화점", roman: "baekhwajeom", meaning: { id: "department store", en: "department store" } },
  { hangul: "편의점", roman: "pyeonuijeom", meaning: { id: "minimarket", en: "convenience store" } },
  { hangul: "식당", roman: "sikdang", meaning: { id: "restoran", en: "restaurant" } },
  { hangul: "카페", roman: "kape", meaning: { id: "kafe", en: "café" } },
  { hangul: "공원", roman: "gongwon", meaning: { id: "taman", en: "park" } },
  { hangul: "도서관", roman: "doseogwan", meaning: { id: "perpustakaan", en: "library" } },
  { hangul: "박물관", roman: "bangmulgwan", meaning: { id: "museum", en: "museum" } },
  { hangul: "영화관", roman: "yeonghwagwan", meaning: { id: "bioskop", en: "cinema / movie theater" } },
  { hangul: "공항", roman: "gonghang", meaning: { id: "bandara", en: "airport" } },
  { hangul: "역", roman: "yeok", meaning: { id: "stasiun", en: "station" } },
  { hangul: "버스정류장", roman: "beoseu jeongnyujang", meaning: { id: "halte bus", en: "bus stop" } },
  { hangul: "지하철", roman: "jihacheol", meaning: { id: "kereta bawah tanah", en: "subway" } },
  { hangul: "화장실", roman: "hwajangsil", meaning: { id: "toilet", en: "toilet / restroom" } },
  { hangul: "교회", roman: "gyohoe", meaning: { id: "gereja", en: "church" } },
  { hangul: "절", roman: "jeol", meaning: { id: "kuil", en: "(Buddhist) temple" } },
  { hangul: "호텔", roman: "hotel", meaning: { id: "hotel", en: "hotel" } },
  { hangul: "바다", roman: "bada", meaning: { id: "laut", en: "sea" } },
  { hangul: "산", roman: "san", meaning: { id: "gunung", en: "mountain" } },
  { hangul: "강", roman: "gang", meaning: { id: "sungai", en: "river" } },
  { hangul: "동물원", roman: "dongmurwon", meaning: { id: "kebun binatang", en: "zoo" } },
  { hangul: "운동장", roman: "undongjang", meaning: { id: "lapangan olahraga", en: "sports field" } },
  { hangul: "주차장", roman: "juchajang", meaning: { id: "tempat parkir", en: "parking lot" } },
  { hangul: "우체국", roman: "ucheguk", meaning: { id: "kantor pos", en: "post office" } }
] as const;

const NUMBERS: readonly VocabItem[] = [
  { hangul: "영", roman: "yeong", meaning: { id: "nol (0)", en: "zero (0)" } },
  { hangul: "일", roman: "il", meaning: { id: "satu (1)", en: "one (1)" } },
  { hangul: "이", roman: "i", meaning: { id: "dua (2)", en: "two (2)" } },
  { hangul: "삼", roman: "sam", meaning: { id: "tiga (3)", en: "three (3)" } },
  { hangul: "사", roman: "sa", meaning: { id: "empat (4)", en: "four (4)" } },
  { hangul: "오", roman: "o", meaning: { id: "lima (5)", en: "five (5)" } },
  { hangul: "육", roman: "yuk", meaning: { id: "enam (6)", en: "six (6)" } },
  { hangul: "칠", roman: "chil", meaning: { id: "tujuh (7)", en: "seven (7)" } },
  { hangul: "팔", roman: "pal", meaning: { id: "delapan (8)", en: "eight (8)" } },
  { hangul: "구", roman: "gu", meaning: { id: "sembilan (9)", en: "nine (9)" } },
  { hangul: "십", roman: "sip", meaning: { id: "sepuluh (10)", en: "ten (10)" } },
  { hangul: "십일", roman: "sibil", meaning: { id: "sebelas (11)", en: "eleven (11)" } },
  { hangul: "십이", roman: "sibi", meaning: { id: "dua belas (12)", en: "twelve (12)" } },
  { hangul: "십삼", roman: "sipsam", meaning: { id: "tiga belas (13)", en: "thirteen (13)" } },
  { hangul: "이십", roman: "isip", meaning: { id: "dua puluh (20)", en: "twenty (20)" } },
  { hangul: "삼십", roman: "samsip", meaning: { id: "tiga puluh (30)", en: "thirty (30)" } },
  { hangul: "사십", roman: "sasip", meaning: { id: "empat puluh (40)", en: "forty (40)" } },
  { hangul: "오십", roman: "osip", meaning: { id: "lima puluh (50)", en: "fifty (50)" } },
  { hangul: "육십", roman: "yuksip", meaning: { id: "enam puluh (60)", en: "sixty (60)" } },
  { hangul: "칠십", roman: "chilsip", meaning: { id: "tujuh puluh (70)", en: "seventy (70)" } },
  { hangul: "팔십", roman: "palsip", meaning: { id: "delapan puluh (80)", en: "eighty (80)" } },
  { hangul: "구십", roman: "gusip", meaning: { id: "sembilan puluh (90)", en: "ninety (90)" } },
  { hangul: "백", roman: "baek", meaning: { id: "seratus (100)", en: "one hundred (100)" } },
  { hangul: "천", roman: "cheon", meaning: { id: "seribu (1.000)", en: "one thousand (1,000)" } },
  { hangul: "만", roman: "man", meaning: { id: "sepuluh ribu (10.000)", en: "ten thousand (10,000)" } },
  { hangul: "십만", roman: "simman", meaning: { id: "seratus ribu (100.000)", en: "one hundred thousand (100,000)" } },
  { hangul: "백만", roman: "baengman", meaning: { id: "satu juta (1.000.000)", en: "one million (1,000,000)" } }
] as const;

const VERBS: readonly VocabItem[] = [
  { hangul: "가다", roman: "gada", meaning: { id: "pergi", en: "to go" } },
  { hangul: "오다", roman: "oda", meaning: { id: "datang", en: "to come" } },
  { hangul: "먹다", roman: "meokda", meaning: { id: "makan", en: "to eat" } },
  { hangul: "마시다", roman: "masida", meaning: { id: "minum", en: "to drink" } },
  { hangul: "자다", roman: "jada", meaning: { id: "tidur", en: "to sleep" } },
  { hangul: "일어나다", roman: "ireonada", meaning: { id: "bangun", en: "to wake up / get up" } },
  { hangul: "보다", roman: "boda", meaning: { id: "melihat / menonton", en: "to see / watch" } },
  { hangul: "듣다", roman: "deutda", meaning: { id: "mendengar", en: "to listen / hear" } },
  { hangul: "말하다", roman: "malhada", meaning: { id: "berbicara", en: "to speak / talk" } },
  { hangul: "읽다", roman: "ikda", meaning: { id: "membaca", en: "to read" } },
  { hangul: "쓰다", roman: "sseuda", meaning: { id: "menulis", en: "to write" } },
  { hangul: "공부하다", roman: "gongbuhada", meaning: { id: "belajar", en: "to study" } },
  { hangul: "일하다", roman: "ilhada", meaning: { id: "bekerja", en: "to work" } },
  { hangul: "쉬다", roman: "swida", meaning: { id: "beristirahat", en: "to rest" } },
  { hangul: "놀다", roman: "nolda", meaning: { id: "bermain", en: "to play" } },
  { hangul: "사다", roman: "sada", meaning: { id: "membeli", en: "to buy" } },
  { hangul: "팔다", roman: "palda", meaning: { id: "menjual", en: "to sell" } },
  { hangul: "주다", roman: "juda", meaning: { id: "memberi", en: "to give" } },
  { hangul: "받다", roman: "batda", meaning: { id: "menerima", en: "to receive" } },
  { hangul: "만나다", roman: "mannada", meaning: { id: "bertemu", en: "to meet" } },
  { hangul: "사랑하다", roman: "saranghada", meaning: { id: "mencintai", en: "to love" } },
  { hangul: "좋아하다", roman: "joahada", meaning: { id: "menyukai", en: "to like" } },
  { hangul: "싫어하다", roman: "sireohada", meaning: { id: "tidak suka / benci", en: "to dislike / hate" } },
  { hangul: "알다", roman: "alda", meaning: { id: "tahu / mengenal", en: "to know" } },
  { hangul: "모르다", roman: "moreuda", meaning: { id: "tidak tahu", en: "to not know" } },
  { hangul: "걷다", roman: "geotda", meaning: { id: "berjalan", en: "to walk" } },
  { hangul: "뛰다", roman: "ttwida", meaning: { id: "berlari / melompat", en: "to run / jump" } },
  { hangul: "앉다", roman: "anda", meaning: { id: "duduk", en: "to sit" } },
  { hangul: "서다", roman: "seoda", meaning: { id: "berdiri", en: "to stand" } },
  { hangul: "웃다", roman: "utda", meaning: { id: "tertawa", en: "to laugh / smile" } },
  { hangul: "울다", roman: "ulda", meaning: { id: "menangis", en: "to cry" } },
  { hangul: "기다리다", roman: "gidarida", meaning: { id: "menunggu", en: "to wait" } },
  { hangul: "찾다", roman: "chatda", meaning: { id: "mencari", en: "to look for / find" } },
  { hangul: "열다", roman: "yeolda", meaning: { id: "membuka", en: "to open" } },
  { hangul: "닫다", roman: "datda", meaning: { id: "menutup", en: "to close" } }
] as const;

export function getVocabList(category: VocabCategory): readonly VocabItem[] {
  switch (category) {
    case "expressions":
      return EXPRESSIONS;
    case "days":
      return DAYS;
    case "time":
      return TIMES;
    case "places":
      return PLACES;
    case "numbers":
      return NUMBERS;
    case "verbs":
      return VERBS;
  }
}

export function getCategoryConfig(category: VocabCategory): VocabCategoryConfig {
  const found = VOCAB_CATEGORIES.find((c) => c.id === category);
  return found ?? VOCAB_CATEGORIES[0]!;
}

export function pickRandomItem(
  list: readonly VocabItem[],
  excludeHangul?: string,
  rng: () => number = Math.random
): VocabItem {
  if (list.length === 0) throw new Error("Empty vocab list");
  if (list.length === 1 || !excludeHangul) {
    return list[Math.floor(rng() * list.length)]!;
  }
  const filtered = list.filter((i) => i.hangul !== excludeHangul);
  return filtered[Math.floor(rng() * filtered.length)]!;
}

function normalizeAnswer(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replaceAll(/[().,]/g, "")
    .replaceAll(/\s+/g, " ");
}

export function isCorrectMeaning(
  input: string,
  item: VocabItem,
  lang: "id" | "en"
): boolean {
  const normalized = normalizeAnswer(input);
  if (!normalized) return false;
  const target = item.meaning[lang];
  const variants = target
    .split("/")
    .map((s) => normalizeAnswer(s.replaceAll(/\([^)]*\)/g, "")));
  return variants.some((v) => v === normalized);
}
