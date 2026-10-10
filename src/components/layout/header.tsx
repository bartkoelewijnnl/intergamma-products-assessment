import WishlistDrawer from "@/components/wishlist/drawer";
import { products } from "@/data/products";
import Logo from "./logo";
import ThemeSwitch from "./theme-switch";

const Header = () => {
  return (
    <header className="flex items-center justify-between gap-2 py-6 sm:gap-4">
      <Logo />

      <div className="flex items-center gap-3 sm:gap-6">
        <ThemeSwitch />
        <WishlistDrawer products={products} />
      </div>
    </header>
  );
};

export default Header;
