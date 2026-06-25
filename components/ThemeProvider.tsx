"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

interface ThemeCtx {
  isDark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeCtx>({ isDark: false, toggle: () => {} });

const THEME_COOKIE = "bw-theme";
const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function persistTheme(next: boolean) {
  document.documentElement.classList.toggle("dark", next);
  document.documentElement.style.colorScheme = next ? "dark" : "light";
  localStorage.setItem(THEME_COOKIE, next ? "dark" : "light");
  document.cookie = `${THEME_COOKIE}=${next ? "dark" : "light"}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; samesite=lax`;
}

export function ThemeProvider({
  children,
  initialIsDark = false,
}: {
  children: React.ReactNode;
  initialIsDark?: boolean;
}) {
  const [isDark, setIsDark] = useState(initialIsDark);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_COOKIE);
    const next = saved === null
      ? document.documentElement.classList.contains("dark")
      : saved === "dark";

    setIsDark(next);
    persistTheme(next);
  }, []);

  const toggle = useCallback(() => {
    setIsDark((d) => {
      const next = !d;
      persistTheme(next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useDark() {
  return useContext(ThemeContext);
}
