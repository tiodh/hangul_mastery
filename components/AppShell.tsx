"use client";

import { useState } from "react";
import Game from "@/components/Game";
import VocabPractice from "@/components/VocabPractice";
import { VOCAB_CATEGORIES, type VocabCategory } from "@/lib/vocabulary";

type MenuKey = "hangul" | VocabCategory;

type MenuItem = {
  key: MenuKey;
  label: string;
  emoji: string;
  description: string;
};

const MENU: readonly MenuItem[] = [
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
  const [active, setActive] = useState<MenuKey>("hangul");

  return (
    <>
      <nav className="menuBar" aria-label="Menu latihan">
        {MENU.map((m) => {
          const isActive = m.key === active;
          return (
            <button
              key={m.key}
              type="button"
              className={`menuBtn ${isActive ? "menuBtnActive" : ""}`}
              onClick={() => setActive(m.key)}
              title={m.description}
            >
              <span className="menuBtnEmoji" aria-hidden>{m.emoji}</span>
              <span>{m.label}</span>
            </button>
          );
        })}
      </nav>

      {active === "hangul" ? <Game /> : <VocabPractice category={active} />}
    </>
  );
}
