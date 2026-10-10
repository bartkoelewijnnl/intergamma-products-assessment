import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WishlistItem = {
  productId: string;
  quantity: number;
};

type WishlistState = {
  items: WishlistItem[];
  toggle: (productId: string) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set) => ({
      items: [],

      toggle: (productId) =>
        set(({ items }) => ({
          items: items.some((item) => item.productId === productId)
            ? items.filter((item) => item.productId !== productId)
            : [...items, { productId, quantity: 1 }],
        })),

      remove: (productId) =>
        set(({ items }) => ({
          items: items.filter((item) => item.productId !== productId),
        })),

      setQuantity: (productId, quantity) =>
        set(({ items }) => ({
          items: items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item,
          ),
        })),
    }),
    {
      name: "wishlist",
      partialize: ({ items }) => ({ items }),
      // Load from localStorage after hydration, so the first client render matches the server
      skipHydration: true,
    },
  ),
);
