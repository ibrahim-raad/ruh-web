import { useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { ThemeContext, type ThemeContextValue } from "./theme-context";
import { ThemeMode } from "@/shared/theme/theme.types";
import { applyTheme } from "@/shared/theme/theme.utils";

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved =
      typeof localStorage !== "undefined"
        ? (localStorage.getItem("theme") as ThemeMode | null)
        : null;
    return saved ?? ThemeMode.System;
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (theme === ThemeMode.System) {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = () => applyTheme(ThemeMode.System);
      mql.addEventListener("change", listener);
      return () => mql.removeEventListener("change", listener);
    }
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: (t) => {
        setThemeState(t);
        try {
          localStorage.setItem("theme", t);
        } catch {
          console.error("Failed to set theme in localStorage");
        }
        applyTheme(t);
      },
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
