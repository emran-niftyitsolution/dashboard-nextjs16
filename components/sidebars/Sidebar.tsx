"use client";
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
  return (
    <Sider
      collapsed={collapsed}
      theme="light"
      width={222}
      className="flex md:flex-col h-screen"
    >
      <div className="flex flex-col h-full">
        <div className="p-4 text-center">
          <p className="text-lg font-medium">My Admin</p>
        </div>

        <div className="flex-1 overflow-hidden overflow-y-auto">
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="light"
            inlineCollapsed={collapsed}
            items={items}
            style={{ borderRight: "none" }}
          />
        </div>

        {/* Footer Toggle */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <span className="text-sm text-gray-600">Show Footer</span>
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
