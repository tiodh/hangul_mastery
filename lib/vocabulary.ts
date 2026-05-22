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
    label: { id: "Ungkapan Umum", en: "Common Expressions", hi: "सामान्य अभिव्यक्तियाँ" },
    description: {
      id: "Frasa sehari-hari: terima kasih, maaf, permisi, sapaan, dll.",
      en: "Everyday phrases: thank you, sorry, excuse me, greetings, and more.",
      hi: "रोज़मर्रा के वाक्यांश: धन्यवाद, माफ़ी, अनुमति, अभिवादन आदि।"
    },
    emoji: "🙏",
    usageExamples: [
      { kind: "statement", korean: "만나서 반갑습니다.", roman: "mannaseo bangapseumnida.", meaning: { id: "Senang bertemu Anda.", en: "Nice to meet you.", hi: "आपसे मिलकर ख़ुशी हुई।" } },
      { kind: "statement", korean: "잘 부탁드립니다.", roman: "jal butakdeurimnida.", meaning: { id: "Mohon bantuannya.", en: "I look forward to working with you.", hi: "कृपया मेरा साथ देना।" }, note: { id: "Sering diucapkan setelah perkenalan.", en: "Often said right after introducing yourself.", hi: "अक्सर परिचय के तुरंत बाद कहा जाता है।" } },
      { kind: "question", korean: "괜찮아요?", roman: "gwaenchanayo?", meaning: { id: "Kamu baik-baik saja?", en: "Are you okay?", hi: "क्या आप ठीक हैं?" }, note: { id: "Bisa dijawab dengan 네, 괜찮아요 atau 아니요.", en: "Can be answered with 네, 괜찮아요 or 아니요.", hi: "उत्तर: 네, 괜찮아요 या 아니요।" } },
      { kind: "question", korean: "알겠어요?", roman: "algesseoyo?", meaning: { id: "Apakah Anda mengerti?", en: "Do you understand?", hi: "क्या आप समझ गए?" } },
      { kind: "positive", korean: "네, 알겠어요. 감사합니다.", roman: "ne, algesseoyo. gamsahamnida.", meaning: { id: "Ya, saya mengerti. Terima kasih.", en: "Yes, I understand. Thank you.", hi: "हाँ, मैं समझ गया। धन्यवाद।" } },
      { kind: "positive", korean: "네, 괜찮아요.", roman: "ne, gwaenchanayo.", meaning: { id: "Ya, tidak apa-apa.", en: "Yes, it's okay.", hi: "हाँ, ठीक है।" } },
      { kind: "negative", korean: "아니요, 죄송합니다. 잘 몰라요.", roman: "aniyo, joesonghamnida. jal mollayo.", meaning: { id: "Tidak, maaf. Saya kurang tahu.", en: "No, sorry. I don't really know.", hi: "नहीं, माफ़ कीजिए। मुझे ठीक से नहीं पता।" } },
      { kind: "negative", korean: "아니요, 괜찮아요. 감사합니다.", roman: "aniyo, gwaenchanayo. gamsahamnida.", meaning: { id: "Tidak (perlu), tidak apa-apa. Terima kasih.", en: "No (thanks), I'm fine. Thank you.", hi: "नहीं (शुक्रिया), मैं ठीक हूँ। धन्यवाद।" }, note: { id: "Bisa dipakai menolak tawaran dengan sopan.", en: "Use this to politely decline an offer.", hi: "विनम्रता से प्रस्ताव अस्वीकार करने के लिए।" } }
    ]
  },
  {
    id: "days",
    label: { id: "Hari", en: "Days", hi: "दिन" },
    description: {
      id: "Nama hari, akhir pekan, dan kata waktu relatif (kemarin, hari ini, besok)",
      en: "Day names, weekend/weekday, and relative-day words (yesterday, today, tomorrow)",
      hi: "दिनों के नाम, सप्ताहांत, और सापेक्ष-दिन शब्द (कल, आज, कल)"
    },
    emoji: "📅",
    usageExamples: [
      { kind: "statement", korean: "오늘은 월요일이에요.", roman: "oneureun woryoiri-eyo.", meaning: { id: "Hari ini hari Senin.", en: "Today is Monday.", hi: "आज सोमवार है।" }, note: { id: "Memakai 오늘 (hari ini) + 월요일 (Senin).", en: "Uses 오늘 (today) + 월요일 (Monday).", hi: "오늘 (आज) + 월요일 (सोमवार) का उपयोग।" } },
      { kind: "statement", korean: "내일 학교에 가요.", roman: "naeil hakgyoe gayo.", meaning: { id: "Besok (saya) pergi ke sekolah.", en: "(I) go to school tomorrow.", hi: "कल मैं स्कूल जाऊँगा।" }, note: { id: "내일 = besok", en: "내일 = tomorrow", hi: "내일 = कल (आने वाला)" } },
      { kind: "question", korean: "오늘이 무슨 요일이에요?", roman: "oneuri museun yoiri-eyo?", meaning: { id: "Hari ini hari apa?", en: "What day is today?", hi: "आज कौन सा दिन है?" }, note: { id: "요일 = hari (dalam minggu)", en: "요일 = day of the week", hi: "요일 = सप्ताह का दिन" } },
      { kind: "question", korean: "주말에 뭐 해요?", roman: "jumare mwo haeyo?", meaning: { id: "Akhir pekan ngapain?", en: "What are you doing on the weekend?", hi: "सप्ताहांत में आप क्या करते हैं?" }, note: { id: "주말 = akhir pekan", en: "주말 = weekend", hi: "주말 = सप्ताहांत" } },
      { kind: "positive", korean: "네, 어제 만났어요.", roman: "ne, eoje mannasseoyo.", meaning: { id: "Ya, (kami) bertemu kemarin.", en: "Yes, we met yesterday.", hi: "हाँ, हम कल मिले थे।" }, note: { id: "어제 = kemarin", en: "어제 = yesterday", hi: "어제 = कल (बीता)" } },
      { kind: "positive", korean: "네, 매일 운동해요.", roman: "ne, maeil undonghaeyo.", meaning: { id: "Ya, (saya) berolahraga setiap hari.", en: "Yes, I exercise every day.", hi: "हाँ, मैं हर दिन व्यायाम करता हूँ।" }, note: { id: "매일 = setiap hari", en: "매일 = every day", hi: "매일 = हर दिन" } },
      { kind: "negative", korean: "아니요, 내일 안 가요.", roman: "aniyo, naeil an gayo.", meaning: { id: "Tidak, (saya) tidak pergi besok.", en: "No, I'm not going tomorrow.", hi: "नहीं, मैं कल नहीं जाऊँगा।" } },
      { kind: "negative", korean: "아니요, 토요일이 아니에요.", roman: "aniyo, toyoiri anieyo.", meaning: { id: "Bukan, hari ini bukan Sabtu.", en: "No, today is not Saturday.", hi: "नहीं, आज शनिवार नहीं है।" } }
    ]
  },
  {
    id: "time",
    label: { id: "Waktu", en: "Time", hi: "समय" },
    description: {
      id: "Bagian hari, jam, dan kata pengatur waktu (sekarang, nanti, segera)",
      en: "Parts of day, clock units, and time markers (now, later, soon)",
      hi: "दिन के भाग, घड़ी की इकाइयाँ, और समय संकेतक (अभी, बाद में, जल्द ही)"
    },
    emoji: "🕐",
    usageExamples: [
      { kind: "statement", korean: "지금 오후 두 시예요.", roman: "jigeum ohu du siyeyo.", meaning: { id: "Sekarang pukul 2 sore.", en: "It's 2 PM now.", hi: "अभी दोपहर 2 बजे हैं।" }, note: { id: "지금 (sekarang) + 오후 (sore) + 시 (jam)", en: "지금 (now) + 오후 (PM) + 시 (o'clock)", hi: "지금 (अभी) + 오후 (अपराह्न) + 시 (बजे)" } },
      { kind: "statement", korean: "아침에 커피를 마셔요.", roman: "achime keopireul masyeoyo.", meaning: { id: "Pagi hari (saya) minum kopi.", en: "I drink coffee in the morning.", hi: "मैं सुबह कॉफ़ी पीता हूँ।" }, note: { id: "아침 = pagi", en: "아침 = morning", hi: "아침 = सुबह" } },
      { kind: "question", korean: "지금 몇 시예요?", roman: "jigeum myeot siyeyo?", meaning: { id: "Sekarang jam berapa?", en: "What time is it now?", hi: "अभी कितने बजे हैं?" }, note: { id: "몇 시 = jam berapa", en: "몇 시 = what time", hi: "몇 시 = कितने बजे" } },
      { kind: "question", korean: "언제 시간이 있어요?", roman: "eonje sigani isseoyo?", meaning: { id: "Kapan ada waktu (luang)?", en: "When do you have free time?", hi: "आपके पास कब समय है?" }, note: { id: "시간 = waktu", en: "시간 = time", hi: "시간 = समय" } },
      { kind: "positive", korean: "네, 빨리 갈게요.", roman: "ne, ppalli galgeyo.", meaning: { id: "Ya, (saya) akan segera pergi.", en: "Yes, I'll go quickly.", hi: "हाँ, मैं जल्दी जाऊँगा।" }, note: { id: "빨리 = cepat", en: "빨리 = quickly", hi: "빨리 = जल्दी" } },
      { kind: "positive", korean: "네, 저녁에 만나요.", roman: "ne, jeonyeoge mannayo.", meaning: { id: "Ya, mari bertemu di malam hari.", en: "Yes, let's meet in the evening.", hi: "हाँ, शाम को मिलते हैं।" }, note: { id: "저녁 = malam/petang", en: "저녁 = evening", hi: "저녁 = शाम" } },
      { kind: "negative", korean: "아니요, 시간이 없어요.", roman: "aniyo, sigani eopseoyo.", meaning: { id: "Tidak, (saya) tidak ada waktu.", en: "No, I don't have time.", hi: "नहीं, मेरे पास समय नहीं है।" } },
      { kind: "negative", korean: "아니요, 천천히 가요.", roman: "aniyo, cheoncheonhi gayo.", meaning: { id: "Tidak (perlu buru-buru), (saya) jalan pelan saja.", en: "No, I'll go slowly.", hi: "नहीं, मैं धीरे चलूँगा।" }, note: { id: "천천히 = perlahan", en: "천천히 = slowly", hi: "천천히 = धीरे" } }
    ]
  },
  {
    id: "places",
    label: { id: "Nama Tempat", en: "Places", hi: "स्थान" },
    description: {
      id: "Kosakata tempat dan lokasi sehari-hari",
      en: "Common places and locations",
      hi: "रोज़मर्रा के स्थान और लोकेशन"
    },
    emoji: "🏛️",
    usageExamples: [
      { kind: "statement", korean: "저는 학교에 가요.", roman: "jeoneun hakgyoe gayo.", meaning: { id: "Saya pergi ke sekolah.", en: "I go to school.", hi: "मैं स्कूल जाता हूँ।" } },
      { kind: "statement", korean: "친구가 카페에 있어요.", roman: "chinguga kapee isseoyo.", meaning: { id: "Teman ada di kafe.", en: "My friend is at the café.", hi: "मेरा दोस्त कैफ़े में है।" } },
      { kind: "question", korean: "학교가 어디에 있어요?", roman: "hakgyoga eodie isseoyo?", meaning: { id: "Sekolah ada di mana?", en: "Where is the school?", hi: "स्कूल कहाँ है?" }, note: { id: "어디 = di mana", en: "어디 = where", hi: "어디 = कहाँ" } },
      { kind: "question", korean: "병원이 어디에 있어요?", roman: "byeongwoni eodie isseoyo?", meaning: { id: "Di mana rumah sakitnya?", en: "Where is the hospital?", hi: "अस्पताल कहाँ है?" } },
      { kind: "positive", korean: "네, 시장에 가요.", roman: "ne, sijange gayo.", meaning: { id: "Ya, (saya) pergi ke pasar.", en: "Yes, I'm going to the market.", hi: "हाँ, मैं बाज़ार जा रहा हूँ।" } },
      { kind: "positive", korean: "네, 학교 근처에 있어요.", roman: "ne, hakgyo geuncheoe isseoyo.", meaning: { id: "Ya, ada di dekat sekolah.", en: "Yes, it's near the school.", hi: "हाँ, यह स्कूल के पास है।" } },
      { kind: "negative", korean: "아니요, 병원에 안 가요.", roman: "aniyo, byeongwone an gayo.", meaning: { id: "Tidak, (saya) tidak pergi ke rumah sakit.", en: "No, I'm not going to the hospital.", hi: "नहीं, मैं अस्पताल नहीं जा रहा।" } },
      { kind: "negative", korean: "아니요, 카페에 없어요.", roman: "aniyo, kapee eopseoyo.", meaning: { id: "Tidak, tidak ada di kafe.", en: "No, (he/she) isn't at the café.", hi: "नहीं, वह कैफ़े में नहीं है।" } }
    ]
  },
  {
    id: "numbers",
    label: { id: "Angka", en: "Numbers", hi: "संख्या" },
    description: {
      id: "Angka Sino-Korean (한자어) 1 sampai 100+",
      en: "Sino-Korean numbers (한자어) from 0 to 1,000,000",
      hi: "साइनो-कोरियाई संख्याएँ (한자어) 0 से 10,00,000 तक"
    },
    emoji: "🔢",
    usageExamples: [
      { kind: "statement", korean: "사과가 천 원이에요.", roman: "sagwaga cheon woni-eyo.", meaning: { id: "Apel harganya 1.000 won.", en: "The apple is 1,000 won.", hi: "सेब 1,000 वॉन का है।" }, note: { id: "Memakai 천 (1.000).", en: "Uses 천 (1,000).", hi: "천 (1,000) का उपयोग।" } },
      { kind: "statement", korean: "가방이 십만 원이에요.", roman: "gabangi simman woni-eyo.", meaning: { id: "Tas harganya 100.000 won.", en: "The bag is 100,000 won.", hi: "बैग 1,00,000 वॉन का है।" }, note: { id: "Memakai 십만 (100.000).", en: "Uses 십만 (100,000).", hi: "십만 (1,00,000) का उपयोग।" } },
      { kind: "question", korean: "백 원이에요?", roman: "baek woni-eyo?", meaning: { id: "Apakah 100 won?", en: "Is it 100 won?", hi: "क्या यह 100 वॉन है?" }, note: { id: "Memakai 백 (100).", en: "Uses 백 (100).", hi: "백 (100) का उपयोग।" } },
      { kind: "question", korean: "책이 만 원이에요?", roman: "chaegi man woni-eyo?", meaning: { id: "Apakah buku 10.000 won?", en: "Is the book 10,000 won?", hi: "क्या किताब 10,000 वॉन की है?" } },
      { kind: "positive", korean: "네, 만 원이에요.", roman: "ne, man woni-eyo.", meaning: { id: "Ya, 10.000 won.", en: "Yes, it's 10,000 won.", hi: "हाँ, 10,000 वॉन है।" } },
      { kind: "positive", korean: "네, 천 원이에요.", roman: "ne, cheon woni-eyo.", meaning: { id: "Ya, 1.000 won.", en: "Yes, it's 1,000 won.", hi: "हाँ, 1,000 वॉन है।" } },
      { kind: "negative", korean: "아니요, 만 원이 아니에요.", roman: "aniyo, man woni anieyo.", meaning: { id: "Bukan, bukan 10.000 won.", en: "No, it's not 10,000 won.", hi: "नहीं, यह 10,000 वॉन नहीं है।" } },
      { kind: "negative", korean: "아니요, 백 원이 아니에요.", roman: "aniyo, baek woni anieyo.", meaning: { id: "Bukan, bukan 100 won.", en: "No, it's not 100 won.", hi: "नहीं, यह 100 वॉन नहीं है।" } }
    ]
  },
  {
    id: "verbs",
    label: { id: "Kata Kerja", en: "Verbs", hi: "क्रियाएँ" },
    description: {
      id: "Kata kerja dasar dalam bentuk infinitif",
      en: "Basic verbs in dictionary (infinitive) form",
      hi: "शब्दकोश रूप में बुनियादी क्रियाएँ"
    },
    emoji: "🏃",
    usageExamples: [
      { kind: "statement", korean: "한국어를 공부해요.", roman: "hangugeoreul gongbuhaeyo.", meaning: { id: "(Saya) belajar bahasa Korea.", en: "(I) study Korean.", hi: "(मैं) कोरियाई पढ़ाई करता हूँ।" } },
      { kind: "statement", korean: "친구를 만나요.", roman: "chingureul mannayo.", meaning: { id: "(Saya) bertemu teman.", en: "(I) meet a friend.", hi: "(मैं) दोस्त से मिलता हूँ।" } },
      { kind: "question", korean: "뭐 먹어요?", roman: "mwo meogeoyo?", meaning: { id: "Makan apa?", en: "What are (you) eating?", hi: "(आप) क्या खा रहे हैं?" }, note: { id: "Memakai 먹다 (makan).", en: "Uses 먹다 (to eat).", hi: "먹다 (खाना) का उपयोग।" } },
      { kind: "question", korean: "지금 어디에 가요?", roman: "jigeum eodie gayo?", meaning: { id: "Sekarang pergi ke mana?", en: "Where are (you) going now?", hi: "अभी (आप) कहाँ जा रहे हैं?" } },
      { kind: "positive", korean: "네, 공부해요.", roman: "ne, gongbuhaeyo.", meaning: { id: "Ya, (saya) sedang belajar.", en: "Yes, (I'm) studying.", hi: "हाँ, (मैं) पढ़ाई कर रहा हूँ।" } },
      { kind: "positive", korean: "네, 한국어를 공부해요.", roman: "ne, hangugeoreul gongbuhaeyo.", meaning: { id: "Ya, (saya) belajar bahasa Korea.", en: "Yes, (I'm) studying Korean.", hi: "हाँ, (मैं) कोरियाई पढ़ाई कर रहा हूँ।" } },
      { kind: "negative", korean: "아니요, 안 공부해요.", roman: "aniyo, an gongbuhaeyo.", meaning: { id: "Tidak, (saya) tidak belajar.", en: "No, (I'm) not studying.", hi: "नहीं, (मैं) पढ़ाई नहीं कर रहा।" }, note: { id: "Negatif: 안 + kata kerja", en: "Negative: 안 + verb", hi: "नकारात्मक: 안 + क्रिया" } },
      { kind: "negative", korean: "아니요, 친구를 안 만나요.", roman: "aniyo, chingureul an mannayo.", meaning: { id: "Tidak, (saya) tidak bertemu teman.", en: "No, (I'm) not meeting any friend.", hi: "नहीं, (मैं) किसी दोस्त से नहीं मिल रहा।" } }
    ]
  }
] as const;

