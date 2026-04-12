"use client";

import { motion } from "motion/react";
import {
  Sparkles,
  FileText,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
  Info,
  AlertTriangle,
  BarChart3,
  Printer,
  Zap,
  ChevronRight,
  BrainCircuit,
  Target,
  ListChecks,
} from "lucide-react";
import Link from "next/link";

const ATS_METRICS = [
  { label: "Keyword Matching", value: 92, color: "bg-[#adc6ff]" },
  { label: "Semantic Relevance", value: 85, color: "bg-[#adc6ff]" },
  { label: "Document Structure", value: 88, color: "bg-[#ffb786]" },
];

const SECTION_EFFICIENCY = [
  { label: "PROJECTS", value: 95, color: "bg-[#adc6ff]" },
  { label: "EXPERIENCE", value: 82, color: "bg-[#8c909f]" },
  { label: "EDUCATION", value: 75, color: "bg-[#8c909f]" },
];

const SKILL_CLUSTERS = [
  {
    category: "Frontend",
    skills: [
      { name: "React.js", highlighted: true },
      { name: "TypeScript", highlighted: false },
      { name: "Tailwind", highlighted: false },
    ],
    color: "bg-[#adc6ff]",
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", highlighted: true },
      { name: "GraphQL", highlighted: false },
      { name: "System Design", highlighted: true, special: true },
    ],
    color: "bg-[#adc6ff]",
  },
  {
    category: "DevOps / Tools",
    skills: [
      { name: "Kubernetes", highlighted: false },
      { name: "Docker", highlighted: false },
      { name: "AWS S3", highlighted: false },
    ],
    color: "bg-[#8c909f]",
  },
];

const KEYWORD_GAPS = [
  {
    name: "Cloud Architecture",
    description: "Missing in 85% of job descriptions for this level.",
    impact: "+12 Score Pts",
    type: "critical",
    color: "bg-[#ffb4ab]",
    icon: AlertTriangle,
  },
  {
    name: "Redis / Caching Strategies",
    description: 'Strongly requested for "Senior" engineering titles.',
    impact: "+5 Score Pts",
    type: "advised",
    color: "bg-[#ffb786]",
    icon: BarChart3,
  },
];

