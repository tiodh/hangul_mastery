"use client";

import { setLanguage, useLanguage, UI } from "@/lib/i18n";

export default function LanguageToggle() {
  const lang = useLanguage();
  return (
    <div className="langToggle" role="group" aria-label={UI.langToggleAria[lang]}>
      <button
        type="button"
        className={`langBtn ${lang === "id" ? "langBtnActive" : ""}`}
        onClick={() => setLanguage("id")}
        aria-pressed={lang === "id"}
      >
        ID
      </button>
      <button
        type="button"
        className={`langBtn ${lang === "en" ? "langBtnActive" : ""}`}
        onClick={() => setLanguage("en")}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
