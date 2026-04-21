"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  Brain,
  BarChart3,
  LayoutGrid,
  BrainCircuit,
  Cpu,
  Wand2,
  Rocket,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { TopNavBar } from "@/components/LandingPage/TopNavBar";
import { API_BASE_URL } from "@/lib/api";

type ModelResult = {
  name: string;
  prediction: string;
  confidence: number;
  latency_ms: number;
};

type ReportData = {
  report_id: string;
  file_name: string;
  ats_score: number;
  models: ModelResult[];
};

const FALLBACK_MODEL_STATS = [
  { name: "TF-IDF", value: "92.4%", latency: "12ms", icon: BarChart3 },
  { name: "CNN", value: "88.1%", latency: "45ms", icon: LayoutGrid },
  { name: "SBERT", value: "94.7%", latency: "82ms", icon: BrainCircuit },
  { name: "BERT", value: "91.2%", latency: "115ms", icon: Cpu },
];

const MODEL_ICON_MAP = {
  "tf-idf": BarChart3,
  bert: Cpu,
  cnn: LayoutGrid,
  sbert: BrainCircuit,
  doc2vec: Brain,
};

const normalizeInputToString = (input: unknown): string => {
  if (typeof input === "string") return input;
  if (input === null || input === undefined) return "";

  try {
    return JSON.stringify(input);
  } catch {
    return String(input);
  }
};

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reportId = searchParams.get("reportId");

  const [report, setReport] = useState<ReportData | null>(null);
  const [jobDescriptionInput, setJobDescriptionInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      if (!reportId) {
        setError("No report selected. Please upload a resume first.");
        setIsLoading(false);
        return;
      }

      if (!API_BASE_URL) {
        setError(
          "Missing API URL. Set NEXT_PUBLIC_API_BASE_URL in web/.env.local.",
        );
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `${API_BASE_URL}/reports/${encodeURIComponent(reportId)}`,
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const message = errorData?.detail || "Failed to load report.";
          throw new Error(message);
        }

        const data = await response.json();
        setReport(data);
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to load dashboard report.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  const atsScore = report?.ats_score ?? 86;
  const topModel = useMemo(() => {
    if (!report?.models?.length) return null;
    return [...report.models].sort((a, b) => b.confidence - a.confidence)[0];
  }, [report]);

  const modelStats = useMemo(() => {
    if (!report?.models?.length) return FALLBACK_MODEL_STATS;

    return report.models.map((model) => {
      const iconKey = model.name.toLowerCase() as keyof typeof MODEL_ICON_MAP;
      return {
        name: model.name,
        value: `${Math.round(model.confidence * 100)}%`,
        latency: `${Math.round(model.latency_ms)}ms`,
        icon: MODEL_ICON_MAP[iconKey] ?? Brain,
      };
    });
  }, [report]);

  const handleStartJobMatch = () => {
    const normalizedJdText = normalizeInputToString(jobDescriptionInput);

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(
        "resumeiq_job_description_draft",
        normalizedJdText,
      );
    }

    const targetPath = reportId
      ? `/job-matching?resumeId=${encodeURIComponent(reportId)}`
      : "/job-matching";

    router.push(targetPath);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1326] text-[#dae2fd]">
      <TopNavBar />

      <main className="pt-12 pb-20 px-8 max-w-7xl mx-auto w-full flex-grow">
        {/* Dashboard Header */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-[#adc6ff] font-bold text-xs tracking-[0.2em] uppercase mb-2 block">
                Stage 1 Analysis
              </span>
              <h1 className="text-5xl font-black tracking-tighter text-[#dae2fd]">
                Intelligence Dashboard
              </h1>
              <p className="mt-3 text-[#c2c6d6] text-sm opacity-80">
                {report?.file_name ||
                  "Upload a resume to generate report insights."}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 text-[#c2c6d6] bg-[#131b2e] px-4 py-2 rounded-xl border border-[#424754]/10 shadow-lg"
            >
              <CheckCircle2 className="text-[#adc6ff] w-5 h-5" />
              <span className="font-bold text-sm">
                {isLoading
                  ? "Loading Report..."
                  : error
                    ? "Report Unavailable"
                    : "Analysis Complete"}
              </span>
            </motion.div>
          </div>
          {error && (
            <div className="mt-4 rounded-xl border border-[#ffb4ab]/40 bg-[#2a1218] px-4 py-3 text-sm text-[#ffb4ab]">
              {error}
            </div>
          )}
        </header>

        {/* Bento Grid Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* ATS Score Circular Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 bg-[#131b2e] p-8 rounded-2xl flex flex-col justify-between overflow-hidden relative group border border-[#424754]/10"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#adc6ff]/5 rounded-full blur-3xl group-hover:bg-[#adc6ff]/10 transition-all duration-700"></div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8c909f] mb-12">
                ATS Signal Strength
              </h3>
              <div className="relative w-52 h-52 mx-auto">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    className="text-[#222a3d]"
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                  />
                  <motion.circle
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ strokeDashoffset: 283 - 283 * (atsScore / 100) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="drop-shadow-[0_0_12px_rgba(173,198,255,0.4)]"
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#atsGradient)"
                    strokeDasharray="283"
                    strokeLinecap="round"
                    strokeWidth="8"
                  />
                  <defs>
                    <linearGradient
                      id="atsGradient"
                      x1="0%"
                      x2="100%"
                      y1="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#adc6ff" />
                      <stop offset="100%" stopColor="#4d8eff" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl font-black tracking-tighter text-[#dae2fd] [text-shadow:0_0_15px_rgba(173,198,255,0.3)]">
                    {atsScore}
                  </span>
                  <span className="text-[10px] font-bold text-[#adc6ff] tracking-[0.2em] uppercase mt-[-2px]">
                    Critical Score
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Predicted Role & Model Predictions */}
          <div className="md:col-span-8 flex flex-col gap-6">
            {/* Top Predicted Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#171f33] p-8 rounded-2xl flex items-center justify-between border border-[#424754]/10 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Brain className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#adc6ff] mb-2">
                  Primary Classification
                </h3>
                <div className="text-4xl font-black text-[#dae2fd] tracking-tighter">
                  {topModel?.prediction || "Awaiting classification"}
                </div>
              </div>
              <div className="hidden sm:block relative z-10">
                <Brain className="text-[#adc6ff] opacity-20 w-16 h-16" />
              </div>
            </motion.div>

            {/* Model Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#171f33] p-8 rounded-2xl flex-grow border border-[#424754]/10 shadow-sm"
            >
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8c909f] mb-8">
                Model Inference Metrics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {modelStats.map((stat, idx) => (
                  <motion.div
                    key={`${stat.name}-${idx}`}
                    whileHover={{ y: -4 }}
                    className="bg-[#222a3d] p-5 rounded-xl border border-[#424754]/10 hover:border-[#adc6ff]/20 transition-all shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-bold text-[#8c909f] tracking-widest uppercase">
                        {stat.name}
                      </span>
                      <stat.icon className="text-[#adc6ff] w-4 h-4" />
                    </div>
                    <div className="text-2xl font-black text-[#dae2fd] tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[9px] text-[#ffb786] font-bold tracking-widest uppercase mt-1 opacity-80">
                      {stat.latency} Latency
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Job Matching Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <div className="bg-[#131b2e] rounded-2xl overflow-hidden relative border border-[#424754]/10 shadow-2xl">
            {/* Decorator Gradient */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#ffb786]/5 to-transparent pointer-events-none"></div>
            <div className="p-8 md:p-12 relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#ffb786]/10 flex items-center justify-center border border-[#ffb786]/20">
                  <Wand2 className="text-[#ffb786] w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black tracking-tighter text-[#dae2fd]">
                  Job Matching{" "}
                  <span className="text-[#8c909f] font-medium ml-2 opacity-40">
                    (Optional)
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-8">
                  <div className="relative group">
                    <textarea
                      value={jobDescriptionInput}
                      onChange={(event) =>
                        setJobDescriptionInput(
                          normalizeInputToString(event.target.value),
                        )
                      }
                      className="w-full h-64 bg-[#0b1326] border border-[#222a3d] rounded-2xl p-6 text-[#dae2fd] placeholder:text-[#8c909f]/30 focus:ring-2 focus:ring-[#adc6ff]/20 focus:border-[#adc6ff]/20 transition-all resize-none font-medium text-sm leading-relaxed outline-none shadow-inner"
                      placeholder="Paste job description to analyze match and get recommendations"
                    />
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <span className="text-[10px] font-bold text-[#8c909f] tracking-widest uppercase opacity-40">
                        Semantic Scan Ready
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-8 h-full justify-between py-2">
                  <div className="space-y-4">
                    <p className="text-[#8c909f] leading-relaxed text-sm font-medium">
                      Our semantic engine will compare your profile against the
                      target description to identify:
                    </p>
                    <ul className="space-y-3">
                      {[
                        "SKILL GAP ANALYSIS",
                        "KEYWORD DENSITY OPTIMIZATION",
                        "CULTURAL ALIGNMENT SCORE",
                      ].map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 text-[10px] font-bold text-[#dae2fd] tracking-widest"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#adc6ff] shadow-[0_0_8px_rgba(173,198,255,0.5)]"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={handleStartJobMatch}
                    className="primary-gradient w-full py-5 rounded-2xl text-[#00285d] font-black tracking-widest uppercase text-xs shadow-xl shadow-[#adc6ff]/10 active:scale-[0.98] transition-all flex items-center justify-center gap-3 hover:scale-[1.01]"
                  >
                    <Rocket className="w-4 h-4" />
                    Analyze Job Match
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0b1326] flex flex-col md:flex-row justify-between items-center py-12 px-8 mt-24 border-t border-[#222a3d]/40">
        <div className="mb-8 md:mb-0">
          <div className="text-xl font-black text-[#adc6ff] tracking-tighter mb-2">
            ResumeIQ
          </div>
          <div className="text-[#8c909f] text-xs font-medium">
            © 2024 ResumeIQ Intelligence Framework. Editorial-Grade Career
            Analysis.
          </div>
        </div>
        <div className="flex gap-10">
          {[
            "Privacy Policy",
            "Terms of Service",
            "Help Center",
            "API Status",
          ].map((link, idx) => (
            <a
              key={idx}
              className="text-xs font-bold text-[#8c909f] hover:text-[#ffb786] transition-all duration-300"
              href="#"
            >
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
