"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isFlat } from "@/lib/flat";

gsap.registerPlugin(ScrollTrigger);

/* Ruhiger Vollbild-Marker (Live-Demo, Q&A) — die Seite parkt hier,
   während gesprochen oder ins Tool gewechselt wird.
   Enter-Choreo (dark): BG-Curtain fährt von unten hoch, dann Text-Reveal. */
export function MarkerScreen({
  id,
  eyebrow,
  title,
  note,
  dark = true,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  note?: string;
  dark?: boolean;
  children?: ReactNode;
}) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isFlat()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });

      if (dark) {
        // 1. BG-Curtain von unten
        tl.fromTo(
          ".ms-curtain",
          { yPercent: 100 },
          { yPercent: 0, duration: 0.9, ease: "power3.inOut" }
        );
      }
      // 2. Text-Reveal (nach Curtain)
      tl.fromTo(
        ".ms-el",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.12 },
        dark ? "-=0.15" : 0
      );
    }, rootRef);
    return () => ctx.revert();
  }, [dark]);

  return (
    <section
      id={id}
      ref={rootRef}
      data-stop
      className={`relative flex h-svh flex-col items-center justify-center overflow-hidden px-6 text-center ${
        dark ? "text-white" : "bg-paper text-ink"
      }`}
    >
      {/* BG-Curtain — nur bei dark, wird per GSAP von unten reingeschoben */}
      {dark && <div className="ms-curtain absolute inset-0 bg-dark" aria-hidden />}

      <div className="relative z-10 flex flex-col items-center">
        {eyebrow && (
          <p className={`ms-el fade-init eyebrow mb-8 ${dark ? "!text-white/50" : ""}`}>{eyebrow}</p>
        )}
        <h2 className="ms-el fade-init display-h1 text-[13vw] md:text-[112px]">
          {title}
          <span className="text-green">.</span>
        </h2>
        {note && (
          <p
            className={`ms-el fade-init display-body mt-10 max-w-xl text-[18px] font-medium md:text-[22px] ${
              dark ? "text-white/70" : "text-ink-soft"
            }`}
          >
            {note}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
