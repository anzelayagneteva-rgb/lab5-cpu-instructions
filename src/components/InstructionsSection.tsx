import { useState } from "react";
import { instructions, InstructionInfo } from "../data/labData";

export default function InstructionsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = instructions[activeIndex];

  return (
    <section id="инструкции" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-cyan-400 font-mono text-sm">// Раздел 4</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Объяснение инструкций
          </h2>
          <p className="text-slate-400 mt-3 max-w-lg mx-auto">
            Подробное описание каждой изучаемой инструкции процессора
          </p>
        </div>

        {/* Instruction tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {instructions.map((inst, i) => (
            <button
              key={inst.name}
              onClick={() => setActiveIndex(i)}
              className={`group relative px-6 py-3 rounded-xl font-mono font-bold text-lg transition-all ${
                activeIndex === i
                  ? `${inst.bgColor} ${inst.color} border ${inst.borderColor} shadow-lg`
                  : "bg-slate-800/50 text-slate-500 hover:text-slate-300 border border-transparent hover:border-slate-700/50"
              }`}
            >
              <span className="mr-2">{inst.icon}</span>
              {inst.name}
            </button>
          ))}
        </div>

        {/* Active instruction detail */}
        <InstructionDetail instruction={active} />
      </div>
    </section>
  );
}

function InstructionDetail({ instruction }: { instruction: InstructionInfo }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div
        className={`bg-slate-800/50 border ${instruction.borderColor} rounded-2xl overflow-hidden backdrop-blur-sm`}
      >
        {/* Header */}
        <div className={`${instruction.bgColor} px-8 py-6 border-b ${instruction.borderColor}`}>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{instruction.icon}</span>
            <div>
              <h3 className={`text-2xl font-bold ${instruction.color} font-mono`}>
                {instruction.name}
              </h3>
              <p className="text-slate-400 text-sm">{instruction.fullName}</p>
            </div>
          </div>
          <p className="text-slate-300 mt-4 text-lg">{instruction.description}</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Syntax */}
          <div>
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <span className="text-cyan-400">▸</span> Синтаксис
            </h4>
            <div className="bg-slate-900 rounded-xl p-4 font-mono">
              <code className={instruction.color}>{instruction.syntax}</code>
            </div>
          </div>

          {/* Example */}
          <div>
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <span className="text-cyan-400">▸</span> Пример из программы
            </h4>
            <div className="bg-slate-900 rounded-xl p-4 font-mono">
              <code className={instruction.color}>{instruction.example}</code>
            </div>
          </div>

          {/* Details */}
          <div>
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span className="text-cyan-400">▸</span> Подробности
            </h4>
            <ul className="space-y-2">
              {instruction.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${instruction.color.replace("text-", "bg-")}`} />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
