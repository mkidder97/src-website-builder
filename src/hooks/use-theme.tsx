import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "navy" | "warm";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "src-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "warm" || stored === "navy") {
        return stored;
      }
    }
    return "navy";
  });

  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === "warm") {
      root.classList.add("theme-warm");
    } else {
      root.classList.remove("theme-warm");
    }
    
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // Sync across tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        if (e.newValue === "warm" || e.newValue === "navy") {
          setThemeState(e.newValue);
        }
      }
    };
    
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "navy" ? "warm" : "navy"));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
