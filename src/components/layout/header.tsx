import WishlistDrawer from "@/components/wishlist/drawer";
import ThemeSwitch from "./theme-switch";

const Header = () => {
  return (
    <header className="flex items-center justify-between gap-4 py-6">
      {/* Logo follows later */}
      <div />

      <div className="flex items-center gap-6">
        <ThemeSwitch />
        <WishlistDrawer />
      </div>
    </header>
  );
};

export default Header;
