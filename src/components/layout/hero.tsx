export type HeroProps = {
  title: string;
  description: string;
};

const Hero = ({ title, description }: HeroProps) => {
  return (
    <section className="page-grid pt-6 text-accent-foreground lg:pt-14">
      <h1 className="text-4xl leading-tight font-bold text-balance sm:text-5xl lg:col-span-6 lg:text-6xl">
        {title}
      </h1>
      <p className="text-base/relaxed text-accent-foreground/85 lg:col-span-4 lg:col-start-9 lg:pt-2">
        {description}
      </p>
    </section>
  );
};

export default Hero;
