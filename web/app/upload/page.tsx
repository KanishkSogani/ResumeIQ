"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  UploadCloud,
  FileText,
  Trash2,
  BrainCircuit,
  Network,
  Globe,
  LayoutGrid,
  Brain,
  GitBranch,
  CheckCircle2,
  PlusCircle,
  X,
  Sparkles,
  FileType,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const STEPS = [
  { id: 1, label: "Document Load", sub: "Step 01", active: true },
  { id: 2, label: "Contextual Target", sub: "Step 02", active: false },
  { id: 3, label: "Model Calibration", sub: "Step 03", active: false },
];

const ENGINES = [
  {
    id: "tfidf",
    name: "TF-IDF + Random Forest",
    icon: Network,
    color: "text-[#adc6ff]",
  },
  {
    id: "word2vec",
    name: "Word2Vec / Doc2Vec",
    icon: Globe,
    color: "text-[#c2c6d6]",
  },
  {
    id: "cnn",
    name: "CNN Classifier",
    icon: LayoutGrid,
    color: "text-[#c2c6d6]",
  },
  {
    id: "sbert",
    name: "S-BERT Semantic",
    icon: Brain,
    color: "text-[#adc6ff]",
  },
  {
    id: "bert",
    name: "BERT Encoders",
    icon: GitBranch,
    color: "text-[#c2c6d6]",
  },
];

