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
            // Form Inputs
            Input: {
              colorBgContainer: isDarkMode ? "#1f2937" : "#ffffff",
              colorBorder: isDarkMode ? "#374151" : "#d9d9d9",
              colorText: isDarkMode ? "#f3f4f6" : "#111827",
              colorTextPlaceholder: isDarkMode ? "#6b7280" : "#9ca3af",
            },
            InputNumber: {
              colorBgContainer: isDarkMode ? "#1f2937" : "#ffffff",
              colorBorder: isDarkMode ? "#374151" : "#d9d9d9",
              colorText: isDarkMode ? "#f3f4f6" : "#111827",
            },
            Select: {
              colorBgContainer: isDarkMode ? "#1f2937" : "#ffffff",
              colorBorder: isDarkMode ? "#374151" : "#d9d9d9",
              colorText: isDarkMode ? "#f3f4f6" : "#111827",
            },
            DatePicker: {
              colorBgContainer: isDarkMode ? "#1f2937" : "#ffffff",
              colorBorder: isDarkMode ? "#374151" : "#d9d9d9",
              colorText: isDarkMode ? "#f3f4f6" : "#111827",
            },
            Mentions: {
              colorBgContainer: isDarkMode ? "#1f2937" : "#ffffff",
              colorBorder: isDarkMode ? "#374151" : "#d9d9d9",
              colorText: isDarkMode ? "#f3f4f6" : "#111827",
            },
            // Table - Important for dashboard
            Table: {
              colorBgContainer: isDarkMode ? "#111827" : "#ffffff",
              colorTextHeading: isDarkMode ? "#f3f4f6" : "#111827",
              colorText: isDarkMode ? "#e5e7eb" : "#374151",
              borderColor: isDarkMode ? "#374151" : "#e5e7eb",
              colorFillSecondary: isDarkMode ? "#1f2937" : "#f9fafb",
              colorFillAlter: isDarkMode ? "#1f2937" : "#f9fafb",
            },
            // Menu - Used in Sidebar
            Menu: {
              colorBgContainer: isDarkMode ? "#111827" : "#ffffff",
              colorText: isDarkMode ? "#e5e7eb" : "#111827",
              colorItemBg: isDarkMode ? "#111827" : "#ffffff",
              colorItemText: isDarkMode ? "#e5e7eb" : "#111827",
              colorItemTextHover: isDarkMode ? "#ffffff" : "#111827",
              colorItemBgHover: isDarkMode ? "#374151" : "#f3f4f6",
              colorItemBgActive: isDarkMode ? "#3b82f6" : "#3b82f6",
              colorItemTextSelected: isDarkMode ? "#ffffff" : "#ffffff",
            },
            // Button
            Button: {
              colorBgContainer: isDarkMode ? "#1f2937" : "#ffffff",
              colorBorder: isDarkMode ? "#374151" : "#d9d9d9",
              colorText: isDarkMode ? "#f3f4f6" : "#111827",
            },
            // Form
            Form: {
              colorText: isDarkMode ? "#e5e7eb" : "#111827",
              colorTextLabel: isDarkMode ? "#d1d5db" : "#374151",
            },
            // Drawer
            Drawer: {
              colorBgElevated: isDarkMode ? "#111827" : "#ffffff",
              colorText: isDarkMode ? "#e5e7eb" : "#111827",
              colorBorder: isDarkMode ? "#374151" : "#e5e7eb",
            },
            // Badge
            Badge: {
              colorError: isDarkMode ? "#ef4444" : "#dc2626",
              colorSuccess: isDarkMode ? "#10b981" : "#059669",
              colorWarning: isDarkMode ? "#f59e0b" : "#d97706",
              colorInfo: isDarkMode ? "#3b82f6" : "#2563eb",
            },
            // Tag
            Tag: {
              colorBgContainer: isDarkMode ? "#1f2937" : "#f3f4f6",
              colorText: isDarkMode ? "#e5e7eb" : "#374151",
              colorBorder: isDarkMode ? "#374151" : "#d1d5db",
            },
            // Progress
            Progress: {
              colorText: isDarkMode ? "#e5e7eb" : "#374151",
              remainingColor: isDarkMode ? "#374151" : "#e5e7eb",
            },
            // Switch
            Switch: {
              colorPrimary: isDarkMode ? "#3b82f6" : "#3b82f6",
              colorPrimaryHover: isDarkMode ? "#2563eb" : "#2563eb",
            },
            // Avatar
            Avatar: {
              colorBgContainer: isDarkMode ? "#374151" : "#e5e7eb",
              colorText: isDarkMode ? "#ffffff" : "#111827",
            },
            // Dropdown
            Dropdown: {
              colorBgElevated: isDarkMode ? "#1f2937" : "#ffffff",
              colorText: isDarkMode ? "#e5e7eb" : "#111827",
              colorBorder: isDarkMode ? "#374151" : "#e5e7eb",
            },
            // Upload
            Upload: {
              colorBgContainer: isDarkMode ? "#1f2937" : "#ffffff",
              colorBorder: isDarkMode ? "#374151" : "#d9d9d9",
              colorText: isDarkMode ? "#e5e7eb" : "#111827",
            },
            // Card
            Card: {
              colorBgContainer: isDarkMode ? "#111827" : "#ffffff",
              colorTextHeading: isDarkMode ? "#f3f4f6" : "#111827",
              colorText: isDarkMode ? "#e5e7eb" : "#374151",
              colorBorderSecondary: isDarkMode ? "#374151" : "#e5e7eb",
            },
            // Spin
            Spin: {
              colorPrimary: isDarkMode ? "#3b82f6" : "#3b82f6",
            },
            // Divider
            Divider: {
              colorSplit: isDarkMode ? "#374151" : "#e5e7eb",
            },
            // Result
            Result: {
              colorTextHeading: isDarkMode ? "#f3f4f6" : "#111827",
              colorText: isDarkMode ? "#d1d5db" : "#6b7280",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
