import { cn } from "@heroui/react";
import {
  BrickWall,
  Drill,
  PaintRoller,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import type { Category } from "@/data/products";

const categoryStyles: Record<Category, { icon: LucideIcon; tile: string }> = {
  tools: { icon: Drill, tile: "bg-blue-100 text-blue-700" },
  paint: { icon: PaintRoller, tile: "bg-orange-100 text-orange-700" },
  flooring: { icon: BrickWall, tile: "bg-stone-200 text-stone-700" },
  garden: { icon: Sprout, tile: "bg-green-100 text-green-700" },
};

export type CardImageProps = {
  category: Category;
  className?: string;
  children?: ReactNode;
};

// Placeholder until there are product photos: a tinted tile with a category icon
const CardImage = ({ category, className, children }: CardImageProps) => {
  const { icon: Icon, tile } = categoryStyles[category];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-xl",
        tile,
        className,
      )}
    >
      <Icon aria-hidden className="size-10" strokeWidth={1.5} />
      {children}
    </div>
  );
};

export default CardImage;
