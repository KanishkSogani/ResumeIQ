"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  BarChart3,
  Zap,
  Target,
  Scale,
  BrainCircuit,
  Info,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  created_at?: string;
  models: ModelResult[];
};

type AggregatedModel = {
  name: string;
  confidence: number;
  latencyMs: number;
  topPrediction: string;
  featured: boolean;
  label?: string;
};

const toPercent = (value: number): number => {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return 0;
  return numericValue <= 1 ? numericValue * 100 : numericValue;
};

const formatReportTitle = (reports: ReportData[]): string => {
  if (!reports.length) return "No resume selected";
  if (reports.length === 1) return reports[0].file_name;
  return `${reports[0].file_name} +${reports.length - 1} more`;
};

export default function ComparePage() {
  const searchParams = useSearchParams();
  const reportIdsParam = searchParams.get("reportIds") || "";

  const [reports, setReports] = useState<ReportData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const requestedIds = useMemo(
    () =>
      reportIdsParam
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean),
    [reportIdsParam],
  );

  useEffect(() => {
    const fetchReportsForComparison = async () => {
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

        if (requestedIds.length >= 1) {
          const responses = await Promise.all(
            requestedIds.map((reportId) =>
              fetch(`${API_BASE_URL}/reports/${encodeURIComponent(reportId)}`),
            ),
          );

          const badResponse = responses.find((response) => !response.ok);
          if (badResponse) {
            const errorData = await badResponse.json().catch(() => null);
            throw new Error(
              errorData?.detail || "Failed to load selected reports.",
            );
          }

          const reportsData = (await Promise.all(
            responses.map((response) => response.json()),
          )) as ReportData[];

          setReports(reportsData);
          return;
        }

        const latestResponse = await fetch(
          `${API_BASE_URL}/reports/?sort=latest`,
        );

        if (!latestResponse.ok) {
          const errorData = await latestResponse.json().catch(() => null);
          throw new Error(
            errorData?.detail || "Failed to load reports for comparison.",
          );
        }

        const latestReports = (await latestResponse.json()) as ReportData[];
        setReports(
          Array.isArray(latestReports) ? latestReports.slice(0, 2) : [],
        );
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to load comparison data.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportsForComparison();
  }, [requestedIds]);

  const averageAtsScore = useMemo(() => {
    if (!reports.length) return 0;
    const total = reports.reduce(
      (acc, report) => acc + (report.ats_score || 0),
      0,
    );
    return Math.round(total / reports.length);
  }, [reports]);

  const aggregatedModels = useMemo<AggregatedModel[]>(() => {
    const modelMap = new Map<
      string,
      {
        confidenceTotal: number;
        latencyTotal: number;
        count: number;
        predictionFrequency: Map<string, number>;
      }
    >();

    for (const report of reports) {
      for (const model of report.models || []) {
        const key = model.name;
        if (!modelMap.has(key)) {
          modelMap.set(key, {
            confidenceTotal: 0,
            latencyTotal: 0,
            count: 0,
            predictionFrequency: new Map<string, number>(),
          });
        }

        const current = modelMap.get(key);
        if (!current) continue;

        current.confidenceTotal += toPercent(model.confidence);
        current.latencyTotal += Number(model.latency_ms) || 0;
        current.count += 1;
        current.predictionFrequency.set(
          model.prediction,
          (current.predictionFrequency.get(model.prediction) || 0) + 1,
        );
      }
    }

    const models = Array.from(modelMap.entries()).map(([name, values]) => {
      const topPrediction = Array.from(
        values.predictionFrequency.entries(),
      ).sort((a, b) => b[1] - a[1])[0]?.[0];

      return {
        name,
        confidence: values.count ? values.confidenceTotal / values.count : 0,
        latencyMs: values.count ? values.latencyTotal / values.count : 0,
        topPrediction: topPrediction || "Unknown",
        featured: false,
      };
    });

    const ranked = models.sort((a, b) => b.confidence - a.confidence);

    if (ranked[0]) {
      ranked[0] = {
        ...ranked[0],
        featured: true,
        label: "Champion Model",
      };
    }

    return ranked;
  }, [reports]);

  const chartData = useMemo(
    () =>
      aggregatedModels.map((model) => ({
        label: model.name,
        value: Math.max(0, Math.min(100, Number(model.confidence.toFixed(1)))),
        highlight: model.featured,
      })),
    [aggregatedModels],
  );

  const chartDataWithHeight = useMemo(
    () =>
      chartData.map((item) => ({
        ...item,
        renderHeight: item.value > 0 ? Math.max(item.value, 8) : 0,
      })),
    [chartData],
  );

  const performanceSummary = useMemo(() => {
    if (!aggregatedModels.length) {
      return {
        fastest: null as AggregatedModel | null,
        mostAccurate: null as AggregatedModel | null,
        bestTradeoff: null as AggregatedModel | null,
      };
    }

    const fastest = [...aggregatedModels].sort(
      (a, b) => a.latencyMs - b.latencyMs,
    )[0];
    const mostAccurate = [...aggregatedModels].sort(
      (a, b) => b.confidence - a.confidence,
    )[0];
    const bestTradeoff = [...aggregatedModels].sort((a, b) => {
      const scoreA = a.confidence / Math.max(1, a.latencyMs);
      const scoreB = b.confidence / Math.max(1, b.latencyMs);
      return scoreB - scoreA;
    })[0];

    return { fastest, mostAccurate, bestTradeoff };
  }, [aggregatedModels]);

  const agreement = useMemo(() => {
    const frequency = new Map<string, number>();
    const totalPredictions = reports.reduce(
      (acc, report) => acc + (report.models?.length || 0),
      0,
    );

    for (const report of reports) {
      for (const model of report.models || []) {
        frequency.set(
          model.prediction,
          (frequency.get(model.prediction) || 0) + 1,
        );
      }
    }

    const [topPrediction, topCount] = Array.from(frequency.entries()).sort(
      (a, b) => b[1] - a[1],
    )[0] || ["Unknown", 0];

    return {
      topPrediction,
      topCount,
      totalPredictions,
    };
  }, [reports]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1326] text-[#dae2fd]">
      <TopNavBar />

      <main className="pt-12 pb-20 px-8 max-w-7xl mx-auto w-full flex-grow">
        {isLoading && (
          <div className="mb-8 rounded-xl border border-[#adc6ff]/30 bg-[#131b2e] px-4 py-3 text-sm text-[#adc6ff]">
            Loading comparison data...
          </div>
        )}

        {error && (
          <div className="mb-8 rounded-xl border border-[#ffb4ab]/40 bg-[#2a1218] px-4 py-3 text-sm text-[#ffb4ab]">
            {error}
          </div>
        )}

        {!isLoading && !error && reports.length === 0 && (
          <div className="mb-8 rounded-xl border border-[#424754]/20 bg-[#131b2e] px-4 py-6 text-sm text-[#c2c6d6]">
            No reports available for comparison.
            <div className="mt-3">
              <Link
                href="/history"
                className="text-[#adc6ff] font-semibold hover:opacity-80 transition-opacity"
              >
                Go to History and select reports
              </Link>
            </div>
          </div>
        )}

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
            {formatReportTitle(reports)}
          </motion.h1>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative inline-flex flex-col items-center justify-center p-8 rounded-full bg-[#131b2e] border border-[#424754]/15"
          >
            <div className="text-6xl font-black tracking-tighter text-[#adc6ff] [text-shadow:0_0_15px_rgba(173,198,255,0.3)]">
              {averageAtsScore}
            </div>
            <div className="text-sm tracking-widest uppercase text-[#c2c6d6] mt-2 font-bold">
              Avg ATS Score
            </div>
            <div className="absolute -bottom-12 w-64 text-[10px] text-[#c2c6d6] leading-relaxed italic opacity-60">
              Calculated from {reports.length} selected
              {reports.length === 1 ? " report" : " reports"}.
            </div>
          </motion.div>
        </header>

        {/* Model Comparison Grid */}
        <section className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-24">
          {aggregatedModels.map((model, idx) => (
            <motion.div
              key={`${model.name}-${idx}`}
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
                  {model.topPrediction}
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
                    {model.confidence.toFixed(1)}%
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
                    {Math.round(model.latencyMs)}ms
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
            <div className="h-64 flex items-stretch gap-6 px-4 border-b border-[#424754]/20">
              {chartDataWithHeight.map((item, idx) => (
                <div
                  key={idx}
                  className="flex-1 h-full flex flex-col items-center group"
                >
                  <div className="w-full relative flex-1 min-h-0 flex items-end">
                    <div
                      style={{ height: `${item.renderHeight}%` }}
                      className={`w-full rounded-t-lg transition-all duration-500 relative group ${
                        item.highlight
                          ? "primary-gradient shadow-[0_0_20px_rgba(173,198,255,0.3)]"
                          : "bg-[#222a3d] hover:bg-[#adc6ff]/40"
                      }`}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity text-[#dae2fd]">
                        {item.value}%
                      </div>
                    </div>
                  </div>
                  <span
                    className={`mt-4 text-[10px] uppercase tracking-tighter text-center leading-none h-8 flex items-center ${
                      item.highlight
                        ? "text-[#adc6ff] font-bold"
                        : "text-[#c2c6d6]"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}

              {chartDataWithHeight.length === 0 && (
                <div className="w-full h-full flex items-center justify-center text-sm text-[#8c909f]">
                  No model confidence data available for chart.
                </div>
              )}
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
                      {performanceSummary.fastest?.name || "N/A"}{" "}
                      <span className="text-[#adc6ff] ml-2">
                        {performanceSummary.fastest
                          ? `${Math.round(performanceSummary.fastest.latencyMs)}ms`
                          : "-"}
                      </span>
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
                      {performanceSummary.mostAccurate?.name || "N/A"}{" "}
                      <span className="text-[#adc6ff] ml-2">
                        {performanceSummary.mostAccurate
                          ? `${performanceSummary.mostAccurate.confidence.toFixed(1)}%`
                          : "-"}
                      </span>
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
                      {performanceSummary.bestTradeoff?.name || "N/A"}{" "}
                      <span className="text-[#adc6ff] ml-2">
                        {performanceSummary.bestTradeoff
                          ? `${performanceSummary.bestTradeoff.confidence.toFixed(1)}% @ ${Math.round(performanceSummary.bestTradeoff.latencyMs)}ms`
                          : "-"}
                      </span>
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
                <strong className="text-[#adc6ff]">
                  {agreement.topCount} out of {agreement.totalPredictions}
                </strong>{" "}
                model inferences predict{" "}
                <span className="font-bold">{agreement.topPrediction}</span>.
                This consensus is computed from the live model outputs across
                selected reports.
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
                "Traditional models usually show lower latency while semantic
                transformers often provide deeper context signals."
              </p>
            </div>
            <div className="relative pl-6 border-l border-[#adc6ff]/20">
              <p className="text-lg leading-relaxed text-[#c2c6d6] opacity-80">
                "Use this panel to compare confidence, latency, and prediction
                agreement directly from your stored analysis runs."
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
