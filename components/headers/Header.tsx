"use client";

import { Avatar, Dropdown, type MenuProps } from "antd";
import { useRouter } from "next/navigation";
import {
  FiChevronDown,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { cn } from "../../lib/utils";

type HeaderProps = {
  toggleCollapsed: () => void;
  openDrawer: () => void;
};

const Header = ({ toggleCollapsed, openDrawer }: HeaderProps) => {
  const router = useRouter();

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
        "px-4  md:px-10 py-4 flex justify-between items-center sticky top-0 bg-white z-10"
      )}
    >
      <div>
        <FiMenu
          className="hidden md:block text-2xl cursor-pointer"
          onClick={toggleCollapsed}
        />
        <FiMenu
          className="block md:hidden text-2xl cursor-pointer"
          onClick={openDrawer}
        />
      </div>
      <Dropdown
        menu={{ items, onClick: handleMenuClick }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar>A</Avatar>
          <p className="hidden md:block text-sm font-medium">John Doe</p>
          <FiChevronDown className="text-sm" />
        </div>
      </Dropdown>
    </div>
  );
};

export default Header;
