import { Avatar, Dropdown, type MenuProps } from "antd";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { cn } from "../../lib/utils";
type HeaderProps = {
  toggleCollapsed: () => void;
  isMobile: boolean;
};

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "4",
    danger: true,
    label: "a danger item",
  },
];

const Header = ({ toggleCollapsed, isMobile }: HeaderProps) => {
  return (
    <div
      className={cn(
        "px-10 py-4 flex justify-between items-center sticky top-0 bg-white z-10",
        {
          "px-4": isMobile,
        }
      )}
    >
      <div>
        <FiMenu className="text-2xl cursor-pointer" onClick={toggleCollapsed} />
      </div>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar>A</Avatar>
          {!isMobile && <p className="text-sm font-medium">John Doe</p>}
          <FiChevronDown className="text-sm" />
        </div>
      </Dropdown>
    </div>
  );
};

export default Header;
