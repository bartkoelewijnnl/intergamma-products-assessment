import { Button } from "@heroui/react";
import { Heart } from "lucide-react";

// Shown in the drawer while nothing is saved yet
const DrawerEmpty = () => {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-background px-6 py-8 text-center transition-theme">
      <div className="mb-1 flex size-16 items-center justify-center rounded-full border-2 border-dashed border-accent/40 text-accent">
        <Heart aria-hidden className="size-7" />
      </div>
      <h3 className="text-lg font-bold text-accent">
        Je verlanglijst is nog leeg
      </h3>
      <p className="text-sm/relaxed text-foreground">
        Zie je iets wat je later wilt kopen of vergelijken? Klik op het hartje
        bij een product, dan staat het hier voor je klaar.
      </p>
      {/* slot="close" lets the dialog close itself, like the close trigger */}
      <Button slot="close" className="mt-2">
        Verder winkelen
      </Button>
    </div>
  );
};

export default DrawerEmpty;
