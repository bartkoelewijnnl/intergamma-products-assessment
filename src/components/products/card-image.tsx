import { cn } from "@heroui/react";
import {
  BrickWall,
  Drill,
  PaintRoller,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
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
  image?: string;
  // Rendered width of the tile, so next/image can pick the right file from its srcset
  sizes: string;
  className?: string;
  classNameIcon?: string;
  children?: ReactNode;
};

// Product photo, or a tinted tile with a category icon for products without one
const CardImage = ({
  category,
  image,
  sizes,
  className,
  classNameIcon,
  children,
}: CardImageProps) => {
  const { icon: Icon, tile } = categoryStyles[category];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-xl transition-theme",
        tile,
        className,
      )}
    >
      {image ? (
        // Empty alt: the product name is right next to the photo, so it would be read twice
        <Image src={image} alt="" fill sizes={sizes} className="object-cover" />
      ) : (
        <Icon
          aria-hidden
          className={cn("size-10", classNameIcon)}
          strokeWidth={1.5}
        />
      )}
      {children}
    </div>
  );
};

export default CardImage;
