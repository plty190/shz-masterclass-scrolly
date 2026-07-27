"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isFlat } from "@/lib/flat";

gsap.registerPlugin(ScrollTrigger);

/**
 * Word-by-word reveal. Each word scrubs opacity 0.1 → 1 and blur 2px → 0 tied
 * to scroll position.
 *
 * Wrapping strategy: children can be a string OR a React fragment. If a string,
 * we split on whitespace; if a fragment, we walk its children and split any
 * text nodes so inline highlights (marker span) remain intact.
 */
export function TextScrub({
  children,
  className,
  scrubVh = 120,
  start = "top 80%",
}: {
  children: ReactNode;
  className?: string;
  scrubVh?: number;
  start?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (isFlat()) return;
    const root = ref.current;
    if (!root) return;
    const words = root.querySelectorAll<HTMLSpanElement>(".ts-word");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.12, filter: "blur(2px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start,
            end: `+=${scrubVh}vh`,
            scrub: 1.2,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [scrubVh, start]);

  return (
    <p ref={ref} className={className}>
      {splitNode(children)}
    </p>
  );
}

// Walk children and split any text into word spans; preserve elements (marker etc.)
function splitNode(node: ReactNode): ReactNode {
  if (typeof node === "string") return splitString(node);
  if (Array.isArray(node)) return node.map((n, i) => <Frag key={i}>{splitNode(n)}</Frag>);
  if (isReactElement(node)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const el = node as any;
    const kids = el.props?.children;
    if (kids !== undefined) {
      // Clone element, replace children with split version
      return {
        ...el,
        props: { ...el.props, children: splitNode(kids) },
      };
    }
  }
  return node;
}

function splitString(s: string): ReactNode {
  const parts = s.split(/(\s+)/); // keep whitespace
  return parts.map((p, i) =>
    /^\s+$/.test(p) ? (
      <span key={i}>{p}</span>
    ) : p === "" ? null : (
      <span key={i} className="ts-word inline-block" style={{ opacity: 0.12 }}>
        {p}
      </span>
    )
  );
}

function isReactElement(x: unknown): boolean {
  return typeof x === "object" && x !== null && "type" in (x as object) && "props" in (x as object);
}

function Frag({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
