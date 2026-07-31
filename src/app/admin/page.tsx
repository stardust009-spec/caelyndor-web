import type { Metadata } from "next";
import Link from "next/link";
import { requireAdminPage } from "@/lib/server/adminPage";
import { Admin2faClient } from "./Admin2faClient";

export const metadata: Metadata = {
  title: "Administración",
  robots: { index: false, follow: false }
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // Puerta 2FA: esta página es accesible sin la ventana vigente para poder
  // configurar/verificar el código; todo lo demás la exige.
  const admin = await requireAdminPage({ exigir2fa: false });

  return (
    <section className="page-section">
      <div className="container cuenta">
        <header>
          <p className="eyebrow">Administración</p>
          <h1>Panel de Caelyndor</h1>
          <p className="cuenta-nota">Sesión admin: {admin.email}</p>
        </header>

        {admin.dosFaVigente ? (
          <nav className="panel cuenta-panel">
            <h2>Secciones</h2>
            <ul className="admin-nav">
              <li>
                <Link href="/admin/usuarios">Usuarios registrados</Link>
              </li>
            </ul>
            <p className="cuenta-nota">
              Verificación 2FA vigente (expira a las 4 horas; la sesión general no).
            </p>
          </nav>
        ) : (
          <Admin2faClient totpConfigurado={admin.totpConfigurado} />
        )}
      </div>
    </section>
  );
}
