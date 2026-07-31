import type { Metadata } from "next";
import { requireAdminPage } from "@/lib/server/adminPage";
import { UsuariosClient } from "./UsuariosClient";

export const metadata: Metadata = {
  title: "Usuarios — Administración",
  robots: { index: false, follow: false }
};

export const dynamic = "force-dynamic";

export default async function AdminUsuariosPage() {
  await requireAdminPage();

  return (
    <section className="page-section">
      <div className="container cuenta">
        <header>
          <p className="eyebrow">Administración</p>
          <h1>Usuarios registrados</h1>
        </header>
        <UsuariosClient />
      </div>
    </section>
  );
}
