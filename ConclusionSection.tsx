import { conclusions } from "../data/labData";

export default function ConclusionSection() {
  return (
    <section id="выводы" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-cyan-400 font-mono text-sm">// Раздел 6</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Выводы
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
            <div className="space-y-4">
              {conclusions.map((conclusion, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 bg-slate-900/30 rounded-xl border border-slate-700/20 hover:border-cyan-500/20 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 group-hover:scale-110 transition-transform">
                    {i + 1}
                  </div>
                  <p className="text-slate-300 leading-relaxed pt-1">
                    {conclusion}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary diagram */}
          <div className="mt-10 bg-slate-800/30 border border-slate-700/30 rounded-2xl p-8">
            <h3 className="text-white font-bold text-lg mb-6 text-center">
              Схема трансляции: C → Ассемблер
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-center min-w-[140px]">
                <div className="text-2xl mb-2">📝</div>
                <div className="text-white font-medium">Код на C</div>
                <div className="text-slate-500 text-xs mt-1">Высокий уровень</div>
              </div>
              <div className="text-slate-500 text-2xl rotate-90 md:rotate-0">→</div>
              <div className="bg-slate-900 border border-cyan-500/30 rounded-xl p-4 text-center min-w-[140px]">
                <div className="text-2xl mb-2">⚙️</div>
                <div className="text-cyan-400 font-medium">Компилятор</div>
                <div className="text-slate-500 text-xs mt-1">GCC / Clang</div>
              </div>
              <div className="text-slate-500 text-2xl rotate-90 md:rotate-0">→</div>
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-center min-w-[140px]">
                <div className="text-2xl mb-2">🔧</div>
                <div className="text-white font-medium">Ассемблер</div>
                <div className="text-slate-500 text-xs mt-1">MOV, ADD, CALL...</div>
              </div>
              <div className="text-slate-500 text-2xl rotate-90 md:rotate-0">→</div>
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-center min-w-[140px]">
                <div className="text-2xl mb-2">💻</div>
                <div className="text-white font-medium">Машинный код</div>
                <div className="text-slate-500 text-xs mt-1">0101 1010...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
