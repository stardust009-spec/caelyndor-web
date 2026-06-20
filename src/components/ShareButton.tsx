"use client";

import { useState } from "react";

type ShareButtonProps = {
  shareSlug: string;
  title: string;
  description?: string;
  label?: string;
  className?: string;
};

function ShareIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

export function ShareButton({ shareSlug, title, description, label = "Compartir", className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}/s/${shareSlug}`;
    const text = description ?? "Escucha este tema de Caelyndor.";

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // El usuario canceló o el navegador rechazó: caemos a copiar al portapapeles.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Sin Clipboard API disponible no hacemos nada destructivo.
    }
  }

  return (
    <button
      className={className}
      type="button"
      onClick={handleShare}
      aria-label={`Compartir ${title}`}
    >
      <ShareIcon size={13} /> <span>{copied ? "Enlace copiado" : label}</span>
    </button>
  );
}
