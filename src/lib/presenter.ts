import type Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Presenter navigation: arrow keys jump between "stops".
   Stops are computed fresh on every keypress from live ScrollTriggers —
   pinned sequences expose their beat count via (st as any).beats. */

let lenis: Lenis | null = null;
export function setLenis(l: Lenis | null) {
  lenis = l;
}
export function getLenis() {
  return lenis;
}

export function computeStops(): number[] {
  const stops = new Set<number>([0]);
  for (const st of ScrollTrigger.getAll()) {
    const meta = st as unknown as { beats?: number; stopFractions?: number[] };
    const span = st.end - st.start;
    if (meta.stopFractions?.length) {
      // precise hold-points: land where the beat is fully visible.
      // do NOT add st.end — the last hold-point already covers exiting the pin,
      // and adding st.end creates a ghost stop on the empty tail (needs 2 keys).
      for (const f of meta.stopFractions) stops.add(Math.round(st.start + span * f));
    } else if (meta.beats && meta.beats > 0) {
      for (let i = 0; i < meta.beats; i++) {
        stops.add(Math.round(st.start + (span * i) / meta.beats));
      }
      stops.add(Math.round(st.end));
    }
  }
  // plain sections (no pin): their top edges
  document.querySelectorAll<HTMLElement>("[data-stop]").forEach((el) => {
    stops.add(Math.round(el.getBoundingClientRect().top + window.scrollY));
  });
  const max = document.documentElement.scrollHeight - window.innerHeight;
  // dedupe near-duplicates: any two stops within 40px collapse to the earlier one
  const sorted = [...stops].sort((a, b) => a - b);
  const cleaned: number[] = [];
  for (const s of sorted) {
    if (s > max + 2) continue;
    if (cleaned.length === 0 || s - cleaned[cleaned.length - 1] > 40) cleaned.push(s);
  }
  return cleaned;
}

export function jump(dir: 1 | -1) {
  const stops = computeStops();
  const y = window.scrollY;
  const EPS = 12;
  let target: number | undefined;
  if (dir === 1) target = stops.find((s) => s > y + EPS);
  else target = [...stops].reverse().find((s) => s < y - EPS);
  if (target === undefined) return;
  // 0.7s — snappy fürs Live-Präsentieren (Cubic-ease-out für weiches Ankommen)
  if (lenis) lenis.scrollTo(target, { duration: 0.7, easing: (t) => 1 - Math.pow(1 - t, 3) });
  else window.scrollTo({ top: target, behavior: "smooth" });
}
