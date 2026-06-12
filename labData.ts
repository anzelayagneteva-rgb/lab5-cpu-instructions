export const cSourceCode = `#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main() {
    int x = 10;
    int y = 20;
    int result = add(x, y);
    printf("Result: %d\\n", result);
    return 0;
}`;

export const assemblyCode = [
  { address: "0x0000", label: "add:", instruction: "", type: "label" as const },
  { address: "0x0000", label: "", instruction: "push   rbp", type: "other" as const, comment: "Сохранить базовый указатель стека" },
  { address: "0x0001", label: "", instruction: "mov    rbp, rsp", type: "mov" as const, comment: "Установить новый кадр стека" },
  { address: "0x0004", label: "", instruction: "mov    DWORD PTR [rbp-4], edi", type: "mov" as const, comment: "Сохранить параметр a в стек" },
  { address: "0x0007", label: "", instruction: "mov    DWORD PTR [rbp-8], esi", type: "mov" as const, comment: "Сохранить параметр b в стек" },
  { address: "0x000a", label: "", instruction: "mov    edx, DWORD PTR [rbp-4]", type: "mov" as const, comment: "Загрузить a в edx" },
  { address: "0x000d", label: "", instruction: "mov    eax, DWORD PTR [rbp-8]", type: "mov" as const, comment: "Загрузить b в eax" },
  { address: "0x0010", label: "", instruction: "add    eax, edx", type: "add" as const, comment: "Сложить a + b, результат в eax" },
  { address: "0x0012", label: "", instruction: "pop    rbp", type: "other" as const, comment: "Восстановить базовый указатель" },
  { address: "0x0013", label: "", instruction: "ret", type: "other" as const, comment: "Вернуться из функции" },
  { address: "", label: "", instruction: "", type: "empty" as const },
  { address: "0x0014", label: "main:", instruction: "", type: "label" as const },
  { address: "0x0014", label: "", instruction: "push   rbp", type: "other" as const, comment: "Сохранить базовый указатель стека" },
  { address: "0x0015", label: "", instruction: "mov    rbp, rsp", type: "mov" as const, comment: "Установить новый кадр стека" },
  { address: "0x0018", label: "", instruction: "sub    rsp, 16", type: "other" as const, comment: "Выделить 16 байт в стеке для переменных" },
  { address: "0x001c", label: "", instruction: "mov    DWORD PTR [rbp-4], 10", type: "mov" as const, comment: "Записать x = 10 в стек" },
  { address: "0x0023", label: "", instruction: "mov    DWORD PTR [rbp-8], 20", type: "mov" as const, comment: "Записать y = 20 в стек" },
  { address: "0x002a", label: "", instruction: "mov    edx, DWORD PTR [rbp-8]", type: "mov" as const, comment: "Загрузить y в edx" },
  { address: "0x002d", label: "", instruction: "mov    eax, DWORD PTR [rbp-4]", type: "mov" as const, comment: "Загрузить x в eax" },
  { address: "0x0030", label: "", instruction: "mov    esi, edx", type: "mov" as const, comment: "Передать y как 2-й аргумент" },
  { address: "0x0032", label: "", instruction: "mov    edi, eax", type: "mov" as const, comment: "Передать x как 1-й аргумент" },
  { address: "0x0034", label: "", instruction: "call   add", type: "call" as const, comment: "Вызвать функцию add(x, y)" },
  { address: "0x0039", label: "", instruction: "mov    DWORD PTR [rbp-12], eax", type: "mov" as const, comment: "Сохранить результат в переменную result" },
  { address: "0x003c", label: "", instruction: "mov    eax, DWORD PTR [rbp-12]", type: "mov" as const, comment: "Загрузить result в eax" },
  { address: "0x003f", label: "", instruction: "mov    esi, eax", type: "mov" as const, comment: "Передать result как 2-й аргумент printf" },
  { address: "0x0041", label: "", instruction: 'mov    edi, OFFSET FLAT:.LC0', type: "mov" as const, comment: 'Загрузить адрес строки "Result: %d\\n"' },
  { address: "0x0046", label: "", instruction: "mov    eax, 0", type: "mov" as const, comment: "Обнулить eax (нет аргументов в XMM)" },
  { address: "0x004b", label: "", instruction: "call   printf", type: "call" as const, comment: "Вызвать функцию printf" },
  { address: "0x0050", label: "", instruction: "mov    eax, 0", type: "mov" as const, comment: "Код возврата 0 (успех)" },
  { address: "0x0055", label: "", instruction: "leave", type: "other" as const, comment: "Восстановить стек" },
  { address: "0x0056", label: "", instruction: "ret", type: "other" as const, comment: "Вернуться из main" },
];

export interface InstructionInfo {
  name: string;
  fullName: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  syntax: string;
  example: string;
  details: string[];
}

