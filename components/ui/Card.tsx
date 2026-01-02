import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
  extra?: ReactNode;
  hoverable?: boolean;
  noPadding?: boolean;
}

const Card = ({
  children,
  className,
  title,
  extra,
  hoverable = false,
  noPadding = false,
}: CardProps) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-900 rounded-lg shadow-sm transition-all duration-200",
        !noPadding && "p-6",
        hoverable && "hover:shadow-md cursor-pointer",
        className
      )}
    >
      {(title || extra) && (
        <div className="flex items-center justify-between mb-4">
          {title && (
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </div>
          )}
          {extra && <div>{extra}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
