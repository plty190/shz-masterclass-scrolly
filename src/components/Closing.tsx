"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isFlat } from "@/lib/flat";

gsap.registerPlugin(ScrollTrigger);

/* Verabschiedung — Wortmarke + Kontakt. */
export function Closing() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isFlat()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".closing-el",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: { trigger: rootRef.current, start: "top 60%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      data-stop
      className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center"
    >
      <p className="closing-el fade-init mb-6 font-label text-[12px] font-semibold uppercase tracking-[0.18em] text-quiet">
        Danke
      </p>
      <h2 className="closing-el fade-init display-xl text-[11vw] font-medium md:text-[88px]">
        SHOWZ<span className="text-green">.AI</span>
      </h2>
      <p className="closing-el fade-init mt-6 max-w-md text-[14px] leading-relaxed text-quiet text-pretty">
        AI Content Production für Fashion Brands. Hinter dem Tool steht die Kreativagentur SHOWZ
        in Berlin.
      </p>
      <div className="closing-el fade-init mt-10 flex flex-wrap items-center justify-center gap-3">
        <a
          href="https://showz.ai"
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-green px-5 py-2.5 text-[13px] font-semibold text-ink transition-transform hover:scale-[1.03]"
        >
          showz.ai
        </a>
        <span className="rounded-full border border-line bg-white/80 px-4 py-2 text-[13px] text-ink">
          Mirja Schwartz &amp; Philip Regutzki
        </span>
      </div>
    </section>
  );
}