export const instructions: InstructionInfo[] = [
  {
    name: "MOV",
    fullName: "Move",
    icon: "📦",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    description: "Копирует данные из одного места в другое (из регистра в регистр, из памяти в регистр и т.д.)",
    syntax: "MOV назначение, источник",
    example: "mov eax, 10",
    details: [
      "Самая часто используемая инструкция в ассемблере",
      "Не изменяет флаги процессора",
      "Может работать с регистрами, памятью и непосредственными значениями",
      "Нельзя копировать из памяти в память напрямую — нужен промежуточный регистр",
    ],
  },
  {
    name: "ADD",
    fullName: "Addition",
    icon: "➕",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    description: "Складывает два операнда и сохраняет результат в первом операнде",
    syntax: "ADD назначение, источник",
    example: "add eax, edx",
    details: [
      "Результат сохраняется в первом операнде (назначении)",
      "Изменяет флаги: CF (перенос), ZF (ноль), SF (знак), OF (переполнение)",
      "Может работать с 8, 16, 32 и 64-битными операндами",
      "Часто используется для арифметических операций и адресной арифметики",
    ],
  },
  {
    name: "CALL",
    fullName: "Call Procedure",
    icon: "📞",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    description: "Вызывает подпрограмму (функцию), сохраняя адрес возврата в стеке",
    syntax: "CALL адрес_функции",
    example: "call add",
    details: [
      "Автоматически помещает адрес следующей инструкции в стек (PUSH RIP)",
      "Передаёт управление по указанному адресу",
      "Парная инструкция — RET (return), которая возвращает управление",
      "Используется для вызова как пользовательских, так и библиотечных функций",
    ],
  },
  {
    name: "JMP",
    fullName: "Jump",
    icon: "🔀",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    description: "Безусловный переход — передаёт управление по указанному адресу",
    syntax: "JMP адрес",
    example: "jmp 0x0040",
    details: [
      "Не сохраняет адрес возврата (в отличие от CALL)",
      "Существуют условные аналоги: JE, JNE, JG, JL и др.",
      "Используется для реализации циклов, ветвлений и переходов",
      "В нашей простой программе JMP явно не встречается, но компилятор может добавить его при оптимизации",
    ],
  },
];

export const executionSteps = [
  {
    step: 1,
    title: "Инициализация main()",
    description: "Процессор начинает выполнение с функции main. Сначала сохраняется текущий базовый указатель стека (push rbp) и устанавливается новый кадр стека (mov rbp, rsp). Выделяется место для локальных переменных (sub rsp, 16).",
    highlight: [12, 13, 14],
    registers: { rbp: "0x7fff...f0", rsp: "0x7fff...e0" },
  },
  {
    step: 2,
    title: "Присваивание переменных x и y",
    description: "Значения 10 и 20 записываются в стек по смещениям [rbp-4] и [rbp-8] соответственно. Это соответствует строкам int x = 10 и int y = 20 в исходном коде.",
    highlight: [15, 16],
    registers: { "[rbp-4]": "10 (x)", "[rbp-8]": "20 (y)" },
  },
  {
    step: 3,
    title: "Подготовка аргументов для add()",
    description: "Перед вызовом функции add() значения x и y загружаются в регистры. Согласно соглашению вызовов System V AMD64, первый аргумент передаётся через edi, второй — через esi.",
    highlight: [17, 18, 19, 20],
    registers: { edi: "10 (x)", esi: "20 (y)" },
  },
  {
    step: 4,
    title: "Вызов функции add()",
    description: "Инструкция CALL сохраняет адрес возврата (0x0039) в стеке и передаёт управление на метку add (адрес 0x0000). Процессор переходит к выполнению функции add.",
    highlight: [21],
    registers: { rip: "0x0000 (add)", stack: "[0x0039]" },
  },
  {
    step: 5,
    title: "Выполнение add(): сложение",
    description: "Внутри add() параметры a и b копируются из регистров edi/esi в стек, затем загружаются обратно в edx и eax. Инструкция ADD eax, edx складывает значения: eax = 10 + 20 = 30.",
    highlight: [1, 2, 3, 4, 5, 6, 7],
    registers: { eax: "30 (результат)", edx: "10 (a)" },
  },
  {
    step: 6,
    title: "Возврат из add()",
    description: "Инструкция RET извлекает адрес возврата (0x0039) из стека и передаёт управление обратно в main(). Результат сложения (30) находится в регистре eax.",
    highlight: [8, 9],
    registers: { eax: "30", rip: "0x0039 (main)" },
  },
  {
    step: 7,
    title: "Сохранение результата и вызов printf()",
    description: "Результат из eax сохраняется в переменную result [rbp-12]. Затем подготавливаются аргументы для printf: адрес форматной строки в edi и значение result в esi. Вызывается printf, которая выводит \"Result: 30\".",
    highlight: [22, 23, 24, 25, 26, 27],
    registers: { edi: '"Result: %d\\n"', esi: "30", eax: "0" },
  },
  {
    step: 8,
    title: "Завершение программы",
    description: "В eax записывается 0 — код успешного завершения (return 0). Инструкция LEAVE восстанавливает стек, а RET возвращает управление операционной системе.",
    highlight: [28, 29, 30],
    registers: { eax: "0 (код возврата)" },
  },
];

export const conclusions = [
  "Изучены основные машинные инструкции процессора архитектуры x86-64: MOV, ADD, CALL, JMP.",
  "MOV — наиболее часто встречающаяся инструкция, отвечающая за перемещение данных между регистрами и памятью.",
  "ADD выполняет арифметическое сложение и изменяет флаги процессора.",
  "CALL обеспечивает вызов подпрограмм с автоматическим сохранением адреса возврата.",
  "JMP позволяет реализовать безусловные переходы для управления потоком выполнения.",
  "Даже простая программа на C транслируется в значительное количество машинных инструкций.",
  "Компилятор самостоятельно управляет стеком, регистрами и соглашениями вызовов.",
  "Понимание ассемблерного кода помогает в отладке, оптимизации и анализе безопасности программ.",
];
