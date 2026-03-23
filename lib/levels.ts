export type Syllable = {
  hangul: string;
  roman: string;
};

export type LevelConfig = {
  level: 1 | 2 | 3 | 4;
  syllablesPerWord: number;
  label: string;
};

export type Prompt = {
  level: LevelConfig["level"];
  hangul: string;
  answers: string[];
  parts: Syllable[];
};

const SYLLABLE_POOL: readonly Syllable[] = [
  { hangul: "가", roman: "ga" },
  { hangul: "나", roman: "na" },
  { hangul: "다", roman: "da" },
  { hangul: "라", roman: "ra" },
  { hangul: "마", roman: "ma" },
  { hangul: "바", roman: "ba" },
  { hangul: "사", roman: "sa" },
  { hangul: "아", roman: "a" },
  { hangul: "자", roman: "ja" },
  { hangul: "차", roman: "cha" },
  { hangul: "카", roman: "ka" },
  { hangul: "타", roman: "ta" },
  { hangul: "파", roman: "pa" },
  { hangul: "하", roman: "ha" },
  { hangul: "거", roman: "geo" },
  { hangul: "너", roman: "neo" },
  { hangul: "더", roman: "deo" },
  { hangul: "러", roman: "reo" },
  { hangul: "머", roman: "meo" },
  { hangul: "버", roman: "beo" },
  { hangul: "서", roman: "seo" },
  { hangul: "어", roman: "eo" },
  { hangul: "저", roman: "jeo" },
  { hangul: "오", roman: "o" },
  { hangul: "요", roman: "yo" },
  { hangul: "우", roman: "u" },
  { hangul: "유", roman: "yu" },
  { hangul: "이", roman: "i" },
  { hangul: "야", roman: "ya" },
  { hangul: "여", roman: "yeo" },
  { hangul: "예", roman: "ye" },
  { hangul: "와", roman: "wa" },
  { hangul: "워", roman: "wo" },
  { hangul: "위", roman: "wi" },
  { hangul: "외", roman: "oe" },
  { hangul: "에", roman: "e" },
  { hangul: "애", roman: "ae" },
  { hangul: "의", roman: "ui" },
  { hangul: "으", roman: "eu" },
  { hangul: "기", roman: "gi" },
  { hangul: "니", roman: "ni" },
  { hangul: "디", roman: "di" },
  { hangul: "리", roman: "ri" },
  { hangul: "미", roman: "mi" },
  { hangul: "비", roman: "bi" },
  { hangul: "시", roman: "si" },
  { hangul: "지", roman: "ji" },
  { hangul: "치", roman: "chi" },
  { hangul: "키", roman: "ki" },
  { hangul: "티", roman: "ti" },
  { hangul: "피", roman: "pi" },
  { hangul: "히", roman: "hi" }
] as const;

export const LEVELS: readonly LevelConfig[] = [
  { level: 1, syllablesPerWord: 1, label: "Level 1 (1 character)" },
  { level: 2, syllablesPerWord: 2, label: "Level 2 (2 characters)" },
  { level: 3, syllablesPerWord: 3, label: "Level 3 (3 characters)" },
  { level: 4, syllablesPerWord: 4, label: "Level 4 (4 characters)" }
] as const;

function pickOne<T>(items: readonly T[], rng: () => number): T {
  return items[Math.floor(rng() * items.length)]!;
}

function normalizeRoman(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replaceAll(/[\s\-_.]/g, "");
}

export function getLevelConfig(level: number): LevelConfig {
  const found = LEVELS.find((l) => l.level === level);
  if (!found) return LEVELS[0]!;
  return found;
}

export function createPrompt(level: LevelConfig["level"], rng: () => number = Math.random): Prompt {
  const cfg = getLevelConfig(level);
  const parts: Syllable[] = [];
  for (let i = 0; i < cfg.syllablesPerWord; i += 1) {
    parts.push(pickOne(SYLLABLE_POOL, rng));
  }

  const hangul = parts.map((p) => p.hangul).join("");
  const roman = parts.map((p) => p.roman).join("");
  const answers = [roman, parts.map((p) => p.roman).join("-")].map(normalizeRoman);

  return { level, hangul, parts, answers: Array.from(new Set(answers)) };
}

export function isCorrectAnswer(input: string, prompt: Prompt): boolean {
  const normalized = normalizeRoman(input);
  if (!normalized) return false;
  return prompt.answers.some((a) => a === normalized);
}

export function formatRomanHint(prompt: Prompt): string {
  return prompt.parts.map((p) => p.roman).join("-");
}

