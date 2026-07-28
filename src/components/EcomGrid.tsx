"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isFlat } from "@/lib/flat";

gsap.registerPlugin(ScrollTrigger);

/* E-Commerce-Produktion: ein Look, konsistent über Körperformen und Größen.
   Grid aus Render-Varianten + EN-13402-Beat. */

// bodysizing, dasselbe blonde Model, gleiche blaue Boardshort,
// Progression von schlank -> korpulent (nur Frontal-Views, ein Model, ein Look)
// Eine Reihe, 6 Frontal-Full-Body-Shots, streng schlank → korpulent.
// Alle im gleichen Framing (896×1200, Person klein im Frame).
const variants = [
  "mc/bodysizing/bodysizing-07", // 1 · schlankster, definierter Sixpack
  "mc/bodysizing/bodysizing-09", // 2 · schlank, definiert
  "mc/bodysizing/bodysizing-01", // 3 · athletisch, leichter Rumpf
  "mc/bodysizing/bodysizing-06", // 4 · korpulent, weiche Silhouette (Full-Body)
  "mc/bodysizing/bodysizing-04", // 5 · sehr korpulent, breit (Full-Body)
];

export function EcomGrid() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isFlat()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".eg-tile",
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.07,
          scrollTrigger: { trigger: ".eg-grid", start: "top 75%" },
        }
      );
      gsap.fromTo(
        ".eg-copy",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 60%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="ecom" ref={rootRef} data-stop className="relative bg-paper px-6 py-28 md:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">
          E-Commerce-Produktion
        </p>
        <h2 className="eg-copy fade-init display-h1 mt-6 max-w-2xl text-[32px] text-ink text-balance md:text-[46px]">
          Ein Look. Jede Körperform. Jede Größe.{" "}
          <span className="font-normal text-quiet">Konsistent über die gesamte Range.</span>
        </h2>
        <p className="eg-copy fade-init mt-6 max-w-xl display-body text-[16px] text-ink-soft text-pretty md:text-[17px]">
          Körperformen nach EN 13402 als Referenz. Das Fitting passiert auf Knopfdruck, die
          Bildsprache bleibt markenkonsistent. Keine Nachshootings, wenn die Range wächst.
        </p>

        <div className="eg-grid mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
          {variants.map((v, i) => (
            <div key={i} className="eg-tile fade-init overflow-hidden rounded-[10px] bg-light ring-1 ring-ink/[0.04]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/${v}.webp`}
                alt={`E-Commerce-Render Variante ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-faint">
          Ein Produkt, fünf Körperformen. Generiert aus demselben Ausgangsbild.
        </p>
      </div>
    </section>
  );
}
