"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  Lightbulb,
  BarChart3,
  Gauge,
  Database,
  Scale,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* TopNavBar */}
      <nav className="flex justify-between items-center w-full px-8 py-4 sticky top-0 z-50 bg-[#0b1326]/80 backdrop-blur-md border-b border-[#424754]/10">
        <div className="text-xl font-black tracking-tighter text-[#adc6ff]">
          ResumeIQ
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a
            className="text-[#adc6ff] font-bold border-b-2 border-[#adc6ff] pb-1 antialiased text-md leading-relaxed transition-all"
            href="#"
          >
            Home
          </a>
          <a
            className="text-[#dae2fd] opacity-70 hover:text-[#adc6ff] transition-colors duration-200 antialiased text-md leading-relaxed"
            href="#"
          >
            Upload
          </a>
          <a
            className="text-[#dae2fd] opacity-70 hover:text-[#adc6ff] transition-colors duration-200 antialiased text-md leading-relaxed"
            href="#"
          >
            History
          </a>
          <a
            className="text-[#dae2fd] opacity-70 hover:text-[#adc6ff] transition-colors duration-200 antialiased text-md leading-relaxed"
            href="#"
          >
            Compare
          </a>
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

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-8 pt-24 pb-20 overflow-hidden grid-bg">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#adc6ff]/5 rounded-full blur-[120px]"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center px-4 py-1 rounded-full glass-card text-[#adc6ff] text-[11px] font-bold tracking-widest uppercase mb-8 border border-[#adc6ff]/20">
              <Sparkles className="w-3 h-3 mr-2" />
              AI-Powered Resume Analysis
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#dae2fd] leading-[1.1] mb-6 text-gradient">
              ResumeIQ: Compare AI Models <br className="hidden md:block" /> &
              Improve Your Resume
            </h1>
            <p className="text-lg md:text-xl text-[#c2c6d6] font-normal max-w-2xl leading-relaxed mb-10 opacity-80">
              A research-focused tool to benchmark your resume against multiple
              NLP architectures. Get objective feedback and optimize for modern
              hiring systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <button className="primary-gradient text-[#00285d] px-10 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-3 transition-all hover:shadow-lg active:scale-95">
                Get Started
                <ArrowRight className="w-5 h-5 font-bold" />
              </button>
              <button className="glass-card text-[#dae2fd] px-10 py-4 rounded-xl text-lg font-semibold hover:bg-[#2d3449] transition-all border border-white/10">
                How it works
              </button>
            </div>

            {/* UI Mockup */}
            <div className="w-full max-w-4xl relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#adc6ff]/20 to-[#b1c6f9]/20 rounded-2xl blur-sm opacity-50"></div>
              <div className="relative bg-[#131b2e] rounded-2xl border border-[#424754]/20 shadow-2xl overflow-hidden aspect-[16/9] flex flex-col">
                {/* Mockup Header */}
                <div className="bg-[#222a3d]/50 border-b border-[#424754]/10 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#424754]/30"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#424754]/30"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#424754]/30"></div>
                  </div>
                  <div className="mx-auto bg-[#060e20]/50 px-3 py-1 rounded text-[10px] text-[#c2c6d6]/60 font-medium">
                    resumeiq.app/analysis/report_082
                  </div>
                </div>
                {/* Mockup Body */}
                <div className="flex-1 p-6 flex gap-6 overflow-hidden">
                  <div className="hidden md:block w-1/3 bg-[#060e20] rounded-lg border border-[#424754]/10 p-4 space-y-3">
                    <div className="h-4 w-1/2 bg-[#222a3d] rounded animate-pulse"></div>
                    <div className="space-y-1.5 pt-4">
                      <div className="h-2 w-full bg-[#222a3d] rounded"></div>
                      <div className="h-2 w-full bg-[#222a3d] rounded"></div>
                      <div className="h-2 w-3/4 bg-[#222a3d] rounded"></div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-6">
                    <div className="flex justify-between items-end">
                      <div className="space-y-2 text-left">
                        <div className="text-[10px] font-bold text-[#adc6ff] tracking-widest uppercase">
                          Score Comparison
                        </div>
                        <div className="text-2xl font-bold text-[#dae2fd]">
                          Analysis Overview
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black text-[#adc6ff]">
                          82
                          <span className="text-sm font-normal opacity-50">
                            /100
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#222a3d]/40 p-4 rounded-xl border border-[#424754]/5">
                        <div className="text-[10px] font-semibold text-[#c2c6d6] opacity-60 uppercase mb-2 text-left">
                          BERT Semantic
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 flex-1 bg-[#171f33] rounded-full overflow-hidden">
                            <div className="h-full bg-[#adc6ff] w-[88%] rounded-full"></div>
                          </div>
                          <span className="text-xs font-bold">88%</span>
                        </div>
                      </div>
                      <div className="bg-[#222a3d]/40 p-4 rounded-xl border border-[#424754]/5">
                        <div className="text-[10px] font-semibold text-[#c2c6d6] opacity-60 uppercase mb-2 text-left">
                          TF-IDF Match
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 flex-1 bg-[#171f33] rounded-full overflow-hidden">
                            <div className="h-full bg-[#ffb786] w-[64%] rounded-full"></div>
                          </div>
                          <span className="text-xs font-bold">64%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#222a3d]/40 p-5 rounded-xl border border-[#424754]/5">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="text-[#adc6ff] w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#adc6ff]">
                          Key Improvement
                        </span>
                      </div>
                      <div className="h-2 w-full bg-[#171f33] rounded mb-2"></div>
                      <div className="h-2 w-5/6 bg-[#171f33] rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-8 py-24">
          <div className="mb-16">
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[#adc6ff] mb-4">
              Core Intelligence
            </h2>
            <div className="text-4xl font-bold tracking-tight text-[#dae2fd]">
              Engineered for Editorial Excellence
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[700px]">
            {/* Resume Analysis */}
            <div className="md:col-span-2 bg-[#131b2e] rounded-xl p-10 flex flex-col justify-between group hover:bg-[#171f33] transition-colors border border-[#424754]/5">
              <div>
                <div className="w-14 h-14 bg-[#222a3d] rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <BarChart3 className="text-[#adc6ff] w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Resume Analysis</h3>
                <p className="text-[#c2c6d6] text-lg max-w-md leading-relaxed">
                  Deep-dive contextual analysis that identifies narrative gaps,
                  tone inconsistencies, and missed opportunities in your
                  professional history.
                </p>
              </div>
              <div className="mt-8 flex items-center text-[#adc6ff] font-bold gap-2 cursor-pointer">
                View Analysis Engine
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            {/* ATS Scoring */}
            <div className="bg-[#131b2e] rounded-xl p-10 flex flex-col border border-[#424754]/5 hover:bg-[#171f33] transition-colors group">
              <div className="w-14 h-14 bg-[#222a3d] rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Gauge className="text-[#ffb786] w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">ATS Scoring</h3>
              <p className="text-[#c2c6d6] leading-relaxed">
                Precision tracking of how applicant tracking systems perceive
                your data. Stay ahead of the algorithm.
              </p>
              <div className="mt-auto pt-8">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-[#c2c6d6] uppercase">
                    ATS Compatibility
                  </span>
                  <span className="text-[#ffb786]">HIGH</span>
                </div>
                <div className="w-full h-1 bg-[#222a3d] rounded-full overflow-hidden">
                  <div className="bg-[#ffb786] h-full w-[85%]"></div>
                </div>
              </div>
            </div>
            {/* Skill Extraction */}
            <div className="bg-[#131b2e] rounded-xl p-10 flex flex-col border border-[#424754]/5 hover:bg-[#171f33] transition-colors group">
              <div className="w-14 h-14 bg-[#222a3d] rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Database className="text-[#adc6ff] w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Skill Extraction</h3>
              <p className="text-[#c2c6d6] leading-relaxed">
                Automatic identification and categorization of hard and soft
                skills, ensuring no expertise is overlooked.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="px-3 py-1 bg-[#222a3d] rounded text-[10px] font-bold text-[#c2c6d6]">
                  PYTHON
                </span>
                <span className="px-3 py-1 bg-[#222a3d] rounded text-[10px] font-bold text-[#c2c6d6]">
                  STRATEGY
                </span>
                <span className="px-3 py-1 bg-[#222a3d] rounded text-[10px] font-bold text-[#c2c6d6]">
                  UI/UX
                </span>
              </div>
            </div>
            {/* Architecture Comparison */}
            <div className="md:col-span-2 bg-[#131b2e] rounded-xl p-10 flex flex-col md:flex-row gap-12 items-center border border-[#424754]/5 hover:bg-[#171f33] transition-colors group overflow-hidden">
              <div className="flex-1 text-left">
                <div className="w-14 h-14 bg-[#222a3d] rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Scale className="text-[#4d8eff] w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold mb-4">
                  Architecture Comparison
                </h3>
                <p className="text-[#c2c6d6] text-lg leading-relaxed">
                  Cross-validate results using a multi-layered ensemble of NLP
                  architectures. We compare performance across TF-IDF, Word2Vec,
                  CNN, and BERT models.
                </p>
              </div>
              <div className="flex-shrink-0 w-full md:w-1/3 flex flex-col gap-3">
                <div className="bg-[#222a3d] p-4 rounded-lg flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity">
                  <span className="font-bold text-sm">BERT (Semantic)</span>
                  <CheckCircle2 className="text-[#adc6ff] w-5 h-5" />
                </div>
                <div className="bg-[#222a3d] p-4 rounded-lg flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity">
                  <span className="font-bold text-sm">CNN (Structure)</span>
                  <CheckCircle2 className="text-[#adc6ff] w-5 h-5" />
                </div>
                <div className="bg-[#222a3d] p-4 rounded-lg flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity">
                  <span className="font-bold text-sm">TF-IDF / Word2Vec</span>
                  <CheckCircle2 className="text-[#adc6ff] w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-5xl mx-auto px-8 py-24 text-center">
          <div className="bg-[#2d3449] rounded-2xl p-16 relative overflow-hidden">
            <div className="absolute inset-0 primary-gradient opacity-10"></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
              Ready for your next move?
            </h2>
            <p className="text-[#c2c6d6] text-xl mb-10 max-w-xl mx-auto relative z-10">
              Join thousands of professionals using ResumeIQ to secure
              interviews at top-tier companies.
            </p>
            <div className="relative z-10">
              <button className="primary-gradient text-[#00285d] px-12 py-5 rounded-lg text-xl font-bold hover:scale-105 transition-transform shadow-xl">
                Analyze Resume Now
              </button>
            </div>
          </div>
        </section>
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
