"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Wand2,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { TopNavBar } from "@/components/LandingPage/TopNavBar";
import { API_BASE_URL } from "@/lib/api";

type MatchResult = {
  match_score: number;
  semantic_similarity: number;
  keyword_match: number;
  matched_skills: string[];
  missing_skills: string[];
};

type FeedbackResult = {
  feedback?: unknown;
  message?: unknown;
  result?: unknown;
};

type FeedbackKey =
  | "strengths"
  | "weaknesses"
  | "missing_skills_analysis"
  | "improvements"
  | "project_suggestions"
  | "ats_improvements";

type StructuredFeedback = Record<FeedbackKey, string[]>;

const FEEDBACK_KEYS: FeedbackKey[] = [
  "strengths",
  "weaknesses",
  "missing_skills_analysis",
  "improvements",
  "project_suggestions",
  "ats_improvements",
];

const FEEDBACK_LABELS: Record<FeedbackKey, string> = {
  strengths: "Strengths",
  weaknesses: "Weaknesses",
  missing_skills_analysis: "Missing Skills Analysis",
  improvements: "Improvements",
  project_suggestions: "Project Suggestions",
  ats_improvements: "ATS Improvements",
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

const createEmptyStructuredFeedback = (): StructuredFeedback => ({
  strengths: [],
  weaknesses: [],
  missing_skills_analysis: [],
  improvements: [],
  project_suggestions: [],
  ats_improvements: [],
});

const parsePossiblyJson = (input: string): unknown => {
  const cleaned = input
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    return input;
  }
};

const toStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value
      .map((item) => normalizeInputToString(item).trim())
      .filter(Boolean);
  }

  const text = normalizeInputToString(value).trim();
  if (!text) return [];

  return text
    .split(/\n+|\s*•\s*|\s*-\s*/)
    .map((entry) => entry.trim())
    .filter(Boolean);
};

const structuredFeedbackFromUnknown = (
  value: unknown,
): StructuredFeedback | null => {
  if (!value || typeof value !== "object") return null;

  const obj = value as Record<string, unknown>;
  const parsed = createEmptyStructuredFeedback();

  FEEDBACK_KEYS.forEach((key) => {
    parsed[key] = toStringArray(obj[key]);
  });

  const hasData = FEEDBACK_KEYS.some((key) => parsed[key].length > 0);
  return hasData ? parsed : null;
};

const normalizeFeedback = (
  payload: FeedbackResult | unknown,
): { structured: StructuredFeedback | null; text: string | null } => {
  const candidates: unknown[] =
    payload && typeof payload === "object"
      ? [
          (payload as FeedbackResult).feedback,
          (payload as FeedbackResult).message,
          (payload as FeedbackResult).result,
          payload,
        ]
      : [payload];

  for (const candidate of candidates) {
    if (candidate === undefined || candidate === null) continue;

    if (typeof candidate === "string") {
      const parsedCandidate = parsePossiblyJson(candidate);
      const structuredFromString =
        structuredFeedbackFromUnknown(parsedCandidate);
      if (structuredFromString) {
        return { structured: structuredFromString, text: null };
      }

      const normalizedText = normalizeInputToString(parsedCandidate).trim();
      if (normalizedText) {
        return { structured: null, text: normalizedText };
      }

      continue;
    }

    const structuredFromObject = structuredFeedbackFromUnknown(candidate);
    if (structuredFromObject) {
      return { structured: structuredFromObject, text: null };
    }

    const normalized = normalizeInputToString(candidate).trim();
    if (normalized) {
      return { structured: null, text: normalized };
    }
  }

  return { structured: null, text: null };
};

