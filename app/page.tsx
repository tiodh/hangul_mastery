import Game from "@/components/Game";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const year = new Date().getFullYear();
  return (
    <main className="container">
      <div className="header">
        <div>
          <h1 className="title">Hangul Learning Game</h1>
          <p className="subtitle">
            A simple practice game: you see Hangul, then type how to say it (romanization).
            Your level + score is saved in your browser so you can continue later.
          </p>
        </div>
        <ThemeToggle />
      </div>
      <Game />
      <footer className="small" style={{ marginTop: 18, textAlign: "center" }}>
        © {year} TeamLab. All rights reserved.
      </footer>
    </main>
  );
}
