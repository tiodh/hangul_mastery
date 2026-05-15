"use client";

import { useState } from "react";
import Game from "@/components/Game";
import VocabPractice from "@/components/VocabPractice";
import SentencePractice from "@/components/SentencePractice";
import { VOCAB_CATEGORIES, type VocabCategory } from "@/lib/vocabulary";
import { SENTENCE_PATTERNS, type SentencePatternId } from "@/lib/sentences";

type Section = "basics" | "sentences";

type BasicsKey = "hangul" | VocabCategory;

type BasicsItem = {
  key: BasicsKey;
  label: string;
  emoji: string;
  description: string;
};

const BASICS_MENU: readonly BasicsItem[] = [
  {
    key: "hangul",
    label: "Hangul Dasar",
    emoji: "가",
    description: "Latihan membaca aksara Hangul (romanisasi)"
  },
  ...VOCAB_CATEGORIES.map((c) => ({
    key: c.id,
    label: c.label,
    emoji: c.emoji,
    description: c.description
  }))
];

export default function AppShell() {
  const [section, setSection] = useState<Section>("basics");
  const [basicsKey, setBasicsKey] = useState<BasicsKey>("hangul");
  const [patternKey, setPatternKey] = useState<SentencePatternId>(SENTENCE_PATTERNS[0]!.id);

  return (
    <>
      <nav className="sectionTabs" aria-label="Kategori utama">
        <button
          type="button"
          className={`sectionTab ${section === "basics" ? "sectionTabActive" : ""}`}
          onClick={() => setSection("basics")}
        >
          <span className="sectionTabEmoji">📚</span>
          <span>Kata Dasar</span>
        </button>
        <button
          type="button"
          className={`sectionTab ${section === "sentences" ? "sectionTabActive" : ""}`}
          onClick={() => setSection("sentences")}
        >
          <span className="sectionTabEmoji">💬</span>
          <span>Bentuk Kalimat</span>
        </button>
      </nav>

      {section === "basics" ? (
        <>
          <nav className="menuBar" aria-label="Menu kata dasar">
            {BASICS_MENU.map((m) => {
              const isActive = m.key === basicsKey;
              return (
                <button
                  key={m.key}
                  type="button"
                  className={`menuBtn ${isActive ? "menuBtnActive" : ""}`}
                  onClick={() => setBasicsKey(m.key)}
                  title={m.description}
                >
                  <span className="menuBtnEmoji" aria-hidden>{m.emoji}</span>
                  <span>{m.label}</span>
                </button>
              );
            })}
          </nav>
          {basicsKey === "hangul" ? <Game /> : <VocabPractice category={basicsKey} />}
        </>
      ) : (
        <>
          <nav className="menuBar" aria-label="Menu bentuk kalimat">
            {SENTENCE_PATTERNS.map((p) => {
              const isActive = p.id === patternKey;
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`menuBtn ${isActive ? "menuBtnActive" : ""}`}
                  onClick={() => setPatternKey(p.id)}
                  title={p.description}
                >
                  <span className="menuBtnEmoji" aria-hidden>{p.emoji}</span>
                  <span>{p.label}</span>
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
