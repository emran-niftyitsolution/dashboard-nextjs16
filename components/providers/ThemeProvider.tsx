"use client";

import { ConfigProvider, theme } from "antd";
import { createContext, useContext, useEffect, useState } from "react";

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
  // Initialize state with a function to safely read from localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return savedTheme === "dark" || (!savedTheme && prefersDark);
  });
  const [mounted, setMounted] = useState(false);

  // Set mounted flag after mount to prevent hydration mismatch
  // This is necessary for Next.js SSR compatibility
  useEffect(() => {
    // This setState is intentional to prevent hydration mismatch
    // Disable ESLint rule for this legitimate use case
    /* eslint-disable-next-line */
    setMounted(true);
  }, []);

  // Apply dark mode class to document when isDarkMode changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

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
          components: {
            Input: {
              colorBgContainer: isDarkMode ? "#1f2937" : "#ffffff",
              colorBorder: isDarkMode ? "#374151" : "#d9d9d9",
            },
            InputNumber: {
              colorBgContainer: isDarkMode ? "#1f2937" : "#ffffff",
              colorBorder: isDarkMode ? "#374151" : "#d9d9d9",
            },
            Select: {
              colorBgContainer: isDarkMode ? "#1f2937" : "#ffffff",
              colorBorder: isDarkMode ? "#374151" : "#d9d9d9",
            },
            DatePicker: {
              colorBgContainer: isDarkMode ? "#1f2937" : "#ffffff",
              colorBorder: isDarkMode ? "#374151" : "#d9d9d9",
            },
            Mentions: {
              colorBgContainer: isDarkMode ? "#1f2937" : "#ffffff",
              colorBorder: isDarkMode ? "#374151" : "#d9d9d9",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