export default function UploadPage() {
  const [selectedEngines, setSelectedEngines] = useState<string[]>([
    "tfidf",
    "sbert",
  ]);
  const [jobDescription, setJobDescription] = useState("");
  const [files, setFiles] = useState([
    {
      name: "Senior_Software_Engineer_2024.pdf",
      size: "2.4 MB",
      status: "Uploaded",
    },
  ]);

  const toggleEngine = (id: string) => {
    setSelectedEngines((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id],
    );
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col">
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
            className="text-[#adc6ff] font-bold border-b-2 border-[#adc6ff] pb-1 antialiased text-md leading-relaxed transition-all"
            href="/upload"
          >
            Upload
          </Link>
          <Link
            className="text-[#dae2fd] opacity-70 hover:text-[#adc6ff] transition-colors duration-200 antialiased text-md leading-relaxed"
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
          <button className="primary-gradient text-[#00285d] px-6 py-2 rounded-lg font-bold scale-95 active:opacity-80 transition-all">
            Analyze Resume
          </button>
        </div>
      </nav>

      <main className="flex-grow hero-gradient relative">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header Section */}
          <div className="mb-12">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-black tracking-tight text-[#adc6ff] mb-4 leading-none"
            >
              New Analysis
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#c2c6d6] max-w-2xl text-lg leading-relaxed"
            >
              Prepare your career data for high-fidelity AI curation. Upload
              your latest resume and target job description to begin the
              extraction process.
            </motion.p>
          </div>

          {/* Bento-Style Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Steps & Progress Sidebar */}
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-6">
                {STEPS.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center gap-4 group transition-opacity duration-300 ${step.active ? "opacity-100" : "opacity-40"}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-colors ${step.active ? "border-[#adc6ff] text-[#adc6ff]" : "border-[#424754] text-[#dae2fd]"}`}
                    >
                      {step.id}
                    </div>
                    <div>
                      <span
                        className={`block text-xs font-bold uppercase tracking-widest ${step.active ? "text-[#adc6ff]" : "text-[#c2c6d6]"}`}
                      >
                        {step.sub}
                      </span>
                      <span className="text-[#dae2fd] font-semibold">
                        {step.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-[#131b2e] rounded-xl border border-[#424754]/10">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#ffb786] mb-4 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  Pro Tip
                </h4>
                <p className="text-sm text-[#c2c6d6] leading-relaxed">
                  S-BERT models provide the highest semantic accuracy for
                  technical roles. Consider BERT for complex enterprise
                  descriptions.
                </p>
              </div>
            </div>

            {/* Main Work Area */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Upload & Context */}
              <div className="space-y-8">
                {/* Resume Source Card */}
                <section className="bg-[#171f33] rounded-xl p-8 border border-[#424754]/10 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#adc6ff] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                  <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-lg font-bold tracking-tight text-[#dae2fd]">
                      Resume Source
                    </h2>
                    <FileText className="text-[#adc6ff] w-5 h-5" />
                  </div>

                  <div className="border-2 border-dashed border-[#424754] rounded-xl p-10 flex flex-col items-center justify-center text-center hover:border-[#adc6ff] transition-colors cursor-pointer bg-[#131b2e]">
                    <UploadCloud className="w-12 h-12 text-[#4d8eff] mb-4" />
                    <p className="text-[#dae2fd] font-medium mb-1">
                      Drag & drop your resume
                    </p>
                    <p className="text-sm text-[#c2c6d6] mb-6">
                      Supports PDF, DOCX (Max 10MB)
                    </p>
                    <button className="bg-[#222a3d] text-[#adc6ff] px-6 py-2 rounded-lg text-sm font-bold border border-[#424754] hover:border-[#adc6ff] transition-all">
                      Browse Files
                    </button>
                  </div>

                  {/* File List */}
                  <div className="mt-6 space-y-3">
                    <AnimatePresence>
                      {files.map((file, idx) => (
                        <motion.div
                          key={file.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex items-center gap-4 p-4 bg-[#060e20] rounded-lg border border-[#424754]/20"
                        >
                          <div className="w-12 h-12 bg-[#2d3449] rounded flex items-center justify-center">
                            <FileType className="text-[#c2c6d6] w-6 h-6" />
                          </div>
                          <div className="flex-grow overflow-hidden">
                            <p className="text-sm font-semibold truncate text-[#dae2fd]">
                              {file.name}
                            </p>
                            <p className="text-xs text-[#c2c6d6]">
                              {file.size} • {file.status}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFile(idx)}
                            className="text-[#ffb4ab] opacity-70 hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </section>

                {/* Job Description Context */}
                <div className="relative group">
                  <label className="absolute -top-3 left-4 bg-[#0b1326] px-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#adc6ff] z-10">
                    Job Description Context
                  </label>
                  <div className="relative rounded-xl overflow-hidden bg-[#131b2e] border border-[#424754]/50 focus-within:border-[#adc6ff] transition-colors">
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="w-full bg-transparent border-none p-6 pt-8 text-[#dae2fd] placeholder:text-[#8c909f] focus:ring-0 transition-all resize-none text-sm leading-relaxed min-h-[220px]"
                      placeholder="Paste the target job description here to align neural architectures..."
                    />
                    <div className="absolute bottom-4 right-4 flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#8c909f]">
                        Optional
                      </span>
                      <div className="h-1 w-24 bg-[#222a3d] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#adc6ff] transition-all duration-300"
                          style={{
                            width: `${Math.min((jobDescription.length / 5000) * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-[#8c909f]">
                        {jobDescription.length}/5000
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Model Selection */}
              <div className="space-y-8">
                <section className="bg-[#171f33] rounded-xl p-8 h-full flex flex-col border border-[#424754]/10">
                  <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-lg font-bold tracking-tight text-[#dae2fd]">
                      Intelligence Engine
                    </h2>
                    <BrainCircuit className="text-[#adc6ff] w-5 h-5" />
                  </div>
                  <p className="text-sm text-[#c2c6d6] mb-6 leading-relaxed">
                    Select one or more neural architectures for cross-validation
                    analysis.
                  </p>

                  <div className="space-y-3 mb-8 flex-grow">
                    {ENGINES.map((engine) => {
                      const isSelected = selectedEngines.includes(engine.id);
                      return (
                        <button
                          key={engine.id}
                          onClick={() => toggleEngine(engine.id)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl transition-all border ${
                            isSelected
                              ? "bg-[#222a3d] border-[#adc6ff] shadow-lg"
                              : "bg-[#131b2e] border-transparent hover:border-[#4d8eff]/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <engine.icon
                              className={`w-5 h-5 ${isSelected ? "text-[#adc6ff]" : "text-[#c2c6d6]"}`}
                            />
                            <span
                              className={`text-sm font-medium ${isSelected ? "text-[#dae2fd]" : "text-[#c2c6d6]"}`}
                            >
                              {engine.name}
                            </span>
                          </div>
                          {isSelected ? (
                            <CheckCircle2 className="w-5 h-5 text-[#adc6ff]" />
                          ) : (
                            <PlusCircle className="w-5 h-5 text-[#8c909f]" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-6 border-t border-[#424754]/20">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#c2c6d6] mb-4">
                      Selected Architectures
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEngines.map((id) => {
                        const engine = ENGINES.find((e) => e.id === id);
                        return (
                          <span
                            key={id}
                            className="bg-[#2d3449] text-[#adc6ff] px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-[#adc6ff]/20"
                          >
                            {engine?.name.split(" ")[0]}
                            <X
                              className="w-3 h-3 cursor-pointer hover:text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleEngine(id);
                              }}
                            />
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 p-10 bg-[#171f33] rounded-2xl relative overflow-hidden border border-[#424754]/10"
          >
            <div className="absolute top-0 right-0 p-24 bg-[#adc6ff] opacity-5 rounded-full blur-[100px] -mr-20 -mt-20"></div>
            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 text-[#dae2fd]">
                Ready to Analyze?
              </h3>
              <p className="text-[#c2c6d6]">
                Estimated processing time: 4-6 seconds
              </p>
            </div>
            <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
              <button className="w-full md:w-auto primary-gradient text-[#00285d] px-12 py-5 rounded-xl font-black text-lg tracking-tight shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                Analyze Resume
                <Sparkles className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center bg-[#0b1326] border-t border-[#424754]/10">
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
