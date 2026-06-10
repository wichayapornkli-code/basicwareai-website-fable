"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Back-to-front: landscape, midground hills, girl, foreground flowers
const LAYERS = [
  { src: "/assets/2_home_hero_paralax_0003.png", depth: 0.1 },
  { src: "/assets/2_home_hero_paralax_0002.png", depth: 0.28 },
  { src: "/assets/2_home_hero_paralax_0001.png", depth: 0.5 },
  { src: "/assets/2_home_hero_paralax_0000.png", depth: 0.85 },
];

export default function HeroParallax() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-depth]"));

    const ctx = gsap.context(() => {
      gsap.fromTo(
        layers,
        { opacity: 0, y: (i) => 24 + LAYERS[i].depth * 56 },
        { opacity: 1, y: 0, duration: 1.3, stagger: 0.09, ease: "power3.out" }
      );

      // Nearer layers leave the frame faster on scroll
      layers.forEach((el) => {
        const depth = Number(el.dataset.depth);
        gsap.to(el, {
          yPercent: -depth * 20,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, root);

    // Mouse drift — horizontal only so it never fights the scroll tween
    const setters = layers.map((el) =>
      gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" })
    );
    const onMouse = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      layers.forEach((el, i) => setters[i](-nx * Number(el.dataset.depth) * 26));
    };
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) window.addEventListener("mousemove", onMouse, { passive: true });

    return () => {
      if (fine) window.removeEventListener("mousemove", onMouse);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} style={{ position: "absolute", inset: 0, overflow: "hidden" }} aria-hidden>
      {LAYERS.map((layer) => (
        <div
          key={layer.src}
          data-depth={layer.depth}
          style={{
            position: "absolute",
            inset: "-8% -5%",
            backgroundImage: `url(${layer.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            willChange: "transform",
          }}
        />
      ))}
      {/* Top wash so the navbar and headline read over the sky */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(8,38,92,0.38) 0%, rgba(8,38,92,0.12) 28%, rgba(8,38,92,0) 48%)",
        }}
      />
    </div>
  );
}
