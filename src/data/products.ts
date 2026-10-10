import productsJson from "./products.json";

export type Category = "tools" | "paint" | "flooring" | "garden";

export type Stock = "in-stock" | "limited" | "online";

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  stock: Stock;
  isNew?: boolean;
};

// Fake products until there is an API. The cast narrows the JSON strings to the unions above.
export const products = productsJson as Product[];
