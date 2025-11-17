import { createContext, useContext } from "react";
import type { ThemeMode } from "@/shared/theme/theme.types";

export type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
