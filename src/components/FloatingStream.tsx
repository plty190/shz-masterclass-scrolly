"use client";

import { streamPool } from "@/lib/streamPool";

/* Scattered image field with depth layers. Loose columns at ~4/10/16/21/50/80/88%,
   edge-cut tiles at 0/100%, occasional centre tiles above/below the text zone.
   Parent scroll timeline drives the parallax per layer. */

type Placement = {
  x: number; // % of width (centre)
  y: number; // vh within the field
  w: number; // px
  op: number;
  layer: "front" | "mid" | "back";
  ph?: boolean; // faint empty frame
};

/* One ~100vh segment of the original rhythm, repeated with offsets across the field. */
const SEGMENT: Placement[] = [
  { x: 10.5, y: 27, w: 125, op: 1, layer: "front" },
  { x: 88, y: 43, w: 127, op: 0.95, layer: "front" },
  { x: 80, y: 52, w: 130, op: 0.35, layer: "back", ph: true },
  { x: 21, y: 63, w: 135, op: 0.4, layer: "back", ph: true },
  { x: 50.5, y: 82, w: 145, op: 0.9, layer: "mid" },
  { x: 4, y: 91, w: 115, op: 0.35, layer: "back", ph: true },
  { x: 0, y: 15, w: 90, op: 0.4, layer: "mid", ph: true },
  { x: 99, y: 30, w: 110, op: 0.4, layer: "back", ph: true },
  { x: 16, y: 110, w: 187, op: 1, layer: "front" },
  { x: 50.5, y: 96, w: 175, op: 0.3, layer: "back", ph: true },
  { x: 83, y: 122, w: 171, op: 0.95, layer: "front" },
  { x: 76, y: 150, w: 130, op: 0.45, layer: "back", ph: true },
  { x: 24, y: 137, w: 115, op: 0.55, layer: "mid" },
  { x: 94, y: 143, w: 120, op: 0.6, layer: "mid" },
  { x: 8, y: 152, w: 140, op: 0.5, layer: "mid", ph: true },
];

const FIELD_H = 320; // vh
const OFFSETS = [0, 160]; // repeat the segment rhythm down the field

const PLACEMENTS: Placement[] = OFFSETS.flatMap((dy, r) =>
  SEGMENT.map((p, i) => ({
    ...p,
    y: p.y + dy,
    // small deterministic variation on the repeat so it doesn't tile visibly
    x: r === 0 ? p.x : Math.min(99, Math.max(0, p.x + ((i * 7) % 5) - 2)),
  }))
).filter((p) => p.y < FIELD_H);

// deterministic slug assignment for non-placeholder tiles
let imgIdx = 0;
const withSlugs = PLACEMENTS.map((p) => {
  if (p.ph) return { ...p, slug: null as string | null };
  const slug = streamPool[imgIdx % streamPool.length];
  imgIdx += 1;
  return { ...p, slug };
});

const LAYERS: { cls: string; dur: number; key: Placement["layer"] }[] = [
  { cls: "stream-back", dur: 7, key: "back" },
  { cls: "stream-mid", dur: 6, key: "mid" },
  { cls: "stream-front", dur: 5, key: "front" },
];

export function FloatingStream({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {LAYERS.map((layer) => (
        <div
          key={layer.cls}
          className={`stream-layer ${layer.cls} absolute inset-x-0 top-0`}
          style={{ height: `${FIELD_H}vh` }}
        >
          {withSlugs
            .filter((t) => t.layer === layer.key)
            .map((t, i) => (
              <div
                key={i}
                className="stream-tile absolute -translate-x-1/2"
                style={{
                  left: `${t.x}%`,
                  top: `${t.y}vh`,
                  width: t.w,
                  opacity: t.op,
                  animationDuration: `${layer.dur + (i % 3)}s`,
                }}
              >
                {t.slug ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`/images/${t.slug}`}
                    alt=""
                    loading="lazy"
                    className="w-full shadow-[0_10px_36px_rgba(0,0,0,0.12)]"
                  />
                ) : (
                  <div className="aspect-4/5 w-full bg-[#f4f4f4]" />
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
