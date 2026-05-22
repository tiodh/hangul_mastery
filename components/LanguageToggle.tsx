"use client";

import { setLanguage, useLanguage, UI } from "@/lib/i18n";

const OPTIONS: { code: "id" | "en" | "hi"; label: string }[] = [
  { code: "id", label: "ID" },
  { code: "en", label: "EN" },
  { code: "hi", label: "HI" }
];

export default function LanguageToggle() {
  const lang = useLanguage();
  return (
    <div className="langToggle" role="group" aria-label={UI.langToggleAria[lang]}>
      {OPTIONS.map((opt) => (
        <button
          key={opt.code}
          type="button"
          className={`langBtn ${lang === opt.code ? "langBtnActive" : ""}`}
          onClick={() => setLanguage(opt.code)}
          aria-pressed={lang === opt.code}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
