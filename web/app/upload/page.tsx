"use client";

import { ChangeEvent, useRef, useState } from "react";
import { motion } from "motion/react";
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
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopNavBar } from "@/components/LandingPage/TopNavBar";
import { API_BASE_URL } from "@/lib/api";

const STEPS = [
  { id: 1, label: "Document Load", sub: "Step 01", active: true },
  { id: 2, label: "Model Selection", sub: "Step 02", active: false },
  { id: 3, label: "Final Results", sub: "Step 03", active: false },
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
  const router = useRouter();
  const [selectedEngine, setSelectedEngine] = useState<string>("tfidf");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [file, setFile] = useState<{
    name: string;
    size: string;
    status: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  const handleFileSelection = (selectedFile: File | null) => {
    if (!selectedFile) return;

    setSelectedFile(selectedFile);
    setUploadError(null);

    setFile({
      name: selectedFile.name,
      size: formatFileSize(selectedFile.size),
      status: "Ready",
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileSelection(event.target.files?.[0] ?? null);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFile(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyzeResume = async () => {
    if (!selectedFile) {
      setUploadError("Please select a resume PDF before analyzing.");
      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
      setUploadError("Only PDF files are supported by the backend right now.");
      return;
    }

    if (!API_BASE_URL) {
      setUploadError(
        "Missing API URL. Set NEXT_PUBLIC_API_BASE_URL in web/.env.local.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setUploadError(null);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(`${API_BASE_URL}/analyze-full`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.detail || "Failed to analyze resume.";
        throw new Error(message);
      }

      const report = await response.json();
      if (!report?.report_id) {
        throw new Error("Invalid response from server. Missing report ID.");
      }

      router.push(
        `/dashboard?reportId=${encodeURIComponent(report.report_id)}`,
      );
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Unexpected upload error.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1326] text-[#dae2fd]">
      <TopNavBar />

      <main className="flex-grow hero-gradient relative">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#adc6ff] mb-4 leading-none">
              New Analysis
            </h1>
            <p className="text-[#c2c6d6] max-w-2xl text-lg leading-relaxed opacity-70">
              Prepare your career data for high-fidelity AI curation. Upload
              your latest resume to begin the extraction process.{" "}
              <span className="text-[#adc6ff] font-medium">
                Job descriptions can be added in the next step for personalized
                insights.
              </span>
            </p>
          </div>

          {/* Bento-Style Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Steps & Progress */}
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

              <div className="p-6 bg-[#131b2e] rounded-xl">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#ffb786] mb-4">
                  Pro Tip
                </h4>
                <p className="text-sm text-[#c2c6d6] leading-relaxed opacity-70">
                  Focus on the Resume first. After extraction, you can provide
                  target job descriptions to calculate contextual matching
                  scores.
                </p>
              </div>
            </div>

            {/* Main Work Area */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Upload */}
              <div className="space-y-8 h-full">
                <section className="bg-[#171f33] rounded-xl p-8 group relative overflow-hidden h-full flex flex-col">
                  <div className="absolute inset-0 bg-[#adc6ff] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                  <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-lg font-bold tracking-tight">
                      Resume Source
                    </h2>
                    <FileText className="text-[#adc6ff] w-6 h-6" />
                  </div>

                  <div
                    className="border-2 border-dashed border-[#424754] rounded-xl p-10 flex flex-col items-center justify-center text-center hover:border-[#adc6ff] transition-colors cursor-pointer bg-[#131b2e] flex-grow"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={handleInputChange}
                    />
                    <UploadCloud className="w-12 h-12 text-[#4d8eff] mb-4" />
                    <p className="text-[#dae2fd] font-medium mb-1">
                      Drag & drop your resume
                    </p>
                    <p className="text-sm text-[#c2c6d6] mb-6 opacity-60">
                      Supports PDF (Max 10MB)
                    </p>
                    <button
                      type="button"
                      className="bg-[#222a3d] text-[#adc6ff] px-6 py-2 rounded-lg text-sm font-bold border border-[#424754] hover:border-[#adc6ff] transition-all"
                    >
                      Browse Files
                    </button>
                  </div>

                  {/* File Preview */}
                  <div className="mt-6 flex items-center gap-4 p-4 bg-[#060e20] rounded-lg border border-[#424754]/20">
                    <div className="w-12 h-12 bg-[#2d3449] rounded flex items-center justify-center">
                      <FileText className="text-[#c2c6d6] w-6 h-6" />
                    </div>
                    <div className="flex-grow overflow-hidden text-left">
                      <p className="text-sm font-semibold truncate">
                        {file?.name || "No file selected"}
                      </p>
                      <p className="text-xs text-[#c2c6d6] opacity-60">
                        {file ? `${file.size} • ${file.status}` : ""}
                      </p>
                    </div>
                    <button
                      onClick={removeFile}
                      className="text-[#ffb4ab] opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </section>
              </div>

              {/* Right Column: Intelligence Engine */}
              <div className="space-y-8 h-full">
                <section className="bg-[#171f33] rounded-xl p-8 h-full flex flex-col">
                  <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-lg font-bold tracking-tight">
                      Intelligence Engine
                    </h2>
                    <BrainCircuit className="text-[#adc6ff] w-6 h-6" />
                  </div>
                  <p className="text-sm text-[#c2c6d6] mb-6 leading-relaxed opacity-70 text-left">
                    Select one model architecture for initial feature extraction
                    and semantic parsing.
                  </p>

                  <div className="space-y-3 mb-8 flex-grow">
                    {ENGINES.map((engine) => {
                      const isSelected = selectedEngine === engine.id;
                      return (
                        <button
                          key={engine.id}
                          onClick={() => setSelectedEngine(engine.id)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl transition-all border ${
                            isSelected
                              ? "bg-[#222a3d] border-[#adc6ff] shadow-lg"
                              : "bg-[#131b2e] border-transparent hover:border-[#adc6ff]/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <engine.icon
                              className={`w-5 h-5 ${isSelected ? "text-[#adc6ff]" : "text-[#c2c6d6]"}`}
                            />
                            <span className="text-sm font-medium">
                              {engine.name}
                            </span>
                          </div>
                          {isSelected ? (
                            <CheckCircle2 className="w-5 h-5 text-[#adc6ff]" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-[#8c909f]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 p-10 bg-[#171f33] rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-24 bg-[#adc6ff] opacity-5 rounded-full blur-[100px] -mr-20 -mt-20"></div>
            <div className="relative z-10 text-left">
              <h3 className="text-2xl font-bold mb-2">Start Extraction</h3>
              <p className="text-[#c2c6d6] opacity-70">
                Estimated processing time: 4-6 seconds
              </p>
            </div>
            <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
              <button
                type="button"
                onClick={handleAnalyzeResume}
                disabled={isSubmitting}
                className="w-full md:w-auto primary-gradient text-[#00285d] px-12 py-5 rounded-xl font-black text-lg tracking-tight shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                {isSubmitting ? "Analyzing..." : "Analyze Resume"}
                <Sparkles className="w-6 h-6" />
              </button>
            </div>
          </div>
          {uploadError && (
            <p className="mt-4 text-sm text-[#ffb4ab] text-left">
              {uploadError}
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center bg-[#0b1326] border-t border-[#424754]/10">
        <div className="mb-6 md:mb-0 text-left">
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
