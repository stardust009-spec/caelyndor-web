import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GlobalMusicPlayer } from "@/components/GlobalMusicPlayer";
import { MusicPlayerProvider } from "@/components/MusicPlayerContext";
import { AuthSessionProvider } from "@/components/AuthSessionProvider";
import { PulsoPresencia } from "@/components/PulsoPresencia";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthSessionProvider>
      <PulsoPresencia />
      <MusicPlayerProvider>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <GlobalMusicPlayer />
      </MusicPlayerProvider>
    </AuthSessionProvider>
  );
}
