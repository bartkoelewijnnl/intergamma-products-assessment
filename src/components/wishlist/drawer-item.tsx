"use client";

import { Button, NumberField, toast } from "@heroui/react";
import { Trash2 } from "lucide-react";
import CardImage from "@/components/products/card-image";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useWishlist } from "@/stores/wishlist";

export type DrawerItemProps = {
  product: Product;
  quantity: number;
};

const DrawerItem = ({ product, quantity }: DrawerItemProps) => {
  const remove = useWishlist((state) => state.remove);
  const setQuantity = useWishlist((state) => state.setQuantity);

  const onRemove = () => {
    remove(product.id);
    toast("Verwijderd van verlanglijst", { description: product.name });
  };

  const onQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(product.id, value);
    }
  };

  return (
    <li className="flex gap-4 rounded-xl bg-background p-3 transition-theme">
      <CardImage
        category={product.category}
        className="size-20 shrink-0"
        classNameIcon="size-7"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="font-bold hyphens-auto text-accent">{product.name}</p>
        <p className="text-sm text-muted">
          {formatPrice(product.price)} per stuk
        </p>

        <div className="flex items-center justify-between gap-2">
          <NumberField
            aria-label={`Aantal ${product.name}`}
            value={quantity}
            minValue={1}
            maxValue={99}
            onChange={onQuantityChange}
          >
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input className="w-10" />
              <NumberField.IncrementButton />
            </NumberField.Group>
          </NumberField>
          <p className="font-bold text-accent">
            {formatPrice(product.price * quantity)}
          </p>
        </div>
      </div>

      <Button
        isIconOnly
        size="sm"
        variant="secondary"
        aria-label={`${product.name} verwijderen`}
        onPress={onRemove}
      >
        <Trash2 aria-hidden />
      </Button>
    </li>
  );
};

export default DrawerItem;