const EXPRESSIONS: readonly VocabItem[] = [
  { hangul: "안녕하세요", roman: "annyeonghaseyo", meaning: { id: "halo / selamat (pagi/siang/sore/malam)", en: "hello / good day", hi: "नमस्ते" } },
  { hangul: "안녕히 가세요", roman: "annyeonghi gaseyo", meaning: { id: "selamat jalan", en: "goodbye (to someone leaving)", hi: "अलविदा (जाने वाले को)" } },
  { hangul: "안녕히 계세요", roman: "annyeonghi gyeseyo", meaning: { id: "selamat tinggal", en: "goodbye (to someone staying)", hi: "अलविदा (रहने वाले को)" } },
  { hangul: "만나서 반갑습니다", roman: "mannaseo bangapseumnida", meaning: { id: "senang bertemu", en: "nice to meet you", hi: "आपसे मिलकर ख़ुशी हुई" } },
  { hangul: "오랜만이에요", roman: "oraenmanieyo", meaning: { id: "lama tidak bertemu", en: "long time no see", hi: "बहुत दिनों बाद मिले" } },
  { hangul: "감사합니다", roman: "gamsahamnida", meaning: { id: "terima kasih (formal)", en: "thank you (formal)", hi: "धन्यवाद (आदरयुक्त)" } },
  { hangul: "고맙습니다", roman: "gomapseumnida", meaning: { id: "terima kasih", en: "thank you", hi: "धन्यवाद" } },
  { hangul: "고마워요", roman: "gomawoyo", meaning: { id: "terima kasih (kasual)", en: "thanks (casual)", hi: "धन्यवाद (सहज)" } },
  { hangul: "천만에요", roman: "cheonmaneyo", meaning: { id: "sama-sama", en: "you're welcome", hi: "कोई बात नहीं" } },
  { hangul: "죄송합니다", roman: "joesonghamnida", meaning: { id: "maaf (formal)", en: "I'm sorry (formal)", hi: "माफ़ कीजिए (आदरयुक्त)" } },
  { hangul: "미안해요", roman: "mianhaeyo", meaning: { id: "maaf (kasual)", en: "sorry (casual)", hi: "माफ़ करना (सहज)" } },
  { hangul: "실례합니다", roman: "sillyehamnida", meaning: { id: "permisi", en: "excuse me", hi: "क्षमा करें" } },
  { hangul: "잠시만요", roman: "jamsimanyo", meaning: { id: "sebentar / tunggu sebentar", en: "just a moment / wait a sec", hi: "एक पल / थोड़ी देर रुकें" } },
  { hangul: "네", roman: "ne", meaning: { id: "ya", en: "yes", hi: "हाँ" } },
  { hangul: "아니요", roman: "aniyo", meaning: { id: "tidak", en: "no", hi: "नहीं" } },
  { hangul: "괜찮아요", roman: "gwaenchanayo", meaning: { id: "tidak apa-apa / baik-baik saja", en: "it's okay / I'm fine", hi: "ठीक है / मैं ठीक हूँ" } },
  { hangul: "알겠어요", roman: "algesseoyo", meaning: { id: "saya mengerti", en: "I understand / got it", hi: "मैं समझ गया" } },
  { hangul: "몰라요", roman: "mollayo", meaning: { id: "saya tidak tahu", en: "I don't know", hi: "मुझे नहीं पता" } },
  { hangul: "도와주세요", roman: "dowajuseyo", meaning: { id: "tolong saya", en: "please help me", hi: "कृपया मेरी मदद करें" } },
  { hangul: "다시 한번 말해 주세요", roman: "dasi hanbeon malhae juseyo", meaning: { id: "tolong ulangi sekali lagi", en: "please say that again", hi: "कृपया फिर से कहें" } },
  { hangul: "천천히 말해 주세요", roman: "cheoncheonhi malhae juseyo", meaning: { id: "tolong bicara perlahan", en: "please speak slowly", hi: "कृपया धीरे बोलें" } },
  { hangul: "잘 부탁드립니다", roman: "jal butakdeurimnida", meaning: { id: "mohon bantuannya", en: "I look forward to working with you", hi: "कृपया मेरा साथ देना" } },
  { hangul: "잘 먹겠습니다", roman: "jal meokgesseumnida", meaning: { id: "selamat makan (sebelum makan)", en: "thanks for the meal (before eating)", hi: "अच्छे से खाऊँगा (खाने से पहले)" } },
  { hangul: "잘 먹었습니다", roman: "jal meogeosseumnida", meaning: { id: "terima kasih atas makanannya (sesudah makan)", en: "thanks for the meal (after eating)", hi: "खाना अच्छा था, धन्यवाद (खाने के बाद)" } },
  { hangul: "잘 자요", roman: "jal jayo", meaning: { id: "selamat tidur", en: "good night", hi: "शुभ रात्रि" } },
  { hangul: "화이팅", roman: "hwaiting", meaning: { id: "semangat", en: "fighting / cheer up", hi: "जोश में रहो / शाबाश" } }
] as const;

