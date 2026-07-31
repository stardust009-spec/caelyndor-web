"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/personajes", label: "Personajes" },
  { href: "/libros", label: "Libros" },
  { href: "/relatos", label: "Relatos" },
  { href: "/cronologia", label: "Cronología" },
  { href: "/musica", label: "Música" },
  { href: "/arte", label: "Arte" },
  { href: "/descargas", label: "Descargas" },
  { href: "/nuevo-libro", label: "Nuevo Libro" },
  { href: "/archivo", label: "Archivo" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  // Alias y avatar vienen del JWT (ver auth.ts): sin llamada extra por página.
  const avatarUrl = session?.user?.avatarUrl ?? null;
  const avatarCharacter = session?.user?.avatarCharacter ?? null;
  const alias = session?.user?.alias ?? null;
  const cuentaActiva = pathname.startsWith("/cuenta");

  return (
    <header className="site-header">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <div className="site-header__inner">
        <Link className="brand" href="/" onClick={() => setOpen(false)}>
          <span className="brand__mark" aria-hidden="true" />
          <span>CAELYNDOR</span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Cerrar menú principal" : "Abrir menú principal"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="main-navigation"
          className={`main-nav ${open ? "main-nav--open" : ""}`}
          aria-label="Navegación principal"
        >
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Cuenta: con sesión muestra el avatar junto al texto; sin sesión
              queda el enlace de texto tal como estaba, nunca un círculo vacío. */}
          <Link
            className={`nav-cuenta ${avatarUrl ? "nav-cuenta--con-avatar" : ""}`}
            href="/cuenta"
            aria-current={cuentaActiva ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {avatarUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="nav-cuenta__avatar"
                src={avatarUrl}
                alt={avatarCharacter ? `Tu avatar: ${avatarCharacter}` : "Tu avatar"}
                width={32}
                height={32}
              />
            )}
            <span>{alias ?? "Cuenta"}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
