"use client";

import { motion } from "motion/react";
import { Sparkles, BarChart3 } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden group border border-slate-100"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="text-slate-100"
                cx="96"
                cy="96"
                fill="transparent"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
              />
              <motion.circle
                initial={{ strokeDashoffset: 552.92 }}
                animate={{ strokeDashoffset: 121.6 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-primary"
                cx="96"
                cy="96"
                fill="transparent"
                r="88"
                stroke="currentColor"
                strokeDasharray="552.92"
                strokeLinecap="round"
                strokeWidth="12"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black tracking-tighter text-slate-900">
                78
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Score / 100
              </span>
            </div>
          </div>
          <div className="mt-6 space-y-1">
            <h2 className="text-xl font-bold text-slate-900">
              Elite Potential
            </h2>
            <p className="text-sm text-slate-500 max-w-[240px]">
              This candidate exhibits high strategic alignment for Senior
              Engineering roles.
            </p>
          </div>
        </motion.div>

        {/* AI Report Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-primary rounded-2xl p-8 text-white relative flex flex-col justify-between shadow-xl shadow-primary/20 overflow-hidden"
        >
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-indigo-200" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-100">
                ResumeIQ Intelligence Report
              </span>
            </div>
            <h3 className="text-3xl font-extrabold tracking-tight leading-tight max-w-2xl">
              The profile demonstrates a rare mastery of architectural patterns
              with a minor gap in cloud native orchestration.
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { label: "Sentiment", value: "Strong Hire" },
              { label: "Reliability", value: "94%" },
              { label: "Impact", value: "High" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10"
              >
                <span className="block text-[10px] font-bold uppercase tracking-widest text-indigo-200 mb-1">
                  {stat.label}
                </span>
                <span className="text-lg font-bold">{stat.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Dimension Breakdown */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Dimension Breakdown
          </h2>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Weighted Analysis
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Skills Match",
              value: "80%",
              desc: "Direct alignment with required stack: React, Node, and AWS core.",
              color: "text-primary",
              bg: "bg-indigo-50",
            },
            {
              label: "Exp Quality",
              value: "92%",
              desc: "Progression across Tier-1 firms shows steady leadership growth.",
              color: "text-orange-600",
              bg: "bg-orange-50",
            },
            {
              label: "Projects",
              value: "65%",
              desc: "Significant OSS contributions but lacks large-scale system case studies.",
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              label: "ATS Ready",
              value: "98%",
              desc: "Perfectly parsed structure with zero layout readability warnings.",
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="bg-slate-50 hover:bg-white transition-all p-6 rounded-2xl border border-transparent hover:border-slate-100 hover:shadow-sm group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 ${item.bg} ${item.color} rounded-lg`}>
                  <Sparkles size={18} />
                </div>
                <span className={`text-xl font-bold ${item.color}`}>
                  {item.value}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 mb-1">{item.label}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills & Feedback */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-50 rounded-2xl p-8 space-y-6 border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 size={20} className="text-primary" />
            Skill Distribution
          </h3>
          <div className="space-y-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 block">
                Detected Expertise
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "React.js",
                  "TypeScript",
                  "Node.js",
                  "GraphQL",
                  "PostgreSQL",
                  "System Design",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="bg-white text-primary px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-3 block">
                Missing Critical Skills
              </span>
              <div className="flex flex-wrap gap-2">
                {["Kubernetes", "Terraform", "Jenkins"].map((skill) => (
                  <span
                    key={skill}
                    className="bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs font-bold border border-red-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles size={20} className="text-orange-500" />
            Strategic Feedback
          </h3>
          <ul className="space-y-4">
            {[
              {
                title: "Improve Action Verbs",
                text: 'Replace passive phrases like "assisted with" to "led orchestration of" to emphasize leadership.',
              },
              {
                title: "Quantify Results",
                text: "The experience at 'TechCorp' lacks metrics. Add 2-3 bullet points focusing on percentage improvements.",
              },
              {
                title: "Technical Depth",
                text: "Highlight specific versions or complex features built in React to showcase architectural knowledge.",
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-4 group">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0 group-hover:scale-150 transition-transform" />
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">{item.title}:</strong>{" "}
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Job Match */}
      <section className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Job Match Comparison
            </h3>
            <p className="text-sm text-slate-500">
              Paste a specific job description to analyze how well this
              candidate fits the role requirements.
            </p>
            <textarea
              className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary transition-all resize-none outline-none min-h-[120px]"
              placeholder="Paste job description here..."
            />
            <button className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2">
              <Sparkles size={18} />
              Match Resume
            </button>
          </div>
          <div className="w-full lg:w-80 bg-white rounded-xl p-6 border border-primary/10 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="text-5xl font-black text-primary mb-2">84%</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">
              Current Match Potential
            </div>
            <div className="w-full space-y-3 text-left">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1">
                <span>Requirement Gap</span>
                <span>Priority</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Cloud Orchestration</span>
                <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-[10px] font-bold">
                  CRITICAL
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">DevOps Tooling</span>
                <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded text-[10px] font-bold">
                  MEDIUM
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Immediate Improvements */}
      <section className="space-y-6">
        <h3 className="text-lg font-bold text-slate-900">
          Immediate Improvements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              text: "Add React projects to GitHub",
              color: "border-indigo-400",
              checked: true,
            },
            {
              text: "Quantify leadership at Acme Inc.",
              color: "border-orange-400",
              checked: false,
            },
            {
              text: "List AWS Certifications clearly",
              color: "border-blue-400",
              checked: false,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className={`flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border-l-4 ${item.color} border border-slate-100`}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${item.checked ? "border-primary bg-primary text-white" : "border-slate-300"}`}
              >
                {item.checked && <Sparkles size={12} />}
              </div>
              <span className="text-sm font-medium text-slate-700">
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
