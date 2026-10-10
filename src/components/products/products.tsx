import type { Product } from "@/data/products";
import ProductCard from "./card";

export type ProductsProps = {
  title: string;
  products: Product[];
};

const Products = ({ title, products }: ProductsProps) => {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-accent">{title}</h2>
      <ul className="grid grid-cols-1 gap-x-4 gap-y-8 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <li key={product.id} className="flex">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Products;
