import AppShell from "@/components/AppShell";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const year = new Date().getFullYear();
  return (
    <main className="container">
      <div className="header">
        <div>
          <h1 className="title">Hangul Mastery</h1>
          <p className="subtitle">
            Latihan membaca Hangul dan menghafal kosakata Korea–Indonesia
            (nama tempat, angka, kata kerja) — lengkap dengan pelafalan suara.
          </p>
        </div>
        <ThemeToggle />
      </div>
      <AppShell />
      <footer className="small" style={{ marginTop: 18, textAlign: "center" }}>
        © {year} TeamLab. All rights reserved.
      </footer>
    </main>
  );
}
