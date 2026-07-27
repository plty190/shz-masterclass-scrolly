"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingStream } from "@/components/FloatingStream";
import { isFlat } from "@/lib/flat";

gsap.registerPlugin(ScrollTrigger);

const tints: Record<string, string> = {
  paper: "bg-paper",
  mint: "bg-tint-mint",
  sky: "bg-tint-sky",
  sand: "bg-tint-sand",
  dark: "bg-dark",
};

/* Pinned presenter sequence: N centered beats fade through while the section is pinned.
   Optional artwork stream with scroll parallax behind. Registers beat count for KeyNav. */
export function BeatSequence({
  id,
  tint = "paper",
  stream = false,
  eyebrow,
  beats,
  vhPerBeat = 90,
}: {
  id?: string;
  tint?: keyof typeof tints | string;
  stream?: boolean;
  eyebrow?: string;
  beats: ReactNode[];
  vhPerBeat?: number;
}) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isFlat()) return;
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>(".bs-beat");
      gsap.set(els, { autoAlpha: 0 });
      gsap.set(els[0], { autoAlpha: 1 });

      // First-beat word reveal: fires once when the section enters (before pin)
      const firstWords = els[0]?.querySelectorAll<HTMLSpanElement>(".ts-word");
      if (firstWords?.length) {
        gsap.set(firstWords, { opacity: 0.12, filter: "blur(2px)" });
        gsap.to(firstWords, {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.04,
          duration: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            once: true,
          },
        });
      }
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: `+=${els.length * vhPerBeat}%`,
          scrub: 0.6,
          pin: ".bs-stage",
        },
      });
      const SPAN = els.length;
      if (stream) {
        tl.to(".stream-front", { yPercent: -58, ease: "none", duration: SPAN }, 0);
        tl.to(".stream-mid", { yPercent: -42, ease: "none", duration: SPAN }, 0);
        tl.to(".stream-back", { yPercent: -26, ease: "none", duration: SPAN }, 0);
      }
      els.forEach((b, i) => {
        const at = i;
        if (i > 0) tl.fromTo(b, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.4 }, at);
        // word-reveal: stagger opacity+blur on .ts-word in this beat
        const words = b.querySelectorAll<HTMLSpanElement>(".ts-word");
        if (words.length) {
          gsap.set(words, { opacity: 0.12, filter: "blur(2px)" });
          tl.to(
            words,
            { opacity: 1, filter: "blur(0px)", stagger: 0.03, duration: 0.5, ease: "none" },
            at + 0.1
          );
        }
        if (i < els.length - 1) tl.to(b, { autoAlpha: 0, y: -30, duration: 0.35 }, at + 0.7);
      });

      // presenter stops at the end of each beat's hold window (fully sharp,
      // just before the exit-fade at i+0.7). Landing at +0.55 caught the
      // reveal mid-blur; +0.68 lets the word-scrub complete first.
      const D = tl.duration();
      if (tl.scrollTrigger)
        (tl.scrollTrigger as unknown as { stopFractions: number[] }).stopFractions = els.map((_, i) =>
          Math.min(0.999, (i + 0.68) / D)
        );
    }, rootRef);
    return () => ctx.revert();
  }, [stream, vhPerBeat]);

  const isDark = tint === "dark";

  return (
    <section id={id} ref={rootRef} className="relative">
      <div
        className={`bs-stage relative flex h-svh items-center justify-center overflow-hidden ${tints[tint] ?? "bg-paper"}`}
      >
        {stream && (
          <>
            <FloatingStream />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 46% 42% at 50% 50%, #fafaf7 0%, rgba(250,250,247,0.9) 32%, rgba(250,250,247,0) 70%)",
              }}
              aria-hidden
            />
          </>
        )}
        {eyebrow && (
          <p
            className={`absolute left-6 top-24 z-20 font-label text-[12px] font-semibold uppercase tracking-[0.18em] md:left-16 ${isDark ? "text-white/60" : "text-quiet"}`}
          >
            {eyebrow}
          </p>
        )}
        {beats.map((b, i) => (
          <div
            key={i}
            className="bs-beat fade-init absolute flex max-w-4xl flex-col items-center px-6 text-center"
          >
            {b}
          </div>
        ))}
      </div>
    </section>
  );
}
