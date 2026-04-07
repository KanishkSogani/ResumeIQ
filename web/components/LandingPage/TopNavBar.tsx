export function TopNavBar() {
  return (
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
  );
}
