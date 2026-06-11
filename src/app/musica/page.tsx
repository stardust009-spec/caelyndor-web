import type { Metadata } from "next";
import { MusicArchive } from "@/components/MusicArchive";
import { musicTracks } from "@/data/music";

export const metadata: Metadata = {
  title: "Música"
};

export default function MusicPage() {
  return (
    <section className="page-section page-section--music">
      <div className="container">
        <MusicArchive tracks={musicTracks} />
      </div>
    </section>
  );
}
