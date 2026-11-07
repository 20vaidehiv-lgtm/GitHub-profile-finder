import { useEffect, useState } from "react";

const STORAGE_KEY = "gpf-theme";

function applyTheme(theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("light", theme === "light");
}

export function useTheme() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    let stored = "dark";
    try {
      stored = localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
    } catch {
      stored = "dark";
    }
    setTheme(stored);
    applyTheme(stored);
  }, []);

  const toggle = () => {
    setTheme((current) => {
      const next = current === "light" ? "dark" : "light";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable — theme still applies for this session */
      }
      applyTheme(next);
      return next;
    });
  };

  return { theme, toggle };
}