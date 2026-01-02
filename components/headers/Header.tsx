"use client";

import { Avatar, Button, Dropdown, type MenuProps } from "antd";
import { useRouter } from "next/navigation";
import {
  FiChevronDown,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSettings,
  FiSun,
  FiUser,
} from "react-icons/fi";
import { cn } from "../../lib/utils";
import { useTheme } from "../providers/ThemeProvider";

type HeaderProps = {
  toggleCollapsed: () => void;
  openDrawer: () => void;
};

const Header = ({ toggleCollapsed, openDrawer }: HeaderProps) => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      // Clear any auth tokens/session here
      // localStorage.removeItem('token');
      // sessionStorage.clear();

      // Redirect to login
      router.push("/login");
    } else if (key === "profile") {
      router.push("/profile");
    } else if (key === "settings") {
      router.push("/settings");
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: "Profile",
      icon: <FiUser className="text-base" />,
    },
    {
      key: "settings",
      label: "Settings",
      icon: <FiSettings className="text-base" />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
      icon: <FiLogOut className="text-base" />,
      danger: true,
    },
  ];
  return (
    <div
      className={cn(
        "px-4 md:px-10 py-4 flex justify-between items-center sticky top-0 z-10 transition-colors duration-200",
        isDarkMode ? "bg-gray-900 " : "bg-white "
      )}
    >
      <div>
        <FiMenu
          className={cn(
            "hidden md:block text-2xl cursor-pointer",
            isDarkMode ? "text-gray-300" : "text-gray-700"
          )}
          onClick={toggleCollapsed}
        />
        <FiMenu
          className={cn(
            "block md:hidden text-2xl cursor-pointer",
            isDarkMode ? "text-gray-300" : "text-gray-700"
          )}
          onClick={openDrawer}
        />
      </div>

      <div className="flex items-center gap-3">
        {/* Dark Mode Toggle */}
        <Button
          type="text"
          icon={
            isDarkMode ? (
              <FiSun className="text-lg" />
            ) : (
              <FiMoon className="text-lg" />
            )
          }
          onClick={toggleDarkMode}
          className="flex items-center justify-center"
          aria-label="Toggle dark mode"
        />

        {/* Profile Dropdown */}
        <Dropdown
          menu={{ items, onClick: handleMenuClick }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar>A</Avatar>
            <p
              className={cn(
                "hidden md:block text-sm font-medium",
                isDarkMode ? "text-gray-100" : "text-gray-900"
              )}
            >
              John Doe
            </p>
            <FiChevronDown
              className={cn(
                "text-sm",
                isDarkMode ? "text-gray-300" : "text-gray-700"
              )}
            />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
