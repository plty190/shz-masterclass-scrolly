"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isFlat } from "@/lib/flat";

gsap.registerPlugin(ScrollTrigger);

/* Emotionen: Vollbild-Case-Stills mit weißen Statements, das Argument,
   dass AI-Produktion Stimmung kann, nicht nur Freisteller. */

const beats = [
  { img: "/images/mc/cool/cool-02.webp", text: "Content muss nicht nur schnell sein. Er muss etwas auslösen." },
  { img: "/images/mc/cool/cool-14.webp", text: "Licht, Haltung, Atmosphäre. Markenbildsprache statt Stock-Optik." },
  { img: "/images/mc/imaginary/imaginary-04.webp", text: "Und wenn ihr wollt, führt sie euch auch in Welten, die es so gar nicht gibt." },
  { img: "/images/mc/cool/cool-20.webp", text: "Dieselbe Engine, die eure E-Commerce-Shots produziert, kann auch das." },
];

export function Emotions() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isFlat()) return;
    const ctx = gsap.context(() => {
      const imgs = gsap.utils.toArray<HTMLElement>(".emo-img");
      const texts = gsap.utils.toArray<HTMLElement>(".emo-text");
      gsap.set(imgs, { autoAlpha: 0 });
      gsap.set(imgs[0], { autoAlpha: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: `+=${beats.length * 95}%`,
          scrub: 0.6,
          pin: ".emo-stage",
        },
      });
      beats.forEach((_, i) => {
        const at = i;
        if (i > 0) {
          tl.to(imgs[i - 1], { autoAlpha: 0, duration: 0.35 }, at);
          tl.fromTo(imgs[i], { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: 0.5 }, at);
        }
        tl.to(imgs[i], { scale: 1.08, ease: "none", duration: 0.95 }, at);
        tl.fromTo(texts[i], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.35 }, at + 0.08);
        if (i < beats.length - 1) tl.to(texts[i], { autoAlpha: 0, y: -24, duration: 0.3 }, at + 0.7);
      });

      const D = tl.duration();
      if (tl.scrollTrigger)
        (tl.scrollTrigger as unknown as { stopFractions: number[] }).stopFractions = beats.map((_, i) =>
          Math.min(0.999, (i + 0.65) / D)
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="emotionen" ref={rootRef} className="relative">
      <div className="emo-stage relative h-svh overflow-hidden bg-dark">
        {beats.map((b, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={b.img}
            alt=""
            className="emo-img absolute inset-0 h-full w-full object-cover will-change-transform"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-dark/20" />

        <p className="absolute left-6 top-24 z-20 eyebrow !text-white/50 md:left-16">
          Emotion · Generiert mit SHOWZ.AI
        </p>

        <div className="absolute bottom-[14svh] left-6 z-10 h-40 w-full max-w-lg md:left-16">
          {beats.map((b, i) => (
            <p
              key={i}
              className="emo-text fade-init absolute inset-x-0 font-display text-[26px] font-medium leading-[1.25] text-white md:text-[32px]"
            >
              {b.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
