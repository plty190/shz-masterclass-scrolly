"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingStream } from "@/components/FloatingStream";
import { TextScrub } from "@/components/TextScrub";
import { isFlat } from "@/lib/flat";

gsap.registerPlugin(ScrollTrigger);

/* Keynote-Opener (Part 1): Titel → Hosts → Agenda → Auftakt-Statement. */
export function Opener() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isFlat()) return;
    const ctx = gsap.context(() => {
      const beats = gsap.utils.toArray<HTMLElement>(".op-beat");
      gsap.set(beats, { autoAlpha: 0 });
      gsap.set(beats[0], { autoAlpha: 1 });

      // First-beat word reveal (fires on load, the title screen)
      const firstWords = beats[0]?.querySelectorAll<HTMLSpanElement>(".ts-word");
      if (firstWords?.length) {
        gsap.set(firstWords, { opacity: 0.12, filter: "blur(2px)" });
        gsap.to(firstWords, {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.04,
          duration: 0.6,
          ease: "none",
          delay: 0.3,
        });
      }
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: `+=${beats.length * 110}%`,
          scrub: 0.6,
          pin: ".op-stage",
        },
      });
      const SPAN = beats.length;
      tl.to(".stream-front", { yPercent: -72, ease: "none", duration: SPAN }, 0);
      tl.to(".stream-mid", { yPercent: -52, ease: "none", duration: SPAN }, 0);
      tl.to(".stream-back", { yPercent: -34, ease: "none", duration: SPAN }, 0);

      beats.forEach((b, i) => {
        const at = i;
        if (i > 0) tl.fromTo(b, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.4 }, at);
        const words = b.querySelectorAll<HTMLSpanElement>(".ts-word");
        if (words.length) {
          gsap.set(words, { opacity: 0.12, filter: "blur(2px)" });
          tl.to(
            words,
            { opacity: 1, filter: "blur(0px)", stagger: 0.03, duration: 0.5, ease: "none" },
            at + 0.1
          );
        }
        if (i < beats.length - 1) tl.to(b, { autoAlpha: 0, y: -30, duration: 0.35 }, at + 0.7);
      });

      const D = tl.duration();
      if (tl.scrollTrigger)
        (tl.scrollTrigger as unknown as { stopFractions: number[] }).stopFractions = beats.map((_, i) =>
          Math.min(0.999, (i + 0.68) / D)
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={rootRef} className="relative">
      <div className="op-stage relative flex h-svh items-center justify-center overflow-hidden">
        <FloatingStream />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 46% 42% at 50% 50%, #fafaf7 0%, rgba(250,250,247,0.9) 32%, rgba(250,250,247,0) 70%)",
          }}
          aria-hidden
        />

        {/* Beat 1, Titel (Einlass-Screen) */}
        <div className="op-beat fade-init absolute flex max-w-4xl flex-col items-center px-6 text-center">
          <p className="eyebrow mb-8">SHOWZ.AI Masterclass · AI Content Creation</p>
          <TextScrub className="display-h1 text-[9vw] leading-[1.02] md:text-[76px]">
            <>
              Von der Idee<br />
              <span className="whitespace-nowrap">zum Asset<span className="text-green">.</span></span>
            </>
          </TextScrub>
          <p className="display-body mt-8 max-w-xl text-[18px] text-ink-soft md:text-[20px]">
            Wie mittelgroße Marketing-Teams kontinuierlich hochwertigen Content generieren.
          </p>
          <p className="eyebrow mt-10 text-[10.5px]">Mirja Schwartz & Philip Regutzki · SHOWZ</p>
        </div>

        {/* Beat 2, Hosts (typografisch, Vertikalstrich zwischen) */}
        <div className="op-beat fade-init absolute flex max-w-4xl flex-col items-center px-6 text-center">
          <p className="eyebrow mb-12">Eure Hosts</p>
          <div className="flex flex-col items-center gap-10 md:flex-row md:gap-24">
            <div>
              <p className="display-h2 whitespace-nowrap text-[7vw] leading-none md:text-[52px]">Mirja Schwartz</p>
              <p className="eyebrow mt-4 text-[10.5px]">Head of Business Development</p>
            </div>
            <span className="hidden h-16 w-px bg-line md:block" aria-hidden />
            <div>
              <p className="display-h2 whitespace-nowrap text-[7vw] leading-none md:text-[52px]">Philip Regutzki</p>
              <p className="eyebrow mt-4 text-[10.5px]">Head of Creative</p>
            </div>
          </div>
          <p className="mt-14 max-w-md text-[14px] leading-[1.55] text-ink-soft">
            SHOWZ.AI: AI Content Production für Fashion Brands.
            <br />
            Dahinter: die Kreativagentur SHOWZ, Berlin.
          </p>
        </div>

        {/* Beat 3, Was euch erwartet (Agenda) */}
        <div className="op-beat fade-init absolute flex max-w-3xl flex-col items-center px-6 text-center">
          <p className="eyebrow mb-10">Was euch erwartet</p>
          <ol className="w-fit text-left">
            {[
              "Status Quo: what happens after the hype?",
              "AI Content Creation in der Praxis",
              "Live-Demo: vom Produktbild zum fertigen Asset",
              "EU AI Act: Grenzen & Möglichkeiten",
              "Euer nächster Schritt",
              "Q&A",
            ].map((item, i) => (
              <li key={i} className="flex items-baseline gap-6 border-b border-line/60 py-3.5 last:border-b-0">
                <span className="num-anchor w-6 text-[13px]">{String(i + 1).padStart(2, "0")}</span>
                <span className="display-body font-medium text-[4vw] text-ink md:text-[24px]">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Beat 4, Übergang zur ersten Sektion */}
        <div className="op-beat fade-init absolute max-w-3xl px-6 text-center">
          <TextScrub className="display-h1 text-[11vw] leading-[1.02] md:text-[96px]">
            <>Status Quo<span className="text-green">.</span></>
          </TextScrub>
        </div>
      </div>
    </section>
  );
}
