"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  History as HistoryIcon,
  FileText,
  CheckCircle2,
  Circle,
  Maximize2,
  ArrowRight,
  Sparkles,
  Columns2,
  Search,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const HISTORY_SELECTOR = [
  {
    id: "1",
    filename: "Software_Engineer_V2.pdf",
    date: "Oct 24, 2024",
    selected: true,
  },
  {
    id: "2",
    filename: "Product_Manager_Draft.pdf",
    date: "Oct 22, 2024",
    selected: false,
  },
  {
    id: "3",
    filename: "Fullstack_Dev_Final.pdf",
    date: "Oct 20, 2024",
    selected: true,
  },
];

const CANDIDATE_A = {
  name: "Software_Engineer_V2",
  focus: "Primary Focus",
  score: 88,
  role: "Senior Full-Stack Developer",
  structure: 92,
  keywords: 74,
  skills: ["React.js", "Node.js", "TypeScript", "AWS", "Docker"],
  missing: [
    { name: "Kubernetes", impact: "High Impact" },
    { name: "CI/CD Pipelines", impact: "Moderate" },
  ],
  preview: "https://picsum.photos/seed/resume1/800/1000",
};

const CANDIDATE_B = {
  name: "Fullstack_Dev_Final",
  focus: "Challenger",
  score: 76,
  role: "Mid-Level Software Engineer",
  structure: 81,
  keywords: 89,
  skills: ["JavaScript", "SQL", "Python", "React", "Git"],
  missing: [
    { name: "Cloud Architecture", impact: "High Impact" },
    { name: "Microservices", impact: "High Impact" },
  ],
  preview: "https://picsum.photos/seed/resume2/800/1000",
};

