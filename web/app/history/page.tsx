"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  FileText,
  Briefcase,
  Check,
  ArrowRightCircle,
  Columns2,
} from "lucide-react";
import Link from "next/link";
import { TopNavBar } from "@/components/LandingPage/TopNavBar";
import { API_BASE_URL } from "@/lib/api";

type ModelResult = {
  name: string;
  prediction: string;
  confidence: number;
  latency_ms: number;
};

type ReportItem = {
  report_id: string;
  file_name: string;
  ats_score: number;
  created_at?: string;
  models: ModelResult[];
};

const formatDate = (value?: string): string => {
  if (!value) return "Unknown date";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Unknown date";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(parsed);
};

const getTopRole = (models: ModelResult[]): string => {
  if (!models?.length) return "Unknown role";
  const top = [...models].sort(
    (a, b) => Number(b.confidence || 0) - Number(a.confidence || 0),
  )[0];
  return top?.prediction || "Unknown role";
};

const getTopModelName = (models: ModelResult[]): string => {
  if (!models?.length) return "N/A";
  const top = [...models].sort(
    (a, b) => Number(b.confidence || 0) - Number(a.confidence || 0),
  )[0];
  return top?.name || "N/A";
};

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
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

        const response = await fetch(`${API_BASE_URL}/reports/?sort=latest`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.detail || "Failed to load report history.",
          );
        }

        const data: ReportItem[] = await response.json();
        const sortedReports = (Array.isArray(data) ? data : []).sort((a, b) => {
          const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return timeB - timeA;
        });
        setReports(sortedReports);
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to load report history.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const toggleSelection = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const filteredHistory = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return reports;

    return reports.filter((item) => {
      const fileNameMatch = item.file_name
        .toLowerCase()
        .includes(normalizedQuery);
      const roleMatch = getTopRole(item.models)
        .toLowerCase()
        .includes(normalizedQuery);
      return fileNameMatch || roleMatch;
    });
  }, [reports, searchQuery]);

  const canRunComparison = Boolean(selectedId);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1326]">
      <TopNavBar />

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
          {isLoading && (
            <div className="rounded-xl border border-[#adc6ff]/30 bg-[#131b2e] px-4 py-3 text-sm text-[#adc6ff]">
              Loading report history...
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-[#ffb4ab]/40 bg-[#2a1218] px-4 py-3 text-sm text-[#ffb4ab]">
              {error}
            </div>
          )}

          {!isLoading && !error && filteredHistory.length === 0 && (
            <div className="rounded-xl border border-[#424754]/20 bg-[#131b2e] px-4 py-6 text-sm text-[#c2c6d6]">
              No reports found. Upload and analyze a resume to see history here.
            </div>
          )}

          <AnimatePresence mode="popLayout">
            {filteredHistory.map((item, idx) => (
              <motion.div
                key={item.report_id}
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
                        {item.file_name}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-sm text-[#c2c6d6] opacity-60">
                          Uploaded on {formatDate(item.created_at)}
                        </p>
                        <span className="w-1 h-1 bg-[#424754] rounded-full hidden md:block"></span>
                        <div className="hidden md:flex items-center text-sm text-[#c2c6d6] opacity-60">
                          <Briefcase className="w-3.5 h-3.5 mr-1.5" />
                          {getTopRole(item.models)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 lg:justify-end">
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 rounded-full text-[10px] font-bold flex items-center border bg-[#ffb786]/20 text-[#ffb786] border-[#ffb786]/20">
                        Top Model: {getTopModelName(item.models)}
                      </div>
                      <div className="px-3 py-1 rounded-full text-[10px] font-bold flex items-center border bg-[#222a3d] text-[#c2c6d6] border-[#424754]/20">
                        Models: {item.models?.length || 0}
                      </div>
                    </div>
                    <div className="flex flex-col items-end min-w-[80px]">
                      <div className="text-3xl font-black text-[#adc6ff] tracking-tighter">
                        {item.ats_score}%
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
                          checked={selectedId === item.report_id}
                          onChange={() => toggleSelection(item.report_id)}
                        />
                        <div className="w-5 h-5 border-2 border-[#424754] rounded flex items-center justify-center peer-checked:bg-[#adc6ff] peer-checked:border-[#adc6ff] transition-all">
                          <Check className="w-3.5 h-3.5 text-[#00285d] hidden peer-checked:block stroke-[4]" />
                        </div>
                        <span className="ml-2 text-sm text-[#c2c6d6] group-hover/check:text-[#dae2fd] transition-colors whitespace-nowrap">
                          Compare
                        </span>
                      </label>
                      <Link
                        href={`/dashboard?reportId=${encodeURIComponent(item.report_id)}`}
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
          {selectedId && (
            <motion.div
              initial={{ y: 100, x: "-50%", opacity: 0 }}
              animate={{ y: 0, x: "-50%", opacity: 1 }}
              exit={{ y: 100, x: "-50%", opacity: 0 }}
              className="fixed bottom-12 left-1/2 z-40 w-full max-w-xl px-4"
            >
              <div className="bg-[#171f33]/90 backdrop-blur-xl rounded-full p-2 pl-8 flex items-center justify-between shadow-2xl border border-[#adc6ff]/20">
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="w-10 h-10 rounded-full border-2 border-[#0b1326] bg-[#222a3d] flex items-center justify-center">
                      <FileText className="w-4 h-4 text-[#adc6ff]" />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-[#dae2fd]">
                    1 Resume selected for model comparison
                  </span>
                </div>
                {canRunComparison ? (
                  <Link
                    href={`/compare?reportIds=${encodeURIComponent(selectedId)}`}
                    className="primary-gradient text-[#00285d] px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    View Comparison
                    <Columns2 className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="primary-gradient text-[#00285d] px-6 py-3 rounded-full font-bold flex items-center gap-2 opacity-70 cursor-not-allowed"
                  >
                    Select a Resume
                    <Columns2 className="w-4 h-4" />
                  </button>
                )}
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