const DAYS: readonly VocabItem[] = [
  { hangul: "월요일", roman: "woryoil", meaning: { id: "Senin", en: "Monday", hi: "सोमवार" } },
  { hangul: "화요일", roman: "hwayoil", meaning: { id: "Selasa", en: "Tuesday", hi: "मंगलवार" } },
  { hangul: "수요일", roman: "suyoil", meaning: { id: "Rabu", en: "Wednesday", hi: "बुधवार" } },
  { hangul: "목요일", roman: "mogyoil", meaning: { id: "Kamis", en: "Thursday", hi: "गुरुवार" } },
  { hangul: "금요일", roman: "geumyoil", meaning: { id: "Jumat", en: "Friday", hi: "शुक्रवार" } },
  { hangul: "토요일", roman: "toyoil", meaning: { id: "Sabtu", en: "Saturday", hi: "शनिवार" } },
  { hangul: "일요일", roman: "iryoil", meaning: { id: "Minggu", en: "Sunday", hi: "रविवार" } },
  { hangul: "요일", roman: "yoil", meaning: { id: "hari (dalam minggu)", en: "day (of week)", hi: "सप्ताह का दिन" } },
  { hangul: "주말", roman: "jumal", meaning: { id: "akhir pekan", en: "weekend", hi: "सप्ताहांत" } },
  { hangul: "평일", roman: "pyeongil", meaning: { id: "hari kerja / hari biasa", en: "weekday", hi: "कार्यदिवस" } },
  { hangul: "오늘", roman: "oneul", meaning: { id: "hari ini", en: "today", hi: "आज" } },
  { hangul: "어제", roman: "eoje", meaning: { id: "kemarin", en: "yesterday", hi: "कल (बीता)" } },
  { hangul: "내일", roman: "naeil", meaning: { id: "besok", en: "tomorrow", hi: "कल (आने वाला)" } },
  { hangul: "모레", roman: "more", meaning: { id: "lusa", en: "day after tomorrow", hi: "परसों (आने वाला)" } },
  { hangul: "그저께", roman: "geujeokke", meaning: { id: "kemarin lusa", en: "day before yesterday", hi: "परसों (बीता)" } },
  { hangul: "매일", roman: "maeil", meaning: { id: "setiap hari", en: "every day", hi: "हर दिन" } },
  { hangul: "일주일", roman: "iljuil", meaning: { id: "satu minggu", en: "one week", hi: "एक सप्ताह" } },
  { hangul: "이번 주", roman: "ibeon ju", meaning: { id: "minggu ini", en: "this week", hi: "इस सप्ताह" } },
  { hangul: "지난 주", roman: "jinan ju", meaning: { id: "minggu lalu", en: "last week", hi: "पिछले सप्ताह" } },
  { hangul: "다음 주", roman: "daeum ju", meaning: { id: "minggu depan", en: "next week", hi: "अगले सप्ताह" } },
  { hangul: "이번 달", roman: "ibeon dal", meaning: { id: "bulan ini", en: "this month", hi: "इस महीने" } },
  { hangul: "지난 달", roman: "jinan dal", meaning: { id: "bulan lalu", en: "last month", hi: "पिछले महीने" } },
  { hangul: "다음 달", roman: "daeum dal", meaning: { id: "bulan depan", en: "next month", hi: "अगले महीने" } },
  { hangul: "올해", roman: "olhae", meaning: { id: "tahun ini", en: "this year", hi: "इस साल" } },
  { hangul: "작년", roman: "jangnyeon", meaning: { id: "tahun lalu", en: "last year", hi: "पिछले साल" } },
  { hangul: "내년", roman: "naenyeon", meaning: { id: "tahun depan", en: "next year", hi: "अगले साल" } }
] as const;

