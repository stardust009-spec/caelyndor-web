import Link from "next/link";

type SocialIconName = "instagram" | "x" | "pixiv" | "spotify" | "suno";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/noctalypse/", icon: "instagram" },
  { label: "X / Twitter", href: "https://x.com/noctalypse", icon: "x" },
  { label: "Pixiv", href: "https://www.pixiv.net/en/users/61160232", icon: "pixiv" },
  {
    label: "Spotify",
    href: "https://open.spotify.com/show/6eYQGtjjda25VOK3wVHqgu?si=xySCLbQjQGGyU1f3HQWurA",
    icon: "spotify"
  },
  { label: "Suno", href: "https://suno.com/@caelyndor_bard", icon: "suno" }
] satisfies { label: string; href: string; icon: SocialIconName }[];

const footerNav = [
  { href: "/", label: "Inicio" },
  { href: "/personajes", label: "Personajes" },
  { href: "/libros", label: "Libros" },
  { href: "/cronologia", label: "Cronología" },
  { href: "/musica", label: "Música" },
  { href: "/arte", label: "Arte" },
  { href: "/nuevo-libro", label: "Nuevo Libro" },
  { href: "/archivo", label: "Archivo" }
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <section className="site-footer__social" aria-labelledby="footer-social-title">
          <p id="footer-social-title">Sigue las huellas de Caelyndor</p>
          <div className="site-footer__social-links">
            {socialLinks.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                <SocialIcon name={link.icon} />
                {link.label}
              </a>
            ))}
          </div>
        </section>

        <div className="site-footer__body">
          <section className="site-footer__editorial" aria-labelledby="footer-editorial-title">
            <p className="eyebrow">CAELYNDOR</p>
            <h2 id="footer-editorial-title">Caelyndor es un archivo narrativo en expansión</h2>
            <p>
              Personajes, música, arte, relatos y documentos del mundo se actualizan conforme nuevas puertas del Velo se abren.
            </p>
          </section>

          <nav className="site-footer__nav" aria-label="Navegación secundaria">
            {footerNav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="site-footer__legal">
          <p>© Caelyndor Universe — Todos los derechos reservados.</p>
          <p>Concebido, escrito y forjado por Claudio F. Barriga A.</p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: SocialIconName }) {
  return (
    <span className="site-footer__social-icon" aria-hidden="true">
      {name === "instagram" ? (
        <svg viewBox="0 0 24 24" focusable="false">
          <rect x="5" y="5" width="14" height="14" rx="4" />
          <circle cx="12" cy="12" r="3.2" />
          <circle cx="16.4" cy="7.6" r="0.9" />
        </svg>
      ) : null}
      {name === "x" ? (
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M6 5l12 14" />
          <path d="M18 5L6 19" />
        </svg>
      ) : null}
      {name === "pixiv" ? (
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M7 20V5.8h6.2c3.1 0 5.2 1.9 5.2 4.7s-2.1 4.8-5.2 4.8H9.8V20" />
          <path d="M9.8 8.4h3.1c1.6 0 2.6.8 2.6 2.1s-1 2.2-2.6 2.2H9.8" />
        </svg>
      ) : null}
      {name === "spotify" ? (
        <svg viewBox="0 0 24 24" focusable="false">
          <circle cx="12" cy="12" r="7.2" />
          <path d="M8.2 10.1c2.7-.8 5.6-.5 7.9.8" />
          <path d="M8.8 12.6c2.2-.6 4.4-.4 6.2.6" />
          <path d="M9.3 14.8c1.5-.4 3.1-.2 4.4.5" />
        </svg>
      ) : null}
      {name === "suno" ? (
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M5.2 13.2c1.6-3.4 4.3-5.2 7.1-5.2 3.2 0 5.6 2.3 6.5 4.9" />
          <path d="M5.2 13.2c1.4 2.9 3.9 4.8 6.9 4.8 3.1 0 5.5-2.1 6.7-5.1" />
          <path d="M8.2 12.8c.8-1.2 2-1.9 3.5-1.9 1.8 0 3.2 1 4.1 2.4" />
          <path d="M8.2 12.8c.9 1.4 2 2.2 3.8 2.2 1.6 0 2.9-.7 3.8-1.7" />
        </svg>
      ) : null}
    </span>
  );
}
