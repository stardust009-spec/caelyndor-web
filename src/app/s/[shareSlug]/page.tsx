import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { SharedTrack } from "@/components/SharedTrack";
import {
  getShareSlug,
  getTrackByShareSlug,
  musicTracks,
  trackShareDescription,
  type MusicTrack
} from "@/data/music";
import { SITE_AUTHOR, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

// Copia local del fallback: no se importa de MusicPlayerContext porque ese módulo
// es "use client" y, en un server component, sus exports llegan como referencias
// de cliente (no como el string), lo que rompía cover.startsWith en el build.
const FALLBACK_MUSIC_COVER = "/images/music-covers/fallback_missing_cover.png";

type SharedTrackPageProps = {
  params: Promise<{ shareSlug: string }>;
};

export function generateStaticParams() {
  return musicTracks.map((track) => ({ shareSlug: getShareSlug(track) }));
}

function coverUrl(track: MusicTrack) {
  const cover = track.coverImage ?? FALLBACK_MUSIC_COVER;
  return cover.startsWith("http") ? cover : absoluteUrl(cover);
}

export async function generateMetadata({ params }: SharedTrackPageProps): Promise<Metadata> {
  const { shareSlug } = await params;
  const track = getTrackByShareSlug(shareSlug);

  if (!track) {
    return { title: "Tema no encontrado" };
  }

  const slug = getShareSlug(track);
  const description = trackShareDescription(track);
  const fullTitle = `${track.title} | ${SITE_NAME}`;
  const url = `${SITE_URL}/s/${slug}`;
  const image = coverUrl(track);

  return {
    title: track.title,
    description,
    alternates: { canonical: `/s/${slug}` },
    openGraph: {
      type: "music.song",
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, alt: `Carátula de ${track.title}` }]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image]
    }
  };
}

export default async function SharedTrackPage({ params }: SharedTrackPageProps) {
  const { shareSlug } = await params;
  const track = getTrackByShareSlug(shareSlug);

  if (!track) {
    notFound();
  }

  const slug = getShareSlug(track);
  const url = `${SITE_URL}/s/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    name: track.title,
    url,
    image: coverUrl(track),
    byArtist: { "@type": "MusicGroup", name: track.artist ?? SITE_NAME },
    ...(track.album ? { inAlbum: { "@type": "MusicAlbum", name: track.album } } : {}),
    description: trackShareDescription(track),
    isPartOf: { "@type": "CreativeWork", name: SITE_NAME, url: SITE_URL },
    creator: { "@type": "Person", name: SITE_AUTHOR, url: SITE_URL }
  };

  return (
    <section className="page-section page-section--shared">
      <div className="container">
        <JsonLd data={jsonLd} />
        <SharedTrack track={track} shareSlug={slug} />
      </div>
    </section>
  );
}
