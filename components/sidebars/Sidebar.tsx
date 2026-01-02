"use client";
import { cn } from "@/lib/utils";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Switch } from "antd";
import Sider from "antd/es/layout/Sider";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbBrandReact } from "react-icons/tb";
import { useTheme } from "../providers/ThemeProvider";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "1", icon: <LuLayoutDashboard />, label: "Dashboard" },
  { key: "2", icon: <DesktopOutlined />, label: "Option 2" },
  { key: "3", icon: <ContainerOutlined />, label: "Option 3" },
  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
    children: [
      { key: "5", label: "Option 5" },
      { key: "6", label: "Option 6" },
      { key: "7", label: "Option 7" },
      { key: "8", label: "Option 8" },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      { key: "9", label: "Option 9" },
      { key: "10", label: "Option 10" },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          { key: "11", label: "Option 11" },
          { key: "12", label: "Option 12" },
        ],
      },
    ],
  },
];

type SidebarProps = {
  collapsed: boolean;
  showFooter?: boolean;
  onFooterToggle?: (checked: boolean) => void;
};

const Sidebar = ({
  collapsed = false,
  showFooter = true,
  onFooterToggle,
}: SidebarProps) => {
  const { isDarkMode } = useTheme();

  return (
    <Sider
      collapsed={collapsed}
      theme={isDarkMode ? "dark" : "light"}
      width={222}
      className={cn(
        "flex md:flex-col h-screen transition-colors duration-200",
        isDarkMode ? "bg-gray-900!" : "bg-white!"
      )}
    >
      <div className="flex flex-col h-full">
        <div
          className={cn(
            "p-4 text-center flex gap-2 items-center justify-center border-b transition-colors duration-200",
            isDarkMode ? "border-gray-700" : "border-gray-200"
          )}
        >
          <TbBrandReact
            className={cn(
              "text-2xl",
              isDarkMode ? "text-purple-400" : "text-purple-500"
            )}
          />
          {!collapsed && (
            <p
              className={cn(
                "text-lg font-bold uppercase",
                isDarkMode ? "text-gray-100" : "text-gray-900"
              )}
            >
              Dashify
            </p>
          )}
        </div>

        <div className="flex-1 overflow-hidden overflow-y-auto">
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme={isDarkMode ? "dark" : "light"}
            inlineCollapsed={collapsed}
            items={items}
            style={{ borderRight: "none" }}
          />
        </div>

        {/* Footer Toggle */}
        <div
          className={cn(
            "p-4 border-t transition-colors duration-200",
            isDarkMode ? "border-gray-700" : "border-gray-200"
          )}
        >
          <div className="flex items-center justify-between">
            {!collapsed && (
              <span
                className={cn(
                  "text-sm",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}
              >
                Show Footer
              </span>
            )}
            <Switch
              checked={showFooter}
              onChange={(checked) => onFooterToggle?.(checked)}
              size="small"
            />
          </div>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
