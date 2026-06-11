import Image from "next/image";
import type { GalleryItem } from "@/data/gallery";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="gallery-grid">
      {items.map((item) => (
        <article className="gallery-card" key={item.id}>
          <Image
            src={item.image}
            alt={item.alt}
            width={760}
            height={560}
            loading="lazy"
          />
          <div>
            <p className="eyebrow">{item.category}</p>
            <h3>{item.title}</h3>
          </div>
        </article>
      ))}
    </div>
  );
}
