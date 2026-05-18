"use client";

import { useEffect, useRef, useState } from "react";
import Game from "@/components/Game";
import VocabPractice from "@/components/VocabPractice";
import SentencePractice from "@/components/SentencePractice";
import { VOCAB_CATEGORIES, type VocabCategory } from "@/lib/vocabulary";
import { SENTENCE_PATTERNS, type SentencePatternId } from "@/lib/sentences";
import { UI, useLanguage, type Loc } from "@/lib/i18n";

type Section = "basics" | "sentences";

type BasicsKey = "hangul" | VocabCategory;

type BasicsItem = {
  key: BasicsKey;
  label: Loc;
  emoji: string;
  description: Loc;
};

const BASICS_MENU: readonly BasicsItem[] = [
  {
    key: "hangul",
    label: UI.hangulLabel,
    emoji: "가",
    description: UI.hangulDesc
  },
  ...VOCAB_CATEGORIES.map((c) => ({
    key: c.id,
    label: c.label,
    emoji: c.emoji,
    description: c.description
  }))
];

const BASICS_KEYS = BASICS_MENU.map((m) => m.key) as readonly BasicsKey[];
const PATTERN_KEYS = SENTENCE_PATTERNS.map((p) => p.id);

type ParsedHash = {
  section: Section;
  basicsKey?: BasicsKey;
  patternKey?: SentencePatternId;
};

function parseHash(hash: string): ParsedHash | null {
  const clean = hash.replace(/^#\/?/, "");
  if (!clean) return null;
  const [sectionPart, keyPart] = clean.split("/");
  if (sectionPart === "kata-dasar") {
    if (keyPart && (BASICS_KEYS as readonly string[]).includes(keyPart)) {
      return { section: "basics", basicsKey: keyPart as BasicsKey };
    }
    return { section: "basics" };
  }
  if (sectionPart === "bentuk-kalimat") {
    if (keyPart && (PATTERN_KEYS as readonly string[]).includes(keyPart)) {
      return { section: "sentences", patternKey: keyPart as SentencePatternId };
    }
    return { section: "sentences" };
  }
  return null;
}

function buildHash(section: Section, basicsKey: BasicsKey, patternKey: SentencePatternId): string {
  return section === "basics"
    ? `#kata-dasar/${basicsKey}`
    : `#bentuk-kalimat/${patternKey}`;
}

export default function AppShell() {
  const lang = useLanguage();
  const [section, setSection] = useState<Section>("basics");
  const [basicsKey, setBasicsKey] = useState<BasicsKey>("hangul");
  const [patternKey, setPatternKey] = useState<SentencePatternId>(SENTENCE_PATTERNS[0]!.id);
  const hydrated = useRef(false);

  useEffect(() => {
    function applyHash() {
      const parsed = parseHash(window.location.hash);
      if (!parsed) return;
      setSection(parsed.section);
      if (parsed.basicsKey) setBasicsKey(parsed.basicsKey);
      if (parsed.patternKey) setPatternKey(parsed.patternKey);
    }
    applyHash();
    hydrated.current = true;
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    const next = buildHash(section, basicsKey, patternKey);
    if (window.location.hash !== next) {
      window.history.pushState(null, "", next);
    }
  }, [section, basicsKey, patternKey]);

  return (
    <>
      <nav className="sectionTabs" aria-label={UI.basics[lang]}>
        <button
          type="button"
          className={`sectionTab ${section === "basics" ? "sectionTabActive" : ""}`}
          onClick={() => setSection("basics")}
        >
          <span className="sectionTabEmoji">📚</span>
          <span>{UI.basics[lang]}</span>
        </button>
        <button
          type="button"
          className={`sectionTab ${section === "sentences" ? "sectionTabActive" : ""}`}
          onClick={() => setSection("sentences")}
        >
          <span className="sectionTabEmoji">💬</span>
          <span>{UI.sentences[lang]}</span>
        </button>
      </nav>

      {section === "basics" ? (
        <>
          <nav className="menuBar" aria-label={UI.basics[lang]}>
            {BASICS_MENU.map((m) => {
              const isActive = m.key === basicsKey;
              return (
                <button
                  key={m.key}
                  type="button"
                  className={`menuBtn ${isActive ? "menuBtnActive" : ""}`}
                  onClick={() => setBasicsKey(m.key)}
                  title={m.description[lang]}
                >
                  <span className="menuBtnEmoji" aria-hidden>{m.emoji}</span>
                  <span>{m.label[lang]}</span>
                </button>
              );
            })}
          </nav>
          {basicsKey === "hangul" ? <Game /> : <VocabPractice category={basicsKey} />}
        </>
      ) : (
        <>
          <nav className="menuBar" aria-label={UI.sentences[lang]}>
            {SENTENCE_PATTERNS.map((p) => {
              const isActive = p.id === patternKey;
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`menuBtn ${isActive ? "menuBtnActive" : ""}`}
                  onClick={() => setPatternKey(p.id)}
                  title={p.description[lang]}
                >
                  <span className="menuBtnEmoji" aria-hidden>{p.emoji}</span>
                  <span>{p.label[lang]}</span>
                </button>
              );
            })}
          </nav>
          <SentencePractice pattern={patternKey} />
        </>
      )}
    </>
  );
}
