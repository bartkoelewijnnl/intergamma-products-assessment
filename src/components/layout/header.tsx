import WishlistDrawer from "@/components/wishlist/drawer";

const Header = () => {
  return (
    <header className="flex items-center justify-between gap-4 py-6">
      {/* Logo follows later */}
      <div />

      <WishlistDrawer />
    </header>
  );
};

export default Header;
