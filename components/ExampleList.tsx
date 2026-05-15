"use client";

import { EXAMPLE_KIND_LABEL, type ExampleKind, type SentenceExample } from "@/lib/sentences";
import { speakKorean } from "@/lib/tts";

const ORDER: readonly ExampleKind[] = ["statement", "question", "positive", "negative"];

export default function ExampleList({
  examples,
  ttsSupported,
  title = "Contoh Kalimat"
}: {
  examples: readonly SentenceExample[];
  ttsSupported: boolean;
  title?: string;
}) {
  return (
    <div>
      <div style={{ fontWeight: 800, marginBottom: 8 }}>{title}</div>
      <div style={{ display: "grid", gap: 12 }}>
        {ORDER.map((kind) => {
          const items = examples.filter((e) => e.kind === kind);
          if (items.length === 0) return null;
          const meta = EXAMPLE_KIND_LABEL[kind];
          return (
            <div key={kind} className={`exampleGroup exampleGroup-${kind}`}>
              <div className={`exampleGroupHeader exampleGroupHeader-${kind}`}>
                <span>{meta.emoji}</span>
                <span>{meta.label}</span>
              </div>
              <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
                {items.map((ex, i) => (
                  <div key={i} className="exampleCard">
                    <div className="row" style={{ justifyContent: "space-between" }}>
                      <div className="exampleKorean">{ex.korean}</div>
                      <button
                        type="button"
                        className="btn btnSpeak"
                        onClick={() => speakKorean(ex.korean)}
                        disabled={!ttsSupported}
                        aria-label={`Dengarkan: ${ex.korean}`}
                      >
                        🔊
                      </button>
                    </div>
                    <div className="romanLine">[{ex.roman}]</div>
                    <div className="small" style={{ marginTop: 4 }}>{ex.indonesian}</div>
                    {ex.note ? (
                      <div className="small" style={{ marginTop: 4, fontStyle: "italic", opacity: 0.85 }}>
                        💡 {ex.note}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
