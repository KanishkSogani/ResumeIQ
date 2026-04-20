"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Upload", href: "/upload" },
  { label: "Job Matching", href: "/job-matching" },
  { label: "History", href: "/history" },
  { label: "Compare", href: "/compare" },
];

export function TopNavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center w-full px-8 py-4 sticky top-0 z-50 bg-[#0b1326]/80 backdrop-blur-md border-b border-[#424754]/10">
      <Link
        className="text-xl font-black tracking-tighter text-[#adc6ff] cursor-pointer"
        href="/"
      >
        ResumeIQ
      </Link>
      <div className="hidden md:flex items-center space-x-8">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              className={
                isActive
                  ? "text-[#adc6ff] font-bold border-b-2 border-[#adc6ff] pb-1 antialiased text-md leading-relaxed transition-all"
                  : "text-[#dae2fd] opacity-70 hover:text-[#adc6ff] transition-colors duration-200 antialiased text-md leading-relaxed"
              }
              href={item.href}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center space-x-4">
        <Link
          className="primary-gradient text-[#00285d] px-6 py-2 rounded-lg font-bold scale-95 active:opacity-80 transition-all"
          href="/upload"
        >
          Analyze Resume
        </Link>
      </div>
    </nav>
  );
}
