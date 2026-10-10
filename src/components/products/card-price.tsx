import { cn } from "@heroui/react";
import { formatPrice } from "@/lib/format";

export type CardPriceProps = {
  price: number;
  originalPrice?: number;
  className?: string;
};

const CardPrice = ({ price, originalPrice, className }: CardPriceProps) => {
  const isOnSale = originalPrice !== undefined;

  return (
    <p className={cn("flex items-baseline gap-2", className)}>
      <span className="text-xl font-bold text-accent">
        {isOnSale && <span className="sr-only">Nu </span>}
        {formatPrice(price)}
      </span>
      {isOnSale && (
        <del className="text-sm text-muted">
          <span className="sr-only">Was </span>
          {formatPrice(originalPrice)}
        </del>
      )}
    </p>
  );
};

export default CardPrice;
