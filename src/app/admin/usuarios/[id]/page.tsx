import type { Metadata } from "next";
import { requireAdminPage } from "@/lib/server/adminPage";
import { UsuarioDetalleClient } from "./UsuarioDetalleClient";

export const metadata: Metadata = {
  title: "Detalle de usuario — Administración",
  robots: { index: false, follow: false }
};

export const dynamic = "force-dynamic";

export default async function AdminUsuarioDetallePage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPage();
  const { id } = await params;

  return (
    <section className="page-section">
      <div className="container cuenta">
        <UsuarioDetalleClient userId={id} />
      </div>
    </section>
  );
}
