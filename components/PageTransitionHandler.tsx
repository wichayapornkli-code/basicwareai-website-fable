"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

export default function PageTransitionHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const pendingResolve = useRef<(() => void) | null>(null);

  // Fires synchronously after React commits the new DOM — resolves the pending transition
  useLayoutEffect(() => {
    if (pendingResolve.current) {
      pendingResolve.current();
      pendingResolve.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href") ?? "";
      if (!href || href.startsWith("#") || /^(mailto|tel|javascript):/.test(href)) return;

      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return;
      } catch {
        return;
      }

      if (!("startViewTransition" in document)) return;

      e.preventDefault();
      e.stopPropagation();

      (document as Document & {
        startViewTransition(cb: () => Promise<void>): void;
      }).startViewTransition(async () => {
        await new Promise<void>((resolve) => {
          pendingResolve.current = resolve;
          router.push(href);
        });
      });
    };

    // Capture phase: fires before Next.js's <Link> onClick, so we can intercept first
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [router]);

  return null;
}
