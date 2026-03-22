"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TopBar() {
  const pathname = usePathname();
  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Resumes", href: "#" },
    { label: "Analytics", href: "#" },
    { label: "Templates", href: "#" },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md flex items-center justify-between px-8 py-3 sticky top-0 z-50 border-b border-slate-100">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter text-slate-900 hover:text-primary transition-colors"
        >
          ResumeIQ
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium tracking-tight transition-colors ${
                  isActive
                    ? "text-primary border-b-2 border-primary py-1"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
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
