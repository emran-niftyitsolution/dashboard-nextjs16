"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "../providers/ThemeProvider";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDarkMode } = useTheme();

  return (
    <div
      className={cn(
        "px-10 py-3 flex justify-between items-center sticky bottom-0 z-10 transition-colors duration-200",
        isDarkMode ? "bg-gray-900 " : "bg-white "
      )}
    >
      <div>
        <p
          className={cn(
            "text-xs md:text-sm",
            isDarkMode ? "text-gray-400" : "text-gray-500"
          )}
        >
          © {currentYear} Dashboard. All rights reserved.
        </p>
      </div>
      <div>
        <p
          className={cn(
            "text-xs md:text-sm",
            isDarkMode ? "text-gray-400" : "text-gray-500"
          )}
        >
          Powered by{" "}
          <span className={isDarkMode ? "text-blue-400" : "text-blue-500"}>
            Emran
          </span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
