import type { SentenceExample } from "@/lib/sentences";

export type VocabCategory = "expressions" | "places" | "numbers" | "verbs";

export type VocabItem = {
  hangul: string;
  roman: string;
  indonesian: string;
};

export type VocabCategoryConfig = {
  id: VocabCategory;
  label: string;
  description: string;
  emoji: string;
  usageExamples: readonly SentenceExample[];
};

export const VOCAB_CATEGORIES: readonly VocabCategoryConfig[] = [
  {
    id: "expressions",
    label: "Ungkapan Umum",
    description: "Frasa sehari-hari: terima kasih, maaf, permisi, sapaan, dll.",
    emoji: "🙏",
    usageExamples: [
      { kind: "statement", korean: "만나서 반갑습니다.", roman: "mannaseo bangapseumnida.", indonesian: "Senang bertemu Anda." },
      { kind: "statement", korean: "잘 부탁드립니다.", roman: "jal butakdeurimnida.", indonesian: "Mohon bantuannya.", note: "Sering diucapkan setelah perkenalan." },
      { kind: "question", korean: "이거 한국어로 뭐예요?", roman: "igeo hangugeoro mwoyeyo?", indonesian: "Apa ini dalam bahasa Korea?" },
      { kind: "question", korean: "도와주실 수 있어요?", roman: "dowajusil su isseoyo?", indonesian: "Bisakah Anda menolong saya?" },
      { kind: "positive", korean: "네, 알겠어요. 감사합니다.", roman: "ne, algesseoyo. gamsahamnida.", indonesian: "Ya, saya mengerti. Terima kasih." },
      { kind: "positive", korean: "네, 괜찮아요.", roman: "ne, gwaenchanayo.", indonesian: "Ya, tidak apa-apa." },
      { kind: "negative", korean: "아니요, 죄송해요. 잘 몰라요.", roman: "aniyo, joesonghaeyo. jal mollayo.", indonesian: "Tidak, maaf. Saya kurang tahu." },
      { kind: "negative", korean: "아니요, 괜찮아요. 감사합니다.", roman: "aniyo, gwaenchanayo. gamsahamnida.", indonesian: "Tidak (perlu), tidak apa-apa. Terima kasih.", note: "Bisa dipakai menolak tawaran dengan sopan." }
    ]
  },
  {
    id: "places",
    label: "Nama Tempat",
    description: "Kosakata tempat dan lokasi sehari-hari",
    emoji: "🏛️",
    usageExamples: [
      { kind: "statement", korean: "저는 학교에 가요.", roman: "jeoneun hakgyoe gayo.", indonesian: "Saya pergi ke sekolah." },
      { kind: "statement", korean: "친구가 카페에 있어요.", roman: "chinguga kapee isseoyo.", indonesian: "Teman ada di kafe." },
      { kind: "question", korean: "어디에 가요?", roman: "eodie gayo?", indonesian: "Pergi ke mana?", note: "어디 = di mana" },
      { kind: "question", korean: "병원이 어디에 있어요?", roman: "byeongwoni eodie isseoyo?", indonesian: "Di mana rumah sakitnya?" },
      { kind: "positive", korean: "네, 시장에 가요.", roman: "ne, sijange gayo.", indonesian: "Ya, (saya) pergi ke pasar." },
      { kind: "positive", korean: "네, 학교 근처에 있어요.", roman: "ne, hakgyo geuncheoe isseoyo.", indonesian: "Ya, ada di dekat sekolah." },
      { kind: "negative", korean: "아니요, 병원에 안 가요.", roman: "aniyo, byeongwone an gayo.", indonesian: "Tidak, (saya) tidak pergi ke rumah sakit." },
      { kind: "negative", korean: "아니요, 카페에 없어요.", roman: "aniyo, kapee eopseoyo.", indonesian: "Tidak, tidak ada di kafe." }
    ]
  },
  {
    id: "numbers",
    label: "Angka",
    description: "Angka Sino-Korean (한자어) 1 sampai 100+",
    emoji: "🔢",
    usageExamples: [
      { kind: "statement", korean: "사과가 천 원이에요.", roman: "sagwaga cheon woni-eyo.", indonesian: "Apel harganya 1.000 won." },
      { kind: "statement", korean: "오늘은 십오일이에요.", roman: "oneureun sibo-iri-eyo.", indonesian: "Hari ini tanggal 15." },
      { kind: "question", korean: "얼마예요?", roman: "eolmayeyo?", indonesian: "Berapa harganya?", note: "얼마 = berapa (harga)" },
      { kind: "question", korean: "오늘 며칠이에요?", roman: "oneul myeochiri-eyo?", indonesian: "Hari ini tanggal berapa?" },
      { kind: "positive", korean: "네, 만 원이에요.", roman: "ne, man woni-eyo.", indonesian: "Ya, 10.000 won." },
      { kind: "positive", korean: "네, 십오일이에요.", roman: "ne, sibo-iri-eyo.", indonesian: "Ya, tanggal 15." },
      { kind: "negative", korean: "아니요, 만 원이 아니에요.", roman: "aniyo, man woni anieyo.", indonesian: "Bukan, bukan 10.000 won." },
      { kind: "negative", korean: "아니요, 십오일이 아니에요.", roman: "aniyo, sibo-iri anieyo.", indonesian: "Bukan, bukan tanggal 15." }
    ]
  },
  {
    id: "verbs",
    label: "Kata Kerja",
    description: "Kata kerja dasar dalam bentuk infinitif",
    emoji: "🏃",
    usageExamples: [
      { kind: "statement", korean: "한국어를 공부해요.", roman: "hangugeoreul gongbuhaeyo.", indonesian: "(Saya) belajar bahasa Korea." },
      { kind: "statement", korean: "친구를 만나요.", roman: "chingureul mannayo.", indonesian: "(Saya) bertemu teman." },
      { kind: "question", korean: "뭐 해요?", roman: "mwo haeyo?", indonesian: "Sedang apa?", note: "뭐 = apa" },
      { kind: "question", korean: "지금 어디에 가요?", roman: "jigeum eodie gayo?", indonesian: "Sekarang pergi ke mana?" },
      { kind: "positive", korean: "네, 공부해요.", roman: "ne, gongbuhaeyo.", indonesian: "Ya, (saya) sedang belajar." },
      { kind: "positive", korean: "네, 한국어를 공부해요.", roman: "ne, hangugeoreul gongbuhaeyo.", indonesian: "Ya, (saya) belajar bahasa Korea." },
      { kind: "negative", korean: "아니요, 안 공부해요.", roman: "aniyo, an gongbuhaeyo.", indonesian: "Tidak, (saya) tidak belajar.", note: "Negatif: 안 + kata kerja" },
      { kind: "negative", korean: "아니요, 친구를 안 만나요.", roman: "aniyo, chingureul an mannayo.", indonesian: "Tidak, (saya) tidak bertemu teman." }
    ]
  }
] as const;

