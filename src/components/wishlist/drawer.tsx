"use client";

import { Badge, Button, Drawer } from "@heroui/react";
import { Heart } from "lucide-react";
import { useEffect } from "react";
import { useWishlist } from "@/stores/wishlist";

const WishlistDrawer = () => {
  const count = useWishlist((state) => state.items.length);

  // The header is on every page, so the stored wishlist is loaded here once
  useEffect(() => {
    useWishlist.persist.rehydrate();
  }, []);

  return (
    <Drawer>
      <Badge.Anchor>
        <Button
          isIconOnly
          variant="secondary"
          aria-label={`Verlanglijst, ${count} ${count === 1 ? "product" : "producten"}`}
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
          <Drawer.Dialog className="w-full max-w-md">
            <Drawer.CloseTrigger aria-label="Sluiten" />
            <Drawer.Header>
              <Drawer.Heading>Verlanglijst</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body />
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
};

export default WishlistDrawer;
