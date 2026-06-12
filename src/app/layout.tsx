import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import { SiteShell } from "@/components/SiteShell";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.caelyndor.cl"),
  title: {
    default: "CAELYNDOR",
    template: "%s | CAELYNDOR"
  },
  description: "Portal narrativo oficial del universo de fantasía oscura CAELYNDOR.",
  openGraph: {
    title: "CAELYNDOR",
    description: "Portal narrativo oficial del universo de fantasía oscura CAELYNDOR.",
    url: "https://www.caelyndor.cl",
    siteName: "CAELYNDOR",
    locale: "es_CL",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "CAELYNDOR",
    description: "Portal narrativo oficial del universo de fantasía oscura CAELYNDOR.",
    images: ["/opengraph-image.jpg"]
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