const EXPRESSIONS: readonly VocabItem[] = [
  { hangul: "안녕하세요", roman: "annyeonghaseyo", indonesian: "halo / selamat (pagi/siang/sore/malam)" },
  { hangul: "안녕히 가세요", roman: "annyeonghi gaseyo", indonesian: "selamat jalan" },
  { hangul: "안녕히 계세요", roman: "annyeonghi gyeseyo", indonesian: "selamat tinggal" },
  { hangul: "만나서 반갑습니다", roman: "mannaseo bangapseumnida", indonesian: "senang bertemu" },
  { hangul: "오랜만이에요", roman: "oraenmanieyo", indonesian: "lama tidak bertemu" },
  { hangul: "감사합니다", roman: "gamsahamnida", indonesian: "terima kasih (formal)" },
  { hangul: "고맙습니다", roman: "gomapseumnida", indonesian: "terima kasih" },
  { hangul: "고마워요", roman: "gomawoyo", indonesian: "terima kasih (kasual)" },
  { hangul: "천만에요", roman: "cheonmaneyo", indonesian: "sama-sama" },
  { hangul: "죄송합니다", roman: "joesonghamnida", indonesian: "maaf (formal)" },
  { hangul: "미안해요", roman: "mianhaeyo", indonesian: "maaf (kasual)" },
  { hangul: "실례합니다", roman: "sillyehamnida", indonesian: "permisi" },
  { hangul: "잠시만요", roman: "jamsimanyo", indonesian: "sebentar / tunggu sebentar" },
  { hangul: "네", roman: "ne", indonesian: "ya" },
  { hangul: "아니요", roman: "aniyo", indonesian: "tidak" },
  { hangul: "괜찮아요", roman: "gwaenchanayo", indonesian: "tidak apa-apa / baik-baik saja" },
  { hangul: "알겠어요", roman: "algesseoyo", indonesian: "saya mengerti" },
  { hangul: "몰라요", roman: "mollayo", indonesian: "saya tidak tahu" },
  { hangul: "도와주세요", roman: "dowajuseyo", indonesian: "tolong saya" },
  { hangul: "다시 한번 말해 주세요", roman: "dasi hanbeon malhae juseyo", indonesian: "tolong ulangi sekali lagi" },
  { hangul: "천천히 말해 주세요", roman: "cheoncheonhi malhae juseyo", indonesian: "tolong bicara perlahan" },
  { hangul: "잘 부탁드립니다", roman: "jal butakdeurimnida", indonesian: "mohon bantuannya" },
  { hangul: "잘 먹겠습니다", roman: "jal meokgesseumnida", indonesian: "selamat makan (sebelum makan)" },
  { hangul: "잘 먹었습니다", roman: "jal meogeosseumnida", indonesian: "terima kasih atas makanannya (sesudah makan)" },
  { hangul: "잘 자요", roman: "jal jayo", indonesian: "selamat tidur" },
  { hangul: "화이팅", roman: "hwaiting", indonesian: "semangat" }
] as const;

