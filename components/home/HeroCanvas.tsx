"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useDark } from "@/components/ThemeProvider";

const VERT = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

// Flowing aurora gradient: domain-warped fbm drives a ramp between the page
// background and the two brand colors. uDark crossfades light/dark palettes.
const FRAG = /* glsl */ `
  precision highp float;

  uniform vec2  uRes;
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uDark;
  uniform float uScroll;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.05;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uRes.xy;
    vec2 p = uv;
    p.x *= uRes.x / uRes.y;

    float t = uTime * 0.06;
    vec2 drift = uMouse * 0.18;

    // Domain warp
    vec2 q = vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t * 0.7 + 5.2));
    vec2 r = vec2(
      fbm(p * 1.4 + q * 1.6 + drift + vec2(1.7, 9.2) + t * 0.6),
      fbm(p * 1.4 + q * 1.6 - drift + vec2(8.3, 2.8) - t * 0.4)
    );
    float f = fbm(p * 1.4 + r * 1.8);

    // Light palette: warm paper -> electric blue -> soft teal
    vec3 lBg   = vec3(0.980, 0.980, 0.973);
    vec3 lBlue = vec3(0.004, 0.353, 0.776);
    vec3 lTeal = vec3(0.000, 0.875, 0.937);

    // Dark palette: near-black -> deep blue -> glowing teal
    vec3 dBg   = vec3(0.039, 0.039, 0.043);
    vec3 dBlue = vec3(0.020, 0.180, 0.450);
    vec3 dTeal = vec3(0.000, 0.560, 0.640);

    vec3 bg   = mix(lBg,   dBg,   uDark);
    vec3 blue = mix(lBlue, dBlue, uDark);
    vec3 teal = mix(lTeal, dTeal, uDark);

    float blueAmt = smoothstep(0.30, 0.78, f) * (0.85 - 0.25 * uDark);
    float tealAmt = smoothstep(0.55, 0.95, length(r)) * 0.45;

    vec3 col = bg;
    col = mix(col, blue, blueAmt);
    col = mix(col, teal, tealAmt * smoothstep(0.4, 0.9, f));

    // Vertical wash keeps the top airy so the navbar/headline read clearly
    float wash = smoothstep(0.15, 0.95, uv.y);
    col = mix(col, bg, wash * (0.72 - 0.2 * uDark));

    // Scroll fades the field out as the hero leaves
    col = mix(col, bg, uScroll * 0.85);

    // Subtle vignette
    float vig = smoothstep(1.35, 0.45, length(uv - 0.5));
    col = mix(bg, col, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const darkUniform = useRef({ value: 0 });
  const { isDark } = useDark();

  // Smoothly crossfade palettes on theme change
  useEffect(() => {
    const start = darkUniform.current.value;
    const target = isDark ? 1 : 0;
    if (start === target) return;
    const t0 = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const k = Math.min((now - t0) / 600, 1);
      darkUniform.current.value = start + (target - start) * (1 - Math.pow(1 - k, 3));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isDark]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Probe WebGL support before letting three.js construct (and throw)
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") || probe.getContext("webgl");
    if (!gl) {
      mount.classList.add("bw-hero-fallback");
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "high-performance" });
    } catch {
      mount.classList.add("bw-hero-fallback");
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uRes: { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uDark: darkUniform.current,
      uScroll: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    const targetMouse = new THREE.Vector2(0, 0);
    const onMouse = (e: MouseEvent) => {
      targetMouse.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const onScroll = () => {
      uniforms.uScroll.value = Math.min(window.scrollY / window.innerHeight, 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      uniforms.uRes.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
    };
    onResize();
    window.addEventListener("resize", onResize);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(mount);

    const clock = new THREE.Clock();
    let raf: number;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uMouse.value.lerp(targetMouse, 0.04);
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: "absolute", inset: 0 }} aria-hidden />;
}
