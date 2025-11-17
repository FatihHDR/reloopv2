import { Button } from "./button";
import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "../cta-section-with-gallery";

const IMAGES = [
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop",
];

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-accent/10">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-16">
          <ContainerStagger>
            <ContainerAnimated className="mb-4 block text-sm font-semibold text-primary">
              Start Selling Today
            </ContainerAnimated>
            <ContainerAnimated className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-foreground">
              Turn Your Pre-Loved Items Into Cash
            </ContainerAnimated>
            <ContainerAnimated className="my-6 text-base text-muted-foreground md:text-lg">
              Join thousands of sellers who are decluttering sustainably while earning money. 
              List your items in minutes and reach buyers who care about the planet.
            </ContainerAnimated>
            <ContainerAnimated>
              <Button 
                size="lg" 
                className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Selling Now
              </Button>
            </ContainerAnimated>
          </ContainerStagger>

          <GalleryGrid>
            {IMAGES.map((imageUrl, index) => (
              <GalleryGridCell index={index} key={index}>
                <img
                  className="size-full object-cover object-center"
                  width="100%"
                  height="100%"
                  src={imageUrl}
                  alt="Pre-loved items"
                />
              </GalleryGridCell>
            ))}
          </GalleryGrid>
        </div>
      </div>
    </section>
  );
}
