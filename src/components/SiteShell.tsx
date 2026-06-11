import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GlobalMusicPlayer } from "@/components/GlobalMusicPlayer";
import { MusicPlayerProvider } from "@/components/MusicPlayerContext";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <MusicPlayerProvider>
      <Header />
      <main id="contenido">{children}</main>
      <Footer />
      <GlobalMusicPlayer />
    </MusicPlayerProvider>
  );
}
