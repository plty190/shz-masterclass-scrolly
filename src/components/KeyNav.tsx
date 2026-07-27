"use client";

import { useEffect } from "react";
import { jump } from "@/lib/presenter";

/* Presenter keys: →/Space/PageDown = next beat, ←/PageUp = previous beat. */
export function KeyNav() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        jump(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        jump(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return null;
}
