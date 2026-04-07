import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Database,
  Gauge,
  Scale,
} from "lucide-react";

export function FeaturesGrid() {
  return (
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
        <div className="md:col-span-2 bg-[#131b2e] rounded-xl p-10 flex flex-col justify-between group hover:bg-[#171f33] transition-colors border border-[#424754]/5">
          <div>
            <div className="w-14 h-14 bg-[#222a3d] rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <BarChart3 className="text-[#adc6ff] w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Resume Analysis</h3>
            <p className="text-[#c2c6d6] text-lg max-w-md leading-relaxed">
              Deep-dive contextual analysis that identifies narrative gaps, tone
              inconsistencies, and missed opportunities in your professional
              history.
            </p>
          </div>
          <div className="mt-8 flex items-center text-[#adc6ff] font-bold gap-2 cursor-pointer">
            View Analysis Engine
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-[#131b2e] rounded-xl p-10 flex flex-col border border-[#424754]/5 hover:bg-[#171f33] transition-colors group">
          <div className="w-14 h-14 bg-[#222a3d] rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <Gauge className="text-[#ffb786] w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-4">ATS Scoring</h3>
          <p className="text-[#c2c6d6] leading-relaxed">
            Precision tracking of how applicant tracking systems perceive your
            data. Stay ahead of the algorithm.
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

        <div className="bg-[#131b2e] rounded-xl p-10 flex flex-col border border-[#424754]/5 hover:bg-[#171f33] transition-colors group">
          <div className="w-14 h-14 bg-[#222a3d] rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <Database className="text-[#adc6ff] w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Skill Extraction</h3>
          <p className="text-[#c2c6d6] leading-relaxed">
            Automatic identification and categorization of hard and soft skills,
            ensuring no expertise is overlooked.
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

        <div className="md:col-span-2 bg-[#131b2e] rounded-xl p-10 flex flex-col md:flex-row gap-12 items-center border border-[#424754]/5 hover:bg-[#171f33] transition-colors group overflow-hidden">
          <div className="flex-1 text-left">
            <div className="w-14 h-14 bg-[#222a3d] rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Scale className="text-[#4d8eff] w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Architecture Comparison</h3>
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
  );
}
