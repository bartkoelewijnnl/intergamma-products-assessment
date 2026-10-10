import { cn } from "@heroui/react";
import type { Stock } from "@/data/products";

// Darker than the HeroUI status colors for WCAG AA on white
const stockStyles: Record<Stock, { label: string; text: string }> = {
  "in-stock": { label: "Op voorraad", text: "text-green-700" },
  limited: { label: "Beperkt op voorraad", text: "text-amber-700" },
  online: { label: "Online beschikbaar", text: "text-muted" },
};

export type CardStockProps = {
  stock: Stock;
};

const CardStock = ({ stock }: CardStockProps) => {
  const { label, text } = stockStyles[stock];

  return <p className={cn("text-sm", text)}>{label}</p>;
};

export default CardStock;
