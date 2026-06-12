import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import GoalSection from "./components/GoalSection";
import SourceCodeSection from "./components/SourceCodeSection";
import AssemblySection from "./components/AssemblySection";
import InstructionsSection from "./components/InstructionsSection";
import ExecutionSection from "./components/ExecutionSection";
import ConclusionSection from "./components/ConclusionSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <HeroSection />
      <GoalSection />
      <SourceCodeSection />
      <AssemblySection />
      <InstructionsSection />
      <ExecutionSection />
      <ConclusionSection />
      <Footer />
    </div>
  );
}
