export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm mb-8">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          Архитектура x86-64
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Изучение машинных
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            инструкций процессора
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12">
          Лабораторная работа №5 — анализ ассемблерного кода, генерируемого
          компилятором C, и изучение основных инструкций: MOV, ADD, CALL, JMP
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {[
            { label: "MOV", desc: "Перемещение", color: "from-blue-500 to-blue-600" },
            { label: "ADD", desc: "Сложение", color: "from-green-500 to-green-600" },
            { label: "CALL", desc: "Вызов", color: "from-purple-500 to-purple-600" },
            { label: "JMP", desc: "Переход", color: "from-amber-500 to-amber-600" },
          ].map((item) => (
            <div
              key={item.label}
              className={`px-5 py-3 bg-gradient-to-r ${item.color} rounded-xl text-white font-mono font-bold shadow-lg transition-transform hover:scale-105 cursor-default`}
            >
              <div className="text-lg">{item.label}</div>
              <div className="text-xs font-sans font-normal opacity-80">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
