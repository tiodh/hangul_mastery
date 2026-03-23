"use client";

import { useEffect, useMemo, useState } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "hangul-theme";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia?.("(prefers-color-scheme: light)")?.matches ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const currentLabel = useMemo(() => (theme === "dark" ? "Dark" : "Light"), [theme]);
  const nextLabel = useMemo(() => (theme === "dark" ? "Light" : "Dark"), [theme]);

  useEffect(() => {
    const preferred = getPreferredTheme();
    setTheme(preferred);
    applyTheme(preferred);
  }, []);

  function toggle() {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }

  return (
    <button className="btn" type="button" onClick={toggle} title={`Switch to ${nextLabel} theme`}>
      Theme: {currentLabel}
    </button>
  );
}
