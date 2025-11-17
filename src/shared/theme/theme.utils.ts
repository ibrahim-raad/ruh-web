import { ThemeMode, type ResolvedTheme } from "./theme.types";

export function getSystemMode(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) {
    return ThemeMode.Light;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? ThemeMode.Dark
    : ThemeMode.Light;
}

export function applyTheme(mode: ThemeMode) {
  const resolved = mode === ThemeMode.System ? getSystemMode() : mode;
  document.documentElement.classList.toggle(
    "dark",
    resolved === ThemeMode.Dark
  );
}
