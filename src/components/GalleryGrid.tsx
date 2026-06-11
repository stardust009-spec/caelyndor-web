import Image from "next/image";
import type { GalleryItem } from "@/data/gallery";

type GalleryGridProps = {
  items: GalleryItem[];
  onSelect?: (item: GalleryItem) => void;
};

export function GalleryGrid({ items, onSelect }: GalleryGridProps) {
  return (
    <div className="gallery-grid">
      {items.map((item) => {
        const media = (
          <Image
            src={item.image}
            alt={item.alt}
            width={760}
            height={560}
            loading="lazy"
            unoptimized
          />
        );

        return (
          <article className="gallery-card" key={item.id}>
            {onSelect ? (
              <button
                type="button"
                className="gallery-card__trigger"
                onClick={() => onSelect(item)}
                aria-label={`Ampliar: ${item.title}`}
              >
                {media}
              </button>
            ) : (
              media
            )}
            <div>
              <p className="eyebrow">{item.category}</p>
              <h3>{item.title}</h3>
            </div>
          </article>
        );
      })}
    </div>
  );
}
