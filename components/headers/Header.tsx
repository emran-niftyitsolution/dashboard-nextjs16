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
    <div className="px-4 md:px-10 py-4 flex justify-between items-center sticky top-0 z-10 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div>
        <FiMenu
          className="hidden md:block text-2xl cursor-pointer text-gray-700 dark:text-gray-300"
          onClick={toggleCollapsed}
        />
        <FiMenu
          className="block md:hidden text-2xl cursor-pointer text-gray-700 dark:text-gray-300"
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
            <p className="hidden md:block text-sm font-medium text-gray-900 dark:text-gray-100">
              John Doe
            </p>
            <FiChevronDown className="text-sm text-gray-700 dark:text-gray-300" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
