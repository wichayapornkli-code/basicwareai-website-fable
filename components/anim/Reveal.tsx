"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Reveal — scroll-triggered entrance.
 * mode "lines": SplitText line-mask rise (for headings/paragraphs).
 * mode "fade":  y-drift + fade (for cards, images, arbitrary blocks).
 */
export default function Reveal({
  children,
  mode = "lines",
  delay = 0,
  y = 32,
  as: Tag = "div",
  style,
  className,
}: {
  children: ReactNode;
  mode?: "lines" | "fade";
  delay?: number;
  y?: number;
  as?: "div" | "section" | "span" | "h1" | "h2" | "h3" | "p";
  style?: CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (mode === "lines") {
        const split = SplitText.create(el, {
          type: "lines",
          linesClass: "bw-line",
          mask: "lines",
          autoSplit: true,
        });
        gsap.from(split.lines, {
          yPercent: 110,
          opacity: 0,
          duration: 1.1,
          stagger: 0.09,
          delay,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      } else {
        gsap.from(el, {
          y,
          opacity: 0,
          duration: 1.1,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [mode, delay, y]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} style={style} className={className}>
      {children}
    </Tag>
  );
}
