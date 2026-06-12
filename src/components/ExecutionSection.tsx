import { useState } from "react";
import { executionSteps, assemblyCode } from "../data/labData";

export default function ExecutionSection() {
  const [activeStep, setActiveStep] = useState(0);
  const step = executionSteps[activeStep];

  const typeColors: Record<string, string> = {
    mov: "text-blue-400",
    add: "text-green-400",
    call: "text-purple-400",
    jmp: "text-amber-400",
    label: "text-cyan-400",
    other: "text-slate-400",
    empty: "",
  };

  return (
    <section id="выполнение" className="py-20 bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-cyan-400 font-mono text-sm">// Раздел 5</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Пошаговое выполнение
          </h2>
          <p className="text-slate-400 mt-3 max-w-lg mx-auto">
            Процесс выполнения программы на уровне машинных инструкций
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left: Assembly with highlights */}
          <div className="bg-slate-950 border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-700/50 flex items-center justify-between">
              <span className="text-slate-400 text-sm font-mono">main.s</span>
              <span className="text-xs text-cyan-400 font-mono">
                Шаг {step.step}/{executionSteps.length}
              </span>
            </div>
            <div className="p-4 overflow-y-auto max-h-[500px] text-sm font-mono">
              {assemblyCode.map((line, i) => {
                if (line.type === "empty") {
                  return <div key={i} className="h-3" />;
                }
                if (line.type === "label") {
                  return (
                    <div key={i} className="py-1 text-cyan-400 font-bold">
                      {line.label}
                    </div>
                  );
                }

                const isHighlighted = step.highlight.includes(i);

                return (
                  <div
                    key={i}
                    className={`flex items-center py-1 px-2 -mx-1 rounded transition-all ${
                      isHighlighted
                        ? "bg-cyan-500/10 border border-cyan-500/30"
                        : "opacity-40"
                    }`}
                  >
                    <span className="text-slate-600 w-12 text-right mr-3 text-xs select-none">
                      {line.address}
                    </span>
                    <span className={typeColors[line.type]}>
                      {line.instruction}
                    </span>
                    {isHighlighted && line.comment && (
                      <span className="text-slate-500 text-xs ml-auto pl-4 hidden xl:inline">
                        ; {line.comment}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Step details */}
          <div className="space-y-6">
            {/* Step selector */}
            <div className="grid grid-cols-4 gap-2">
              {executionSteps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`p-2 rounded-lg text-sm font-mono transition-all ${
                    activeStep === i
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                      : "bg-slate-800 text-slate-500 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  Шаг {s.step}
                </button>
              ))}
            </div>

            {/* Step detail card */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold font-mono">
                  {step.step}
                </div>
                <h3 className="text-white font-bold text-lg">{step.title}</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">{step.description}</p>
            </div>

            {/* Registers */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-cyan-400">⚡</span> Состояние регистров
              </h4>
              <div className="space-y-2">
                {Object.entries(step.registers).map(([reg, val]) => (
                  <div
                    key={reg}
                    className="flex items-center justify-between py-2 px-3 bg-slate-900/50 rounded-lg"
                  >
                    <span className="text-amber-400 font-mono font-bold text-sm">
                      {reg}
                    </span>
                    <span className="text-green-400 font-mono text-sm">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-medium"
              >
                ← Назад
              </button>
              <button
                onClick={() =>
                  setActiveStep(
                    Math.min(executionSteps.length - 1, activeStep + 1)
                  )
                }
                disabled={activeStep === executionSteps.length - 1}
                className="flex-1 py-3 rounded-xl bg-cyan-600 text-white hover:bg-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-medium shadow-lg shadow-cyan-600/20"
              >
                Далее →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
