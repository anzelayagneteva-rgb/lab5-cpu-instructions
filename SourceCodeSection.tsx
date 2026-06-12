import { cSourceCode } from "../data/labData";

export default function SourceCodeSection() {
  const lines = cSourceCode.split("\n");

  return (
    <section id="код" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-cyan-400 font-mono text-sm">// Раздел 2</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Исходный код программы
          </h2>
          <p className="text-slate-400 mt-3 max-w-lg mx-auto">
            Простая программа на языке C, содержащая функцию сложения и вывод
            результата
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-800/70 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-slate-400 text-sm font-mono">main.c</span>
              <div className="text-slate-500 text-xs">C</div>
            </div>

            {/* Code */}
            <div className="p-6 overflow-x-auto">
              <pre className="text-sm md:text-base">
                <code>
                  {lines.map((line, i) => (
                    <div key={i} className="flex hover:bg-white/5 -mx-2 px-2 rounded">
                      <span className="text-slate-600 select-none w-8 text-right mr-6 flex-shrink-0 font-mono">
                        {i + 1}
                      </span>
                      <span className="font-mono">
                        <HighlightLine line={line} />
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>

          {/* Code explanation */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-green-400 font-mono font-bold">add()</span>
                <span className="text-slate-500 text-sm">строки 3-5</span>
              </div>
              <p className="text-slate-400 text-sm">
                Функция принимает два целых числа и возвращает их сумму. В
                ассемблере это транслируется в инструкцию ADD.
              </p>
            </div>
            <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-purple-400 font-mono font-bold">main()</span>
                <span className="text-slate-500 text-sm">строки 7-12</span>
              </div>
              <p className="text-slate-400 text-sm">
                Точка входа программы. Создаёт переменные, вызывает add() через
                CALL и выводит результат через printf().
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HighlightLine({ line }: { line: string }) {
  // Simple syntax highlighting
  const keywords = ["int", "return", "void", "char", "float", "double", "if", "else", "for", "while"];
  // preprocessor directives handled separately below

  if (line.trim().startsWith("#include")) {
    return <span className="text-purple-400">{line}</span>;
  }

  // Tokenize and highlight
  const parts = line.split(/(\b(?:int|return|void|char|float|double|if|else|for|while)\b|"[^"]*"|\/\/.*|\d+)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (keywords.includes(part)) {
          return <span key={i} className="text-blue-400 font-semibold">{part}</span>;
        }
        if (part.startsWith('"')) {
          return <span key={i} className="text-green-400">{part}</span>;
        }
        if (part.startsWith("//")) {
          return <span key={i} className="text-slate-500 italic">{part}</span>;
        }
        if (/^\d+$/.test(part)) {
          return <span key={i} className="text-amber-400">{part}</span>;
        }
        // Highlight function names
        const funcParts = part.split(/\b(add|printf|main)\b/g);
        return funcParts.map((fp, j) => {
          if (["add", "printf", "main"].includes(fp)) {
            return <span key={`${i}-${j}`} className="text-yellow-300">{fp}</span>;
          }
          return <span key={`${i}-${j}`} className="text-slate-300">{fp}</span>;
        });
      })}
    </>
  );
}