const TIMES: readonly VocabItem[] = [
  { hangul: "시간", roman: "sigan", meaning: { id: "waktu / jam (durasi)", en: "time / hour", hi: "समय / घंटा" } },
  { hangul: "시", roman: "si", meaning: { id: "jam (titik waktu)", en: "o'clock", hi: "बजे" } },
  { hangul: "분", roman: "bun", meaning: { id: "menit", en: "minute", hi: "मिनट" } },
  { hangul: "초", roman: "cho", meaning: { id: "detik", en: "second", hi: "सेकंड" } },
  { hangul: "시계", roman: "sigye", meaning: { id: "jam (alat)", en: "clock / watch", hi: "घड़ी" } },
  { hangul: "오전", roman: "ojeon", meaning: { id: "pagi (AM, sebelum siang)", en: "morning (AM)", hi: "पूर्वाह्न (दोपहर से पहले)" } },
  { hangul: "오후", roman: "ohu", meaning: { id: "siang/sore (PM)", en: "afternoon (PM)", hi: "अपराह्न (दोपहर के बाद)" } },
  { hangul: "아침", roman: "achim", meaning: { id: "pagi", en: "morning", hi: "सुबह" } },
  { hangul: "점심", roman: "jeomsim", meaning: { id: "siang / makan siang", en: "lunch / noon", hi: "दोपहर / दोपहर का खाना" } },
  { hangul: "저녁", roman: "jeonyeok", meaning: { id: "petang / makan malam", en: "evening / dinner", hi: "शाम / रात का खाना" } },
  { hangul: "밤", roman: "bam", meaning: { id: "malam", en: "night", hi: "रात" } },
  { hangul: "새벽", roman: "saebyeok", meaning: { id: "dini hari / subuh", en: "dawn / early morning", hi: "भोर / तड़के" } },
  { hangul: "정오", roman: "jeongo", meaning: { id: "tengah hari", en: "noon", hi: "दोपहर (मध्याह्न)" } },
  { hangul: "자정", roman: "jajeong", meaning: { id: "tengah malam", en: "midnight", hi: "आधी रात" } },
  { hangul: "지금", roman: "jigeum", meaning: { id: "sekarang", en: "now", hi: "अभी" } },
  { hangul: "나중에", roman: "najunge", meaning: { id: "nanti", en: "later", hi: "बाद में" } },
  { hangul: "방금", roman: "banggeum", meaning: { id: "baru saja / barusan", en: "just now", hi: "अभी-अभी" } },
  { hangul: "곧", roman: "got", meaning: { id: "segera", en: "soon", hi: "जल्द ही" } },
  { hangul: "일찍", roman: "iljjik", meaning: { id: "awal / pagi-pagi", en: "early", hi: "जल्दी" } },
  { hangul: "늦게", roman: "neutge", meaning: { id: "terlambat / larut", en: "late", hi: "देर से" } },
  { hangul: "빨리", roman: "ppalli", meaning: { id: "cepat", en: "quickly / fast", hi: "जल्दी से / तेज़" } },
  { hangul: "천천히", roman: "cheoncheonhi", meaning: { id: "perlahan", en: "slowly", hi: "धीरे" } },
  { hangul: "항상", roman: "hangsang", meaning: { id: "selalu", en: "always", hi: "हमेशा" } },
  { hangul: "자주", roman: "jaju", meaning: { id: "sering", en: "often", hi: "अक्सर" } },
  { hangul: "가끔", roman: "gakkeum", meaning: { id: "kadang-kadang", en: "sometimes", hi: "कभी-कभी" } }
] as const;

