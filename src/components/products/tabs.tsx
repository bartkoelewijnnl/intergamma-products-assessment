import { Tabs } from "@heroui/react";
import type { PropsWithChildren } from "react";
import { categoryLabels, type Category, type Product } from "@/data/products";
import Products from "./products";

type ProductTab = {
  id: string;
  label: string;
  title: string;
  filter: (product: Product) => boolean;
};

// One tab per category, plus all products and the ones on sale
const productTabs: ProductTab[] = [
  {
    id: "all",
    label: "Alles",
    title: "Populair deze week",
    filter: () => true,
  },
  ...(Object.keys(categoryLabels) as Category[]).map((category) => ({
    id: category,
    label: categoryLabels[category],
    title: categoryLabels[category],
    filter: (product: Product) => product.category === category,
  })),
  {
    id: "sale",
    label: "Aanbiedingen",
    title: "Aanbiedingen",
    filter: (product) => product.originalPrice !== undefined,
  },
];

// Server Components: every panel is rendered on the server,
// the HeroUI Tabs only switch between them in the browser.
// The list and panels can sit anywhere inside the root, like the list in the hero.
const ProductTabsRoot = ({ children }: PropsWithChildren) => {
  return (
    <Tabs defaultSelectedKey="all" className="gap-0">
      {children}
    </Tabs>
  );
};

// Styled for the brand-colored hero: white text, white pill for the selected tab
// and a white focus ring with a brand-colored gap, because the default focus blue is too dark
// on the brand color and a plain white ring would disappear against the selected pill.
// *:text-accent-foreground colors the scroll arrows that appear when the tabs don't fit.
const ProductTabsList = () => {
  return (
    <Tabs.ListContainer className="mt-2 w-fit max-w-full rounded-lg bg-accent-foreground/15 *:text-accent-foreground lg:mt-4">
      <Tabs.List aria-label="Categorieën">
        {productTabs.map(({ id, label }) => (
          <Tabs.Tab
            key={id}
            id={id}
            className="h-10 rounded-md text-base font-bold text-accent-foreground data-focus-visible:ring-accent-foreground data-focus-visible:ring-offset-2 data-focus-visible:ring-offset-accent data-selected:text-accent"
          >
            {label}
            <Tabs.Indicator className="rounded-md bg-accent-foreground" />
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs.ListContainer>
  );
};

export type ProductTabsPanelsProps = {
  products: Product[];
};

const ProductTabsPanels = ({ products }: ProductTabsPanelsProps) => {
  return productTabs.map(({ id, title, filter }) => (
    <Tabs.Panel key={id} id={id} className="mt-0 p-0">
      <Products title={title} products={products.filter(filter)} />
    </Tabs.Panel>
  ));
};

const ProductTabs = Object.assign(ProductTabsRoot, {
  List: ProductTabsList,
  Panels: ProductTabsPanels,
});

export default ProductTabs;
