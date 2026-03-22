"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BrainCircuit,
  Settings,
  Plus,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BrainCircuit, label: "Insights", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-slate-50 border-r border-slate-200 flex flex-col p-4 gap-2 shrink-0 overflow-y-auto custom-scrollbar">
      <div className="flex items-center gap-3 px-2 py-4 mb-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-shadow">
            <BrainCircuit size={24} />
          </div>
          <div>
            <h1 className="text-lg font-black text-primary leading-none">
              ResumeIQ
            </h1>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">
              Precision Engine
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} className="block">
            <motion.div
              whileHover={{ x: 4 }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-sans text-xs uppercase tracking-widest font-bold transition-all ${
                pathname.startsWith(item.href)
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <item.icon
                size={18}
                className={
                  pathname.startsWith(item.href)
                    ? "text-primary"
                    : "text-slate-400"
                }
              />
              {item.label}
            </motion.div>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6 pb-2 space-y-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-br from-primary-container to-primary text-white py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
        >
          <Plus size={16} />
          New Analysis
        </motion.button>

        <div className="flex flex-col gap-1">
          <a
            href="#"
            className="text-slate-500 hover:text-slate-800 flex items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-widest font-bold transition-colors"
          >
            <HelpCircle size={14} />
            Help
          </a>
          <a
            href="#"
            className="text-slate-500 hover:text-slate-800 flex items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-widest font-bold transition-colors"
          >
            <ShieldCheck size={14} />
            Privacy
          </a>
        </div>
      </div>
    </aside>
  );
}