const PLACES: readonly VocabItem[] = [
  { hangul: "집", roman: "jip", meaning: { id: "rumah", en: "house / home", hi: "घर" } },
  { hangul: "학교", roman: "hakgyo", meaning: { id: "sekolah", en: "school", hi: "स्कूल" } },
  { hangul: "회사", roman: "hoesa", meaning: { id: "kantor / perusahaan", en: "office / company", hi: "कार्यालय / कंपनी" } },
  { hangul: "병원", roman: "byeongwon", meaning: { id: "rumah sakit", en: "hospital", hi: "अस्पताल" } },
  { hangul: "약국", roman: "yakguk", meaning: { id: "apotek", en: "pharmacy", hi: "दवाख़ाना" } },
  { hangul: "은행", roman: "eunhaeng", meaning: { id: "bank", en: "bank", hi: "बैंक" } },
  { hangul: "시장", roman: "sijang", meaning: { id: "pasar", en: "market", hi: "बाज़ार" } },
  { hangul: "백화점", roman: "baekhwajeom", meaning: { id: "department store", en: "department store", hi: "डिपार्टमेंट स्टोर" } },
  { hangul: "편의점", roman: "pyeonuijeom", meaning: { id: "minimarket", en: "convenience store", hi: "सुविधा-दुकान" } },
  { hangul: "식당", roman: "sikdang", meaning: { id: "restoran", en: "restaurant", hi: "रेस्तरां" } },
  { hangul: "카페", roman: "kape", meaning: { id: "kafe", en: "café", hi: "कैफ़े" } },
  { hangul: "공원", roman: "gongwon", meaning: { id: "taman", en: "park", hi: "पार्क" } },
  { hangul: "도서관", roman: "doseogwan", meaning: { id: "perpustakaan", en: "library", hi: "पुस्तकालय" } },
  { hangul: "박물관", roman: "bangmulgwan", meaning: { id: "museum", en: "museum", hi: "संग्रहालय" } },
  { hangul: "영화관", roman: "yeonghwagwan", meaning: { id: "bioskop", en: "cinema / movie theater", hi: "सिनेमा" } },
  { hangul: "공항", roman: "gonghang", meaning: { id: "bandara", en: "airport", hi: "हवाई अड्डा" } },
  { hangul: "역", roman: "yeok", meaning: { id: "stasiun", en: "station", hi: "स्टेशन" } },
  { hangul: "버스정류장", roman: "beoseu jeongnyujang", meaning: { id: "halte bus", en: "bus stop", hi: "बस स्टॉप" } },
  { hangul: "지하철", roman: "jihacheol", meaning: { id: "kereta bawah tanah", en: "subway", hi: "मेट्रो" } },
  { hangul: "화장실", roman: "hwajangsil", meaning: { id: "toilet", en: "toilet / restroom", hi: "शौचालय" } },
  { hangul: "교회", roman: "gyohoe", meaning: { id: "gereja", en: "church", hi: "गिरजाघर" } },
  { hangul: "절", roman: "jeol", meaning: { id: "kuil", en: "(Buddhist) temple", hi: "बौद्ध मंदिर" } },
  { hangul: "호텔", roman: "hotel", meaning: { id: "hotel", en: "hotel", hi: "होटल" } },
  { hangul: "바다", roman: "bada", meaning: { id: "laut", en: "sea", hi: "समुद्र" } },
  { hangul: "산", roman: "san", meaning: { id: "gunung", en: "mountain", hi: "पर्वत" } },
  { hangul: "강", roman: "gang", meaning: { id: "sungai", en: "river", hi: "नदी" } },
  { hangul: "동물원", roman: "dongmurwon", meaning: { id: "kebun binatang", en: "zoo", hi: "चिड़ियाघर" } },
  { hangul: "운동장", roman: "undongjang", meaning: { id: "lapangan olahraga", en: "sports field", hi: "खेल का मैदान" } },
  { hangul: "주차장", roman: "juchajang", meaning: { id: "tempat parkir", en: "parking lot", hi: "पार्किंग स्थल" } },
  { hangul: "우체국", roman: "ucheguk", meaning: { id: "kantor pos", en: "post office", hi: "डाकघर" } }
] as const;