const PLACES: readonly VocabItem[] = [
  { hangul: "집", roman: "jip", indonesian: "rumah" },
  { hangul: "학교", roman: "hakgyo", indonesian: "sekolah" },
  { hangul: "회사", roman: "hoesa", indonesian: "kantor / perusahaan" },
  { hangul: "병원", roman: "byeongwon", indonesian: "rumah sakit" },
  { hangul: "약국", roman: "yakguk", indonesian: "apotek" },
  { hangul: "은행", roman: "eunhaeng", indonesian: "bank" },
  { hangul: "시장", roman: "sijang", indonesian: "pasar" },
  { hangul: "백화점", roman: "baekhwajeom", indonesian: "department store" },
  { hangul: "편의점", roman: "pyeonuijeom", indonesian: "minimarket" },
  { hangul: "식당", roman: "sikdang", indonesian: "restoran" },
  { hangul: "카페", roman: "kape", indonesian: "kafe" },
  { hangul: "공원", roman: "gongwon", indonesian: "taman" },
  { hangul: "도서관", roman: "doseogwan", indonesian: "perpustakaan" },
  { hangul: "박물관", roman: "bangmulgwan", indonesian: "museum" },
  { hangul: "영화관", roman: "yeonghwagwan", indonesian: "bioskop" },
  { hangul: "공항", roman: "gonghang", indonesian: "bandara" },
  { hangul: "역", roman: "yeok", indonesian: "stasiun" },
  { hangul: "버스정류장", roman: "beoseu jeongnyujang", indonesian: "halte bus" },
  { hangul: "지하철", roman: "jihacheol", indonesian: "kereta bawah tanah" },
  { hangul: "화장실", roman: "hwajangsil", indonesian: "toilet" },
  { hangul: "교회", roman: "gyohoe", indonesian: "gereja" },
  { hangul: "절", roman: "jeol", indonesian: "kuil" },
  { hangul: "호텔", roman: "hotel", indonesian: "hotel" },
  { hangul: "바다", roman: "bada", indonesian: "laut" },
  { hangul: "산", roman: "san", indonesian: "gunung" },
  { hangul: "강", roman: "gang", indonesian: "sungai" },
  { hangul: "동물원", roman: "dongmurwon", indonesian: "kebun binatang" },
  { hangul: "운동장", roman: "undongjang", indonesian: "lapangan olahraga" },
  { hangul: "주차장", roman: "juchajang", indonesian: "tempat parkir" },
  { hangul: "우체국", roman: "ucheguk", indonesian: "kantor pos" }
] as const;

const NUMBERS: readonly VocabItem[] = [
  { hangul: "영", roman: "yeong", indonesian: "nol (0)" },
  { hangul: "일", roman: "il", indonesian: "satu (1)" },
  { hangul: "이", roman: "i", indonesian: "dua (2)" },
  { hangul: "삼", roman: "sam", indonesian: "tiga (3)" },
  { hangul: "사", roman: "sa", indonesian: "empat (4)" },
  { hangul: "오", roman: "o", indonesian: "lima (5)" },
  { hangul: "육", roman: "yuk", indonesian: "enam (6)" },
  { hangul: "칠", roman: "chil", indonesian: "tujuh (7)" },
  { hangul: "팔", roman: "pal", indonesian: "delapan (8)" },
  { hangul: "구", roman: "gu", indonesian: "sembilan (9)" },
  { hangul: "십", roman: "sip", indonesian: "sepuluh (10)" },
  { hangul: "십일", roman: "sibil", indonesian: "sebelas (11)" },
  { hangul: "십이", roman: "sibi", indonesian: "dua belas (12)" },
  { hangul: "십삼", roman: "sipsam", indonesian: "tiga belas (13)" },
  { hangul: "이십", roman: "isip", indonesian: "dua puluh (20)" },
  { hangul: "삼십", roman: "samsip", indonesian: "tiga puluh (30)" },
  { hangul: "사십", roman: "sasip", indonesian: "empat puluh (40)" },
  { hangul: "오십", roman: "osip", indonesian: "lima puluh (50)" },
  { hangul: "육십", roman: "yuksip", indonesian: "enam puluh (60)" },
  { hangul: "칠십", roman: "chilsip", indonesian: "tujuh puluh (70)" },
  { hangul: "팔십", roman: "palsip", indonesian: "delapan puluh (80)" },
  { hangul: "구십", roman: "gusip", indonesian: "sembilan puluh (90)" },
  { hangul: "백", roman: "baek", indonesian: "seratus (100)" },
  { hangul: "천", roman: "cheon", indonesian: "seribu (1.000)" },
  { hangul: "만", roman: "man", indonesian: "sepuluh ribu (10.000)" },
  { hangul: "십만", roman: "simman", indonesian: "seratus ribu (100.000)" },
  { hangul: "백만", roman: "baengman", indonesian: "satu juta (1.000.000)" }
] as const;

