"use client";

import { Button, cn, toast } from "@heroui/react";
import { Heart } from "lucide-react";
import type { Product } from "@/data/products";
import { useWishlist } from "@/stores/wishlist";

export type WishlistButtonProps = {
  product: Product;
  className?: string;
};

const WishlistButton = ({ product, className }: WishlistButtonProps) => {
  const toggle = useWishlist((state) => state.toggle);

  const isSaved = useWishlist((state) =>
    state.items.some((item) => item.productId === product.id),
  );

  // Screen readers hear the pressed state, the toast also announces the result
  const onPress = () => {
    toggle(product.id);
    toast(
      isSaved ? "Verwijderd van verlanglijst" : "Toegevoegd aan verlanglijst",
      {
        description: product.name,
      },
    );
  };

  return (
    <Button
      isIconOnly
      size="sm"
      variant="secondary"
      aria-label={`${product.name} op verlanglijst`}
      aria-pressed={isSaved}
      className={className}
      onPress={onPress}
    >
      <Heart aria-hidden className={cn(isSaved && "fill-heart")} />
    </Button>
  );
};

export default WishlistButton;
