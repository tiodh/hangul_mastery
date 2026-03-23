import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hangul Learning Game",
  description: "Practice reading Hangul by typing pronunciation (romanization)."
};

const themeInitScript = `
(() => {
  try {
    const key = "hangul-theme";
    const stored = localStorage.getItem(key);
    const theme = (stored === "light" || stored === "dark")
      ? stored
      : (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {}
})();
`;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
