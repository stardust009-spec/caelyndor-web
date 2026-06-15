import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import { SiteShell } from "@/components/SiteShell";
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Caelyndor — Crónicas de fantasía oscura, personajes y relatos",
    template: "%s | Caelyndor"
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_AUTHOR }],
  creator: SITE_AUTHOR,
  publisher: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Caelyndor — Universo de fantasía oscura",
    description: SITE_DESCRIPTION
  },
  twitter: {
    card: "summary_large_image",
    title: "Caelyndor — Universo de fantasía oscura",
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <SiteShell>{children}</SiteShell>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
