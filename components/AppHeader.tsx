"use client";

import { UI, useLanguage } from "@/lib/i18n";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";

export default function AppHeader() {
  const lang = useLanguage();
  return (
    <div className="header">
      <div>
        <h1 className="title">{UI.appTitle[lang]}</h1>
        <p className="subtitle">{UI.appSubtitle[lang]}</p>
      </div>
      <div className="row" style={{ gap: 8 }}>
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  );
}
