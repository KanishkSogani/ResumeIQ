"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  FileText,
  Briefcase,
  History as HistoryIcon,
  ArrowRight,
  Sparkles,
  Check,
  Award,
  ArrowRightCircle,
  Columns2,
} from "lucide-react";
import Link from "next/link";

const HISTORY_DATA = [
  {
    id: "1",
    filename: "Senior_Product_Designer_v2.pdf",
    date: "Oct 12, 2023",
    role: "Product Designer",
    score: 88,
    tags: [
      {
        label: "AI Recommended",
        icon: Sparkles,
        color: "bg-[#ffb786]/20 text-[#ffb786] border-[#ffb786]/20",
      },
      {
        label: "7 Years Exp",
        icon: HistoryIcon,
        color: "bg-[#222a3d] text-[#c2c6d6] border-[#424754]/20",
      },
    ],
  },
  {
    id: "2",
    filename: "Frontend_Dev_Google_App.pdf",
    date: "Sep 28, 2023",
    role: "Frontend Engineer",
    score: 72,
    tags: [
      {
        label: "3 Years Exp",
        icon: HistoryIcon,
        color: "bg-[#222a3d] text-[#c2c6d6] border-[#424754]/20",
      },
    ],
  },
  {
    id: "3",
    filename: "Creative_Director_Final.docx",
    date: "Aug 15, 2023",
    role: "Creative Director",
    score: 94,
    tags: [
      {
        label: "Gold Standard",
        icon: Award,
        color: "bg-[#ffb786]/20 text-[#ffb786] border-[#ffb786]/20",
      },
      {
        label: "12 Years Exp",
        icon: HistoryIcon,
        color: "bg-[#222a3d] text-[#c2c6d6] border-[#424754]/20",
      },
    ],
  },
  {
    id: "4",
    filename: "Data_Analyst_Startup.pdf",
    date: "July 22, 2023",
    role: "Data Scientist",
    score: 61,
    tags: [
      {
        label: "Entry Level",
        icon: HistoryIcon,
        color: "bg-[#222a3d] text-[#c2c6d6] border-[#424754]/20",
      },
    ],
  },
];

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const filteredHistory = HISTORY_DATA.filter(
    (item) =>
      item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
            href="/history"
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

      <main className="max-w-7xl mx-auto px-8 py-12 w-full flex-grow">
        {/* Page Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[#adc6ff] font-bold text-xs tracking-[0.15em] uppercase mb-4 block"
            >
              Archive
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl font-extrabold tracking-tight text-[#dae2fd] mb-6"
            >
              Review History
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[#c2c6d6] text-lg leading-relaxed opacity-80"
            >
              Access your previous analysis sessions and track your career
              growth metrics through editorial-grade insights.
            </motion.p>
          </div>
          <div className="w-full md:w-96">
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#8c909f]">
                <Search className="w-5 h-5" />
              </div>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#131b2e] border-none border-b-2 border-transparent focus:border-[#adc6ff] transition-all duration-300 py-4 pl-12 pr-4 rounded-t-lg text-[#dae2fd] focus:ring-0 placeholder:text-[#8c909f]/50"
                placeholder="Search resumes..."
                type="text"
              />
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="flex flex-col space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredHistory.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative bg-[#131b2e] rounded-xl p-6 hover:bg-[#171f33] transition-all duration-300 border border-[#424754]/5"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-center space-x-6 flex-1">
                    <div className="w-12 h-12 shrink-0 rounded-lg bg-[#222a3d] flex items-center justify-center text-[#adc6ff]">
                      <FileText className="w-7 h-7" />
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <h3 className="text-xl font-bold text-[#dae2fd] group-hover:text-[#adc6ff] transition-colors truncate">
                        {item.filename}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-sm text-[#c2c6d6] opacity-60">
                          Uploaded on {item.date}
                        </p>
                        <span className="w-1 h-1 bg-[#424754] rounded-full hidden md:block"></span>
                        <div className="hidden md:flex items-center text-sm text-[#c2c6d6] opacity-60">
                          <Briefcase className="w-3.5 h-3.5 mr-1.5" />
                          {item.role}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 lg:justify-end">
                    <div className="flex items-center gap-2">
                      {item.tags.map((tag, tIdx) => (
                        <div
                          key={tIdx}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center border ${tag.color}`}
                        >
                          <tag.icon className="w-3 h-3 mr-1.5" />
                          {tag.label}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col items-end min-w-[80px]">
                      <div className="text-3xl font-black text-[#adc6ff] tracking-tighter">
                        {item.score}%
                      </div>
                      <span className="text-[9px] uppercase tracking-widest text-[#c2c6d6] opacity-50 leading-none">
                        ATS Score
                      </span>
                    </div>
                    <div className="flex items-center space-x-6 border-l border-[#424754]/20 pl-6">
                      <label className="flex items-center cursor-pointer group/check">
                        <input
                          type="checkbox"
                          className="hidden peer"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => toggleSelection(item.id)}
                        />
                        <div className="w-5 h-5 border-2 border-[#424754] rounded flex items-center justify-center peer-checked:bg-[#adc6ff] peer-checked:border-[#adc6ff] transition-all">
                          <Check className="w-3.5 h-3.5 text-[#00285d] hidden peer-checked:block stroke-[4]" />
                        </div>
                        <span className="ml-2 text-sm text-[#c2c6d6] group-hover/check:text-[#dae2fd] transition-colors whitespace-nowrap">
                          Compare
                        </span>
                      </label>
                      <Link
                        href="/dashboard"
                        className="text-[#adc6ff] font-bold flex items-center hover:translate-x-1 transition-transform whitespace-nowrap text-sm"
                      >
                        View
                        <ArrowRightCircle className="w-4 h-4 ml-1.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Comparison Float */}
        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div
              initial={{ y: 100, x: "-50%", opacity: 0 }}
              animate={{ y: 0, x: "-50%", opacity: 1 }}
              exit={{ y: 100, x: "-50%", opacity: 0 }}
              className="fixed bottom-12 left-1/2 z-40 w-full max-w-xl px-4"
            >
              <div className="bg-[#171f33]/90 backdrop-blur-xl rounded-full p-2 pl-8 flex items-center justify-between shadow-2xl border border-[#adc6ff]/20">
                <div className="flex items-center">
                  <div className="flex -space-x-3 mr-4">
                    {selectedIds.slice(0, 2).map((_, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-[#0b1326] bg-[#222a3d] flex items-center justify-center"
                      >
                        <FileText className="w-4 h-4 text-[#adc6ff]" />
                      </div>
                    ))}
                    {selectedIds.length > 2 && (
                      <div className="w-10 h-10 rounded-full border-2 border-[#0b1326] bg-[#222a3d] flex items-center justify-center text-[10px] font-bold text-[#adc6ff]">
                        +{selectedIds.length - 2}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-[#dae2fd]">
                    {selectedIds.length}{" "}
                    {selectedIds.length === 1 ? "Resume" : "Resumes"} selected
                    for comparison
                  </span>
                </div>
                <button className="primary-gradient text-[#00285d] px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                  Run Comparison
                  <Columns2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
