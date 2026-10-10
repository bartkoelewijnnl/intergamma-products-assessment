import { Card, Chip } from "@heroui/react";
import type { Product } from "@/data/products";
import WishlistButton from "@/components/wishlist/button";
import CardImage from "./card-image";
import CardPrice from "./card-price";
import CardStock from "./card-stock";

export type ProductCardProps = {
  product: Product;
};

// Card width per grid breakpoint in products.tsx, fixed from xl because the container stops growing
const imageSizes =
  "(min-width: 1280px) 260px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 360px) 50vw, 100vw";

const ProductCard = ({
  product,
  product: { name, category, image, price, originalPrice, stock, isNew },
}: ProductCardProps) => {
  const isOnSale = originalPrice !== undefined;

  return (
    <Card variant="transparent" className="w-full gap-3 p-0">
      <CardImage
        category={category}
        image={image}
        sizes={imageSizes}
        className="aspect-4/3"
      >
        {(isOnSale || isNew) && (
          <Chip
            color={isOnSale ? "warning" : "accent"}
            size="sm"
            variant="primary"
            className="absolute top-2 left-2"
          >
            {isOnSale ? "Aanbieding" : "Nieuw"}
          </Chip>
        )}
        <WishlistButton product={product} className="absolute top-2 right-2" />
      </CardImage>

      <Card.Header>
        <Card.Title className="text-base/snug font-bold hyphens-auto text-accent">
          {name}
        </Card.Title>
      </Card.Header>

      <Card.Footer className="mt-auto flex-wrap gap-x-2 gap-y-1">
        <CardPrice price={price} originalPrice={originalPrice} />
        <CardStock stock={stock} />
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
