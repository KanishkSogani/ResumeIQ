import { motion } from "motion/react";
import { ArrowRight, Lightbulb, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-8 pt-24 pb-20 overflow-hidden grid-bg">
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
          A research-focused tool to benchmark your resume against multiple NLP
          architectures. Get objective feedback and optimize for modern hiring
          systems.
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

        <div className="w-full max-w-4xl relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#adc6ff]/20 to-[#b1c6f9]/20 rounded-2xl blur-sm opacity-50"></div>
          <div className="relative bg-[#131b2e] rounded-2xl border border-[#424754]/20 shadow-2xl overflow-hidden aspect-[16/9] flex flex-col">
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
  );
}
