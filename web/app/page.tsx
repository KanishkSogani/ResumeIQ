import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: "▦",
      iconColor: "text-indigo-600",
      title: "ATS Score Analysis",
      description:
        "Our neural engine decomposes your resume structure to simulate how enterprise Applicant Tracking Systems rank your profile.",
      cta: "View Example Report",
    },
    {
      icon: "◌",
      iconColor: "text-orange-700",
      title: "Skill Gap Detection",
      description:
        "Identifying the missing keywords and technical proficiencies required for your target seniority level in real-time.",
      cta: "Discover Insights",
    },
    {
      icon: "◎",
      iconColor: "text-violet-700",
      title: "Job Matching Insights",
      description:
        "Precision matching against a database of 50,000+ job descriptions to find your statistical ideal role fit.",
      cta: "Start Matching",
    },
  ];

  const footerColumns = [
    {
      title: "Product",
      links: ["Analyzer", "Skill Gap", "Enterprise"],
    },
    {
      title: "Platform",
      links: ["API Docs", "Integration", "Status"],
    },
    {
      title: "Company",
      links: ["Privacy", "Terms", "Help"],
    },
  ];

  return (
    <div className="bg-surface text-on-surface selection:bg-primary-container selection:text-white">
      <nav className="fixed top-0 z-50 w-full border-b border-white/30 bg-white/80 shadow-sm shadow-indigo-500/5 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-xl font-bold tracking-tighter text-slate-900 hover:text-primary transition-colors"
            >
              ResumeIQ
            </Link>
            <div className="hidden items-center gap-6 md:flex">
              <Link
                className="text-sm font-medium tracking-tight text-slate-500 transition-colors hover:text-slate-900"
                href="/dashboard"
              >
                Dashboard
              </Link>
              <Link
                className="text-sm font-medium tracking-tight text-slate-500 transition-colors hover:text-slate-900"
                href="#"
              >
                Resumes
              </Link>
              <Link
                className="text-sm font-medium tracking-tight text-slate-500 transition-colors hover:text-slate-900"
                href="#"
              >
                Analytics
              </Link>
              <Link
                className="text-sm font-medium tracking-tight text-slate-500 transition-colors hover:text-slate-900"
                href="#"
              >
                Templates
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 md:px-4">
              Sign In
            </button>
            <button className="rounded-lg bg-gradient-to-br from-primary-container to-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:opacity-90 active:scale-95 md:px-6">
              Analyze Resume
            </button>
          </div>
        </div>
      </nav>

      <main className="px-6 pb-20 pt-32">
        <section className="mx-auto mb-16 max-w-4xl text-center">
          <h1 className="mb-6 text-5xl leading-[1.1] font-extrabold tracking-tight text-on-surface md:text-7xl">
            Analyze Your Resume with{" "}
            <span className="text-primary italic">AI Precision</span>
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-on-surface-variant">
            Get ATS score, skill insights, and job match analysis in seconds
            with the world&apos;s most sophisticated editorial engine.
          </p>

          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-container to-orange-700 opacity-10 blur-xl transition duration-1000 group-hover:opacity-20" />
            <div className="relative rounded-2xl border-2 border-dashed border-outline-variant/30 bg-white p-12 shadow-xl shadow-indigo-500/5 transition-all hover:border-primary/40">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-primary">
                  <span className="text-4xl" aria-hidden>
                    ↑
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-on-surface">
                    Drag and drop your resume
                  </p>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    PDF, DOCX (Max 10MB)
                  </p>
                </div>
                <button className="mt-4 rounded-lg bg-slate-200 px-8 py-3 text-xs font-bold tracking-widest text-primary uppercase transition-all duration-300 hover:bg-primary hover:text-white">
                  Select File
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex flex-col justify-between rounded-2xl bg-slate-100 p-8 transition-colors hover:bg-white"
            >
              <div>
                <div
                  className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm transition-transform group-hover:scale-110 ${feature.iconColor}`}
                >
                  <span className="text-xl" aria-hidden>
                    {feature.icon}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold tracking-tight text-on-surface">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  {feature.description}
                </p>
              </div>
              <div className="mt-8 border-t border-outline-variant/20 pt-6">
                <span className="text-xs font-bold tracking-widest text-primary uppercase">
                  {feature.cta}
                </span>
              </div>
            </div>
          ))}
        </section>

        <section className="mx-auto mt-24 max-w-7xl">
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <div className="w-full md:w-1/2">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-on-surface">
                Editorial-Grade Intelligence in Your Hands
              </h2>
              <p className="mb-8 text-lg text-on-surface-variant">
                We don&apos;t just find mistakes; we rewrite narratives. Our AI
                suggests improvements that maintain your unique voice while
                maximizing corporate visibility.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span className="text-xl text-primary">✓</span>
                  <span className="font-medium">
                    Context-aware verb optimization
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-xl text-primary">✓</span>
                  <span className="font-medium">
                    Impact quantifier generator
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-xl text-primary">✓</span>
                  <span className="font-medium">Formatting health check</span>
                </li>
              </ul>
            </div>

            <div className="w-full md:w-1/2">
              <div className="overflow-hidden rounded-2xl border border-white/40 bg-slate-100 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Resume analysis dashboard interface"
                  className="h-auto w-full opacity-90 transition-opacity duration-500 hover:opacity-100"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1Q9lmXi1XUrs6DLY7W4lfp3uq1H5BFhrOrPJoROeV9K3oKlaoi-4ARjKCbEsBTZ2ldtQiqqJr6O3fcRvlT5NvkZM-1AXzo9BjnvfUSGnnW1PccUI4WTTBz7NgaSLkqD2-Z5_q7sgSIG-PE4QGkxSw8_rx9IqoKIuvDitk3_XXAHXdGqjwjHACUY2zcxLkS3SFUedEXLK8zecn_Q3DR2QD6nEeLFe1F2A9RWoGBydHT_tEYSvCYZIRphzpKlDgjEFoBA3nOhQN0dQ"
                />
                <div className="bg-white p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-bold tracking-tight text-on-surface-variant uppercase">
                      Live Analysis Preview
                    </span>
                    <span className="rounded bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary">
                      PROCESSING...
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-[75%] rounded-full bg-primary" />
                    </div>
                    <div className="flex justify-between text-[11px] font-bold text-on-surface-variant">
                      <span>ATS COMPATIBILITY</span>
                      <span>75%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-0 bg-slate-100 px-6 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-12 md:flex-row">
          <div className="max-w-xs">
            <span className="mb-4 block text-lg font-black text-indigo-700">
              ResumeIQ
            </span>
            <p className="text-sm leading-relaxed text-on-surface-variant">
              Defining the future of career data through editorial excellence
              and artificial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 md:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h4 className="mb-6 text-xs font-bold tracking-widest text-on-surface uppercase">
                  {column.title}
                </h4>
                <ul className="space-y-4 text-sm text-on-surface-variant">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        className="transition-colors hover:text-primary"
                        href="#"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-7xl border-t border-outline-variant/20 pt-8 text-center text-[10px] font-bold tracking-[0.2em] text-on-surface-variant uppercase md:text-left">
          © 2026 ResumeIQ. All rights reserved. Precision Engine v4.2
        </div>
      </footer>
    </div>
  );
}
