"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isFlat } from "@/lib/flat";

gsap.registerPlugin(ScrollTrigger);

/* Der Prozess: Illu → Front & Back → Alle Bilder.
   Station 1 nutzt einen markierten Platzhalter, bis die echte Zeichnung da ist. */

const stations = [
  {
    label: "Illustration",
    text: "Am Anfang steht oft nicht mehr\nals eine grobe technische Zeichnung.",
  },
  {
    label: "Front & Back",
    text: "Daraus entstehen erste Produktansichten:\nFront und Back, in eurer Bildsprache.",
  },
  {
    label: "Alle Bilder",
    text: "Und daraus die komplette Bilderstrecke:\nEditorial, Kampagne, Detail. Ohne Shooting, ohne Prompting.",
  },
];

// Portraits erst, Sundek-Logo-Close-up ganz am Ende der Reihe
const galleryImgs = [
  "/images/mc/sundek/gen-02.webp",
  "/images/mc/sundek/gen-03.webp",
  "/images/mc/sundek/gen-04.webp",
  "/images/mc/sundek/gen-05.webp",
  "/images/mc/sundek/gen-06.webp",
  "/images/mc/sundek/gen-01.webp", // Close-up als Abschluss
];

export function ProcessJourney() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isFlat()) return;
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>(".prc-step");
      const scenes = gsap.utils.toArray<HTMLElement>(".prc-scene");
      gsap.set(scenes, { autoAlpha: 0 });
      gsap.set(scenes[0], { autoAlpha: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: `+=${(stations.length + 1) * 90}%`,
          scrub: 0.6,
          pin: ".prc-stage",
        },
      });

      tl.fromTo(scenes[0], { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.6 }, 0);
      tl.fromTo(steps[0], { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.4);

      for (let i = 1; i < stations.length; i++) {
        const at = 0.6 + i;
        tl.to(scenes[i - 1], { autoAlpha: 0, duration: 0.3 }, at);
        tl.fromTo(scenes[i], { autoAlpha: 0, scale: 1.03 }, { autoAlpha: 1, scale: 1, duration: 0.5 }, at + 0.05);
        tl.to(steps[i - 1], { autoAlpha: 0, y: -20, duration: 0.3 }, at);
        tl.fromTo(steps[i], { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.35 }, at + 0.05);
        tl.to(".prc-progress", { scaleX: (i + 1) / stations.length, duration: 0.4 }, at);
        tl.set(".prc-station-active", { textContent: stations[i].label }, at);
      }

      // presenter stops: hold-point of each station
      const D = tl.duration();
      if (tl.scrollTrigger)
        (tl.scrollTrigger as unknown as { stopFractions: number[] }).stopFractions = stations.map((_, i) =>
          Math.min(0.999, (0.6 + i + 0.65) / D)
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="prozess" ref={rootRef} className="relative">
      <div className="prc-stage relative flex h-svh flex-col items-center justify-center overflow-hidden bg-light">
        <p className="absolute left-6 top-24 z-20 eyebrow md:left-16">
          Der Prozess · Von der Idee zum Asset
        </p>

        {/* Scene container, 3 crossfading layouts, safe padding-top under eyebrow */}
        <div className="relative z-10 flex h-[52vh] w-full max-w-6xl items-center justify-center px-6 pt-16">
          {/* Scene 1, Illu-Input (Sundek technische Zeichnung Front+Back) */}
          <div className="prc-scene fade-init absolute inset-x-0 top-16 bottom-0 flex items-center justify-center px-6">
            <div className="inline-flex h-full max-w-3xl flex-col items-end">
              <img
                src="/images/mc/sundek/illu_input.webp"
                alt="Sundek Boardshort · Technische Zeichnung Front & Back"
                className="max-h-[calc(100%-2rem)] max-w-full object-contain"
              />
              <span className="mt-3 eyebrow text-[10.5px]">Illu-Input</span>
            </div>
          </div>

          {/* Scene 2, Front & Back Freisteller (Label rechtsbündig am Bildrand) */}
          <div className="prc-scene fade-init absolute inset-x-0 top-16 bottom-0 flex items-center justify-center gap-8 px-6 md:gap-16">
            <div className="flex h-full max-w-[40%] flex-col items-end">
              <img
                src="/images/mc/sundek/front.webp"
                alt="Front"
                className="max-h-[calc(100%-2rem)] max-w-full object-contain"
              />
              <span className="mt-3 eyebrow text-[10.5px]">Front</span>
            </div>
            <div className="flex h-full max-w-[40%] flex-col items-end">
              <img
                src="/images/mc/sundek/back.webp"
                alt="Back"
                className="max-h-[calc(100%-2rem)] max-w-full object-contain"
              />
              <span className="mt-3 eyebrow text-[10.5px]">Back</span>
            </div>
          </div>

          {/* Scene 3, 6 Hochformat-Kacheln nebeneinander in einer Reihe, gefüllt */}
          <div className="prc-scene fade-init absolute inset-x-0 top-16 bottom-0 flex items-center justify-center px-6">
            <div className="grid h-full w-full max-w-6xl grid-cols-6 gap-2 md:gap-3">
              {galleryImgs.map((src, i) => (
                <div key={i} className="h-full overflow-hidden rounded-md ring-1 ring-ink/[0.04]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Station narrative */}
        <div className="relative z-10 mt-16 h-24 w-[88vw] max-w-2xl">
          {stations.map((s, i) => (
            <p
              key={i}
              className="prc-step fade-init display-body absolute inset-x-0 top-0 whitespace-pre-line text-center font-medium text-[3.4vw] leading-[1.32] text-ink md:text-[22px]"
            >
              {s.text}
            </p>
          ))}
        </div>

        {/* Station timeline */}
        <div className="absolute bottom-10 left-1/2 z-10 w-[80vw] max-w-xl -translate-x-1/2">
          <div className="relative h-px w-full bg-line">
            <div className="prc-progress h-full w-full origin-left bg-green" style={{ transform: `scaleX(${1 / stations.length})` }} />
          </div>
          <div className="mt-2 text-center">
            <span className="prc-station-active eyebrow text-[11px] !text-ink">Illustration</span>
          </div>
        </div>
      </div>
    </section>
  );
}
