"use client";

import { useEffect, useState } from "react";

export function useBreakpoint() {
  // Keep the first client render aligned with SSR to avoid hydration mismatches.
  const [w, setW] = useState(1200);

  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    fn();
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, []);

  return { isMobile: w < 768, isTablet: w < 1024 };
}
