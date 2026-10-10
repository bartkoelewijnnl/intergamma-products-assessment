import { Button } from "@heroui/react";
import { Heart } from "lucide-react";

const Products = ({}: PageProps<"/">) => {
  return (
    <div className="flex gap-4">
      <Button variant="secondary">Inloggen</Button>
      <Button isIconOnly variant="secondary" aria-label="Verlanglijst">
        <Heart />
      </Button>
    </div>
  );
};

export default Products;