const NUMBERS: readonly VocabItem[] = [
  { hangul: "영", roman: "yeong", meaning: { id: "nol (0)", en: "zero (0)", hi: "शून्य (0)" } },
  { hangul: "일", roman: "il", meaning: { id: "satu (1)", en: "one (1)", hi: "एक (1)" } },
  { hangul: "이", roman: "i", meaning: { id: "dua (2)", en: "two (2)", hi: "दो (2)" } },
  { hangul: "삼", roman: "sam", meaning: { id: "tiga (3)", en: "three (3)", hi: "तीन (3)" } },
  { hangul: "사", roman: "sa", meaning: { id: "empat (4)", en: "four (4)", hi: "चार (4)" } },
  { hangul: "오", roman: "o", meaning: { id: "lima (5)", en: "five (5)", hi: "पाँच (5)" } },
  { hangul: "육", roman: "yuk", meaning: { id: "enam (6)", en: "six (6)", hi: "छह (6)" } },
  { hangul: "칠", roman: "chil", meaning: { id: "tujuh (7)", en: "seven (7)", hi: "सात (7)" } },
  { hangul: "팔", roman: "pal", meaning: { id: "delapan (8)", en: "eight (8)", hi: "आठ (8)" } },
  { hangul: "구", roman: "gu", meaning: { id: "sembilan (9)", en: "nine (9)", hi: "नौ (9)" } },
  { hangul: "십", roman: "sip", meaning: { id: "sepuluh (10)", en: "ten (10)", hi: "दस (10)" } },
  { hangul: "십일", roman: "sibil", meaning: { id: "sebelas (11)", en: "eleven (11)", hi: "ग्यारह (11)" } },
  { hangul: "십이", roman: "sibi", meaning: { id: "dua belas (12)", en: "twelve (12)", hi: "बारह (12)" } },
  { hangul: "십삼", roman: "sipsam", meaning: { id: "tiga belas (13)", en: "thirteen (13)", hi: "तेरह (13)" } },
  { hangul: "이십", roman: "isip", meaning: { id: "dua puluh (20)", en: "twenty (20)", hi: "बीस (20)" } },
  { hangul: "삼십", roman: "samsip", meaning: { id: "tiga puluh (30)", en: "thirty (30)", hi: "तीस (30)" } },
  { hangul: "사십", roman: "sasip", meaning: { id: "empat puluh (40)", en: "forty (40)", hi: "चालीस (40)" } },
  { hangul: "오십", roman: "osip", meaning: { id: "lima puluh (50)", en: "fifty (50)", hi: "पचास (50)" } },
  { hangul: "육십", roman: "yuksip", meaning: { id: "enam puluh (60)", en: "sixty (60)", hi: "साठ (60)" } },
  { hangul: "칠십", roman: "chilsip", meaning: { id: "tujuh puluh (70)", en: "seventy (70)", hi: "सत्तर (70)" } },
  { hangul: "팔십", roman: "palsip", meaning: { id: "delapan puluh (80)", en: "eighty (80)", hi: "अस्सी (80)" } },
  { hangul: "구십", roman: "gusip", meaning: { id: "sembilan puluh (90)", en: "ninety (90)", hi: "नब्बे (90)" } },
  { hangul: "백", roman: "baek", meaning: { id: "seratus (100)", en: "one hundred (100)", hi: "सौ (100)" } },
  { hangul: "천", roman: "cheon", meaning: { id: "seribu (1.000)", en: "one thousand (1,000)", hi: "एक हज़ार (1,000)" } },
  { hangul: "만", roman: "man", meaning: { id: "sepuluh ribu (10.000)", en: "ten thousand (10,000)", hi: "दस हज़ार (10,000)" } },
  { hangul: "십만", roman: "simman", meaning: { id: "seratus ribu (100.000)", en: "one hundred thousand (100,000)", hi: "एक लाख (1,00,000)" } },
  { hangul: "백만", roman: "baengman", meaning: { id: "satu juta (1.000.000)", en: "one million (1,000,000)", hi: "दस लाख (10,00,000)" } }
] as const;

