import InteractiveImageBentoGallery from "@/components/ui/bento-gallery"

const imageItems = [
  {
    id: 1,
    title: "Mountain Vista",
    desc: "Serenity above the clouds.",
    url: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=900&auto=format&fit=crop",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "Coastal Arch",
    desc: "Where the land meets the sea.",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop",
    span: "md:row-span-1",
  },
  {
    id: 3,
    title: "Forest Canopy",
    desc: "Sunlight filtering through leaves.",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&auto=format&fit=crop",
    span: "md:row-span-1",
  },
  {
    id: 4,
    title: "Desert Dunes",
    desc: "Golden sands under the sun.",
    url: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=900&auto=format&fit=crop",
    span: "md:row-span-2",
  },
  {
    id: 5,
    title: "City at Night",
    desc: "A vibrant urban landscape.",
    url: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=900&auto=format&fit=crop",
    span: "md:row-span-1",
  },
  {
    id: 6,
    title: "Misty Lake",
    desc: "Morning fog over calm waters.",
    url: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?w=900&auto=format&fit=crop",
    span: "md:col-span-2 md:row-span-1",
  },
]

export default function InteractiveImageBentoGalleryDemo() {
  return (
    <div className="w-full antialiased">
      <InteractiveImageBentoGallery
        imageItems={imageItems}
        title="Curated Moments"
        description="A collection of stunning landscapes. Drag to explore, click to expand."
      />
    </div>
  )
}
