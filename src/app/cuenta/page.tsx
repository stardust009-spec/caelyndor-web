import type { Metadata } from "next";
import { CuentaClient } from "./CuentaClient";

export const metadata: Metadata = {
  title: "Tu cuenta",
  description: "Tu Aura, tu progreso y tus datos en Caelyndor.",
  robots: { index: false, follow: false }
};

export const dynamic = "force-dynamic";

export default function CuentaPage() {
  return (
    <section className="page-section">
      <div className="container">
        <CuentaClient />
      </div>
    </section>
  );
}
