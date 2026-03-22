import React from "react";
import { Search } from "lucide-react";

export function TopBar() {
  return (
    <header className="bg-white/80 backdrop-blur-md flex items-center justify-between px-8 py-3 sticky top-0 z-50 border-b border-slate-100">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold tracking-tighter text-slate-900">
          ResumeIQ
        </span>
        <nav className="hidden lg:flex items-center gap-6">
          <a
            href="#"
            className="text-sm font-medium tracking-tight text-primary border-b-2 border-primary py-1"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-sm font-medium tracking-tight text-slate-500 hover:text-slate-900 transition-colors"
          >
            Resumes
          </a>
          <a
            href="#"
            className="text-sm font-medium tracking-tight text-slate-500 hover:text-slate-900 transition-colors"
          >
            Analytics
          </a>
          <a
            href="#"
            className="text-sm font-medium tracking-tight text-slate-500 hover:text-slate-900 transition-colors"
          >
            Templates
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search profiles..."
            className="bg-slate-50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary w-64 transition-all outline-none"
          />
        </div>
        <button className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest hover:bg-primary-container transition-colors shadow-sm">
          Analyze Resume
        </button>
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
          <img
            src="https://picsum.photos/seed/profile/100/100"
            alt="User profile"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}
