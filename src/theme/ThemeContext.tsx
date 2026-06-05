"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  type ReactNode,
} from "react";

export enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

export interface ThemeColorOption {
  key: string;
  color: string;
  nameEn: string;
  nameAr: string;
}

export const PRIMARY_COLORS: ThemeColorOption[] = [
  { key: "orange", color: "#ea580c", nameEn: "Orange", nameAr: "برتقالي" },
  { key: "blue", color: "#1677ff", nameEn: "Blue", nameAr: "أزرق" },
  { key: "emerald", color: "#059669", nameEn: "Emerald", nameAr: "زمردي" },
  { key: "violet", color: "#7c3aed", nameEn: "Violet", nameAr: "بنفسجي" },
];

interface ThemeContextValue {
  mode: ThemeMode;
  primaryColor: string;
  setMode: (mode: ThemeMode) => void;
  setPrimaryColor: (color: string) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getThemeCookie(): { mode: ThemeMode; primaryColor: string } {
  if (typeof document === "undefined")
    return { mode: ThemeMode.LIGHT, primaryColor: "#ea580c" };
  const match = document.cookie.match(/(?:^|;\s*)theme=([^;]*)/);
  if (match) {
    try {
      const raw = match[1];
      if (!raw) return { mode: ThemeMode.LIGHT, primaryColor: "#ea580c" };
      const parsed = JSON.parse(decodeURIComponent(raw));
      return {
        mode: parsed.mode === ThemeMode.DARK ? ThemeMode.DARK : ThemeMode.LIGHT,
        primaryColor: parsed.primaryColor || "#ea580c",
      };
    } catch {
      return { mode: ThemeMode.LIGHT, primaryColor: "#ea580c" };
    }
  }
  return { mode: ThemeMode.LIGHT, primaryColor: "#ea580c" };
}

function setThemeCookie(mode: ThemeMode, primaryColor: string) {
  const value = JSON.stringify({ mode, primaryColor });
  document.cookie = `theme=${encodeURIComponent(value)};path=/;max-age=${365 * 24 * 60 * 60}`;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(ThemeMode.LIGHT);
  const [primaryColor, setPrimaryColorState] = useState<string>("#ea580c");
  const [mounted, setMounted] = useState(false);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
  }, []);

  const setPrimaryColor = useCallback((color: string) => {
    setPrimaryColorState(color);
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((prev) => (prev === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT));
  }, []);

  useLayoutEffect(() => {
    const saved = getThemeCookie();
    setModeState(saved.mode); // eslint-disable-line react-hooks/set-state-in-effect
    setPrimaryColorState(saved.primaryColor); // eslint-disable-line react-hooks/set-state-in-effect
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setThemeCookie(mode, primaryColor);
    document.documentElement.setAttribute(
      "data-theme",
      mode === ThemeMode.DARK ? "dark" : "light",
    );
    document.documentElement.style.setProperty("--primary-color", primaryColor);
  }, [mode, primaryColor, mounted]);

  return (
    <ThemeContext.Provider
      value={{ mode, primaryColor, setMode, setPrimaryColor, toggleMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