export default function ComparePage() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["1", "3"]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id].slice(0, 2),
    );
  };

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
            className="text-[#dae2fd] opacity-70 hover:text-[#adc6ff] transition-colors duration-200 antialiased text-md leading-relaxed"
            href="/history"
          >
            History
          </Link>
          <Link
            className="text-[#adc6ff] font-bold border-b-2 border-[#adc6ff] pb-1 antialiased text-md leading-relaxed transition-all"
            href="/compare"
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

      <main className="max-w-7xl mx-auto px-8 py-12 w-full flex-grow">
        {/* Selection Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[#adc6ff] tracking-widest text-xs font-bold uppercase mb-2 block">
              AI Analysis Environment
            </span>
            <h1 className="text-5xl font-extrabold tracking-tighter text-[#dae2fd] leading-none">
              Side-by-Side Comparison
            </h1>
          </div>
          <div className="flex gap-3">
            <div className="bg-[#131b2e] p-4 rounded-xl flex items-center gap-4 border-b-2 border-[#adc6ff]">
              <HistoryIcon className="text-[#adc6ff] w-6 h-6" />
              <div className="pr-8">
                <p className="text-[10px] uppercase tracking-widest text-[#8c909f]">
                  Active Comparison
                </p>
                <p className="text-sm font-semibold text-[#dae2fd]">
                  {selectedIds.length} Selected Documents
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparative Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel: Selector */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-[#131b2e] rounded-xl p-6 border border-[#424754]/10">
              <h3 className="text-xs font-bold tracking-wider uppercase mb-6 text-[#c2c6d6]">
                Select History
              </h3>
              <div className="space-y-4">
                {HISTORY_SELECTOR.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleSelection(item.id)}
                      className={`p-4 rounded-lg cursor-pointer transition-all border ${
                        isSelected
                          ? "bg-[#222a3d] border-[#adc6ff] ring-1 ring-[#adc6ff]"
                          : "bg-[#171f33] border-transparent hover:bg-[#222a3d]"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <FileText
                          className={`w-5 h-5 ${isSelected ? "text-[#adc6ff]" : "text-[#8c909f]"}`}
                        />
                        {isSelected ? (
                          <CheckCircle2 className="text-[#adc6ff] w-4 h-4" />
                        ) : (
                          <Circle className="text-[#8c909f] w-4 h-4" />
                        )}
                      </div>
                      <p
                        className={`text-sm font-bold leading-tight ${isSelected ? "text-[#dae2fd]" : "text-[#c2c6d6]"}`}
                      >
                        {item.filename}
                      </p>
                      <p className="text-[10px] text-[#8c909f] mt-1">
                        Uploaded: {item.date}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Curation Tip */}
            <div className="bg-[#adc6ff]/5 p-6 rounded-xl border border-[#adc6ff]/20">
              <p className="text-xs text-[#adc6ff] font-bold mb-2 flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                Curation Tip
              </p>
              <p className="text-xs text-[#c2c6d6] leading-relaxed opacity-80">
                Comparing versions of the same role helps identify which keyword
                optimizations improved your ATS score the most.
              </p>
            </div>
          </aside>

          {/* Right Panel: The Grid */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Candidate A */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 primary-gradient rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                  <div className="relative bg-[#131b2e] p-8 rounded-xl border border-[#424754]/10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg primary-gradient flex items-center justify-center">
                        <span className="text-[#00285d] font-black">A</span>
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-[#dae2fd]">
                          {CANDIDATE_A.name}
                        </h2>
                        <p className="text-xs text-[#adc6ff] font-medium">
                          {CANDIDATE_A.focus}
                        </p>
                      </div>
                    </div>

                    {/* Metric Hero */}
                    <div className="mb-8">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8c909f] mb-1">
                        ATS Score
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black tracking-tighter text-[#adc6ff]">
                          {CANDIDATE_A.score}
                        </span>
                        <span className="text-lg font-bold text-[#8c909f]">
                          /100
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#222a3d] rounded-full mt-4 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${CANDIDATE_A.score}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full primary-gradient"
                        />
                      </div>
                    </div>

                    {/* Roles and Details */}
                    <div className="space-y-6">
                      <div className="p-4 bg-[#060e20] rounded-lg border-l-4 border-[#adc6ff]">
                        <p className="text-[10px] uppercase text-[#8c909f] mb-1">
                          Predicted Role
                        </p>
                        <p className="text-sm font-bold text-[#dae2fd]">
                          {CANDIDATE_A.role}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#171f33] p-4 rounded-lg border border-[#424754]/5">
                          <p className="text-[10px] uppercase text-[#8c909f] mb-1">
                            Structure
                          </p>
                          <p className="text-xl font-bold text-[#dae2fd]">
                            {CANDIDATE_A.structure}%
                          </p>
                        </div>
                        <div className="bg-[#171f33] p-4 rounded-lg border border-[#424754]/5">
                          <p className="text-[10px] uppercase text-[#8c909f] mb-1">
                            Keywords
                          </p>
                          <p className="text-xl font-bold text-[#dae2fd]">
                            {CANDIDATE_A.keywords}%
                          </p>
                        </div>
                      </div>
                      {/* Skills Section */}
                      <div>
                        <p className="text-[10px] uppercase text-[#8c909f] mb-3 font-bold tracking-widest">
                          Top Identified Skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {CANDIDATE_A.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-[#222a3d] rounded text-[11px] font-medium text-[#c2c6d6] border border-[#424754]/10"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Candidate B */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="bg-[#131b2e] p-8 rounded-xl border border-[#424754]/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[#222a3d] flex items-center justify-center border border-[#424754]/20">
                      <span className="text-[#dae2fd] font-black">B</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-[#dae2fd]">
                        {CANDIDATE_B.name}
                      </h2>
                      <p className="text-xs text-[#8c909f] font-medium">
                        {CANDIDATE_B.focus}
                      </p>
                    </div>
                  </div>

                  {/* Metric Hero */}
                  <div className="mb-8 opacity-90">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8c909f] mb-1">
                      ATS Score
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black tracking-tighter text-[#dae2fd]">
                        {CANDIDATE_B.score}
                      </span>
                      <span className="text-lg font-bold text-[#8c909f]">
                        /100
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#222a3d] rounded-full mt-4 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${CANDIDATE_B.score}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-[#8c909f]"
                      />
                    </div>
                  </div>

                  {/* Roles and Details */}
                  <div className="space-y-6">
                    <div className="p-4 bg-[#060e20] rounded-lg border-l-4 border-[#424754]">
                      <p className="text-[10px] uppercase text-[#8c909f] mb-1">
                        Predicted Role
                      </p>
                      <p className="text-sm font-bold text-[#dae2fd]">
                        {CANDIDATE_B.role}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#171f33] p-4 rounded-lg border border-[#424754]/5">
                        <p className="text-[10px] uppercase text-[#8c909f] mb-1">
                          Structure
                        </p>
                        <p className="text-xl font-bold text-[#dae2fd]">
                          {CANDIDATE_B.structure}%
                        </p>
                      </div>
                      <div className="bg-[#171f33] p-4 rounded-lg border border-[#424754]/5">
                        <p className="text-[10px] uppercase text-[#8c909f] mb-1">
                          Keywords
                        </p>
                        <p className="text-xl font-bold text-[#ffb786]">
                          {CANDIDATE_B.keywords}%
                        </p>
                      </div>
                    </div>
                    {/* Skills Section */}
                    <div>
                      <p className="text-[10px] uppercase text-[#8c909f] mb-3 font-bold tracking-widest">
                        Top Identified Skills
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {CANDIDATE_B.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-[#222a3d] rounded text-[11px] font-medium text-[#c2c6d6] border border-[#424754]/10"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Deep Insights: Missing Keywords Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 bg-[#131b2e] rounded-xl p-8 border border-[#424754]/10"
            >
              <div className="flex items-center gap-2 mb-8">
                <Sparkles className="text-[#ffb786] w-5 h-5" />
                <h3 className="text-xl font-bold tracking-tight text-[#dae2fd]">
                  Keyword Gap Analysis
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Column A */}
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-[#8c909f] uppercase tracking-wider">
                    Critical Missing Keywords (A)
                  </p>
                  <div className="space-y-2">
                    {CANDIDATE_A.missing.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-[#ffb786]/5 rounded-lg border border-[#ffb786]/10"
                      >
                        <span className="text-sm font-medium text-[#dae2fd]">
                          {item.name}
                        </span>
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-bold ${
                            item.impact === "High Impact"
                              ? "bg-[#ffb786] text-[#461f00]"
                              : "text-[#8c909f]"
                          }`}
                        >
                          {item.impact}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Column B */}
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-[#8c909f] uppercase tracking-wider">
                    Critical Missing Keywords (B)
                  </p>
                  <div className="space-y-2">
                    {CANDIDATE_B.missing.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-[#ffb786]/5 rounded-lg border border-[#ffb786]/10"
                      >
                        <span className="text-sm font-medium text-[#dae2fd]">
                          {item.name}
                        </span>
                        <span className="text-[9px] bg-[#ffb786] text-[#461f00] px-2 py-0.5 rounded-full uppercase font-bold">
                          {item.impact}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Resume Preview Snapshot */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#060e20] rounded-xl overflow-hidden border border-[#424754]/20 group relative">
                <div className="p-4 bg-[#131b2e] flex items-center justify-between border-b border-[#424754]/10">
                  <span className="text-[10px] font-bold text-[#c2c6d6] uppercase tracking-wider">
                    Document Content Preview
                  </span>
                  <Maximize2 className="w-3.5 h-3.5 text-[#8c909f] cursor-pointer hover:text-[#adc6ff]" />
                </div>
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={CANDIDATE_A.preview}
                    alt="Resume A Preview"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-60"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="bg-[#060e20] rounded-xl overflow-hidden border border-[#424754]/20 group relative">
                <div className="p-4 bg-[#131b2e] flex items-center justify-between border-b border-[#424754]/10">
                  <span className="text-[10px] font-bold text-[#c2c6d6] uppercase tracking-wider">
                    Document Content Preview
                  </span>
                  <Maximize2 className="w-3.5 h-3.5 text-[#8c909f] cursor-pointer hover:text-[#adc6ff]" />
                </div>
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={CANDIDATE_B.preview}
                    alt="Resume B Preview"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-60"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center bg-[#0b1326] border-t border-[#424754]/10 mt-24">
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
