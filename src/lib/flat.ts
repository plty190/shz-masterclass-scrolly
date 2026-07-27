/* Verification / reduced-motion mode: ?flat renders the page statically
   (no pins, no scrub timelines, all content visible). */
export function isFlat(): boolean {
  if (typeof window === "undefined") return false;
  const flag = new URLSearchParams(window.location.search).has("flat");
  if (flag) document.documentElement.dataset.flat = "1";
  return flag;
}
