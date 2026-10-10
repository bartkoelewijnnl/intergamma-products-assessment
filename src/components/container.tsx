import { cn } from "@heroui/react";
import type { PropsWithChildren } from "react";

export type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("mx-auto max-w-360 px-4 sm:px-8", className)}>
      {children}
    </div>
  );
};

export default Container;
