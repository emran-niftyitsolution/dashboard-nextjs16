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
        "rounded-lg bg-white shadow-sm transition-all duration-200 dark:bg-gray-900",
        !noPadding && "p-6",
        hoverable && "cursor-pointer hover:shadow-md",
        className
      )}
    >
      {(title || extra) && (
        <div className="mb-4 flex items-center justify-between">
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