const NEXT_STEPS = [
  {
    id: 1,
    title: "Evidence Cloud Experience",
    desc: "Target role requires AWS/GCP orchestration proof.",
    active: true,
  },
  {
    id: 2,
    title: "Quantify Experience",
    desc: "Add metric-driven bullets to your lead dev role.",
    active: false,
  },
  {
    id: 3,
    title: "CI/CD Tooling",
    desc: "Explicitly mention Jenkins or GitHub Actions.",
    active: false,
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b1326] text-[#dae2fd]">
      {/* TopNavBar */}
      <nav className="flex justify-between items-center w-full px-8 py-4 sticky top-0 z-50 bg-[#0b1326]/80 backdrop-blur-md border-b border-[#424754]/10">
        <Link
          href="/"
          className="text-xl font-black tracking-tighter text-[#adc6ff]"
        >
          ResumeIQ
        </Link>
        <div className="hidden md:flex space-x-8 items-center">
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
            className="text-[#dae2fd] opacity-70 hover:text-[#adc6ff] transition-colors duration-200 antialiased text-md leading-relaxed"
            href="/history"
          >
            History
          </Link>
          <Link
            className="text-[#dae2fd] opacity-70 hover:text-[#adc6ff] transition-colors duration-200 antialiased text-md leading-relaxed"
            href="/compare"
          >
            Compare
          </Link>
        </div>
        <div className="flex space-x-4">
          <button className="text-[#dae2fd] opacity-70 hover:opacity-100 transition-all text-sm font-medium">
            Sign In
          </button>
          <Link
            href="/upload"
            className="primary-gradient text-[#00285d] px-5 py-2 rounded-lg font-bold hover:scale-95 active:opacity-80 transition-all text-sm"
          >
            Analyze Resume
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-8 w-full">
        {/* Summary Insight Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 p-1 rounded-2xl bg-gradient-to-r from-[#adc6ff]/20 via-[#4d8eff]/10 to-transparent border border-[#adc6ff]/10"
        >
          <div className="bg-[#131b2e] rounded-[14px] p-6 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#adc6ff] blur-xl opacity-20"></div>
                <div className="relative bg-[#222a3d] w-20 h-20 rounded-xl flex flex-col items-center justify-center border border-[#adc6ff]/30">
                  <span className="text-4xl font-black tracking-tighter text-[#adc6ff] [text-shadow:0_0_8px_rgba(173,198,255,0.5)]">
                    88
                  </span>
                  <span className="text-[9px] font-bold text-[#8c909f] uppercase tracking-tighter">
                    ATS Score
                  </span>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-[#8c909f] mb-1">
                  Top Match
                </div>
                <div className="text-2xl font-black tracking-tight text-[#dae2fd]">
                  Senior Full-Stack Developer
                </div>
              </div>
            </div>
            <div className="h-12 w-px bg-[#424754]/20 hidden lg:block"></div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="text-[#adc6ff] w-3.5 h-3.5" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#adc6ff]">
                  Key Recommendation
                </span>
              </div>
              <p className="text-lg font-medium text-[#c2c6d6] leading-tight">
                "Bridge the gap by adding{" "}
                <span className="text-[#adc6ff]">Cloud Architecture</span> and{" "}
                <span className="text-[#adc6ff]">Kubernetes</span> skills."
              </p>
            </div>
            <div className="flex gap-4">
              <button className="bg-[#222a3d] hover:bg-[#2d3449] px-6 py-2.5 rounded-lg text-sm font-bold transition-all border border-[#424754]/20 flex items-center gap-2">
                <Printer className="w-4 h-4" />
                Print Audit
              </button>
              <button className="primary-gradient px-6 py-2.5 rounded-lg text-sm font-bold text-[#00285d] shadow-lg shadow-[#adc6ff]/20 hover:scale-[1.02] transition-all flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Optimize Now
              </button>
            </div>
          </div>
        </motion.div>

        {/* Hero Section */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#adc6ff] px-3 py-1 bg-[#adc6ff]/10 rounded-full border border-[#adc6ff]/20">
              Report ID: #JD-2024-88A
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 text-[#dae2fd]">
            Jordan_Dev_Resume_2024.pdf
          </h1>
          <p className="text-[#c2c6d6] max-w-2xl leading-relaxed text-lg opacity-80">
            AI-powered deep scan complete. We've identified critical
            improvements to help you land your target Senior Engineering role.
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Core Metrics */}
          <section className="lg:col-span-4 space-y-8">
            {/* ATS Score Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#131b2e] p-8 rounded-2xl border border-[#424754]/10 shadow-sm"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <label className="text-[10px] font-bold tracking-widest uppercase text-[#8c909f] block mb-1">
                    What's Good?
                  </label>
                  <h3 className="text-xl font-bold text-[#dae2fd]">
                    ATS Compatibility
                  </h3>
                </div>
                <BarChart3 className="text-[#adc6ff] opacity-50 w-6 h-6" />
              </div>
              <div className="flex flex-col items-center justify-center space-y-10">
                {/* Circular Progress */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-[#2d3449]"
                      cx="96"
                      cy="96"
                      fill="transparent"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="10"
                    ></circle>
                    <motion.circle
                      initial={{ strokeDashoffset: 552.92 }}
                      animate={{ strokeDashoffset: 552.92 - 552.92 * 0.88 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      cx="96"
                      cy="96"
                      fill="transparent"
                      r="88"
                      stroke="url(#scoreGradient)"
                      strokeDasharray="552.92"
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
                    <span className="text-5xl font-black tracking-tighter text-[#dae2fd] [text-shadow:0_0_8px_rgba(173,198,255,0.5)]">
                      88
                    </span>
                    <span className="text-[10px] font-bold text-[#8c909f] tracking-widest uppercase">
                      Score
                    </span>
                  </div>
                </div>
                {/* Metrics */}
                <div className="w-full space-y-6">
                  {ATS_METRICS.map((metric, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2 text-sm">
                        <span className="font-medium text-[#c2c6d6]">
                          {metric.label}
                        </span>
                        <span
                          className={`font-bold ${metric.color.replace("bg-", "text-")}`}
                        >
                          {metric.value}%
                        </span>
                      </div>
                      <div className="w-full bg-[#2d3449] h-2 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${metric.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                          className={`${metric.color} h-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Predicted Role */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#131b2e] p-8 rounded-2xl border border-[#424754]/10"
            >
              <label className="text-[10px] font-bold tracking-widest uppercase text-[#8c909f] mb-6 block">
                Target Alignment
              </label>
              <div className="p-5 bg-[#0b1326] border-l-4 border-[#adc6ff] rounded-r-xl [box-shadow:0_0_15px_rgba(173,198,255,0.1)]">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-[#adc6ff]">
                    Senior Full-Stack Engineer
                  </h3>
                  <span className="text-[10px] font-black bg-[#adc6ff]/20 text-[#adc6ff] px-2 py-0.5 rounded-full">
                    94% MATCH
                  </span>
                </div>
                <p className="text-xs text-[#c2c6d6] leading-relaxed mb-0 opacity-80">
                  "Excellent stack alignment for high-scale product companies.
                  Primary focus: Web, Distributed Systems."
                </p>
              </div>
              <div className="mt-6 space-y-4 opacity-50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#dae2fd]">
                    DevOps Architect
                  </span>
                  <span className="font-mono text-[#adc6ff]">14%</span>
                </div>
                <div className="w-full bg-[#2d3449] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#8c909f] h-full"
                    style={{ width: "14%" }}
                  ></div>
                </div>
              </div>
            </motion.div>

            {/* Improvement Priority */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-[#131b2e] p-8 rounded-2xl border border-[#424754]/10"
            >
              <label className="text-[10px] font-bold tracking-widest uppercase text-[#8c909f] mb-6 block">
                Next Steps: Top Priority
              </label>
              <div className="space-y-4">
                {NEXT_STEPS.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-colors group ${
                      step.active
                        ? "bg-[#171f33] border-[#adc6ff]/20 hover:border-[#adc6ff]/40"
                        : "bg-[#171f33] border-[#424754]/10 hover:border-[#8c909f]/30"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        step.active
                          ? "bg-[#adc6ff]/20 text-[#adc6ff]"
                          : "bg-[#424754]/20 text-[#8c909f]"
                      }`}
                    >
                      {step.id}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#dae2fd] mb-1">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#c2c6d6] opacity-60">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Right Side: Detailed Analysis */}
          <section className="lg:col-span-8 space-y-8">
            {/* Actionable AI Advice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#131b2e] p-8 rounded-2xl border border-[#adc6ff]/30 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <BrainCircuit className="w-48 h-48" />
              </div>
              <div className="flex items-center gap-3 mb-8">
                <Lightbulb className="text-[#adc6ff] w-6 h-6" />
                <div>
                  <label className="text-[10px] font-bold tracking-widest uppercase text-[#8c909f] block mb-1">
                    What should I improve?
                  </label>
                  <h3 className="text-xl font-bold text-[#dae2fd]">
                    Strategic AI Insights
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <CheckCircle2 className="text-[#adc6ff] w-5 h-5 shrink-0 mt-1" />
                    <p className="text-sm leading-relaxed text-[#c2c6d6]">
                      <strong className="text-[#dae2fd] block mb-1">
                        Metric Focus
                      </strong>
                      Instead of "Built a React dashboard", use{" "}
                      <span className="text-[#adc6ff] italic">
                        "Reduced frontend latency by 20% using React
                        optimizations."
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="text-[#adc6ff] w-5 h-5 shrink-0 mt-1" />
                    <p className="text-sm leading-relaxed text-[#c2c6d6]">
                      <strong className="text-[#dae2fd] block mb-1">
                        Skill Validation
                      </strong>
                      You mention Cloud but lack specific service keywords like{" "}
                      <span className="text-[#adc6ff] font-bold">AWS S3</span>{" "}
                      or{" "}
                      <span className="text-[#adc6ff] font-bold">Lambda</span>.
                    </p>
                  </div>
                </div>
                <div className="bg-[#171f33]/50 p-6 rounded-xl border border-[#424754]/20">
                  <h4 className="text-xs font-bold tracking-widest uppercase text-[#8c909f] mb-4 flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5" /> Section Efficiency
                  </h4>
                  <div className="space-y-5">
                    {SECTION_EFFICIENCY.map((section, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-[11px] mb-2 font-bold">
                          <span className="text-[#c2c6d6]">
                            {section.label}
                          </span>
                          <span
                            className={section.color.replace("bg-", "text-")}
                          >
                            {section.value}/100
                          </span>
                        </div>
                        <div className="w-full bg-[#0b1326] h-1.5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${section.value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.4 + idx * 0.1 }}
                            className={`${section.color} h-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Skill Clusters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#131b2e] p-8 rounded-2xl border border-[#424754]/10"
            >
              <div className="mb-8">
                <label className="text-[10px] font-bold tracking-widest uppercase text-[#8c909f] block mb-1">
                  What's Missing?
                </label>
                <h3 className="text-xl font-bold text-[#dae2fd]">
                  Grouped Skill Clusters
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {SKILL_CLUSTERS.map((cluster, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#8c909f] tracking-wider">
                      <span
                        className={`w-2 h-2 rounded-full ${cluster.color}`}
                      ></span>{" "}
                      {cluster.category}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cluster.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                            skill.special
                              ? "bg-[#df7412]/10 border-[#df7412]/30 text-[#ffb786]"
                              : skill.highlighted
                                ? "bg-[#222a3d] text-[#adc6ff] border-[#adc6ff]/20"
                                : "bg-[#222a3d] text-[#c2c6d6] border-transparent opacity-70"
                          }`}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Keyword Gap Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-[#131b2e] p-8 rounded-2xl border border-[#424754]/10"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <label className="text-[10px] font-bold tracking-widest uppercase text-[#8c909f] block mb-1">
                    High-Impact Gaps
                  </label>
                  <h3 className="text-xl font-bold text-[#dae2fd]">
                    Keyword Gap Analysis
                  </h3>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ffb4ab]"></span>
                    <span className="text-[9px] font-bold text-[#8c909f] uppercase tracking-wider">
                      Critical
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ffb786]"></span>
                    <span className="text-[9px] font-bold text-[#8c909f] uppercase tracking-wider">
                      Advised
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {KEYWORD_GAPS.map((gap, idx) => (
                  <div
                    key={idx}
                    className={`group flex items-center justify-between p-5 bg-[#171f33] rounded-2xl border border-[#424754]/5 hover:border-[#adc6ff]/30 transition-all cursor-help relative overflow-hidden`}
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${gap.color}`}
                    ></div>
                    <div className="flex items-center gap-4">
                      <gap.icon
                        className={`w-5 h-5 ${gap.color.replace("bg-", "text-")}`}
                      />
                      <div>
                        <span className="font-bold text-[#dae2fd]">
                          {gap.name}
                        </span>
                        <p className="text-[10px] text-[#c2c6d6] mt-0.5 opacity-60">
                          {gap.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 text-[10px] font-black uppercase rounded-full ${
                          gap.type === "critical"
                            ? "bg-[#93000a] text-[#ffb4ab]"
                            : "bg-[#ffb786]/20 text-[#ffb786]"
                        }`}
                      >
                        {gap.impact}
                      </span>
                      <Info className="w-4 h-4 text-[#8c909f] group-hover:text-[#dae2fd] transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center bg-[#0b1326] mt-20 border-t border-[#424754]/10">
        <div className="mb-8 md:mb-0">
          <div className="text-lg font-bold text-[#adc6ff] mb-2">ResumeIQ</div>
          <p className="text-sm tracking-wide text-[#dae2fd] opacity-50">
            © 2024 ResumeIQ. Editorial-grade AI analysis.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
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
