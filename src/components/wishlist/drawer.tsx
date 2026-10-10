"use client";

import { Badge, Button, Drawer } from "@heroui/react";
import { Heart } from "lucide-react";
import { useEffect } from "react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useWishlist } from "@/stores/wishlist";
import DrawerItem from "./drawer-item";

const pluralize = (count: number) =>
  `${count} ${count === 1 ? "product" : "producten"}`;

export type WishlistDrawerProps = {
  // Passed in by the server, so this client component doesn't import the product data itself
  products: Product[];
};

const WishlistDrawer = ({ products }: WishlistDrawerProps) => {
  const items = useWishlist((state) => state.items);

  // The header is on every page, so the stored wishlist is loaded here once
  useEffect(() => {
    useWishlist.persist.rehydrate();
  }, []);

  // Skip items whose product no longer exists
  const entries = items.flatMap((item) => {
    const product = products.find(({ id }) => id === item.productId);
    return product ? [{ ...item, product }] : [];
  });

  // Counts products, not quantities: the badge says how many products are saved
  const count = entries.length;
  const total = entries.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0,
  );

  return (
    <Drawer>
      <Badge.Anchor>
        <Button
          isIconOnly
          variant="secondary"
          aria-label={`Verlanglijst, ${pluralize(count)}`}
        >
          <Heart aria-hidden />
        </Button>
        {count > 0 && (
          <Badge
            color="warning"
            placement="top-right"
            size="sm"
            variant="primary"
            aria-hidden
          >
            {count}
          </Badge>
        )}
      </Badge.Anchor>

      <Drawer.Backdrop>
        <Drawer.Content placement="right">
          <Drawer.Dialog className="w-full max-w-md gap-6">
            <Drawer.CloseTrigger
              aria-label="Sluiten"
              className="end-6 top-6 size-12 rounded-md border border-border bg-surface text-foreground transition-theme"
            />

            <Drawer.Header className="gap-1 pe-16">
              <Drawer.Heading className="text-2xl font-bold text-accent">
                Verlanglijst
              </Drawer.Heading>
              <p className="text-sm text-muted">{pluralize(count)} bewaard</p>
            </Drawer.Header>

            <Drawer.Body>
              {count === 0 ? (
                <p>
                  Je verlanglijst is nog leeg. Klik op het hartje bij een
                  product om het te bewaren.
                </p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {entries.map(({ product, quantity }) => (
                    <DrawerItem
                      key={product.id}
                      product={product}
                      quantity={quantity}
                    />
                  ))}
                </ul>
              )}
            </Drawer.Body>

            <Drawer.Footer className="flex-col items-stretch gap-4 border-t border-separator pt-6">
              {count > 0 && (
                <p className="flex items-baseline justify-between">
                  <span>Totaal</span>
                  <span className="text-2xl font-bold text-accent">
                    {formatPrice(total)}
                  </span>
                </p>
              )}
              {/* slot="close" lets the dialog close itself, like the close trigger */}
              <Button fullWidth slot="close">
                Sluiten
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
};

export default WishlistDrawer;
