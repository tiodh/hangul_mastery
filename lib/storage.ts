export type LevelNumber = 1 | 2 | 3 | 4;

export type StoredProgress = {
  version: 1;
  level: LevelNumber;
  totalCorrect: number;
  totalAttempts: number;
  streak: number;
  bestStreak: number;
  perLevel: Record<LevelNumber, { correct: number; attempts: number }>;
  updatedAtIso: string;
};

const STORAGE_KEY = "hangul-learning-progress";

export function defaultProgress(level: LevelNumber = 1): StoredProgress {
  return {
    version: 1,
    level,
    totalCorrect: 0,
    totalAttempts: 0,
    streak: 0,
    bestStreak: 0,
    perLevel: {
      1: { correct: 0, attempts: 0 },
      2: { correct: 0, attempts: 0 },
      3: { correct: 0, attempts: 0 },
      4: { correct: 0, attempts: 0 }
    },
    updatedAtIso: new Date().toISOString()
  };
}

function isLevelNumber(n: unknown): n is LevelNumber {
  return n === 1 || n === 2 || n === 3 || n === 4;
}

export function loadProgress(): StoredProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredProgress>;
    if (parsed.version !== 1) return null;
    if (!isLevelNumber(parsed.level)) return null;
    if (!parsed.perLevel) return null;
    return parsed as StoredProgress;
  } catch {
    return null;
  }
}

export function saveProgress(progress: StoredProgress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore storage failures (private mode, quota, etc.)
  }
}

export function clearProgress(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

