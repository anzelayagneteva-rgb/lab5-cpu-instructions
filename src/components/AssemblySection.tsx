import { useState } from "react";
import { assemblyCode } from "../data/labData";

type FilterType = "all" | "mov" | "add" | "call" | "jmp" | "other";

const filterColors: Record<FilterType, string> = {
  all: "bg-slate-600",
  mov: "bg-blue-500",
  add: "bg-green-500",
  call: "bg-purple-500",
  jmp: "bg-amber-500",
  other: "bg-slate-500",
};

const typeColors: Record<string, string> = {
  mov: "text-blue-400",
  add: "text-green-400",
  call: "text-purple-400",
  jmp: "text-amber-400",
  label: "text-cyan-400",
  other: "text-slate-300",
  empty: "",
};

const typeBgColors: Record<string, string> = {
  mov: "bg-blue-500/5 border-l-2 border-l-blue-500/50",
  add: "bg-green-500/5 border-l-2 border-l-green-500/50",
  call: "bg-purple-500/5 border-l-2 border-l-purple-500/50",
  jmp: "bg-amber-500/5 border-l-2 border-l-amber-500/50",
  label: "bg-cyan-500/5",
  other: "",
  empty: "",
};

export default function AssemblySection() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "Все" },
    { key: "mov", label: "MOV" },
    { key: "add", label: "ADD" },
    { key: "call", label: "CALL" },
    { key: "jmp", label: "JMP" },
  ];

  const filteredCode = assemblyCode.map((line, i) => ({
    ...line,
    index: i,
    visible:
      filter === "all" ||
      line.type === filter ||
      line.type === "label" ||
      line.type === "empty",
  }));

  const stats = {
    mov: assemblyCode.filter((l) => l.type === "mov").length,
    add: assemblyCode.filter((l) => l.type === "add").length,
    call: assemblyCode.filter((l) => l.type === "call").length,
    other: assemblyCode.filter((l) => l.type === "other").length,
  };

  return (
    <section id="ассемблер" className="py-20 bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-cyan-400 font-mono text-sm">// Раздел 3</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Ассемблерный код
          </h2>
          <p className="text-slate-400 mt-3 max-w-lg mx-auto">
            Результат компиляции: <code className="text-cyan-400">gcc -S -masm=intel main.c</code>
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { label: "MOV", count: stats.mov, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
            { label: "ADD", count: stats.add, color: "text-green-400 bg-green-500/10 border-green-500/20" },
            { label: "CALL", count: stats.call, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
            { label: "Другие", count: stats.other, color: "text-slate-400 bg-slate-500/10 border-slate-500/20" },
          ].map((s) => (
            <div
              key={s.label}
              className={`px-4 py-2 rounded-lg border ${s.color} font-mono text-sm`}
            >
              {s.label}: <span className="font-bold">{s.count}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-6">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f.key
                  ? `${filterColors[f.key]} text-white shadow-lg`
                  : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Assembly code */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-950 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-700/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-slate-400 text-sm font-mono">main.s</span>
              <span className="text-slate-500 text-xs">x86-64 ASM</span>
            </div>

            <div className="p-4 overflow-x-auto">
              <div className="space-y-0">
                {filteredCode.map((line) => {
                  if (line.type === "empty") {
                    return <div key={line.index} className="h-4" />;
                  }

                  if (!line.visible) {
                    return null;
                  }

                  if (line.type === "label") {
                    return (
                      <div
                        key={line.index}
                        className="py-2 mt-2 first:mt-0"
                      >
                        <span className="text-cyan-400 font-mono font-bold text-base">
                          {line.label}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={line.index}
                      className={`flex items-start py-1.5 px-3 -mx-1 rounded-lg font-mono text-sm transition-all cursor-default ${
                        typeBgColors[line.type]
                      } ${
                        hoveredLine === line.index ? "bg-white/5" : ""
                      }`}
                      onMouseEnter={() => setHoveredLine(line.index)}
                      onMouseLeave={() => setHoveredLine(null)}
                    >
                      <span className="text-slate-600 w-16 flex-shrink-0 select-none text-right mr-4 text-xs pt-0.5">
                        {line.address}
                      </span>
                      <span className={`flex-grow ${typeColors[line.type]}`}>
                        {line.instruction}
                      </span>
                      {hoveredLine === line.index && line.comment && (
                        <span className="text-slate-500 text-xs ml-4 flex-shrink-0 whitespace-nowrap animate-fade-in">
                          ; {line.comment}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
