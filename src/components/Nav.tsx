"use client";

import { useEffect, useState } from "react";
import { chapters } from "@/lib/content";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    for (const c of chapters) {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const jump = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Top bar: centered wordmark + hamburger */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 md:px-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="pointer-events-auto font-display text-2xl leading-none text-ink"
          aria-label="SHOWZ.AI — nach oben"
        >
          SHOWZ<span className="text-green">.AI</span>
        </button>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chapters"
          className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-paper transition-transform hover:scale-105"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 5h12M2 11h12" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>
      </header>

      {/* Right progress rail */}
      <nav
        aria-label="Chapters"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2.5 rounded-full bg-white/70 px-2 py-3 shadow-[0_1px_8px_rgba(0,0,0,0.06)] backdrop-blur-sm md:flex"
      >
        {chapters.map((c) => (
          <button
            key={c.id}
            onClick={() => jump(c.id)}
            aria-label={c.label}
            className="group relative flex items-center py-0.5"
          >
            <span className="pointer-events-none absolute right-6 hidden whitespace-nowrap rounded bg-ink px-2 py-1 text-[10px] tracking-wide text-paper group-hover:block">
              {c.label}
            </span>
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: active === c.id ? 6 : 4,
                height: active === c.id ? 6 : 4,
                background: active === c.id ? "#111" : "#c9c9c9",
              }}
            />
          </button>
        ))}
      </nav>

      {/* Chapter panel */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-400 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-ink/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <aside
          className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col justify-between bg-paper p-8 shadow-2xl transition-transform duration-400 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-wide text-quiet">Contents</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-paper"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </button>
            </div>
            <ul className="mt-10 space-y-4">
              {chapters.map((c, i) => (
                <li key={c.id}>
                  <button onClick={() => jump(c.id)} className="group flex items-baseline gap-4 text-left">
                    <span className="w-6 text-xs text-faint tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-3xl text-ink transition-opacity group-hover:opacity-60">
                      {c.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[11px] leading-relaxed text-faint">
            SHOWZ.AI Masterclass · AI Content Creation für Fashion Brands · 29. Juli 2026
          </p>
        </aside>
      </div>
    </>
  );
}
