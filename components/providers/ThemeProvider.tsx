"use client";

import { ConfigProvider, theme } from "antd";
import { createContext, useContext, useEffect, useState } from "react";
import { getFromLocalStorage, setToLocalStorage } from "../../lib/utils";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load dark mode preference from localStorage after mount
  useEffect(() => {
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Determine if dark mode should be enabled
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldBeDark);
    setMounted(true);

    // Apply to document for Tailwind dark mode
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    // Store theme preference (using 'theme' key as per Tailwind docs)
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");

    // Toggle dark class for Tailwind
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: "#3b82f6",
            borderRadius: 8,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