const VERBS: readonly VocabItem[] = [
  { hangul: "가다", roman: "gada", indonesian: "pergi" },
  { hangul: "오다", roman: "oda", indonesian: "datang" },
  { hangul: "먹다", roman: "meokda", indonesian: "makan" },
  { hangul: "마시다", roman: "masida", indonesian: "minum" },
  { hangul: "자다", roman: "jada", indonesian: "tidur" },
  { hangul: "일어나다", roman: "ireonada", indonesian: "bangun" },
  { hangul: "보다", roman: "boda", indonesian: "melihat / menonton" },
  { hangul: "듣다", roman: "deutda", indonesian: "mendengar" },
  { hangul: "말하다", roman: "malhada", indonesian: "berbicara" },
  { hangul: "읽다", roman: "ikda", indonesian: "membaca" },
  { hangul: "쓰다", roman: "sseuda", indonesian: "menulis" },
  { hangul: "공부하다", roman: "gongbuhada", indonesian: "belajar" },
  { hangul: "일하다", roman: "ilhada", indonesian: "bekerja" },
  { hangul: "쉬다", roman: "swida", indonesian: "beristirahat" },
  { hangul: "놀다", roman: "nolda", indonesian: "bermain" },
  { hangul: "사다", roman: "sada", indonesian: "membeli" },
  { hangul: "팔다", roman: "palda", indonesian: "menjual" },
  { hangul: "주다", roman: "juda", indonesian: "memberi" },
  { hangul: "받다", roman: "batda", indonesian: "menerima" },
  { hangul: "만나다", roman: "mannada", indonesian: "bertemu" },
  { hangul: "사랑하다", roman: "saranghada", indonesian: "mencintai" },
  { hangul: "좋아하다", roman: "joahada", indonesian: "menyukai" },
  { hangul: "싫어하다", roman: "sireohada", indonesian: "tidak suka / benci" },
  { hangul: "알다", roman: "alda", indonesian: "tahu / mengenal" },
  { hangul: "모르다", roman: "moreuda", indonesian: "tidak tahu" },
  { hangul: "걷다", roman: "geotda", indonesian: "berjalan" },
  { hangul: "뛰다", roman: "ttwida", indonesian: "berlari / melompat" },
  { hangul: "앉다", roman: "anda", indonesian: "duduk" },
  { hangul: "서다", roman: "seoda", indonesian: "berdiri" },
  { hangul: "웃다", roman: "utda", indonesian: "tertawa" },
  { hangul: "울다", roman: "ulda", indonesian: "menangis" },
  { hangul: "기다리다", roman: "gidarida", indonesian: "menunggu" },
  { hangul: "찾다", roman: "chatda", indonesian: "mencari" },
  { hangul: "열다", roman: "yeolda", indonesian: "membuka" },
  { hangul: "닫다", roman: "datda", indonesian: "menutup" }
] as const;

export function getVocabList(category: VocabCategory): readonly VocabItem[] {
  switch (category) {
    case "expressions":
      return EXPRESSIONS;
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

export function normalizeIndonesian(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replaceAll(/[().,]/g, "")
    .replaceAll(/\s+/g, " ");
}

export function isCorrectIndonesian(input: string, item: VocabItem): boolean {
  const normalized = normalizeIndonesian(input);
  if (!normalized) return false;
  const variants = item.indonesian
    .split("/")
    .map((s) => normalizeIndonesian(s.replaceAll(/\([^)]*\)/g, "")));
  return variants.some((v) => v === normalized);
}
