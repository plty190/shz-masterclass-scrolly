"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { isFlat } from "@/lib/flat";

export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (isFlat()) return;
    const state = { value: 0 };
    const bar = rootRef.current?.querySelector<HTMLDivElement>(".pl-bar");
    const tween = gsap.to(state, {
      value: 100,
      duration: 1.4,
      ease: "power2.inOut",
      onUpdate: () => {
        if (bar) bar.style.transform = `scaleX(${state.value / 100})`;
      },
      onComplete: () => {
        gsap.to(rootRef.current, {
          autoAlpha: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.2,
          onComplete: () => setDone(true),
        });
      },
    });
    return () => {
      tween.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="preloader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper"
      aria-hidden
    >
      <span className="font-display text-4xl tracking-tight text-ink">SHOWZ.AI</span>
      <div className="mt-5 h-px w-40 overflow-hidden bg-line">
        <div className="pl-bar h-full w-full origin-left scale-x-0 bg-ink" />
      </div>
    </div>
  );
}
