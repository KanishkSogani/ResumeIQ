"use client";

import { motion } from "motion/react";
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Sparkles,
  Trash2,
  FolderOpen,
  Edit3,
  TrendingUp,
  ArrowRight,
  Download,
  Brain,
  Target,
  Verified,
  Plus,
  Bell,
  Settings,
  User,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function JobMatchingPage() {
  const matchedCompetencies = [
    "Python & PyTorch",
    "Transformers",
    "NLP Pipeline",
    "Data Visualization",
    "BERT/GPT",
  ];

  const missingSkills = [
    "Docker & Kubernetes",
    "AWS SageMaker",
    "C++ (Edge Ops)",
  ];

  const actionableGrowth = [
    {
      type: "CRITICAL",
      title: "Add Docker Experience",
      desc: 'Explicitly mention "Dockerized ML microservices" in your Experience section.',
      icon: CheckCircle2,
      color: "text-[#ffb786] bg-[#df7412]/20",
    },
    {
      type: "PROJECT",
      title: "Include MLOps Projects",
      desc: 'Draft a project entry for "Kubernetes-orchestrated LLM inferencing system."',
      icon: FolderOpen,
      color: "text-[#adc6ff] bg-[#adc6ff]/20",
    },
    {
      type: "CONTENT",
      title: "Quantify Impact",
      desc: "Mention % reduction in latency for your Transformer models.",
      icon: Edit3,
      color: "text-[#adc6ff] bg-[#adc6ff]/20",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1326] text-[#dae2fd]">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0b1326]/80 backdrop-blur-xl flex justify-between items-center px-8 h-20 max-w-full mx-auto shadow-[0px_24px_48px_rgba(0,0,0,0.4)] border-b border-[#424754]/10">
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter text-[#adc6ff]"
        >
          ResumeIQ
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            className="text-[#dae2fd]/60 font-medium hover:text-[#adc6ff] transition-all duration-300"
            href="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="text-[#dae2fd]/60 font-medium hover:text-[#adc6ff] transition-all duration-300"
            href="/compare"
          >
            Analysis
          </Link>
          <Link
            className="text-[#adc6ff] border-b-2 border-[#adc6ff] pb-1 font-bold"
            href="/job-matching"
          >
            Job Matching
          </Link>
          <Link
            className="text-[#dae2fd]/60 font-medium hover:text-[#adc6ff] transition-all duration-300"
            href="/history"
          >
            Templates
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/upload"
            className="bg-[#adc6ff] text-[#00285d] px-6 py-2.5 rounded-lg font-bold scale-95 active:scale-90 transition-all"
          >
            Upload Resume
          </Link>
          <div className="w-10 h-10 rounded-full border border-[#424754]/30 overflow-hidden">
            <Image
              src="https://picsum.photos/seed/pro/100/100"
              alt="User"
              width={40}
              height={40}
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-8 max-w-[1440px] mx-auto w-full">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[#adc6ff] font-bold text-xs tracking-[0.2em] uppercase mb-2 block"
            >
              Stage 2: Comparative Analysis
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl font-extrabold tracking-tighter text-[#dae2fd]"
            >
              JD-Enhanced Insights
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4"
          >
            <button className="bg-[#222a3d] text-[#adc6ff] px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-[#2d3449] transition-colors border border-[#424754]/30">
              <Download className="w-5 h-5" /> Export PDF
            </button>
          </motion.div>
        </header>

        {/* Main 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (Match Score & Context) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Active Job Context */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#131b2e] rounded-2xl p-8 border border-[#424754]/10 relative overflow-hidden group"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold tracking-tight">
                  Active Job Context
                </h2>
                <span className="bg-[#adc6ff]/10 text-[#adc6ff] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-[#adc6ff]/20">
                  Target: Senior MLE
                </span>
              </div>
              <div className="bg-[#060e20] rounded-xl p-6 font-mono text-sm text-[#8c909f] leading-relaxed h-[420px] overflow-y-auto border-b-2 border-[#adc6ff]/50 custom-scrollbar">
                <p className="mb-4">
                  We are looking for a Senior Machine Learning Engineer to lead
                  our NLP initiatives. The ideal candidate has deep expertise in
                  Transformer architectures, large-scale data engineering, and
                  deploying models with Docker and Kubernetes.
                </p>
                <p className="mb-1 font-bold text-[#dae2fd]">Requirements:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>5+ years experience in Python/PyTorch</li>
                  <li>Experience with LLMs and Fine-tuning</li>
                  <li>Kubernetes & MLOps expertise</li>
                  <li>Strong track record of shipping production-level AI</li>
                </ul>
              </div>
              <button className="w-full mt-4 bg-[#171f33] text-[#8c909f] py-4 rounded-xl font-bold flex items-center justify-center gap-2 cursor-default border border-[#424754]/20 hover:text-[#adc6ff] transition-colors">
                <CheckCircle2 className="w-5 h-5 text-[#adc6ff]" /> Context
                Locked & Analyzed
              </button>
            </motion.div>

            {/* Match Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#131b2e] rounded-2xl p-8 border border-[#424754]/10"
            >
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#8c909f] mb-8 text-center">
                Match Core Metrics
              </h3>
              <div className="flex flex-col items-center gap-8">
                <div className="relative w-52 h-52 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      className="text-[#2d3449]"
                      cx="104"
                      cy="104"
                      fill="transparent"
                      r="92"
                      stroke="currentColor"
                      strokeWidth="12"
                    ></circle>
                    <motion.circle
                      initial={{ strokeDashoffset: 578.05 }}
                      animate={{ strokeDashoffset: 578.05 - 578.05 * 0.75 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      cx="104"
                      cy="104"
                      fill="transparent"
                      r="92"
                      stroke="url(#matchGradient)"
                      strokeDasharray="578.05"
                      strokeLinecap="round"
                      strokeWidth="12"
                    ></motion.circle>
                    <defs>
                      <linearGradient
                        id="matchGradient"
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
                    <span className="text-6xl font-black tracking-tighter text-[#adc6ff] [text-shadow:0_0_15px_rgba(173,198,255,0.4)]">
                      75%
                    </span>
                    <span className="text-[10px] font-bold text-[#8c909f] uppercase tracking-widest mt-2">
                      Match Score
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-[#171f33] rounded-xl p-4 border border-[#424754]/10 text-center">
                    <span className="text-[10px] font-bold text-[#8c909f] uppercase block mb-1">
                      Semantic
                    </span>
                    <span className="text-xl font-bold text-[#adc6ff]">
                      High (8.4)
                    </span>
                  </div>
                  <div className="bg-[#171f33] rounded-xl p-4 border border-[#424754]/10 text-center">
                    <span className="text-[10px] font-bold text-[#8c909f] uppercase block mb-1">
                      Keywords
                    </span>
                    <span className="text-xl font-bold text-[#ffb786]">
                      62%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Middle Column (Skill Gaps & AI Narrative) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Skill Gap Intelligence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#131b2e] rounded-2xl p-8 border border-[#424754]/10"
            >
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#8c909f] mb-8">
                Skill Gap Intelligence
              </h3>
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Verified className="text-[#adc6ff] w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#adc6ff]">
                      Matched Competencies
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {matchedCompetencies.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-[#222a3d] text-[#dae2fd] px-4 py-2 rounded-full text-sm font-medium border border-[#adc6ff]/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="text-[#ffb786] w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#ffb786]">
                      Missing Critical Skills
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {missingSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-[#df7412]/10 text-[#ffb786] px-4 py-2 rounded-full text-sm font-medium border border-[#df7412]/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Narrative Feedback */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#171f33] rounded-2xl p-8 border-l-4 border-[#adc6ff] shadow-2xl space-y-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-[#adc6ff] p-2 rounded-lg">
                  <Sparkles className="text-[#00285d] w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">
                  AI Narrative Feedback
                </h3>
              </div>
              <div className="space-y-8">
                <div className="relative pl-6 border-l border-[#424754]/30">
                  <span className="text-[10px] font-bold uppercase text-[#adc6ff] tracking-[0.2em] block mb-2">
                    Core Strengths
                  </span>
                  <p className="text-[#c2c6d6] text-sm leading-relaxed opacity-90">
                    Your research background in Transformers aligns perfectly
                    with their NLP needs. The BERT implementation mentioned in
                    your projects is a direct match.
                  </p>
                </div>
                <div className="relative pl-6 border-l border-[#424754]/30">
                  <span className="text-[10px] font-bold uppercase text-[#ffb786] tracking-[0.2em] block mb-2">
                    Strategic Weaknesses
                  </span>
                  <p className="text-[#c2c6d6] text-sm leading-relaxed opacity-90">
                    The JD heavily emphasizes "Production Deployment." Your
                    resume reads more academic; there is no mention of CI/CD or
                    containerization.
                  </p>
                </div>
                <div className="relative pl-6 border-l border-[#424754]/30">
                  <span className="text-[10px] font-bold uppercase text-[#adc6ff] tracking-[0.2em] block mb-2">
                    ATS Optimization
                  </span>
                  <p className="text-[#c2c6d6] text-sm leading-relaxed opacity-90">
                    Swap "Managed data streams" for "Engineered high-throughput
                    ETL pipelines" to better trigger their internal data
                    engineering filters.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Growth & Recap) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Actionable Growth */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#222a3d] rounded-2xl p-6"
            >
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#8c909f] mb-6">
                Actionable Growth
              </h3>
              <div className="space-y-4">
                {actionableGrowth.map((action, index) => (
                  <div
                    key={index}
                    className="bg-[#171f33] rounded-xl p-4 border border-[#424754]/10 group hover:border-[#adc6ff]/50 transition-all cursor-default"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`${action.color} px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter`}
                      >
                        {action.type}
                      </span>
                      <action.icon className="text-[#adc6ff] w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm font-bold text-[#dae2fd] mb-1">
                      {action.title}
                    </p>
                    <p className="text-xs text-[#8c909f] leading-normal opacity-70">
                      {action.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stage 1 Recap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#131b2e] rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute -right-4 -bottom-4 opacity-5">
                <TrendingUp className="w-24 h-24 stroke-[3]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8c909f] block mb-4">
                Stage 1 Recap
              </span>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#c2c6d6]">ATS Compatibility</span>
                  <span className="font-bold text-[#adc6ff]">82%</span>
                </div>
                <div className="w-full h-1 bg-[#222a3d] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#adc6ff]"
                    style={{ width: "82%" }}
                  ></div>
                </div>
                <div className="mt-4">
                  <p className="text-[10px] font-bold text-[#8c909f] uppercase tracking-widest mb-1">
                    Top Role Predicted:
                  </p>
                  <p className="text-sm font-bold text-[#adc6ff]">
                    NLP Research Engineer
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Primary Action Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#adc6ff] text-[#00285d] py-5 rounded-2xl font-black text-center flex items-center justify-center gap-3 shadow-2xl shadow-[#adc6ff]/10 group transition-all"
            >
              <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Generate JD-Optimized Resume
            </motion.button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center bg-[#0b1326] border-t border-[#424754]/10 mt-20">
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
          <div className="text-xl font-black text-[#dae2fd] mb-2 tracking-tighter">
            ResumeIQ
          </div>
          <p className="text-xs tracking-wide text-[#dae2fd] opacity-40">
            © 2024 ResumeIQ Intelligence Framework. Editorial-Grade Career
            Analysis.
          </p>
        </div>
        <div className="flex gap-8">
          <a
            className="text-xs tracking-wide text-[#dae2fd] opacity-40 hover:opacity-100 transition-opacity"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-xs tracking-wide text-[#dae2fd] opacity-40 hover:opacity-100 transition-opacity"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="text-xs tracking-wide text-[#dae2fd] opacity-40 hover:opacity-100 transition-opacity"
            href="#"
          >
            Help Center
          </a>
          <a
            className="text-xs tracking-wide text-[#dae2fd] opacity-40 hover:opacity-100 transition-opacity"
            href="#"
          >
            API Status
          </a>
        </div>
      </footer>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #060e20;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #222a3d;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #adc6ff;
        }
        .hero-gradient {
          background: radial-gradient(
            circle at 50% 50%,
            rgba(77, 142, 255, 0.05) 0%,
            rgba(11, 19, 38, 0) 70%
          );
        }
      `}</style>
    </div>
  );
}
