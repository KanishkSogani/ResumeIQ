export function CtaSection() {
  return (
    <section className="max-w-5xl mx-auto px-8 py-24 text-center">
      <div className="bg-[#2d3449] rounded-2xl p-16 relative overflow-hidden">
        <div className="absolute inset-0 primary-gradient opacity-10"></div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
          Ready for your next move?
        </h2>
        <p className="text-[#c2c6d6] text-xl mb-10 max-w-xl mx-auto relative z-10">
          Join thousands of professionals using ResumeIQ to secure interviews at
          top-tier companies.
        </p>
        <div className="relative z-10">
          <button className="primary-gradient text-[#00285d] px-12 py-5 rounded-lg text-xl font-bold hover:scale-105 transition-transform shadow-xl">
            Analyze Resume Now
          </button>
        </div>
      </div>
    </section>
  );
}
