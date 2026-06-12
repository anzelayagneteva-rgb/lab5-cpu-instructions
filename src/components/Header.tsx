import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-cyan-500/20">
            L5
          </div>
          <div>
            <h1 className="text-white font-semibold text-sm leading-tight">
              Лабораторная работа №5
            </h1>
            <p className="text-slate-400 text-xs">Машинные инструкции процессора</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          {["Цель", "Код", "Ассемблер", "Инструкции", "Выполнение", "Выводы"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {item}
              </a>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
