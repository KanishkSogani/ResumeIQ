"use client";

import { motion } from "motion/react";
import {
  Bell,
  Settings,
  BarChart3,
  Zap,
  Target,
  Scale,
  BrainCircuit,
  Info,
} from "lucide-react";
import Link from "next/link";

const MODELS = [
  {
    name: "TF-IDF + Random Forest",
    role: "Full-Stack Developer",
    confidence: 74,
    latency: "12ms",
    featured: false,
  },
  {
    name: "Doc2Vec",
    role: "Web Engineer",
    confidence: 68,
    latency: "34ms",
    featured: false,
  },
  {
    name: "CNN",
    role: "Senior Full-Stack",
    confidence: 89,
    latency: "45ms",
    featured: false,
  },
  {
    name: "Sentence-BERT",
    role: "Senior Full-Stack",
    confidence: 91,
    latency: "110ms",
    featured: false,
  },
  {
    name: "Fine-tuned BERT",
    role: "Senior Full-Stack Developer",
    confidence: 94.2,
    latency: "185ms",
    featured: true,
    label: "Champion Model",
  },
];

const CHART_DATA = [
  { label: "TF-IDF", value: 74 },
  { label: "Doc2Vec", value: 68 },
  { label: "CNN", value: 89 },
  { label: "S-BERT", value: 91 },
  { label: "BERT", value: 94.2, highlight: true },
];