const VERBS: readonly VocabItem[] = [
  { hangul: "가다", roman: "gada", meaning: { id: "pergi", en: "to go", hi: "जाना" } },
  { hangul: "오다", roman: "oda", meaning: { id: "datang", en: "to come", hi: "आना" } },
  { hangul: "먹다", roman: "meokda", meaning: { id: "makan", en: "to eat", hi: "खाना" } },
  { hangul: "마시다", roman: "masida", meaning: { id: "minum", en: "to drink", hi: "पीना" } },
  { hangul: "자다", roman: "jada", meaning: { id: "tidur", en: "to sleep", hi: "सोना" } },
  { hangul: "일어나다", roman: "ireonada", meaning: { id: "bangun", en: "to wake up / get up", hi: "उठना" } },
  { hangul: "보다", roman: "boda", meaning: { id: "melihat / menonton", en: "to see / watch", hi: "देखना" } },
  { hangul: "듣다", roman: "deutda", meaning: { id: "mendengar", en: "to listen / hear", hi: "सुनना" } },
  { hangul: "말하다", roman: "malhada", meaning: { id: "berbicara", en: "to speak / talk", hi: "बोलना" } },
  { hangul: "읽다", roman: "ikda", meaning: { id: "membaca", en: "to read", hi: "पढ़ना" } },
  { hangul: "쓰다", roman: "sseuda", meaning: { id: "menulis", en: "to write", hi: "लिखना" } },
  { hangul: "공부하다", roman: "gongbuhada", meaning: { id: "belajar", en: "to study", hi: "पढ़ाई करना" } },
  { hangul: "일하다", roman: "ilhada", meaning: { id: "bekerja", en: "to work", hi: "काम करना" } },
  { hangul: "쉬다", roman: "swida", meaning: { id: "beristirahat", en: "to rest", hi: "आराम करना" } },
  { hangul: "놀다", roman: "nolda", meaning: { id: "bermain", en: "to play", hi: "खेलना" } },
  { hangul: "사다", roman: "sada", meaning: { id: "membeli", en: "to buy", hi: "ख़रीदना" } },
  { hangul: "팔다", roman: "palda", meaning: { id: "menjual", en: "to sell", hi: "बेचना" } },
  { hangul: "주다", roman: "juda", meaning: { id: "memberi", en: "to give", hi: "देना" } },
  { hangul: "받다", roman: "batda", meaning: { id: "menerima", en: "to receive", hi: "प्राप्त करना" } },
  { hangul: "만나다", roman: "mannada", meaning: { id: "bertemu", en: "to meet", hi: "मिलना" } },
  { hangul: "사랑하다", roman: "saranghada", meaning: { id: "mencintai", en: "to love", hi: "प्यार करना" } },
  { hangul: "좋아하다", roman: "joahada", meaning: { id: "menyukai", en: "to like", hi: "पसंद करना" } },
  { hangul: "싫어하다", roman: "sireohada", meaning: { id: "tidak suka / benci", en: "to dislike / hate", hi: "नापसंद करना" } },
  { hangul: "알다", roman: "alda", meaning: { id: "tahu / mengenal", en: "to know", hi: "जानना" } },
  { hangul: "모르다", roman: "moreuda", meaning: { id: "tidak tahu", en: "to not know", hi: "नहीं जानना" } },
  { hangul: "걷다", roman: "geotda", meaning: { id: "berjalan", en: "to walk", hi: "चलना" } },
  { hangul: "뛰다", roman: "ttwida", meaning: { id: "berlari / melompat", en: "to run / jump", hi: "दौड़ना / कूदना" } },
  { hangul: "앉다", roman: "anda", meaning: { id: "duduk", en: "to sit", hi: "बैठना" } },
  { hangul: "서다", roman: "seoda", meaning: { id: "berdiri", en: "to stand", hi: "खड़े होना" } },
  { hangul: "웃다", roman: "utda", meaning: { id: "tertawa", en: "to laugh / smile", hi: "हँसना / मुस्कुराना" } },
  { hangul: "울다", roman: "ulda", meaning: { id: "menangis", en: "to cry", hi: "रोना" } },
  { hangul: "기다리다", roman: "gidarida", meaning: { id: "menunggu", en: "to wait", hi: "इंतज़ार करना" } },
  { hangul: "찾다", roman: "chatda", meaning: { id: "mencari", en: "to look for / find", hi: "ढूँढना" } },
  { hangul: "열다", roman: "yeolda", meaning: { id: "membuka", en: "to open", hi: "खोलना" } },
  { hangul: "닫다", roman: "datda", meaning: { id: "menutup", en: "to close", hi: "बंद करना" } }
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
  lang: "id" | "en" | "hi"
): boolean {
  const normalized = normalizeAnswer(input);
  if (!normalized) return false;
  const target = item.meaning[lang];
  const variants = target
    .split("/")
    .map((s) => normalizeAnswer(s.replaceAll(/\([^)]*\)/g, "")));
  return variants.some((v) => v === normalized);
}
