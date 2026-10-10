import Image from "next/image";

export type HeroProps = {
  title: string;
  description: string;
  image: string;
};

const Hero = ({ title, description, image }: HeroProps) => {
  return (
    <section className="page-grid pt-6 text-accent-foreground lg:pt-14">
      <div className="flex flex-col gap-4 lg:col-span-6 lg:gap-6">
        <h1 className="text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="max-w-xl text-base/relaxed text-accent-foreground/85">
          {description}
        </p>
      </div>
      {/* Hidden on small screens, where it would push the products out of view */}
      <div className="relative hidden aspect-3/2 overflow-hidden rounded-xl transition-theme lg:col-span-5 lg:col-start-8 lg:block">
        {/* Empty alt: a mood photo that adds no information.
            Preloaded because it is the largest element above the fold on desktop.
            The preload ignores display: none, so the 40vw keeps it to a small file on mobile. */}
        <Image
          src={image}
          alt=""
          fill
          preload
          sizes="(min-width: 1440px) 560px, 40vw"
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
