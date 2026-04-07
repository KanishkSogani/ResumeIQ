"use client";

import { motion } from "motion/react";
import {
  FileText,
  CheckCircle2,
  Zap,
  BarChart3,
  Cpu,
  Layers,
  Activity,
  Lightbulb,
  Download,
  Eye,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const MODELS = [
  {
    name: "Claude-3.5-Sonnet",
    accuracy: "0.992",
    f1: "0.988",
    precision: "0.994",
    recall: "0.982",
    color: "text-[#adc6ff]",
  },
  {
    name: "GPT-4o-Analysis",
    accuracy: "0.985",
    f1: "0.979",
    precision: "0.981",
    recall: "0.977",
    color: "text-[#dae2fd]",
  },
  {
    name: "Gemini-1.5-Pro",
    accuracy: "0.972",
    f1: "0.965",
    precision: "0.968",
    recall: "0.962",
    color: "text-[#dae2fd]",
  },
];

const SKILLS = [
  { name: "React.js", highlighted: true },
  { name: "TypeScript", highlighted: true },
  { name: "Node.js", highlighted: true },
  { name: "Kubernetes", highlighted: false },
  { name: "AWS S3", highlighted: false },
  { name: "GraphQL", highlighted: false },
  { name: "System Design", highlighted: true, special: true },
  { name: "CI/CD", highlighted: false },
];

const LATENCY = [
  { label: "Llama-3 Parsing", value: 124, progress: 25 },
  { label: "Vector Embeddings", value: 210, progress: 45 },
  { label: "Risk Assessment", value: 348, progress: 75 },
];

const CONFIDENCE = [
  { label: "MODEL_A", value: 94, height: "94%" },
  { label: "MODEL_B", value: 88, height: "88%" },
  { label: "ENSEMBLE", value: 98, height: "98%", highlight: true },
  { label: "MODEL_D", value: 72, height: "72%" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b1326]">
      {/* TopNavBar */}
      <nav className="flex justify-between items-center w-full px-8 py-4 sticky top-0 z-50 bg-[#0b1326]/80 backdrop-blur-md border-b border-[#424754]/10">
        <Link
          href="/"
          className="text-xl font-black tracking-tighter text-[#adc6ff]"
        >
          ResumeIQ
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link
            className="text-[#dae2fd] opacity-70 hover:text-[#adc6ff] transition-colors duration-200 antialiased text-md leading-relaxed"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-[#dae2fd] opacity-70 hover:text-[#adc6ff] transition-colors duration-200 antialiased text-md leading-relaxed"
            href="/upload"
          >
            Upload
          </Link>
          <Link
            className="text-[#adc6ff] font-bold border-b-2 border-[#adc6ff] pb-1 antialiased text-md leading-relaxed transition-all"
            href="#"
          >
            History
          </Link>
          <Link
            className="text-[#dae2fd] opacity-70 hover:text-[#adc6ff] transition-colors duration-200 antialiased text-md leading-relaxed"
            href="#"
          >
            Compare
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-[#dae2fd] opacity-70 hover:text-[#adc6ff] transition-all text-sm font-medium">
            Sign In
          </button>
          <Link
            href="/upload"
            className="primary-gradient text-[#00285d] px-6 py-2 rounded-lg font-bold scale-95 active:opacity-80 transition-all"
          >
            Analyze Resume
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-12 w-full">
        {/* Hero Section / Title Area */}
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#adc6ff] px-3 py-1 bg-[#adc6ff]/10 rounded-full border border-[#adc6ff]/20">
              Analysis Report v4.2
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 text-[#dae2fd]"
          >
            Jordan_Dev_Resume_2024.pdf
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#c2c6d6] max-w-2xl leading-relaxed opacity-80"
          >
            Editorial-grade AI analysis performed across 4 ensemble models.
            Deep-scan completed in 482ms with high statistical significance.
          </motion.p>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Predicted Role & ATS Score */}
          <div className="md:col-span-4 space-y-6">
            {/* Predicted Job Role */}
            <section className="bg-[#131b2e] p-8 rounded-xl relative overflow-hidden group border border-[#424754]/10">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#adc6ff]/5 rounded-full blur-3xl group-hover:bg-[#adc6ff]/10 transition-all"></div>
              <label className="text-[10px] font-bold tracking-widest uppercase text-[#8c909f] mb-6 block">
                Predicted Job Role
              </label>
              <div className="space-y-6">
                <div className="p-5 bg-[#171f33] border-l-4 border-[#adc6ff] rounded-r-lg">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xl font-bold text-[#adc6ff]">
                      Senior Full-Stack Engineer
                    </h3>
                    <span className="text-[10px] font-bold bg-[#4d8eff]/20 text-[#adc6ff] px-2 py-0.5 rounded border border-[#adc6ff]/10">
                      98% Match
                    </span>
                  </div>
                  <p className="text-[10px] text-[#c2c6d6] opacity-60">
                    Llama-3 Ensemble Prediction
                  </p>
                </div>
                <div className="space-y-4 opacity-60">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#dae2fd]">DevOps Architect</span>
                      <span className="font-mono text-[#adc6ff]">14%</span>
                    </div>
                    <div className="w-full bg-[#2d3449] h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-[#8c909f] h-full"
                        style={{ width: "14%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#dae2fd]">Product Manager</span>
                      <span className="font-mono text-[#adc6ff]">4%</span>
                    </div>
                    <div className="w-full bg-[#2d3449] h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-[#8c909f] h-full"
                        style={{ width: "4%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ATS Score Overview */}
            <section className="bg-[#131b2e] p-8 rounded-xl border border-[#424754]/10">
              <label className="text-[10px] font-bold tracking-widest uppercase text-[#8c909f] mb-8 block">
                ATS Ecosystem Compatibility
              </label>
              <div className="flex flex-col items-center justify-center space-y-8">
                {/* Main Circular Progress */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-[#2d3449]"
                      cx="96"
                      cy="96"
                      fill="transparent"
                      r="80"
                      stroke="currentColor"
                      strokeWidth="10"
                    ></circle>
                    <motion.circle
                      initial={{ strokeDashoffset: 502 }}
                      animate={{ strokeDashoffset: 502 - 502 * 0.85 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      cx="96"
                      cy="96"
                      fill="transparent"
                      r="80"
                      stroke="url(#scoreGradient)"
                      strokeDasharray="502"
                      strokeLinecap="round"
                      strokeWidth="10"
                    ></motion.circle>
                    <defs>
                      <linearGradient
                        id="scoreGradient"
                        x1="0%"
                        x2="100%"
                        y1="0%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#adc6ff"></stop>
                        <stop offset="100%" stopColor="#4d8eff"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-5xl font-black tracking-tighter text-[#dae2fd]">
                      85
                    </span>
                    <span className="text-[10px] font-bold text-[#8c909f] tracking-widest uppercase">
                      Global Score
                    </span>
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-4">
                  <div className="bg-[#171f33] p-4 rounded-lg text-center border border-[#424754]/5">
                    <div className="text-lg font-bold text-[#adc6ff]">92%</div>
                    <div className="text-[9px] uppercase tracking-wider text-[#8c909f]">
                      Keywords
                    </div>
                  </div>
                  <div className="bg-[#171f33] p-4 rounded-lg text-center border border-[#424754]/5">
                    <div className="text-lg font-bold text-[#ffb786]">78%</div>
                    <div className="text-[9px] uppercase tracking-wider text-[#8c909f]">
                      Structure
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Analysis Content */}
          <div className="md:col-span-8 space-y-6">
            {/* Model Performance Comparison */}
            <section className="bg-[#131b2e] rounded-xl overflow-hidden border border-[#424754]/10">
              <div className="p-8 pb-4">
                <label className="text-[10px] font-bold tracking-widest uppercase text-[#8c909f] mb-2 block">
                  Neural Integrity Matrix
                </label>
                <h2 className="text-xl font-bold text-[#dae2fd]">
                  Model Benchmarking
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#222a3d]/30">
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-[#8c909f]">
                        Model Architecture
                      </th>
                      <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-[#8c909f] text-center">
                        Accuracy
                      </th>
                      <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-[#8c909f] text-center">
                        F1 Score
                      </th>
                      <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-[#8c909f] text-center">
                        Precision
                      </th>
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-[#8c909f] text-right">
                        Recall
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#424754]/10">
                    {MODELS.map((model, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-[#222a3d]/50 transition-colors"
                      >
                        <td className={`px-8 py-5 font-bold ${model.color}`}>
                          {model.name}
                        </td>
                        <td className="px-4 py-5 text-center font-mono text-sm text-[#c2c6d6]">
                          {model.accuracy}
                        </td>
                        <td className="px-4 py-5 text-center font-mono text-sm text-[#c2c6d6]">
                          {model.f1}
                        </td>
                        <td className="px-4 py-5 text-center font-mono text-sm text-[#c2c6d6]">
                          {model.precision}
                        </td>
                        <td className="px-8 py-5 text-right font-mono text-sm text-[#c2c6d6]">
                          {model.recall}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skills Extracted */}
              <section className="bg-[#131b2e] p-8 rounded-xl border border-[#424754]/10">
                <label className="text-[10px] font-bold tracking-widest uppercase text-[#8c909f] mb-6 block">
                  Extracted Skill Clusters
                </label>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1.5 rounded text-[11px] font-bold transition-all ${
                        skill.special
                          ? "bg-[#df7412]/10 border border-[#df7412]/30 text-[#ffb786]"
                          : skill.highlighted
                            ? "bg-[#222a3d] text-[#adc6ff] border border-[#adc6ff]/10"
                            : "bg-[#222a3d] text-[#c2c6d6] border border-transparent"
                      }`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>

              {/* Latency Analysis */}
              <section className="bg-[#131b2e] p-8 rounded-xl border border-[#424754]/10">
                <label className="text-[10px] font-bold tracking-widest uppercase text-[#8c909f] mb-6 block">
                  Latency Analysis (ms)
                </label>
                <div className="space-y-4">
                  {LATENCY.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-[10px] mb-1.5 font-bold uppercase tracking-wider">
                        <span className="text-[#c2c6d6]">{item.label}</span>
                        <span className="text-[#adc6ff] font-mono">
                          {item.value}ms
                        </span>
                      </div>
                      <div className="w-full bg-[#171f33] h-1.5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                          className="bg-[#adc6ff] h-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Confidence Chart & Suggestions */}
            <section className="bg-[#131b2e] rounded-xl p-8 border border-[#424754]/10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-[#8c909f] mb-6 block">
                    Confidence Variance across Models
                  </label>
                  <div className="flex items-end justify-between h-48 gap-4 px-4 border-b border-[#424754]/20">
                    {CONFIDENCE.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center w-full gap-2 group"
                      >
                        <div className="w-full relative">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: item.height }}
                            transition={{ duration: 1, delay: 0.8 + idx * 0.1 }}
                            className={`w-full rounded-t-md transition-all cursor-help ${
                              item.highlight
                                ? "primary-gradient"
                                : "bg-[#adc6ff]/20 hover:bg-[#adc6ff]/40"
                            }`}
                          />
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#222a3d] px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[#424754]/20 text-[#dae2fd]">
                            {item.value}% Confidence
                          </div>
                        </div>
                        <span
                          className={`text-[9px] font-bold tracking-tighter ${item.highlight ? "text-[#adc6ff]" : "text-[#8c909f]"}`}
                        >
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-[#8c909f] block">
                    Optimization Tips
                  </label>
                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <div className="mt-1">
                        <Lightbulb className="w-4 h-4 text-[#ffb786]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold mb-1 text-[#dae2fd]">
                          Missing: Distributed Systems
                        </h4>
                        <p className="text-[11px] text-[#c2c6d6] leading-relaxed opacity-80">
                          Consider adding "Microservices" or "Event-driven
                          architecture" to the skills section.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1">
                        <Zap className="w-4 h-4 text-[#adc6ff]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold mb-1 text-[#dae2fd]">
                          Actionable Results
                        </h4>
                        <p className="text-[11px] text-[#c2c6d6] leading-relaxed opacity-80">
                          Your bullet points are strong, but adding %-based
                          metrics (e.g. "reduced latency by 40%") would boost
                          the score.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Featured Section: Resume Preview Mockup */}
        <section className="mt-12 bg-[#060e20] p-1 border border-[#424754]/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-[#0b1326] p-12 min-h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[#adc6ff]/5 blur-[100px] rounded-full -translate-y-1/2"></div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="mb-8 relative z-10"
            >
              <div className="w-20 h-20 bg-[#131b2e] rounded-2xl flex items-center justify-center border border-[#424754]/20">
                <FileText className="text-[#adc6ff] w-10 h-10 opacity-20" />
              </div>
            </motion.div>
            <h3 className="text-2xl font-bold mb-4 text-[#dae2fd] relative z-10">
              Semantic Resume Mapping
            </h3>
            <p className="text-[#c2c6d6] max-w-md mb-8 relative z-10 opacity-80">
              This resume's semantic core aligns with high-growth engineering
              roles. The model identified 14 key career milestones with a focus
              on product delivery.
            </p>
            <div className="flex gap-4 relative z-10">
              <button className="bg-[#222a3d] hover:bg-[#2d3449] px-6 py-2.5 rounded-lg text-sm font-bold transition-all text-[#dae2fd] border border-[#424754]/20 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                View Raw Text
              </button>
              <button className="primary-gradient px-6 py-2.5 rounded-lg text-sm font-bold text-[#00285d] transition-all flex items-center gap-2 shadow-lg">
                <Download className="w-4 h-4" />
                Download Audit PDF
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center bg-[#0b1326] border-t border-[#424754]/10 mt-20">
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
          <div className="text-lg font-bold text-[#adc6ff] mb-2">ResumeIQ</div>
          <p className="text-sm tracking-wide text-[#dae2fd] opacity-50">
            © 2024 ResumeIQ. Professional grade AI analysis.
          </p>
        </div>
        <div className="flex gap-8">
          <a
            className="text-sm tracking-wide text-[#dae2fd] opacity-50 hover:opacity-100 transition-opacity underline-offset-4 hover:underline"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-sm tracking-wide text-[#dae2fd] opacity-50 hover:opacity-100 transition-opacity underline-offset-4 hover:underline"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="text-sm tracking-wide text-[#dae2fd] opacity-50 hover:opacity-100 transition-opacity underline-offset-4 hover:underline"
            href="#"
          >
            API Documentation
          </a>
        </div>
      </footer>
    </div>
  );
}
