"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isFlat } from "@/lib/flat";

gsap.registerPlugin(ScrollTrigger);

/* Hero-Video aus dem SHOWZ.AI-Portfolio-Case, Vollbild-Showcase-Moment. */
export function HeroVideo() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isFlat()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hv-frame",
        { scale: 0.92, borderRadius: 24 },
        {
          scale: 1,
          borderRadius: 0,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 80%",
            end: "top top",
            scrub: 0.6,
          },
        }
      );
      // play/pause with visibility, auf Halbierten Viewport ziehen damits früher startet
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => videoRef.current?.play().catch(() => {}),
        onEnterBack: () => videoRef.current?.play().catch(() => {}),
        onLeave: () => videoRef.current?.pause(),
        onLeaveBack: () => videoRef.current?.pause(),
      });
      gsap.fromTo(
        ".hv-caption",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 40%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="film" ref={rootRef} data-stop className="relative h-svh overflow-hidden bg-dark">
      <div className="hv-frame absolute inset-0 overflow-hidden will-change-transform">
        <video
          ref={videoRef}
          src="/videos/mood.mp4"
          poster="/images/case/mood_poster.jpg"
          muted
          loop
          playsInline
          preload="auto"
          autoPlay
          className="h-full w-full object-cover"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
      <div className="hv-caption fade-init absolute bottom-10 left-6 md:left-16">
        <p className="eyebrow !text-white/50">
          SHOWZ.AI · Brand Film
        </p>
        <p className="mt-2 max-w-md font-display text-[22px] font-medium leading-[1.3] text-white md:text-[26px]">
          Vom statischen Asset zum bewegten Markenauftritt.
        </p>
      </div>
    </section>
  );
}
