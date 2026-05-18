import AppShell from "@/components/AppShell";
import AppHeader from "@/components/AppHeader";

export default function Home() {
  const year = new Date().getFullYear();
  return (
    <main className="container">
      <AppHeader />
      <AppShell />
      <footer className="small" style={{ marginTop: 18, textAlign: "center" }}>
        © {year} TeamLab. All rights reserved.
      </footer>
    </main>
  );
}
