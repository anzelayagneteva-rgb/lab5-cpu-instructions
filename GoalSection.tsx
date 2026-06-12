export default function GoalSection() {
  const goals = [
    { icon: "📝", text: "Написать простую программу на языке C" },
    { icon: "⚙️", text: "Скомпилировать и получить ассемблерный код" },
    { icon: "🔍", text: "Найти инструкции MOV, ADD, CALL, JMP" },
    { icon: "📖", text: "Определить назначение каждой инструкции" },
    { icon: "🧠", text: "Описать процесс выполнения на уровне инструкций" },
  ];

  return (
    <section id="цель" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-cyan-400 font-mono text-sm">// Раздел 1</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Цель работы
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              Познакомиться с машинными инструкциями процессора, научиться читать
              ассемблерный код, генерируемый компилятором C, и понимать, как
              высокоуровневые конструкции языка транслируются в низкоуровневые
              команды процессора.
            </p>

            <h3 className="text-white font-semibold text-lg mb-4">
              Порядок выполнения:
            </h3>
            <div className="space-y-3">
              {goals.map((goal, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 bg-slate-900/50 rounded-xl border border-slate-700/30 hover:border-cyan-500/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    {goal.icon}
                  </div>
                  <span className="text-slate-300 group-hover:text-white transition-colors">
                    {goal.text}
                  </span>
                  <span className="ml-auto text-slate-600 font-mono text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: "💻", label: "Оборудование", value: "ПК" },
              { icon: "🔧", label: "Компилятор", value: "GCC (x86-64)" },
              { icon: "🔬", label: "Инструмент", value: "Compiler Explorer" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-4 text-center"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                  {item.label}
                </div>
                <div className="text-white font-medium">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