export default function ComparePage() {
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
            className="text-[#dae2fd]/60 font-medium hover:text-[#dae2fd] transition-all duration-300"
            href="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="text-[#adc6ff] border-b-2 border-[#adc6ff] pb-1 font-bold"
            href="/compare"
          >
            Analysis
          </Link>
          <Link
            className="text-[#dae2fd]/60 font-medium hover:text-[#dae2fd] transition-all duration-300"
            href="/upload"
          >
            Models
          </Link>
          <Link
            className="text-[#dae2fd]/60 font-medium hover:text-[#dae2fd] transition-all duration-300"
            href="/history"
          >
            History
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Bell className="text-[#adc6ff] cursor-pointer hover:bg-[#222a3d] p-2 rounded-full transition-all w-9 h-9" />
            <Settings className="text-[#adc6ff] cursor-pointer hover:bg-[#222a3d] p-2 rounded-full transition-all w-9 h-9" />
          </div>
          <button className="primary-gradient text-[#00285d] px-5 py-2 rounded-lg font-bold active:scale-95 transition-transform">
            Upgrade
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-8 max-w-7xl mx-auto w-full flex-grow">
        {/* Header Section */}
        <header className="flex flex-col items-center text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="uppercase tracking-[0.2em] text-[#adc6ff] mb-4 text-xs font-bold"
          >
            Model Architecture Comparison
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tighter mb-12 text-[#dae2fd]"
          >
            Jordan_Dev_Resume_2024.pdf
          </motion.h1>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative inline-flex flex-col items-center justify-center p-8 rounded-full bg-[#131b2e] border border-[#424754]/15"
          >
            <div className="text-6xl font-black tracking-tighter text-[#adc6ff] [text-shadow:0_0_15px_rgba(173,198,255,0.3)]">
              88
            </div>
            <div className="text-sm tracking-widest uppercase text-[#c2c6d6] mt-2 font-bold">
              ATS Score
            </div>
            <div className="absolute -bottom-12 w-64 text-[10px] text-[#c2c6d6] leading-relaxed italic opacity-60">
              ATS score remains constant across all models as the resume is the
              same.
            </div>
          </motion.div>
        </header>

        {/* Model Comparison Grid */}
        <section className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-24">
          {MODELS.map((model, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className={`p-6 rounded-xl flex flex-col justify-between transition-all relative ${
                model.featured
                  ? "bg-[#4d8eff]/10 ring-2 ring-[#adc6ff] shadow-[0_0_30px_rgba(77,142,255,0.2)]"
                  : "bg-[#131b2e] border border-[#424754]/15 hover:bg-[#171f33]"
              }`}
            >
              {model.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#adc6ff] text-[#001a42] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                  {model.label}
                </div>
              )}
              <div>
                <h3
                  className={`font-bold text-xs mb-4 ${model.featured ? "text-[#adc6ff]" : "text-[#c2c6d6]"}`}
                >
                  {model.name}
                </h3>
                <p className="text-lg font-bold leading-tight mb-6 text-[#dae2fd]">
                  {model.role}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span
                    className={`text-[10px] uppercase tracking-wider ${model.featured ? "text-[#adc6ff]/80" : "text-[#c2c6d6]"}`}
                  >
                    Confidence
                  </span>
                  <span
                    className={`font-black ${model.featured ? "text-2xl text-[#adc6ff]" : "text-primary text-[#adc6ff]"}`}
                  >
                    {model.confidence}%
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <span
                    className={`text-[10px] uppercase tracking-wider ${model.featured ? "text-[#adc6ff]/80" : "text-[#c2c6d6]"}`}
                  >
                    Latency
                  </span>
                  <span
                    className={`text-xs ${model.featured ? "text-[#adc6ff] font-bold" : "text-[#dae2fd]"}`}
                  >
                    {model.latency}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Insights & Chart Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-[#131b2e] p-8 rounded-xl border border-[#424754]/15"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-bold tracking-tight text-[#dae2fd]">
                Confidence Comparison Chart
              </h2>
              <BarChart3 className="text-[#adc6ff] w-6 h-6" />
            </div>
            <div className="h-64 flex items-end gap-6 px-4 border-b border-[#424754]/20">
              {CHART_DATA.map((item, idx) => (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center gap-4 group"
                >
                  <div className="w-full relative flex flex-col justify-end h-full">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${item.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                      className={`w-full rounded-t-lg transition-all duration-500 relative group ${
                        item.highlight
                          ? "primary-gradient shadow-[0_0_20px_rgba(173,198,255,0.3)]"
                          : "bg-[#222a3d] hover:bg-[#adc6ff]/40"
                      }`}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity text-[#dae2fd]">
                        {item.value}%
                      </div>
                    </motion.div>
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-tighter text-center leading-none h-8 flex items-center ${
                      item.highlight
                        ? "text-[#adc6ff] font-bold"
                        : "text-[#c2c6d6]"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance Summary */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#131b2e] p-6 rounded-xl border border-[#424754]/15"
            >
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#c2c6d6] mb-6">
                Performance Summary
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#222a3d] flex items-center justify-center">
                    <Zap className="text-[#adc6ff] w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#c2c6d6]">
                      Fastest Model
                    </p>
                    <p className="font-bold text-[#dae2fd]">
                      TF-IDF <span className="text-[#adc6ff] ml-2">12ms</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#222a3d] flex items-center justify-center">
                    <Target className="text-[#adc6ff] w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#c2c6d6]">
                      Most Accurate
                    </p>
                    <p className="font-bold text-[#dae2fd]">
                      BERT <span className="text-[#adc6ff] ml-2">94.2%</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#222a3d] flex items-center justify-center">
                    <Scale className="text-[#adc6ff] w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#c2c6d6]">
                      Best Trade-off
                    </p>
                    <p className="font-bold text-[#dae2fd]">
                      CNN{" "}
                      <span className="text-[#adc6ff] ml-2">89% @ 45ms</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#222a3d] p-6 rounded-xl border border-[#424754]/15 border-l-4 border-[#ffb786]"
            >
              <div className="flex items-center gap-2 mb-3">
                <BrainCircuit className="text-[#ffb786] w-5 h-5" />
                <h4 className="text-sm font-bold text-[#ffb786] uppercase tracking-widest">
                  Agreement Analysis
                </h4>
              </div>
              <p className="text-sm leading-relaxed text-[#dae2fd]">
                <strong className="text-[#adc6ff]">4 out of 5</strong> models
                predict{" "}
                <span className="font-bold">Senior Full-Stack Developer</span>.
                This high consensus indicates strong alignment between semantic
                markers and keyword metrics.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Analysis & Insights Deep Dive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-[#131b2e] p-8 rounded-xl border border-[#424754]/15"
        >
          <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-[#c2c6d6] mb-6">
            Model Insight Deep Dive
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative pl-6 border-l border-[#adc6ff]/20">
              <p className="text-lg leading-relaxed text-[#c2c6d6] italic opacity-80">
                "Traditional models like{" "}
                <span className="text-[#dae2fd] font-semibold">TF-IDF</span>{" "}
                rely on keyword frequency, acting as high-speed lexical
                scanners."
              </p>
            </div>
            <div className="relative pl-6 border-l border-[#adc6ff]/20">
              <p className="text-lg leading-relaxed text-[#c2c6d6] opacity-80">
                "In contrast, transformer-based models like{" "}
                <span className="text-[#adc6ff] font-semibold">BERT</span> and{" "}
                <span className="text-[#adc6ff] font-semibold">S-BERT</span>{" "}
                understand semantic context and long-range dependencies,
                recognizing expertise beyond mere word matches."
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0b1326] flex flex-col md:flex-row justify-between items-center py-12 px-8 w-full gap-6 mt-10 border-t border-[#424754]/10">
        <div className="text-lg font-bold text-[#dae2fd]">
          ResumeIQ Intelligence
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <a
            className="text-[#dae2fd]/40 hover:text-[#adc6ff] transition-colors text-sm"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-[#dae2fd]/40 hover:text-[#adc6ff] transition-colors text-sm"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="text-[#dae2fd]/40 hover:text-[#adc6ff] transition-colors text-sm"
            href="#"
          >
            AI Ethics
          </a>
          <a
            className="text-[#dae2fd]/40 hover:text-[#adc6ff] transition-colors text-sm"
            href="#"
          >
            Documentation
          </a>
        </div>
        <div className="text-[#dae2fd]/40 text-sm leading-relaxed">
          © 2024 ResumeIQ Intelligence. The Digital Curator Framework.
        </div>
      </footer>
    </div>
  );
}
