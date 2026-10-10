import Container from "@/components/layout/container";
import Hero from "@/components/layout/hero";
import ProductTabs from "@/components/products/tabs";
import { products } from "@/data/products";

const HomePage = () => {
  return (
    <ProductTabs>
      {/* Extra bottom padding so the products panel can overlap the blue */}
      <div className="bg-accent pb-24 focus-on-brand transition-theme lg:pb-32">
        <Container>
          <Hero
            title="Alles voor je klus, van eerste schroef tot laatste laag verf"
            description="Gereedschap, materialen en advies onder één dak. Bewaar wat je nodig hebt op je verlanglijst en haal het op in de winkel."
            image="/images/hero-werkplaats.jpg"
          >
            <ProductTabs.List />
          </Hero>
        </Container>
      </div>
      <Container className="-mt-14 pb-8 lg:-mt-16">
        <div className="rounded-2xl bg-surface p-4 transition-theme sm:p-6">
          <ProductTabs.Panels products={products} />
        </div>
      </Container>
    </ProductTabs>
  );
};

export default HomePage;