export default function JobMatchingPage() {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");

  const [jdText, setJdText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [feedbackText, setFeedbackText] = useState<string | null>(null);
  const [structuredFeedback, setStructuredFeedback] =
    useState<StructuredFeedback | null>(null);
  const hasAutoAnalyzed = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const draft = window.sessionStorage.getItem(
      "resumeiq_job_description_draft",
    );
    if (draft !== null) {
      setJdText(normalizeInputToString(draft));
    }

    setIsBootstrapping(false);
  }, []);

  const score = Math.max(0, Math.min(100, matchResult?.match_score ?? 0));

  const actionableGrowth = useMemo(() => {
    if (!matchResult?.missing_skills?.length) return [];

    return matchResult.missing_skills.slice(0, 3).map((skill, index) => ({
      type: index === 0 ? "CRITICAL" : "ACTION",
      title: `Add ${skill}`,
      desc: `Include concrete project/experience evidence for ${skill} in your resume.`,
      color:
        index === 0
          ? "text-[#ffb786] bg-[#df7412]/20"
          : "text-[#adc6ff] bg-[#adc6ff]/20",
    }));
  }, [matchResult]);

  const feedbackParagraphs = useMemo(() => {
    if (!feedbackText) return [];
    return feedbackText
      .split(/\n\n+/)
      .map((part) => part.trim())
      .filter(Boolean);
  }, [feedbackText]);

  const feedbackSections = useMemo(() => {
    if (!structuredFeedback) return [];

    return FEEDBACK_KEYS.filter(
      (key) => structuredFeedback[key].length > 0,
    ).map((key) => ({
      key,
      title: FEEDBACK_LABELS[key],
      items: structuredFeedback[key],
    }));
  }, [structuredFeedback]);

  const handleAnalyze = async () => {
    const normalizedJdText = normalizeInputToString(jdText);

    if (!resumeId) {
      setError(
        "Missing resume ID. Start from upload and open job matching from dashboard.",
      );
      return;
    }

    if (!normalizedJdText.trim()) {
      setError("Paste a job description before running analysis.");
      return;
    }

    if (!API_BASE_URL) {
      setError(
        "Missing API URL. Set NEXT_PUBLIC_API_BASE_URL in web/.env.local.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const matchResponse = await fetch(`${API_BASE_URL}/match/job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume_id: resumeId,
          jd_text: normalizedJdText,
        }),
      });

      if (!matchResponse.ok) {
        const errorData = await matchResponse.json().catch(() => null);
        throw new Error(errorData?.detail || "Failed to run job matching.");
      }

      const matchData: MatchResult = await matchResponse.json();
      setMatchResult(matchData);
      setIsFeedbackLoading(true);

      const feedbackResponse = await fetch(`${API_BASE_URL}/ai/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume_id: resumeId,
          jd_text: normalizedJdText,
          missing_skills: matchData.missing_skills,
          matched_skills: matchData.matched_skills,
        }),
      });

      if (feedbackResponse.ok) {
        const feedbackData: FeedbackResult = await feedbackResponse.json();
        const normalizedFeedback = normalizeFeedback(feedbackData);
        setStructuredFeedback(normalizedFeedback.structured);
        setFeedbackText(normalizedFeedback.text);
      } else {
        setStructuredFeedback(null);
        setFeedbackText(null);
      }
    } catch (analysisError) {
      setError(
        analysisError instanceof Error
          ? analysisError.message
          : "Unable to run job matching.",
      );
    } finally {
      setIsFeedbackLoading(false);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isBootstrapping || isSubmitting || hasAutoAnalyzed.current) return;
    if (!resumeId) return;

    const normalizedJdText = normalizeInputToString(jdText).trim();
    if (!normalizedJdText) return;

    hasAutoAnalyzed.current = true;
    handleAnalyze();
  }, [isBootstrapping, isSubmitting, jdText, resumeId]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1326] text-[#dae2fd]">
      <TopNavBar />

      <main className="pt-12 pb-20 px-8 max-w-[1440px] mx-auto w-full">
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
            <p className="mt-3 text-[#c2c6d6] text-sm opacity-80">
              Resume ID: {resumeId || "Unavailable"}
            </p>
          </div>
        </header>

        {error && (
          <div className="mb-6 rounded-xl border border-[#ffb4ab]/40 bg-[#2a1218] px-4 py-3 text-sm text-[#ffb4ab]">
            {error}
          </div>
        )}

        {isBootstrapping && (
          <div className="mb-6 rounded-xl border border-[#adc6ff]/30 bg-[#131b2e] px-4 py-3 text-sm text-[#adc6ff]">
            Loading job context...
          </div>
        )}

        {!isBootstrapping && isSubmitting && (
          <div className="mb-6 rounded-xl border border-[#adc6ff]/30 bg-[#131b2e] px-4 py-3 text-sm text-[#adc6ff]">
            Running job match analysis...
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#131b2e] rounded-2xl p-8 border border-[#424754]/10"
            >
              <h2 className="text-xl font-bold tracking-tight mb-4">
                Active Job Context
              </h2>
              <textarea
                value={jdText}
                onChange={(event) =>
                  setJdText(normalizeInputToString(event.target.value))
                }
                className="w-full h-[260px] bg-[#060e20] rounded-xl p-4 text-sm text-[#c2c6d6] leading-relaxed border border-[#424754]/20 focus:border-[#adc6ff] focus:outline-none resize-none"
                placeholder="Paste job description here..."
              />
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isSubmitting}
                className="w-full mt-4 bg-[#adc6ff] text-[#00285d] py-4 rounded-xl font-black flex items-center justify-center gap-2 shadow-2xl shadow-[#adc6ff]/10 disabled:opacity-70"
              >
                <Wand2 className="w-5 h-5" />
                {isSubmitting ? "Analyzing..." : "Analyze Job Match"}
              </button>
            </motion.div>

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
                      animate={{
                        strokeDashoffset: 578.05 - 578.05 * (score / 100),
                      }}
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
                      {Math.round(score)}%
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
                      {matchResult
                        ? `${matchResult.semantic_similarity.toFixed(1)}%`
                        : "-"}
                    </span>
                  </div>
                  <div className="bg-[#171f33] rounded-xl p-4 border border-[#424754]/10 text-center">
                    <span className="text-[10px] font-bold text-[#8c909f] uppercase block mb-1">
                      Keywords
                    </span>
                    <span className="text-xl font-bold text-[#ffb786]">
                      {matchResult
                        ? `${matchResult.keyword_match.toFixed(1)}%`
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 space-y-6">
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
                    <CheckCircle2 className="text-[#adc6ff] w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#adc6ff]">
                      Matched Competencies
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(matchResult?.matched_skills || []).map((skill) => (
                      <span
                        key={skill}
                        className="bg-[#222a3d] text-[#dae2fd] px-4 py-2 rounded-full text-sm font-medium border border-[#adc6ff]/20"
                      >
                        {skill}
                      </span>
                    ))}
                    {!matchResult?.matched_skills?.length && (
                      <span className="text-sm text-[#8c909f]">
                        No match data yet.
                      </span>
                    )}
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
                    {(matchResult?.missing_skills || []).map((skill) => (
                      <span
                        key={skill}
                        className="bg-[#df7412]/10 text-[#ffb786] px-4 py-2 rounded-full text-sm font-medium border border-[#df7412]/20"
                      >
                        {skill}
                      </span>
                    ))}
                    {!matchResult?.missing_skills?.length && (
                      <span className="text-sm text-[#8c909f]">
                        No missing-skill data yet.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#171f33] rounded-2xl p-8 border-l-4 border-[#adc6ff] shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#adc6ff] p-2 rounded-lg">
                  <Sparkles className="text-[#00285d] w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">
                  AI Narrative Feedback
                </h3>
              </div>
              <div className="space-y-4">
                {isFeedbackLoading && (
                  <div className="space-y-4 animate-pulse" aria-live="polite">
                    <div className="space-y-2">
                      <div className="h-3 w-40 rounded bg-[#2b3550]" />
                      <div className="space-y-2 pl-3 border-l border-[#adc6ff]/20">
                        <div className="h-3 w-full rounded bg-[#24304a]" />
                        <div className="h-3 w-11/12 rounded bg-[#24304a]" />
                        <div className="h-3 w-10/12 rounded bg-[#24304a]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-48 rounded bg-[#2b3550]" />
                      <div className="space-y-2 pl-3 border-l border-[#adc6ff]/20">
                        <div className="h-3 w-full rounded bg-[#24304a]" />
                        <div className="h-3 w-9/12 rounded bg-[#24304a]" />
                      </div>
                    </div>
                    <p className="text-[#8c909f] text-xs tracking-wide uppercase">
                      Fetching AI narrative feedback...
                    </p>
                  </div>
                )}
                {feedbackSections.map((section) => (
                  <div key={section.key} className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#adc6ff]">
                      {section.title}
                    </h4>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li
                          key={`${section.key}-${itemIndex}`}
                          className="text-[#c2c6d6] text-sm leading-relaxed opacity-90 pl-3 border-l border-[#adc6ff]/30"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {feedbackParagraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-[#c2c6d6] text-sm leading-relaxed opacity-90"
                  >
                    {paragraph}
                  </p>
                ))}
                {!isFeedbackLoading &&
                  !feedbackSections.length &&
                  !feedbackParagraphs.length && (
                    <p className="text-[#8c909f] text-sm">
                      Run analysis to fetch AI feedback from backend.
                    </p>
                  )}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-3 space-y-6">
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
                {actionableGrowth.map((action) => (
                  <div
                    key={action.title}
                    className="bg-[#171f33] rounded-xl p-4 border border-[#424754]/10"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`${action.color} px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter`}
                      >
                        {action.type}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-[#dae2fd] mb-1">
                      {action.title}
                    </p>
                    <p className="text-xs text-[#8c909f] leading-normal opacity-70">
                      {action.desc}
                    </p>
                  </div>
                ))}
                {!actionableGrowth.length && (
                  <p className="text-sm text-[#8c909f]">
                    No actions available yet.
                  </p>
                )}
              </div>
            </motion.div>

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
                Match Recap
              </span>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#c2c6d6]">Overall Match</span>
                  <span className="font-bold text-[#adc6ff]">
                    {Math.round(score)}%
                  </span>
                </div>
                <div className="w-full h-1 bg-[#222a3d] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#adc6ff]"
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
                <div className="mt-4">
                  <p className="text-[10px] font-bold text-[#8c909f] uppercase tracking-widest mb-1">
                    Resume ID:
                  </p>
                  <p className="text-sm font-bold text-[#adc6ff] break-all">
                    {resumeId || "Unavailable"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

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
    </div>
  );
}
