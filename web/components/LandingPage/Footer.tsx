export function Footer() {
  return (
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
  );
}
