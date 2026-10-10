import Container from "@/components/layout/container";
import Hero from "@/components/layout/hero";
import Products from "@/components/products/products";
import { products } from "@/data/products";

const HomePage = ({}: PageProps<"/">) => {
  return (
    <>
      {/* Extra bottom padding so the products panel can overlap the blue */}
      <div className="bg-accent pb-24 transition-theme lg:pb-32">
        <Container>
          <Hero
            title="Alles voor je klus, van eerste schroef tot laatste laag verf"
            description="Gereedschap, materialen en advies onder één dak. Bewaar wat je nodig hebt op je verlanglijst en haal het op in de winkel."
          />
        </Container>
      </div>
      <Container className="-mt-14 pb-8 lg:-mt-16">
        <div className="rounded-2xl bg-surface p-4 transition-theme sm:p-6">
          <Products title="Populair deze week" products={products} />
        </div>
      </Container>
    </>
  );
};

export default HomePage;
