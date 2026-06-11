import type { Metadata } from "next";
import "@/styles/globals.css";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: {
    default: "CAELYNDOR",
    template: "%s | CAELYNDOR"
  },
  description: "Portal narrativo oficial del universo de fantasía oscura CAELYNDOR."
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
      </body>
    </html>
  );
}
